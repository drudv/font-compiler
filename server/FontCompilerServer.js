
import express from 'express';
import morgan from 'morgan';
import expressWinston from 'express-winston';

export const DEFAULT_PORT = 8989;
export const DEFAULT_HOST = '0.0.0.0';

export default class FontCompilerServer {

  /**
   * @param {Object} param
   * @param {string} param.host
   * @param {number} param.port
   * @param {Object} param.logger - instance of winston logger
   */
  constructor({ host = DEFAULT_HOST, port = DEFAULT_PORT, logger } = {}) {
    const webServer = this._webServer = express();
    webServer.use(expressWinston.logger({ winstonInstance: logger }));
    webServer.get('/', this._handleRoot.bind(this));
    webServer.listen(port, host, () => {
      logger.info(`font-compiler server started on port ${port} at ${host}`);
    });
  }

  /**
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   */
  _handleRoot(request, response, next) {
    response.send('It works');
  }
}
