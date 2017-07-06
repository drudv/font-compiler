import winston from 'winston';
import FontCompilerServer, { DEFAULT_HOST, DEFAULT_PORT } from './FontCompilerServer';
import yargs from 'yargs';

yargs
  .usage('Service to generate icon webfonts\nUsage: $0 [OPTIONS]')
  .options({
    'port': {
      describe: `port on which the server listens for connections (default ${DEFAULT_PORT})`,
      type: 'number'
    },
    'host': {
      describe: `host on which the server listens for connections (default ${DEFAULT_HOST})`,
      type: 'string'
    }
  })
  .help('h')
  .alias('h', 'help')

const argv = yargs.argv;

const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)(),
  ]
});

const app = new FontCompilerServer({
  host: argv.host,
  port: argv.port,
  logger
});
app.run();
