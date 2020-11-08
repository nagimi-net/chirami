import * as path from 'path';
import * as fs from 'fs';
import { BASEDIR } from '../constants';

let SOURCE: any = {};
let SOURCE_LIST: any[] = [];

function init () {
	const dir = path.join(BASEDIR, 'sources');
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	try {
		fs.readdirSync(dir).forEach(e => {
			try {
				const module = require(path.join(dir, e));
				const instance = new module();

				var name = e.split('.');
				if (name.length === 3) {
					var prefix = e.split('.').shift();
					try {
						instance.__options.label = [prefix, ...instance.__options.label];
					} catch(e) {}
				}

				SOURCE[instance.__options.id] = instance;
				SOURCE_LIST.push({ ...instance.__options });
			}
			catch (ex) {
				console.error('module error : ', ex);
			}
		});
	}
	catch (e) { }
}

async function exec(sourceId: string, funcName: string, ...args: any) {
	if (!SOURCE[sourceId]) {
		throw new Error("missing source \"" + sourceId + "\". is source has initialized?");
	}
	return SOURCE[sourceId][funcName](...args);
}

const api = {
	getDirectory: (sourceIndex: string, filterOptions: any) => exec(sourceIndex, 'getDirectory', filterOptions),
	getBook: (sourceIndex: string, bookIndex: string) => exec(sourceIndex, 'getBook', bookIndex),
	getChapter: (sourceIndex: string, bookIndex: string, chapterIndex: string) => exec(sourceIndex, 'getChapter', bookIndex, chapterIndex),
}


init();

module.exports = {
	init,
	api,
	LIST: SOURCE_LIST,
}
