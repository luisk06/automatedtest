'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has a webform app with a "([^"]*)" with all questions types with (\d+) responses$/, function (typeOfQrvey, num, cb) {
		us.isLogged().then(function (_userId) {
			apps.createNewApp('All Questions').then(function () {
				switch (typeOfQrvey) {
					case 'survey':
						mas.createAnswersForSurvey(_userId, num).then(function (data) {
							logger.log('qrveys.data', data);
							user.waits(5000);
						}).then(cb);
						break;
					case 'forms':
						mas.createAnswersForForms(_userId, num).then(function (data) {
							logger.log('qrveys.data', data);
							user.waits(5000);
						}).then(cb);
						break;
					case 'quiz':
						mas.createAnswersForQuiz(_userId, num).then(function (data) {
							logger.log('qrveys.data', data);
							user.waits(5000);
						}).then(cb);
						break;
				}

			});
		});
	});


};