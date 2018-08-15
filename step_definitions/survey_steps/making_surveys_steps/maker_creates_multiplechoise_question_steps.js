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

			user.finds('.dropdown-text').sendKeys(list).then(cb);
		}
	});

	When(/^the user scrolls to top$/, function(cb) {
		scrollToTop().then(cb);
	});

	When(/^the user writes the question and answers$/, function(cb) {
		var el1 = '.spec-multichoice-question-0-option-0';
		var el2 = '.spec-multichoice-question-0-option-1';
		var el3 = '.spec-multichoice-question-0-option-2';

		var tx1 = 'Life matters';
		var tx2 = 'Water is great';
		var tx3 = 'Money can not be eaten';

		maker.createsMultiChoiceTypeQuestion('Would you recommend our product to others?').then(function() {
			user.finds('.spec-add-option-multichoice-question-0').click();

			user.finds(el1).sendKeys(tx1);
			webpage.waits(100);
			expect(user.finds(el1).getAttribute('value')).to.eventually.be.equal(tx1);

			user.finds(el2).sendKeys(tx2);
			webpage.waits(100);
			expect(user.finds(el2).getAttribute('value')).to.eventually.be.equal(tx2);

			user.finds(el3).sendKeys(tx3);
			webpage.waits(100);
			// brw.enterRepl();
			expect(user.finds(el3).getAttribute('value')).to.eventually.be.equal(tx3).and.notify(cb);
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
		var el = user.findsAll('.spec-edit-question-name-any').last();

		el.clear().sendKeys(_title);
		user.wait(200);
		el.getAttribute('value').then(function(_text){
			expect(_text.length).to.be.equal(160);
		}).then(cb);
	});
};