export enum Restrict {
  TextChannel,
  DM
}

export enum Events {
  MessageCreate = 'messageCreate',
  MessageDelete = 'messageDelete',
  MessageUpdate = 'messageUpdate',
  GuildCreate = 'guildCreate',
  GuildDelete = 'guildRelete',
  GuildUpdate = 'guildDelete',
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
