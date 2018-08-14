'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user have a "([^']*)" created$/, function(typeOfQrvey, cb) {
		var num = 3;

		us.isLogged().then(function(_userId) {
			if (typeOfQrvey == 'survey') {
				qs.createManyQrvey(_userId, 'survey', 'numeric', num).then(cb);
			} else if (typeOfQrvey == 'nps') {
				qs.createManyQrvey(_userId, 'nps', 'nps_with_textfield', num).then(cb);
			} else if (typeOfQrvey == 'checklist') cb();
			else throw new Error('Error in the params ' + typeOfQrvey);
		});
	});

	When(/^the user selects the king of new response as "([^']*)"$/, function(typeOfProcess, cb) {
		element.all(by.css('.automatiq-block-trigger')).get(0).click();
		element(by.css('.spec-automatiq-select')).click();
		element(by.css('.spec-select-option-' + typeOfProcess)).click().then(cb);
	});

	When(/^the user selects the kind of new response as "([^']*)"$/, function(typeOfProcess, cb) {
		user.finds('.spec-automatiq-select').click();
		user.finds('.spec-select-option-' + typeOfProcess).click().then(cb);
	});

	When(/^the user selects the qrvey (\d+) of the list of "([^']*)"$/, function(numElement, typeOfProcess, cb) {
		if (numElement == 0) throw new Error('The index should be most of 0');

		typeOfProcess = (typeOfProcess == 'forms')? 'form' : typeOfProcess;

		var _el = element(by.css('.spec-automatiq-open-list-' + typeOfProcess)),
			_el2 = element.all(by.css('.spec-automatiq-open-list-' + typeOfProcess + ' .spec-automatiq-list-items li'));

		_el.click();
		_el2.count().then(function(_count) {
			if (_count == 0) throw new Error('The list doesnt have items for clicks');
			else _el2.get(numElement).click().then(cb);
		});
	});

	When(/^the user write the data value$/, function (cb) {
		user.finds('.spec-automatiq-answer-field').sendKeys('Barranquilla').then(cb);
	});

	When(/^the user select a sentiment of type "([^']*)"$/, function(typeOfSentiment, cb) {
		var pos;
		if(typeOfSentiment == 'positive') pos = 1;
		else if(typeOfSentiment == 'neutral') pos = 2;
		else if(typeOfSentiment == 'negative') pos = 3;

		user.finds('.spec-automatiq-sentiment-field').click();
		user.findsAll('.spec-automatiq-sentiment-field li').get(pos).click().then(cb);
	});

	Then(/^the user go to back the "([^']*)" dashabord$/, function(dashboard, cb) {
		if (dashboard == 'qrvey') {
			expect(user.whereIAm()).to.eventually.be.equal('/').and.notify(cb);
		} else if (dashboard == 'automation') {
			expect(user.whereIAm()).to.eventually.be.contain('automation').and.notify(cb);
		}
	});
};