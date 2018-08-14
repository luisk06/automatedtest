'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user have a qrvey created$/, function(cb) {
		user.createsWebform().then(cb);
	});

	When(/^the user clicks on trigger select$/, function(cb){
		user.waits(2000).then(function() {
			user.finds('.spec-selects-process').click();
			user.finds('.spec-automatiq-select-type').click().then(cb);
		});
	});

	When(/^the user select webhook option$/, function(cb){
		user.finds('.spec-automatiq-type-webhook').click().then(cb);
	});

	When(/^the user clicks on copy button to save url$/, function(cb){
		user.finds('.spec_webhook_url_trigger').getAttribute('value').then(function(value){
			global.webhookURL = value;
			logger.log(global.webhookURL);
		}).then(cb);
	});

	When(/^the user clicks on type of qrvey select$/, function(cb){
		user.finds('.spec-automatiq-select').click().then(cb);
	});

	When(/^the user put the webhook url$/, function(cb) {
		user.finds('.spec_webhook_url_action').sendKeys(global.webhookURL).then(cb);
	});

	When(/^the user write "([^"]*)" as webhook url$/, function(url, cb) {
		user.finds('.spec_webhook_url_action').sendKeys(url).then(cb);
	});

	When(/^the user clicks on Activate$/, function(cb) {
		user.waits(5000).then(function(){
			brw.executeScript('window.scrollTo(0,0);').then(function(){
				user.finds('.spec-automation-btn-activate').click();

				user.isDisplayed('.workflow-notification-modal').then(function (isdisplayed) {
					expect(isdisplayed).to.be.false;
				}).then(cb);
			});
		});
	});
	When(/^the process is activated$/, function(cb) {
		user.waits(3000).then(function(){
			cb(); // Should be thus
		});
	});
};
