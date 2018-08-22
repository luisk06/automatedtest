'use strict';

module.exports = function JsonOutputHook() {
	try {

		var getPath = function (folder) {
			return path.resolve(__dirname, './../../reports/' + folder + '/');
		};

		var Cucumber = require('cucumber'),
			fs = require('fs'),
			path = require('path'),
			JsonFormatter = Cucumber.Listener.JsonFormatter(),
			today = new Date(),
			_name = '',
			outputDirXml = getPath('xml'),
			outputDirJson = getPath('json'),
			outputDirCustom = getPath('custom'),
			outputDirGeneral = getPath('general'),
			outputDirHtml = getPath('html'),
			timeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '-' + today.getHours() + 'h-' + today.getMinutes() + 'm';

		JsonFormatter.log = function(json) {

			if (JSON.parse(json).length != 0){
				runAnyTest = true;

				brw.getCapabilities().then(function(cap) {
					_name = cap.get('browserName');
					validFolder(outputDirXml); // For allure's reports
					validFolder(outputDirJson);
					validFolder(outputDirCustom);
					validFolder(outputDirGeneral);
					validFolder(outputDirHtml);

					// removeReports();

					logger.log(path.resolve(outputDirHtml, _name + '_' + timeStamp + '.html'));
					var targetJson = outputDirJson + '/' + _name + '_' + timeStamp + '.json';

					fs.writeFile(outputDirCustom + '/' + _name + '.json', json, function(err) {
						if(err) throw new Error(err);
					});

					if (typeof process.env.JOB_NAME !== 'undefined'){

						console.log('customName:', process.env.JOB_NAME.toLowerCase());

						fs.writeFile(outputDirGeneral + '/' + process.env.JOB_NAME.toLowerCase() + '.json', json, function(err) {
							if(err) throw new Error(err);
						});
					}

					fs.writeFile(targetJson, json, function(err) {
						if(err) throw new Error(err);

						var CucumberHtmlReport = require('cucumber-html-reporter'),
							options = {
								theme: 'bootstrap',
								jsonFile: targetJson,
								output: path.resolve(outputDirHtml, _name + '_' + timeStamp + '.html'),
								reportSuiteAsScenarios: true,
								launchReport: true
							};

						CucumberHtmlReport.generate(options);
					});
				});
			}

		};

		this.registerListener(JsonFormatter);

		this.registerHandler('AfterFeatures', function(event, callback) {
			callback();
		});

		var validFolder = function(_dir) {
			if (!fs.existsSync(_dir)) {
				fs.mkdirSync(_dir);
			}
		};

		// var removeReports = function() {
		// 	var files = find.fileSync(/\.html/, outputDirHtml);
		// 	files.map(function(file) {
		// 		fs.unlinkSync(file);
		// 	});
		// };
	}catch(e){
		if (e) throw new Error(e);
	}
};
