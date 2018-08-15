'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^writes a tag for the question$/, function(cb) {
		user.finds('.spec-add-tags-question').click().then(function() {
			navigate.sendKeys('.spec-add-name-tag', 'Awesometacular').then(cb);
		});
	});

	Then(/^the tag should be displayed in the question$/, function(cb) {
		expect(qrvey.checkQrveyPresence('#Awesometacular')).to.eventually.be.true.and.notify(cb);
	});

	When(/^activates the Tags option$/, function(cb) {
		user.finds('.spec-add-tags-question').click().then(cb);
	});
};
