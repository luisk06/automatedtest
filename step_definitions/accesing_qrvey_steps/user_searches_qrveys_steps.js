'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var _title = 'How you do to going a school?',
		_title_not_macth = 'How to search a qrvey in the app?',
		max_total = 0;

	Given(/^the user has answer some qrveys$/, function(cb) {
		user.toDoLogin().then(function() {
			return user.createsWebform({ 'title': _title });
		}).then(function() {
			return user.createsMultiChoiceTypeQuestion(_title);
		}).then(function() {
			return user.createsMultiChoiceOptions();
		}).then(function() {
			return user.clicksOutside();
		}).then(function() {
			return user.activatesQrvey();
		}).then(function() {
			return user.findsUrlToTaker();
		}).then(function() {
			return user.openUrl();
		}).then(function() {
			skipSync(true);
			return user.takesQrveyShared();
		}).then(function() {
			return user.choicesAnswer('multiple');
		}).then(function() {
			return user.takerClicksOnOk();
		}).then(function() {
			return user.takerFinish(true);
		}).then(function() {
			skipSync(false);
			return user.toDoLogin().then(cb);
		});
	});

	When(/^the user clicks on taken qrveys button$/, function(cb) {
		user.goToTaken().then(cb);
	});

	When(/^the user inputs a query in the search field that matches with a taken qrvey$/, function(cb) {
		user.search(_title).then(function() {
			user.finds('.spec_search_input').getAttribute('value').then(function(_value) {
				expect(_value).to.be.equal(_title);
			}).then(cb);
		});
	});

	When(/^the user press enter button$/, function(cb) {
		user.actionSearch().then(function() {
			max_total = user.getsTotal('qrvey in taken_qrveys');
			expect(max_total).to.eventually.be.least(1);
		}).then(cb);
	});

	Then(/^only the qrveys that have in their title, description and responses, one or more words equal to the query should be displayed$/, function(cb) {
		user.getsTotal('qrvey in taken_qrveys').then(function() {
			return user.search(_title);
		}).then(function() {
			return user.actionSearch();
		}).then(function() {
			expect(max_total).to.eventually.be.least(1).and.notify(cb);
		});
	});

	When(/^the user inputs a query in the search field that don't matches with a taken qrvey$/, function(cb) {
		user.search(_title_not_macth);
		user.actionSearch();
		expect(user.getsTotal('qrvey in taken_qrveys')).to.eventually.be.equal(0).and.notify(cb);
	});

	Then(/^the Oops No qrveys to match your criteria message should be displayed$/, function(cb) {
		expect(user.getText('.spec-no-matches-result-search')).to.eventually.be.equal('Oops No qrveys to match your criteria').and.notify(cb);
	});
};
