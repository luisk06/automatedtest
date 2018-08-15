'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user have a qrvey created$/, function(cb) {
		maker.createsWebform().then(cb);
	});

	When(/^the user clicks on trigger select$/, function(cb){
		webpage.waits(2000).then(function() {
			maker.finds('.spec-selects-process').click();
			maker.finds('.spec-automatiq-select-type').click().then(cb);
		});
	});

	When(/^the user select webhook option$/, function(cb){
		maker.finds('.spec-automatiq-type-webhook').click().then(cb);
	});

	When(/^the user clicks on copy button to save url$/, function(cb){
		maker.finds('.spec_webhook_url_trigger').getAttribute('value').then(function(value){
			global.webhookURL = value;
			logger.log(global.webhookURL);
		}).then(cb);
	});

	When(/^the user clicks on type of qrvey select$/, function(cb){
		maker.finds('.spec-automatiq-select').click().then(cb);
	});

	When(/^the user put the webhook url$/, function(cb) {
		maker.finds('.spec_webhook_url_action').sendKeys(global.webhookURL).then(cb);
	});

	When(/^the user write "([^"]*)" as webhook url$/, function(url, cb) {
		maker.finds('.spec_webhook_url_action').sendKeys(url).then(cb);
	});

	When(/^the user clicks on Activate$/, function(cb) {
		webpage.waits(5000).then(function(){
			brw.executeScript('window.scrollTo(0,0);').then(function(){
				maker.finds('.spec-automation-btn-activate').click();

				webpage.isDisplayed('.workflow-notification-modal').then(function (isdisplayed) {
					expect(isdisplayed).to.be.false;
				}).then(cb);
			});
		});
	});
	When(/^the process is activated$/, function(cb) {
		webpage.waits(3000).then(function(){
			cb(); // Should be thus
		});
	});
};
