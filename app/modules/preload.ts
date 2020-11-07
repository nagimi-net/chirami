import { contextBridge } from 'electron';

const settings = require('./settings');
const source = require('./source');


contextBridge.exposeInMainWorld('setting', settings);
contextBridge.exposeInMainWorld('source', source);


contextBridge.exposeInMainWorld('lihat', {
	process_env: process.env
});
