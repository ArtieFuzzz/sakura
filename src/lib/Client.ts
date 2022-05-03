import { container, StoreRegistry } from '@sapphire/pieces'
import type { ClientOptions } from 'fuwa'
import * as Fuwa from 'fuwa'

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
