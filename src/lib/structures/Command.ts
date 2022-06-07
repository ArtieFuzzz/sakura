import { AliasPiece } from '@sapphire/pieces'
import type { Awaitable } from '@sapphire/utilities'
import type { GuildChannel, Message } from 'fuwa'
import { Restrict } from '../types/Enums'
import { UserError } from './UserError'

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
  /**
   * Command description
   * 
   * @since 1.0.0
   */
  public readonly description: string | null

  /**
   * Whether this command should be only ran in NSFW channels
   * 
   * @since 1.0.0
   * @default false
   */
  public readonly nsfw: boolean

  /**
   * Restricts this command to DMs or Guild Text Channels
   * 
   * @since 1.0.0
   * @default null
   */
  public readonly restrictTo: Restrict | null
  constructor(context: AliasPiece.Context, options: CommandOptions) {
    super(context, options)

    this.description = options.description ?? null
    this.nsfw = options.nsfw ?? false
    this.restrictTo = options.restrictTo ?? null
  }

  public abstract run(message: Message, args: Array<string>): Awaitable<unknown>

  public runPreconditions(message: Message): UserError | true {
    if (this.nsfw && (message.channel as GuildChannel).nsfw) {
      throw new UserError('This command can only be ran in NSFW channels')
    }

    if (this.restrictTo === Restrict.DM && !message.channel.isDM()) {
      throw new UserError('This command can only be ran in DMs')
    } else if (this.restrictTo === Restrict.TextChannel && !message.channel.isText()) {
      throw new UserError('This command can only be ran in Guild Text channels')
    }

    return true
  }

  public toJSON(): CommandToJSON {
    return {
      ...super.toJSON(),
      description: this.description,
      restrictTo: this.restrictTo
    }
  }
}
