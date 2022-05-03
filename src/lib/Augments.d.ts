import type { ILogger } from 'fuwa'
import type { SakuraClient } from './Client'
import type CommandStore from './structures/CommandStore'
import type ListenerStore from './structures/ListenerStore'

declare module '@sapphire/pieces' {
  interface Container {
    client: SakuraClient
    logger: ILogger
  }

  interface StoreRegistryEntries {
    commands: CommandStore
    listeners: ListenerStore
  }
}

declare module 'fuwa' {
  export interface ClientOptions {
    /**
     * Base directory for commands and listeners
     * 
     * @default undefined
     * @since 1.0.0
     */
    baseDir?: string
    /**
    * Command prefix
    * 
    * @since 1.0.0
    */
    prefix: string
  }
}
