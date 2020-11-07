import * as path from 'path';

const DIR = process.env.PORTABLE_EXECUTABLE_DIR || process.env.HOME;
const BASEDIR = path.join(DIR.trim(), 'chirami');

export {
	DIR, BASEDIR
}
