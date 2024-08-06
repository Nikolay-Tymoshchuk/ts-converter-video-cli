import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';

import { CommandExecutor } from '../../core/executor/command.executor';
import { FileService } from '../../core/files/file.service';
import { PromptService } from '../../core/prompt/prompt.service';
import { StreamHandler } from '../../core/handlers/stream.handler';
import { FfmpegBuilder } from './ffmpeg.builder';

import type { ICommandExecFfmpeg, IFfmpegInput } from './ffmpeg.types';
import type { IStreamLogger } from '../../core/handlers/stream-logger.interface';

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
  private fileService: FileService = new FileService();
  private promptService:PromptService = new PromptService();

  constructor(logger: IStreamLogger) {
    super(logger);
  }
  protected async prompt(): Promise<IFfmpegInput> {
    const width = await this.promptService.input<number>("Width", "number");
    const height = await this.promptService.input<number>("Height", "number");
    const path = await this.promptService.input<string>("Path", "input");
    const name = await this.promptService.input<string>("Name", "input");

    return {
      width,
      height,
      path,
      name
    }
  }

  protected build({width, height, path, name}: IFfmpegInput): ICommandExecFfmpeg {
   const output = this.fileService.getFilePath(path, name, 'mp4');
   const args  = new FfmpegBuilder().input((path)).setVideoSize(width, height).output(output);
    return {
      command: 'ffmpeg',
      args,
      output
    }
  }

  protected spawn({output, command, args}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deleteDileIfExists(output).then(() => null);
    return spawn(command, args);
  }

  protected processedStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger) {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}