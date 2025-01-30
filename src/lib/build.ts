import { childProcess } from './childProcess';
import { defineError } from './defineError';

type Props = {
  typescriptCommand: 'npx tsc';
};

const props: Props = {
  typescriptCommand: 'npx tsc',
};

function build(props: Props): void {
  try {
    const { typescriptCommand } = props;

    const [data, error] = childProcess({ command: typescriptCommand });

    if (error) {
      throw error;
    }
  } catch (error) {
    const { name, message, stack } = defineError(error);

    const consoleErrorMessage = `Failure to build application:\nName ${name}\nMessage: ${message}\nStack: ${stack}`;

    console.log(consoleErrorMessage);
  }
}

build(props);
