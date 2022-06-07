import type { HookFunction } from './PluginManager'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class Plugin {
  public static ['preInitialize']?: HookFunction
  public static ['postInitialize']?: HookFunction
  public static ['preLogin']?: HookFunction
  public static ['postLogin']?: HookFunction
}
