import type { Message } from 'fuwa'
import type { Command } from '../structures/Command'

export interface CommandRunPayload {
  message: Message
  command: Command
  args: Array<string>
}
