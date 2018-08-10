'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user opens the email templates modal$/, function(cb) {
		element(by.css('.spec_new_app_setup_open_templates')).click().then(cb);
	});

	When(/^the user clicks on create template$/, function(cb) {
		element(by.css('.spec_create_new_template')).click().then(cb);
	});

	When(/^the user write the template name as "([^"]*)"$/, function(name, cb) {
		element(by.css('.spec-template-name')).clear().sendKeys(name).then(cb);
	});

	When(/^the user mark the template as default$/, function(cb) {
		element(by.css('.checkbox-success label')).click().then(cb);
	});

	When(/^the user clicks the save button$/, function(cb) {
		brw.switchTo().defaultContent();
		element(by.css('.spec-save-template')).click().then(cb);
	});

	Then(/^the template was created$/, function(cb) {
		user.waits(3000);
		element.all(by.css('.template-box .content p')).get(1).getText().then(function(name){
			expect(name).to.be.equal('TN');
		}).then(cb);
	});

	Then(/^the template is the default template$/, function(cb) {
		user.waits(1000);
		element.all(by.css('.template .label span')).get(0).getText().then(function(_default){
			expect(_default).to.be.equal('(Default)');
		}).then(cb);
	});
};
