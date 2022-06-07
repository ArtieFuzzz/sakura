import { container, StoreRegistry } from '@sapphire/pieces'
import type { ClientOptions } from 'fuwa'
import * as Fuwa from 'fuwa'
import { join } from 'path'
import { PluginsManager } from './plugins/PluginManager'
import CommandStore from './structures/CommandStore'
import ListenerStore from './structures/ListenerStore'
import { PluginHook } from './types/Enums'

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

    this.loadPlugins(PluginHook.PreInitialize)

    this.stores
      .register(new CommandStore())
      .register(new ListenerStore().registerPath(join(__dirname, '..', 'listeners')))

    this.loadPlugins(PluginHook.PostInitialize)
  }

  public static plugins = new PluginsManager()

  private loadPlugins(type: PluginHook): void {
    for (const plugin of SakuraClient.plugins.values(type)) {
      plugin.hook.call(this)
    }
  }

  public async login(): Promise<void> {
    if (this.options.baseDir !== null) {
      this.stores.registerPath(this.options.baseDir)
    }

    this.loadPlugins(PluginHook.PreLogin)

    // Load the stores
    await Promise.all([...this.stores.values()].map((store) => store.loadAll()))
    const login = await super.connect()

    this.loadPlugins(PluginHook.PostLogin)

    return login
  }
}
