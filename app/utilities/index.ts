import * as fs from 'fs';
import { BASEDIR } from '../constants';

function appDirectory() {
	if (!fs.existsSync(BASEDIR)) {
		fs.mkdirSync(BASEDIR);
	}

	return BASEDIR;
}

export {
	appDirectory
}
