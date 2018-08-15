module.exports = function() {

	var Given = Given,
		When = this.When,
		Then = this.Then;

	When(/^the user leave the "([^"]*)" input empty$/, function(inputName, cb) {
		var emptySpace = ' ';
		element(by.name(inputName)).sendKeys(emptySpace).then(cb);
	});

	When(/^the user clicks Create "([^"]*)" button$/, function(type, cb) {
		user.finds('.spec-button-create-'+type.toLowerCase()).click().then(cb);
		brw.sleep(2000);
	});

	Then(/^An alert with text "([^"]*)" should appear below "([^"]*)" input$/, function(_alertText, _input, cb) {
		var _element = user.finds('span#enter-' + _input.toLowerCase() + '-checklist');
		_element.isDisplayed().then(function(_isDisplays) {
			expect(_isDisplays).to.be.true;
		});

		_element.getText().then(function(_actualAlertText) {
			expect(_actualAlertText).to.equal(_alertText);
		}).then(cb);
	});

	Then(/^The "([^"]*)" and "([^"]*)" should appear on survey tittle$/, function(_name, _description, cb) {
		webpage.waits(2000).then(function(){
			element(by.css('.spec-tab-to-desing')).click();
		});

		webpage.waitsFor('.checklist-saved');

		var _elementTitle = user.finds('.checklist-saved');
		_elementTitle.getText().then(function(_actualTitleText) {
			expect(_actualTitleText).to.contain(_name);
			//expect(_actualTitleText).to.contain(_description);
		}).then(cb);
	});
};