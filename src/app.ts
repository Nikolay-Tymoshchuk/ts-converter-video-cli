import { FfmpegExecutor } from './commands/ffmpeg/ffmpeg.executor';
import { ConsoleLogger } from './out/console-logger/console-logger';

/**
 * Enter point to the application
 */
export class App {

  /**
   * Initialise class PromptService and call method input for console "conversation"
   */
  async run() {
   await new FfmpegExecutor(ConsoleLogger.getInstance()).execute();
  }
}


/**
 * Run the application
 */
const app = new App();
app.run().then(() => console.log('App is running'));