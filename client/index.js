import path from 'path';
import yargs from 'yargs';
import { DEFAULT_PORT } from '../server/FontCompilerServer';

const HOST_PORT_REGEXP = '^([a-zA-Z0-9-\.]+)?(\:[0-9]+)?$';

const USAGE = `
Generate icon webfonts using remote font-compiler service
USAGE: $0 [COMMAND] [OPTIONS]
`;

yargs
  .usage(USAGE)
  .commandDir(path.join(__dirname, 'commands'))
  .options({
    'server': {
      describe: `host and port of font-compiler server`,
      default: `127.0.0.1:${DEFAULT_PORT}`,
      coerce: value => {
        const matches = value.match(HOST_PORT_REGEXP);
        if (!matches) {
          throw new Error(`${value} doesn't match the format: HOSTNAME:PORT`);
        }
        const [wholeMatch, host, port] = matches; // eslint-disable-line no-unused-vars
        return {
          host: host || '127.0.0.1',
          port: port ? parseInt(port.substr(1)) : DEFAULT_PORT
        };
      }
    },
    'dir': {
      describe: `directory where fontcustom.yml and SVG files are located`,
      default: '.'
    }
  })
  .demandCommand()
  .help('h')
  .alias('h', 'help');

const commands = yargs.getCommandInstance().getCommands();
const command = yargs.argv._[0];

if (!command) {
  console.error('Mandatory command is not provided');
  yargs.showHelp();
  process.exit(1);
}

if (!commands.includes(command)) {
  console.error(`Not a valid command: ${command}`);
  yargs.showHelp();
  process.exit(1);
}