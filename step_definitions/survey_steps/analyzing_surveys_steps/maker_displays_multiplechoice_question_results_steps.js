'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that there is a webform app with a "([^"]*)" with a "([^"]*)" question that has (\d+) answers$/, function(typeOfQrvey, typeOfQuestion, num, cb) {
		us.isLogged().then(function(_userId) {
			apps.createNewApp('Test ' + typeOfQrvey + ' ' + typeOfQuestion).then(function(appData){
				appID = appData.appid;
				as.createAnswers(_userId, typeOfQrvey, typeOfQuestion, num).then(function(_data) {
					logger.log('qrveys.data', _data);
					webpage.waits(5000);
				}).then(cb);
			});
		});
	});

	When(/^the user clicks on "([^"]*)" as they multiple choice answer$/, function(arg1, cb) {
		var x = null;

		if (arg1.localeCompare('Jon Snow') === 0) x = 0;
		else if (arg1.localeCompare('Tyrion Lannister') === 0) x = 0;
		else if (arg1.localeCompare('Daenerys Targaryen') === 0) x = 3;
		else if (arg1.localeCompare('Arya Stark') === 0) x = 4;
		else x = 4;

		element.all(by.css('analytiq-chart svg g')).get(x).getText();
		element.all(by.css('analytiq-chart svg g text')).get(x).click().then(cb);
	});

	Then(/^the "([^"]*)" multiple choice answer filter should appear in the histogram filters$/, function(arg1, cb) {
		var answer = arg1.replace('"', '').replace('"', '');
		logger.log('answer:', answer);
		element.all(by.css('.spec-analize-filters-list li .value-filter-bar')).get(0).getText().then(function(res) {
			logger.log('Name', res);
			expect(res, err.expressionFilter(answer, res)).to.contain(answer);
		}).then(cb);
	});

	When(/^the user clicks on the "([^"]*)" filter as text$/, function(arg1, cb) {
		var el = '.spec-filter-container g[data-id="' + arg1 + '"]';

		webpage.waitsFor(el);
		maker.finds(el).click().then(cb);
	});

	When(/^the user clicks on the "([^"]*)" filter as toggle$/, function(arg1, cb) {
		var el = '.spec-filter-container toggle[data-id="' + arg1 + '"] i.circle';

		webpage.waitsFor(el);
		maker.finds(el).click().then(cb);
	});
};
