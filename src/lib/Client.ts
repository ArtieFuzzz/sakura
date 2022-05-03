import { container, StoreRegistry } from '@sapphire/pieces'
import type { ClientOptions } from 'fuwa'
import * as Fuwa from 'fuwa'
import { join } from 'path'
import CommandStore from './structures/CommandStore'
import ListenerStore from './structures/ListenerStore'

export class SakuraClient extends Fuwa.Client {
  /**
   * The store registry
   * 
   * @since 1.0.0
   */
  public stores: StoreRegistry

  /**
   * Prefix
   * 
   * @since 1.0.0
   */
  public prefix: string
  constructor(token: string, options: ClientOptions) {
    super(token, options)

    container.client = this

    this.stores = new StoreRegistry()
    container.stores = this.stores

    container.logger = this.logger

    this.prefix = options.prefix

    this.stores
      .register(new CommandStore())
      .register(new ListenerStore().registerPath(join(__dirname, '..', 'listeners')))
  }

  public async login(): Promise<void> {
    if (this.options.baseDir !== null) {
      this.stores.registerPath(this.options.baseDir)
    }

    // Load the stores
    await Promise.all([...this.stores.values()].map((store) => store.loadAll()))

    return await super.connect()
  }
}
