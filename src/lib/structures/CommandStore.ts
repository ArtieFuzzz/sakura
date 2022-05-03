import { AliasStore } from '@sapphire/pieces'
import { Command } from './Command'

export default class CommandStore extends AliasStore<Command> {
  constructor() {
    super(Command as any, { name: 'commands' })
  }
}
