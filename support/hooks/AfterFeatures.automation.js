'use strict';

module.exports = function() {
	var registerHandler = this.registerHandler;
	var _dir = 'scenarios.txt';
	var fs = require('fs');

	// registerHandler('StepResult', function(event, cb) {
	// 	logger.log('===============================================');
	// 	logger.log('==================StepResult===================');

	// 	console.log('Status', event.getStatus());

	// 	if (event.getStatus() != 'passed') {
	// 		console.log('is failure');
	// 		cb();
	// 	} else {
	// 		console.log('is good');
	// 		cb();
	// 	}

	// 	console.log('event', event);
	// 	console.log('hasAttachments', event.hasAttachments());

	// 	takeScreenshot(event, cb);

	// 	logger.log('===============================================');
	// 	cb();
	// });

	// function takeScreenshot(scenario, callback) {
	// 	brw.takeScreenshot().then(function (png) {
	// 		scenario.attach(new Buffer(png, 'base64'), 'image/png');

	// 		allure.createAttachment('Screenshot', function () {
	// 			return new Buffer(png, 'base64');
	// 		}, 'image/png')();

	// 		callback();
	// 	});
	// }

	registerHandler('AfterScenario', function(event, cb) {
		logger.log('email used in the scenario: ' + user.validUser());
		logger.log('finished running scenario ' + (nameOfScenarios.length + 1));
		logger.log('-----------------------------------------------');
		skipSync(false);
		cb();
	});

	registerHandler('BeforeScenario', function(event, cb) {
		skipSync(false);
		hasAnswers = true;
		nameOfScenarios.push('\'scenario' + (nameOfScenarios.length + 1) + '\': \'' + event.getName() + '\'');

		// us.isLogged().then(function() {
		var newUsername = 'testingqrvey+' + randomId() + '@gmail.com';
		configer.set('username', newUsername);

		us.getting({ 'automation': true }).then(function (userInfo) {
			// console.log('userInfo', userInfo);

			user.setSetting('validUser', newUsername);
		}).then(cb);
		// });
	});

	registerHandler('AfterFeatures', function(event, cb) {
		logger.debug('finished running the features');
		logger.debug('---------------+++++++++++++++++---------------');
		skipSync(false);

		fs.writeFile(_dir, JSON.parse(JSON.stringify(nameOfScenarios)), function (err) {
			if (err) return console.log(err);
			console.log('The file was saved!');
		});

		cb();
	});
};