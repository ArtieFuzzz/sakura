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
  PreCommandRun = 'preCommandRun',
  UnknownCommand = 'unknownCommandRun',
}
