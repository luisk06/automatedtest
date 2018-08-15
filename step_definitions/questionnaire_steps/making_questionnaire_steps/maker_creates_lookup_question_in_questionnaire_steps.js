'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var spreadsheetURL = 'https://docs.google.com/spreadsheets/d/1xLNeEmGKg6j9bM8UbXzihb5ATt-wZVNGjNkob68x1Ro/edit?usp=sharing';
	var weebHookURL = 'https://jsonplaceholder.typicode.com/users';

	Given(/^the user has an old form$/, function(cb) {
		us.isLogged().then(function(_userId) {
			qs.createQrvey(appID, _userId, 'form', 'name').then(function(data) {
				logger.log('data', data);
			}).then(cb);
		});
	});

	When(/^the user selects "([^"]*)" like an app type from the dropdown$/, function(qrveyAppType, cb) {
		user.finds('.spec-lookup-dropdown-qrvey-app-select').click();
		user.finds('.spec-lookup-dropdown-qrvey-app-selected-' + qrveyAppType).click().then(cb);
	});

	When(/^the user clicks on the Edit button for modify the lookup rows$/, function(cb) {
		user.finds('.spec-lookup-edit-btn').click().then(cb);
	});

	When(/^the user selects the form from the dropdown$/, function(cb) {
		webpage.waitsFor('.modal-dialog');
		user.finds('.automatiq-select').click();

		webpage.waitsFor('.scroll-select');
		user.finds('.scroll-select .select-search input').sendKeys('qrvey');
		user.findsAll('.scroll-select li:not(.select-search)').first().click().then(cb);
	});

	When(/^the user selects the columm to show$/, function(cb) {
		user.finds('.spec-google-display-column-dropdown').click();
		user.finds('.spec-google-display-column-dropdown + .options span').click().then(cb);
	});

	When(/^the user selects the value to show$/, function(cb) {
		element.all(by.cssContainingText('span', 'Select Option')).first().click();
		element.all(by.cssContainingText('span', '(No Value)')).first().click().then(cb);
	});

	When(/^the user clicks on the Save button$/, function(cb) {
		element(by.linkText('Save')).click().then(cb);
	});

	When(/^the user selects "([^"]*)" from lookup dropdown$/, function(lookUpType, cb) {
		element(by.css('.spec-lookup-dropdown')).click().then(function() {
			webpage.waitsFor('.spec-lookup-' + lookUpType + '-option').then(function() {
				element(by.css('.spec-lookup-' + lookUpType + '-option')).click();
			});
		}).then(cb);
	});

	When(/^the user fills "([^"]*)" as question title$/, function(title, cb) {
		element(by.css('.spec-edit-question-name-any')).sendKeys(title).then(cb);
	});

	When(/^the user fills google-sheet url$/, function(cb) {
		element(by.css('.spec-google-url-input')).sendKeys(spreadsheetURL).then(cb);
	});

	When(/^the user fills webhook url$/, function(cb) {
		element(by.css('.spec-webhook-url-input')).sendKeys(weebHookURL).then(cb);
	});

	When(/^the user clicks on select entries$/, function(cb) {
		element(by.css('.spec-google-select-entries-button')).click().then(function() {
			webpage.waits(600);
		}).then(cb);
	});

	When(/^the user clicks on test$/, function(cb) {
		element(by.css('.spec-webhook-test-button')).click().then(function() {
			webpage.waits(600);
		}).then(cb);
	});

	When(/^the user fills the lookup copy paste options$/, function(cb) {
		element.all(by.css('.spec-lookup-row-container')).each(function(row, index) {
			row.element(by.css('.spec-lookup-display-input')).sendKeys('Option ' + (index + 1)).then(function() {
				row.element(by.css('.spec-lookup-value-input')).sendKeys('Value ' + (index + 1));
			});
		}).then(cb);
	});

	When(/^the user fills google-sheet modal options$/, function(cb) {
		element(by.css('.spec-google-sheet-select')).click().then(function() {
			element(by.css('.spec-google-sheet-option-1')).click().then(function() {
				element(by.css('.spec-google-display-column-dropdown')).click().then(function() {
					element(by.css('.spec-google-display-column-1')).click().then(function() {
						element(by.css('.spec-google-value-column-dropdown')).click().then(function() {
							element(by.css('.spec-google-value-column-2')).click().then(cb);
						});
					});
				});
			});
		});
	});

	When(/^the user fills webhook options$/, function(cb) {
		element(by.css('.spec-webhook-display-column-dropdown')).click().then(function() {
			element(by.css('.spec-webhook-display-column-2')).click().then(function() {
				element(by.css('.spec-webhook-value-column-dropdown')).click().then(function() {
					element(by.css('.spec-webhook-value-column-4')).click().then(cb);
				});
			});
		});
	});

	Then(/^the question should be saved$/, function(cb) {
		var el = element(by.css('.spec-question-container-1 .title-error')).isPresent();
		expect(el).to.eventually.be.false.and.notify(cb);
	});

	Then(/^the numbers of rows should be (\d+)$/, function(num, cb) {
		webpage.waits(1500);
		element.all(by.css('.spec-lookup-row-container')).count().then(function(_value) {
			expect(_value).to.be.equal(parseInt(num));
		}).then(cb);
	});

	Then(/^any of the cells should be empty$/, function(cb) {
		element.all(by.css('.spec-lookup-row-container')).each(function(row) {
			row.element(by.css('.spec-lookup-display-no-input')).getAttribute('innerHTML').then(function(_innerH){
				expect(_innerH).to.be.not.equal('');

			});
			row.element(by.css('.spec-lookup-value-no-input')).getAttribute('innerHTML').then(function(_innerHtml){
				expect(_innerHtml).to.be.not.equal('');
			});

		}).then(cb);
	});
};
