try {
	var reporter = require('cucumberjs-allure-reporter');

	reporter.config({
		'targetDir': './reports/xml',
		'labels': {
			feature: [/taking/, /making/, /analyzing/, /nps/, /polls/, /accessing/, /editing/],
			issue: [/date/]
		}
	});

	module.exports = reporter;
} catch (err) {
	if (err) throw new Error(err);
}
