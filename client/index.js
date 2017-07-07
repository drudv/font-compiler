import fs from 'fs';
import yargs from 'yargs';
import { DEFAULT_PORT } from '../server/FontCompilerServer';

const HOST_PORT_REGEXP = '^([a-zA-Z0-9-\.]+)?(\:[0-9]+)?$';

yargs
  .usage('Generate icon webfonts using remote font-compiler service\nUsage: $0 [OPTIONS]')
  .options({
    'server': {
      describe: `host and port of font-compiler server (default: 127.0.0.1:${DEFAULT_PORT})`,
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
      describe: `directory where fontcustom.yml and SVG files are located (default: current directory)`,
      default: '.'
    }
  })
  .help('h')
  .alias('h', 'help')

