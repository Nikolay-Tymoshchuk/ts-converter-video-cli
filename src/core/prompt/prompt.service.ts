import inquirer from 'inquirer';

import { PromptType } from './prompt.types';


export class PromptService {
  public async input<T>(message: string, type: PromptType) {
    const {value} = await inquirer.prompt<{value: T}>([{
      type,
      name: 'value',
      message: message,
    }]);
    return value;
  }
}
