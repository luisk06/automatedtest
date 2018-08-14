'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has not rules$/, function(cb) {
		cb();
	});

	When(/^the user go to text categorization dashboard$/, function(cb) {
		user.findsAll('.spec_text_categorization_button').first().click().then(cb);
	});

	When(/^the user clicks on Add Rule button$/, function(cb) {
		user.finds('#spec_new_page').click().then(cb);
	});

	When(/^the user type the name and description rule$/, function(cb) {
		webpage.waitsFor('.automatiq-modal');

		user.finds('.spec-input-new-process-name').sendKeys(rand.getSentence(5));
		user.finds('.spec-input-new-process-description').sendKeys(rand.getSentence(8)).then(cb);
	});

	When(/^the user clicks on Create Rule button$/, function(cb) {
		user.finds('.spec-button-create-process').click().then(cb);
	});

	When(/^the user opens the Category Block$/, function(cb) {
		user.findsAll('.rule-block').get(1).click().then(cb);
	});

	When(/^the user adds (\d+) new tag$/, function(num, cb) {
		if (num == 1) {
			user.finds('.tags .tags input.input').sendKeys(rand.getText(5)).then(cb);
		} else if (num > 1) {

			async.times(num, function(item, next) {
				user.finds('.tags .tags input.input').sendKeys(rand.getText(5));
				user.finds('.tags .tags input.input').sendKeys(protractor.Key.TAB).then(function(){ next(); });
			}, function() {
				cb();
			});

		}
	});

	When(/^the user adds (\d+) new include tag$/, function(num, cb) {
		if (num == 1) {
			user.finds('.include .tags input.input').sendKeys(rand.getText(5)).then(cb);
		} else if (num > 1) {
			async.times(num, function(item, next) {
				user.finds('.include .tags input.input').sendKeys(rand.getText(5));
				user.finds('.include .tags input.input').sendKeys(protractor.Key.TAB).then(function(){ next(); });
			}, function() {
				cb();
			});
		}
	});

	When(/^the user adds (\d+) new exclude tag$/, function(num, cb) {
		if (num == 1) {
			user.finds('.exclude .tags input.input').sendKeys(rand.getText(5)).then(cb);
		} else if (num > 1) {
			async.times(num, function(item, next) {
				user.finds('.exclude .tags input.input').sendKeys(rand.getText(5));
				user.finds('.exclude .tags input.input').sendKeys(protractor.Key.TAB).then(function(){ next(); });
			}, function() {
				cb();
			});
		}
	});

	When(/^the user go back to the dashboard$/, function(cb) {
		webpage.goBack(cb);
	});

	Then(/^in the dashboard should has (\d+) new rule$/, function(num, cb) {
		var count = element.all(by.repeater('rule in rules')).count();
		expect(count).to.eventually.be.equal(+num).and.notify(cb);
	});

	Then(/^the new rule should has (\d+) category$/, function(num, cb) {
		var count = element.all(by.css('.categories .cats span')).count();
		expect(count).to.eventually.be.equal(+num).and.notify(cb);
	});

	Then(/^the new rule should has (\d+) tag$/, function(num, cb) {
		var count = element.all(by.css('.categories .tags span')).count();
		expect(count).to.eventually.be.equal(+num).and.notify(cb);
	});
};
