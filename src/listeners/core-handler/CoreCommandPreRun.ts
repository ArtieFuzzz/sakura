import type { GuildChannel, Message } from 'fuwa'
import { Listener } from '../../lib/structures/Listener'
import { UserError } from '../../lib/structures/UserError'
import { Events, Restrict } from '../../lib/types/Enums'

export default class CoreListener extends Listener {
  public readonly prefix: string
  constructor(context: Listener.Context) {
    super(context, {
      event: Events.PreCommandRun
    })

    this.prefix = this.container.client.prefix
  }

  public run(message: Message): unknown {
    const args = message.content.slice(this.prefix.length).trim()
    const commandName = args.split(/ +/g).shift()?.toLowerCase()

    if (!commandName) return null

    const command = this.container.stores.get('commands').get(commandName)

    if (!command) {
      return this.container.client.emit(Events.UnknownCommand, { commandName })
    }

    if (command.nsfw &&( message.channel as GuildChannel).nsfw) {
      throw new UserError('This command can only be ran in NSFW channels')
    }

    if (command.restrictTo === Restrict.DM && !message.channel.isDM()) {
      throw new UserError('This command can only be ran in DMs')
    } else if (command.restrictTo === Restrict.TextChannel && !message.channel.isText()) {
      throw new UserError('This command can only be ran in Guild Text channels')
    }

    return this.container.client.emit(Events.CommandRun, { message, command, args })
  }
}
