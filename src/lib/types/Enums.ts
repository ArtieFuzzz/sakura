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
  GuildUpdateuildDelete = 'guilds.delete',
  Ready = 'ready',

  CommandRun = 'commandRun',
  PreCommandRun = 'preCommandRun',
  UnknownCommand = 'unknownCommandRun',
}
