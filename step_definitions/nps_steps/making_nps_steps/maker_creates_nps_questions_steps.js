'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user do clicks on Create New$/, function(cb) {
		user.finds('.spec_dashboard_create_new_button').click().then(cb);
	});

	When(/^the user writes the "([^"]*)" as "([^"]*)" in "([^"]*)" type of qrvey$/, function(context, field, typeQrvey, cb) {
		maker.fillQrveyNameOrDescription(context, field, typeQrvey).then(function(){
			cb();
		});
	});

	When(/^the user clicks Create Quick "([^"]*)" button$/, function(type, cb) {
		user.finds('.spec-button-create-' + type.toLowerCase()).click().then(cb);
	});

	When(/^the user writes the "([^"]*)" of your own enterprise$/, function(context, cb) {
		user.finds('.spec-nps-title-question-input').clear().sendKeys(context).then(cb);
	});

	When(/^the user writes "([^"]*)" on enterprise input$/, function(context, cb) {
		// element(by.css('.spec-nps-title-question')).click().then(function(){
		element(by.css('.spec-nps-title-question-input')).clear().sendKeys(context).then(cb);
		// });
	});

	When(/^the user writes "([^"]*)" in the text field question$/, function(context, cb) {
		element.all(by.css('.spec_edit_question_overlay')).get(1).click().then(function(){
			element(by.css('.spec-nps-title-textfield-question-input')).clear().sendKeys(context).then(cb);
		});
	});

	When(/^the user deletes the textfield question$/, function(cb) {
		scrollToBottom();
		user.finds('.spec-dropdown-0').click();
		browser.executeScript('arguments[0].click()',element(by.css('#spec_remove_question'))).then(cb);
	});

	When(/^the user click on Add text field question$/, function(cb) {
		element.all(by.css('.spec-design-add-state')).last().click().then(function(){
			user.finds('.spec-design-add-text').click();
		}).then(cb);
	});

	Then(/^the textfield question should be displayed$/, function(cb) {
		user.waits(1500);
		element.all(by.css('app-question')).get(1).isDisplayed().then(function(_isDisplays) {
			expect(_isDisplays).to.be.true;
		}).then(cb);
	});

	Then(/^the add textfield question button should be displayed$/, function(cb) {
		user.waits(100);
		element.all(by.css('.spec-design-add-state')).last().click().then(function(){
			expect(element(by.css('.spec-design-add-text')).isPresent()).to.eventually.be.true.and.notify(cb);
		});
	});

	Then(/^the "([^"]*)" text should display "([^"]*)" in the qrvey$/, function(arg1, arg2, cb) {
		var _text = arg2;

		webpage.getsTextExists(_text).then(function(_exist) {
			expect(_exist).to.be.true;
		}).then(cb);
	});

	// When(/^the user open the "([^"]*)" question$/, function (cb) {
	// 	browser.explore();
	// 	element.all(by.css('.spec_edit_question_overlay')).get(1).click().then(cb);
	// });

	Then(/^the question is saved$/, function(cb) {
		//Todo: reinforce checking the question name is present in the page
		/*        var isClickable = EC.presenceOf(element(by.repeater('question in qrveyObject')));
				brw.wait(isClickable, 5000, err.missingQuestion);
				expect(element(by.repeater('question in qrveyObject').count())).to.eventually.be.above(0).and.notify(cb);*/
		// cb(null, 'pending');
		cb();
	});

	Then(/^the "([^"]*)" as text should be displayed in the "([^"]*)" by "([^"]*)"$/, function(textToValidate, field, typeOfQrvey, cb) {
		var _class = '.spec-create-' + typeOfQrvey + '-valid-enter-' + field,
			_el = user.finds(_class);

		_el.isDisplayed().then(function(_displayed) {
			expect(_displayed, err.isNotDisplayed(_class, _displayed)).to.be.true;
		});

		_el.getAttribute('innerHTML').then(function(_text) {
			expect(_text, err.unmatchingText(_text, textToValidate)).to.be.equal(textToValidate);
		}).then(cb);
	});
};
