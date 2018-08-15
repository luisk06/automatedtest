'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has a "([^"]*)" with registration questions$/, function(typeOfQrvey, cb) {
		us.isLogged().then(function(_userId) {
			qs.createQrvey(appID, _userId, typeOfQrvey, 'registration_questions', 'active').then(function(_data) {
				webpage.navTo('/application/' + appID + '/webforms');
				global.qrveyURL = _data.url;
			}).then(cb);
		});
	});

	When(/^the user take the "([^"]*)" with registration questions$/, function(typeOfQrvey, cb) {
		webpage.openUrl(global.qrveyURL);
		webpage.waitsFor('.spec-taker-qrvey');
		brw.ignoreSynchronization = true;

		if(typeOfQrvey == 'forms'){
			element(by.css('.spec-taker-qrvey')).click();
			element(by.css('.spec-taker-short-text-answers')).sendKeys('Carlos Vibanco');
			element(by.css('.spec-taker-onlineform-emailquestion-input')).sendKeys('carlos.vibanco@qrvey.com');
			element(by.css('.spec-taker-onlineform-numberquestion-input')).sendKeys('3219245134');
			element(by.css('.spec-user-response-ok')).click().then(cb);
		}else if(typeOfQrvey == 'questionnaire' || typeOfQrvey == 'survey'){
			element(by.css('.spec-taker-qrvey')).click();
			element(by.css('.spec-taker-short-text-answers')).sendKeys('Carlos Vibanco');
			element.all(by.css('.spec-user-response-ok')).get(0).click();
			element(by.css('.spec-taker-onlineform-emailquestion-input')).sendKeys('carlos.vibanco@qrvey.com');
			element.all(by.css('.spec-user-response-ok')).get(1).click();
			element(by.css('.spec-taker-onlineform-numberquestion-input')).sendKeys('3219245134');
			element.all(by.css('.spec-user-response-ok')).get(2).click().then(cb);
		}
	});

	When(/^the user add the tokens for the add contact action$/, function(cb) {
		element(by.css('.spec-automatiq-token-select-qrvey')).click().then(function(){
			element(by.css('.spec-automatiq-token-qrvey-option-1')).click().then(function(){

				element.all(by.css('.spec-automatiq-token-question-option-1')).get(0).click().then(function(){
					element(by.css('.spec-automatiq-token-label-input')).sendKeys('name').then(function(){
						element(by.css('.spec-automatiq-token-add-button')).click();
					});
				});

				element.all(by.css('.spec-automatiq-token-question-option-1')).get(1).click().then(function(){
					element(by.css('.spec-automatiq-token-label-input')).sendKeys('email').then(function(){
						element(by.css('.spec-automatiq-token-add-button')).click();
					});
				});

				element.all(by.css('.spec-automatiq-token-question-option-1')).get(2).click().then(function(){
					element(by.css('.spec-automatiq-token-label-input')).sendKeys('phone').then(function(){
						element(by.css('.spec-automatiq-token-add-button')).click().then(function(){
							element(by.css('.spec-close-modal')).click().then(cb);
						});
					});
				});
			});
		});
	});

	When(/^the user opens the addressbook$/, function(cb) {
		webpage.waits(10000).then(function(){
			element(by.css('.spec-dropdown-menu-main')).click().then(function(){
				element(by.css('.spec_address_book_button')).click().then(cb);
			});
		});
	});

	When(/^the user fills the fields for add contact$/, function(cb) {
		brw.ignoreSynchronization = false;
		element.all(by.css('.spec-form-add-contact input')).get(3).sendKeys('{{name}}').then(function(){
			element.all(by.css('.spec-form-add-contact input')).get(4).sendKeys('{{phone}}').then(function(){
				element.all(by.css('.spec-form-add-contact input')).get(5).sendKeys('{{email}}').then(cb);
			});
		});

	});

	Then(/^the contact was successful added$/, function(cb) {
		element(by.css('.spec-addressbook-mail')).getText().then(function(email){
			expect(email).to.be.equal('carlos.vibanco@qrvey.com');
		}).then(cb);
	});
};