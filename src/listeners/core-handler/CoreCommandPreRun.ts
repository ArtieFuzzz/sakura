import type { Message } from 'fuwa'
import { Listener } from '../../lib/structures/Listener'
import { Events } from '../../lib/types/Enums'

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

    return this.container.client.emit(Events.CommandRun, { message, command, args })
  }
}
