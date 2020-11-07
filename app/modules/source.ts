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

function save(id: string, data: string) {
	try {
		const dir = path.join(BASEDIR, 'sources', id + '.js');
		if (fs.existsSync(dir)) {
			fs.unlinkSync(dir);
		}
		fs.writeFileSync(dir, data, { encoding: 'utf8' });

		return true;
	}
	catch (e) {
		console.error('error to save source id : ' + id, e);
		return false;
	}
}

async function exec(sourceId: string, funcName: string, ...args: any) {
	if (!SOURCE[sourceId]) {
		throw new Error("missing source \"" + sourceId + "\". is source has initialized?");
	}
	return SOURCE[sourceId][funcName](...args);
}

const api = {
	getUpdates: (sourceIndex: string) => exec(sourceIndex, 'getUpdates'),
	getDirectory: (sourceIndex: string) => exec(sourceIndex, 'getDirectory'),
	search: (sourceIndex: string) => exec(sourceIndex, 'search'),
	getBook: (sourceIndex: string, bookIndex: string) => exec(sourceIndex, 'getBook', bookIndex),
	getChapter: (sourceIndex: string, bookIndex: string, chapterIndex: string) => exec(sourceIndex, 'getChapter', bookIndex, chapterIndex),
}


init();

module.exports = {
	init,
	save,
	exec,
	api,
	LIST: SOURCE_LIST,
}
