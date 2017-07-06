import winston from 'winston';
import FontCompilerServer from './FontCompilerServer';

const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)(),
  ]
});

const app = new FontCompilerServer({
  logger
});
app.run();
