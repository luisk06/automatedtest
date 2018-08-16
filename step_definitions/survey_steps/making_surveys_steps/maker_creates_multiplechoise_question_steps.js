'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user selects "([^"]*)" question type from the dropdown$/, function(typeOfQuestion, cb) {
		maker.selectQuestionFromDropdown(typeOfQuestion).then(function(){
			cb();
		});
	});

	When(/^the user writes the options to "([^"]*)" question with (\d+) options$/, function(qType, numOpt, cb) {
		if (qType == 'dropdown'){
			var list = '';
			var index = 1;

			for (index = 1; index <= numOpt; index++) {
				list += 'Option' + index;
				if (index + 1 <= numOpt) list += '\n';
			}

			maker.finds('.dropdown-text').sendKeys(list).then(cb);
		}
	});

	When(/^the user scrolls to top$/, function(cb) {
		scrollToTop().then(cb);
	});

	When(/^the user writes the question and answers$/, function(cb) {
		maker.createsMultiChoiceTypeQuestion().then(function(){
			cb();
		});
	});

	When(/^clicks on the Other option field$/, function(cb) {
		navigate.clicksHidden('.spec-active-option-add-other-option + label').then(cb);
	});

	When(/^Allow multiple selections checkboxes$/, function(cb) {
		maker.activatesAllowMultipleSelections().then(cb);
	});

	When(/^clicks on the Allow multiple selections checkbox$/, function(cb) {
		maker.activatesAllowMultipleSelections().then(cb);
	});

	When(/^the user writes the title of question$/, function(cb) {
		var _title = rand.getText(161);
		var el = maker.findsAll('.spec-edit-question-name-any').last();

		el.clear().sendKeys(_title);
		user.wait(200);
		el.getAttribute('value').then(function(_text){
			expect(_text.length).to.be.equal(160);
		}).then(cb);
	});
};