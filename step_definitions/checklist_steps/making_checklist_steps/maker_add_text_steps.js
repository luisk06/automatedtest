module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user add a text$/, function(cb) {
		var addButton = by.css('.spec-design-add-state'),
			addSection = by.css('.spec_checklist_add_text');

		element(addButton).click().then(function() {
			element(addSection).click().then(cb);
		});
	});

	When(/^the user fills text body$/, function(cb) {
		var sampleText = 'Sample text';
		element(by.css('.spec-checklist-enter-text')).sendKeys(sampleText).then(cb);
	});

	Then(/^the text is saved$/, function(cb) {
		user.waits(800);
		var section = by.css('.spec_checklist_text_container');
		element(section).isDisplayed().then(function(_isDisplays) {
			expect(_isDisplays).to.be.true;
		}).then(cb);
	});

	Then(/^delete link should be visible$/, function(cb) {
		var deleteLink = by.css('.spec_checklist_delete_text');
		element(deleteLink).isDisplayed().then(function(_isDisplays) {
			expect(_isDisplays).to.be.true;
		}).then(cb);
	});
};