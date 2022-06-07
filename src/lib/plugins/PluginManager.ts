import type { Awaitable } from '@sapphire/utilities'
import type { SakuraClient } from '../Client'
import type { PluginHook } from '../types/Enums'

export interface HookFunction { 
  (this: SakuraClient): Awaitable<unknown>
}

interface PluginsEntry {
  name: string
  hook: HookFunction
  hookType: PluginHook
}

export class PluginsManager {
  public readonly plugins = new Set<PluginsEntry>()

  public register(hookType: PluginHook, hook: HookFunction, name: string): void {
    if (typeof hook !== 'function') throw TypeError('Plugin Hook must be a function')

    this.plugins.add({ hookType, hook, name })
  }

  public *values(hookType: PluginHook): Generator<PluginsEntry, void, unknown> {
    for (const plugin of this.plugins) {
      if (plugin.hookType !== hookType) continue
      yield plugin
    }
  }
}
