export enum Restrict {
  TextChannel,
  DM
}

export enum Events {
  MessageCreate = 'messages.create',
  MessageDelete = 'messages.delete',
  MessageUpdate = 'messages.update',
  GuildCreate = 'guilds.create',
  GuildDelete = 'guilds.delete',
  GuildUpdate = 'guilds.delete',
  Ready = 'ready',

  CommandRun = 'commandRun',
  CommandFailed = 'commandFailed',
  PreCommandRun = 'preCommandRun',
  UnknownCommand = 'unknownCommandRun',
}

export enum PluginHook {
  PreInitialize = 'preInitialize',
  PostInitialize = 'postInitialize',
  PreLogin = 'preLogin',
  PostLogin = 'postLogin'
}
