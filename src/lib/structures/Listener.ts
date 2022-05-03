import { Piece } from '@sapphire/pieces'
import type { Awaitable } from '@sapphire/utilities'
import type EventEmitter from 'events'
import type { ClientEvents } from 'fuwa'

export interface ListenerOptions extends Piece.Options {
  emitter?: EventEmitter | null
  event: string
  once?: boolean
}

export interface ListenerToJSON extends Piece.JSON {
  emitter: EventEmitter
  event: string
  once: boolean
}

export namespace Listener {
  export type Options = ListenerOptions
  export type JSON = ListenerToJSON
  export type Context = Piece.Context
}

export abstract class Listener<E extends keyof ClientEvents | string = ''> extends Piece<ListenerOptions> {
  /**
   * Where the Event will be emitted from
   * 
   * @since 1.0.0
   */
  public readonly emitter: EventEmitter | null

  /**
   * Event to listen for
   * 
   * @since 1.0.0
   * @default this.container.client
   */
  public readonly event: string

  /**
   * Run once or not
   * 
   * @since 1.0.0
   * @default false
   */
  public readonly once: boolean

  private _listener: ((...args: any[]) => unknown) | null
  constructor(context: Piece.Context, options: ListenerOptions)  {
    super(context, options)

    this.emitter = options.emitter ?? this.container.client
    this.event = options.event ?? this.name
    this.once = options.once ?? false

    this._listener = this.event && this.emitter ? this._run.bind(null, this) : null

    if (!this._listener) this.enabled = false
  }

  public abstract run(...args: E extends keyof ClientEvents ? ClientEvents[E] : unknown[]): Awaitable<unknown>

  public onLoad(): unknown {
    if (this._listener) {
      this.emitter![this.once ? 'once' : 'on'](this.event, this._run.bind(null, this))
    }

    return super.onLoad()
  }

  private async _run(...args: unknown[]): Promise<void> {
    // @ts-ignore
    await this.run(args)
    if (this.once) await this.unload()
  }

  public toJSON(): ListenerToJSON {
    return {
      ...super.toJSON(),
      emitter: this.emitter!,
      event: this.event,
      once: this.once
    }
  }
}
