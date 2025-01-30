import { Data } from './app';
import { defineError } from './defineError';
import { exec } from 'child_process';

export function childProcess(props: { command: string }): Data<string> {
  try {
    const { command } = props;
    exec('npx tsc');

    const message = `Command ${command} successfully executed.`;

    return [message, null];
  } catch (error) {
    const definedError = defineError(error);
    return [null, definedError];
  }
}
