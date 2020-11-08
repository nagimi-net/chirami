import * as path from 'path';

const DIR = process.env.PORTABLE_EXECUTABLE_DIR || process.env.HOME;
const BASEDIR = path.join(DIR.trim(), 'chirami');

const defaultFilterOptions = {
	page: 1,
	limit: 50,
	query: '',
}

export {
	DIR, BASEDIR, defaultFilterOptions
}
