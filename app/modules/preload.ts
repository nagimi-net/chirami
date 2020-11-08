import * as fs from 'fs';
import { contextBridge } from 'electron';
import { BASEDIR } from '../constants';

if (!fs.existsSync(BASEDIR)) {
	fs.mkdirSync(BASEDIR);
}

const settings = require('./settings');
const source = require('./source');


contextBridge.exposeInMainWorld('setting', settings);
contextBridge.exposeInMainWorld('source', source);


contextBridge.exposeInMainWorld('lihat', {
	process_env: process.env
});
