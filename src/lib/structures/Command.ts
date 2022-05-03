import { AliasPiece } from '@sapphire/pieces'
import type { Awaitable } from '@sapphire/utilities'
import type { Message } from 'fuwa'
import type { Restrict } from '../types/Enums'

export interface CommandOptions extends AliasPiece.Options {
  description: string | null
  nsfw?: boolean
  restrictTo?: Restrict
}

export interface CommandToJSON extends AliasPiece.JSON {
  description: string | null,
  restrictTo: Restrict | null
}

export namespace Command {
  export type Options = CommandOptions
  export type Context = AliasPiece.Context
  export type ToJSON = CommandToJSON
}

export abstract class Command extends AliasPiece<CommandOptions> {
  public readonly description: string | null
  public readonly nsfw: boolean
  public readonly restrictTo: Restrict | null
  constructor(context: AliasPiece.Context, options: CommandOptions) {
    super(context, options)

    this.description = options.description ?? null
    this.nsfw = options.nsfw ?? false
    this.restrictTo = options.restrictTo ?? null
  }

  public abstract run(message: Message, args: string[]): Awaitable<unknown>

  public toJSON(): CommandToJSON {
    return {
      ...super.toJSON(),
      description: this.description,
      restrictTo: this.restrictTo
    }
  }
}
