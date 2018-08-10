'use strict';

module.exports = function TakeScreenshot() {

	// this.afterEach(function (step, callback) {
	// 	if (step.isFailed()) {
	// 		console.log('is failure');
	// 		callback();
	// 	} else {
	// 		console.log('is good');
	// 		callback();
	// 	}
	// });

	this.After(function(scenario, callback) {
		if (env != 'browserstack' && scenario.isFailed()) takeScreenshot(scenario, callback);
		else takeScreenshot(scenario, callback);

		scenario.attach(user.validUser());
	});
};

function takeScreenshot(scenario, callback){
	brw.takeScreenshot().then(function (png) {
		// browser.executeScript("document.body.style.zoom='100%';");
		// var decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64').toString('binary');
		// var decodedImage = new Buffer(png, 'base64');

		scenario.attach(new Buffer(png, 'base64'), 'image/png');

		allure.createAttachment('Screenshot', function () {
			return new Buffer(png, 'base64');
		}, 'image/png')();

		callback();
	});
}