import { fromAsync, Result } from '@sapphire/result'
import { Listener } from '../../lib/structures/Listener'
import { Events } from '../../lib/types/Enums'
import type { CommandRunPayload } from '../../lib/types/Payloads'

export default class CoreListener extends Listener {
  constructor(context: Listener.Context) {
    super(context, {
      event: Events.CommandRun
    })
  }

  public run({ args, command, message }: CommandRunPayload): Promise<Result<void, unknown>> {
    const result = fromAsync(async () => {
      await command.run(message, args)
    })

    // Return the result for now
    return result
  }
}
