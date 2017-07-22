
import { expect } from 'chai';
import path from 'path';
import FontCompilerClient from 'client/FontCompilerClient';

const HOST = '127.0.0.1';
const PORT = 8989;

const DEFAULT_OPTS = {
    host: HOST,
    port: PORT
};

describe('FontCompilerClient', () => {

    it('produces server URL', () => {
        const client = new FontCompilerClient(DEFAULT_OPTS);
        expect(client.serverUrl()).to.be.equal(`http://${HOST}:${PORT}`);
    });

    it('archives directory', () => {
        const client = new FontCompilerClient(DEFAULT_OPTS);
        expect(client.archiveDir.bind(client, path.join(__dirname, './resources/test-fontcustom-config')))
            .to.not.throw();
    });
});
