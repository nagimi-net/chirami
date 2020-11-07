import * as path from 'path';
import * as fs from 'fs';
import { appDirectory } from '../utilities';

module.exports = {
	initSettings: () => {
		var settings = {
			data: 'Hello World',
			uwufication: false
		}

		const dir = appDirectory();
		const __settings = path.join(dir, 'user-settings.json');

		if (fs.existsSync(__settings)) {
			var file = fs.readFileSync(__settings, { encoding: 'utf8' });

			var result = JSON.parse(file);
			settings = {
				...settings,
				...result,
			}
			console.log('setting found, read settings: ', settings)
		}
		else {
			fs.writeFileSync(__settings, JSON.stringify(settings, null, '  '), { encoding: 'utf8' });
			console.log('init settings: ', settings);
		}

		return settings;

	}
}
