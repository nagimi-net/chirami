import * as path from 'path';
import * as fs from 'fs';
import { BASEDIR, defaultFilterOptions } from '../constants';

let SOURCE: any = {};
let SOURCE_LIST: any[] = [];
let LOGGER_LIST: any[] = [];

function init () {
	try {
		const dir = path.join(BASEDIR, 'sources');
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		fs.readdirSync(dir).forEach(e => {
			try {
				const module = require(path.join(dir, e));
				const instance = new module();

				if (!instance.info) throw `source "${e}" doesnt has info.`;
				if (!instance.info.id) throw `source "${e}" doesnt has id.`;

				SOURCE_LIST.push({ ...instance.info });
				SOURCE[instance.info.id] = instance;
			}
			catch (ex) {
				LOGGER_LIST.push(ex.stack || ex);
			}
		});
	}
	catch (e) {
		LOGGER_LIST.push({ message: e, type: 'FATAL' });
	}
}

async function exec(sourceId: string, funcName: string, ...args: any) {
	try {
		if (!SOURCE[sourceId]) {
			throw new Error("missing source \"" + sourceId + "\". is source has initialized?");
		}
		return await SOURCE[sourceId][funcName](...args);
	}
	catch(e) {
		throw e.stack;
	}
}

const api = {
	getDirectory: (sourceIndex: string, filterOptions: any) => exec(sourceIndex, 'getDirectory', { ...defaultFilterOptions, ...filterOptions }),
	getBook: (sourceIndex: string, bookIndex: string) => exec(sourceIndex, 'getBook', bookIndex),
	getChapter: (sourceIndex: string, bookIndex: string, chapterIndex: string) => exec(sourceIndex, 'getChapter', bookIndex, chapterIndex),
}


init();

module.exports = {
	init,
	api,
	LIST: SOURCE_LIST,
	log: LOGGER_LIST,
}
