'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selects "([^"]*)" answers in "([^"]*)"$/, function(optionAnswers, typeOfQrvey, cb) {
		var idx = 0;

		if (typeOfQrvey == 'incontext') {
			brw.ignoreSynchronization = true;

			idx = (optionAnswers == 'yes') ? 0 : 1;
			element.all(by.css('.mc-listing a')).get(idx).click().then(cb);
		} else if (typeOfQrvey == 'progressive') {
			brw.ignoreSynchronization = true;

			idx = (optionAnswers == 'yes') ? 0 : 1;
			element.all(by.css('.mc-listing.yes-no a')).get(idx).click().then(cb);
		}
	});
};
