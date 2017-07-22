
import { WritableStream } from 'memory-streams';
import fs from 'fs';
import archiver from 'archiver';

const COMPRESSION_LEVEL = 3;

export default class FontCompilerClient {
  constructor({ host, port, https = false }) {
    this._config = { host, port, https };
  }

  serverUrl() {
    const { host, port, https } = this._config;
    const schema = https ? 'https' : 'http';
    return `${schema}://${host}:${port}`;
  }

  fullUrl(path = '') {
    return `${this.serverUrl()}${path}`;
  }

  archiveDir(path) {
    if (!fs.lstatSync(path).isDirectory()) {
      throw new Error(`Not a directory: ${path}`);
    }

    const output = new WritableStream();
    const archive = archiver('zip', {
      zlib: { level: COMPRESSION_LEVEL }
    });
    archive.pipe(output);
    archive.directory(path, false);

    archive.finalize();
  }
}
