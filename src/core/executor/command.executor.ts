import { ChildProcessWithoutNullStreams } from 'node:child_process';

import type { IStreamLogger } from '../handlers/stream-logger.interface';
import type { ICommandExec } from './command.types';


export abstract class CommandExecutor<Input> {
  constructor(private logger: IStreamLogger) {
  }

  public async execute(): Promise<void> {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command);
    this.processedStream(stream, this.logger);
  }

  protected abstract prompt(): Promise<Input>;
  protected abstract build(input: Input): ICommandExec;
  protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams;
  protected abstract processedStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}