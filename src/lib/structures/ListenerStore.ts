import { Store } from '@sapphire/pieces'
import { Listener } from './Listener'

export default class ListenerStore extends Store<Listener> {
  constructor() {
    super(Listener as any, { name: 'listeners' })
  }
}
