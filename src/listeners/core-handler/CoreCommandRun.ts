import { fromAsync, isErr, Result } from '@sapphire/result'
import { Listener } from '../../lib/structures/Listener'
import { Events } from '../../lib/types/Enums'
import type { CommandRunPayload } from '../../lib/types/Payloads'

export default class CoreListener extends Listener {
  constructor(context: Listener.Context) {
    super(context, {
      event: Events.CommandRun
    })
  }

  public async run(payload: CommandRunPayload): Promise<Result<void, unknown>> {
    const { args, command, message } = payload

    const result = await fromAsync(async () => {
      await command.run(message, args)
    })

    if (isErr(result)) this.container.client.emit(Events.CommandFailed, result.error, { ...payload  })
    
    return result
  }
}
