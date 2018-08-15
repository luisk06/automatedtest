'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has a "([^"]*)" with "([^"]*)" question for delete contact$/, function(typeOfQrvey, typeOfQuestion, cb) {
		us.isLogged().then(function(_userId) {
			qs.createQrvey(appID, _userId, typeOfQrvey, typeOfQuestion, 'active').then(function(_data) {
				webpage.navTo('/application/' + appID + '/webforms');
				global.qrveyURL = _data.url;
			}).then(cb);
		});
	});

	When(/^the user add the tokens for the delete contact action$/, function(cb) {
		element(by.css('.spec-automatiq-token-select-qrvey')).click();
		element(by.css('.spec-automatiq-token-qrvey-option-1')).click();
		element.all(by.css('.spec-automatiq-token-question-option-1')).get(0).click();
		element(by.css('.spec-automatiq-token-label-input')).sendKeys('email');
		element(by.css('.spec-automatiq-token-add-button')).click();
		element(by.css('.spec-close-modal')).click().then(cb);
	});

	When(/^the user fills the fields for delete contact$/, function(cb) {
		brw.ignoreSynchronization = false;
		element.all(by.css('.spec-form-delete-contact input')).get(1).sendKeys('{{email}}').then(cb);
	});

	When(/^the user take the "([^"]*)" for delete contact$/, function(typeOfQrvey, cb) {
		webpage.openUrl(global.qrveyURL);
		webpage.waitsFor('.spec-taker-qrvey');
		brw.ignoreSynchronization = true;

		if(typeOfQrvey == 'forms'){
			element(by.css('.spec-taker-qrvey')).click().then(function(){
				element(by.css('.spec-taker-onlineform-emailquestion-input')).sendKeys('carlosv4150@qrvey.com').then(function(){
					element(by.css('.spec-user-response-ok')).click().then(cb);
				});
			});
		}else if(typeOfQrvey == 'questionnaire' || typeOfQrvey == 'survey'){
			element(by.css('.spec-taker-qrvey')).click().then(function(){
				element(by.css('.spec-taker-onlineform-emailquestion-input')).sendKeys('carlosv4150@qrvey.com').then(function(){
					element.all(by.css('.spec-user-response-ok')).get(0).click().then(cb);
				});
			});
		}
	});

	Then(/^the contact was successfully deleted$/, function(cb) {
		element(by.css('.spec-addressbook-mail')).getText().then(function(email){
			expect(email).to.be.equal('carlosv4150@qrvey.com');
		}).then(cb);
	});
};