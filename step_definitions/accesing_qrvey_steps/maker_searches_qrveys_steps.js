'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var _title = 'How you do to going a school?',
		_title_not_macth = 'How to search a qrvey in the app?',
		max_total = 0;

	Given(/^the user has answer some qrveys$/, function(cb) {
		maker.toDoLogin().then(function() {
			return maker.createsWebform({ 'title': _title });
		}).then(function() {
			return maker.createsMultiChoiceTypeQuestion(_title);
		}).then(function() {
			return maker.createsListOptions('multichoice');
		}).then(function() {
			return maker.clicksOutside();
		}).then(function() {
			return maker.activatesQrvey();
		}).then(function() {
			return maker.findsUrlToTaker();
		}).then(function() {
			return webpage.openUrl('/');
		}).then(function() {
			skipSync(true);
			return taker.takesQrveyShared();
		}).then(function() {
			return taker.choicesAnswer('multiple');
		}).then(function() {
			return taker.clicksOnOk();
		}).then(function() {
			return taker.finish(true);
		}).then(function() {
			skipSync(false);
			return maker.toDoLogin().then(cb);
		});
	});

	When(/^the user clicks on taken qrveys button$/, function(cb) {
		maker.goToTaken().then(cb);
	});

	When(/^the user inputs a query in the search field that matches with a taken qrvey$/, function(cb) {
		maker.search(_title).then(function() {
			maker.finds('.spec_search_input').getAttribute('value').then(function(_value) {
				expect(_value).to.be.equal(_title);
			}).then(cb);
		});
	});

	When(/^the user press enter button$/, function(cb) {
		maker.actionSearch().then(function() {
			max_total = maker.getsTotal('qrvey in taken_qrveys');
			expect(max_total).to.eventually.be.least(1);
		}).then(cb);
	});

	Then(/^only the qrveys that have in their title, description and responses, one or more words equal to the query should be displayed$/, function(cb) {
		maker.getsTotal('qrvey in taken_qrveys').then(function() {
			return maker.search(_title);
		}).then(function() {
			return maker.actionSearch();
		}).then(function() {
			expect(max_total).to.eventually.be.least(1).and.notify(cb);
		});
	});

	When(/^the user inputs a query in the search field that don't matches with a taken qrvey$/, function(cb) {
		maker.search(_title_not_macth);
		maker.actionSearch();
		expect(maker.getsTotal('qrvey in taken_qrveys')).to.eventually.be.equal(0).and.notify(cb);
	});

	Then(/^the Oops No qrveys to match your criteria message should be displayed$/, function(cb) {
		expect(maker.getText('.spec-no-matches-result-search')).to.eventually.be.equal('Oops No qrveys to match your criteria').and.notify(cb);
	});
};
