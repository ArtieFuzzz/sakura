import type { Message } from 'fuwa'
import { Listener } from '../../lib/structures/Listener'
import { Events } from '../../lib/types/Enums'

export default class CoreListener extends Listener {
  constructor(context: Listener.Context) {
    super(context, {
      event: Events.MessageCreate
    })
  }

  public run(message: Message): unknown {
    if (message.author.bot || message.author.id === this.container.client.user!.id) return null

    return this.container.client.emit(Events.PreCommandRun, message)
  }
}
