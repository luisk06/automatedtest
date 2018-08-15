'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selects the date$/, function(cb) {
		var today = new Date(),
			timeStamp = today.getDate();

		// console.log('DATE:', timeStamp);

		skipSync(true);
		taker.answersDateQuestionByClick(timeStamp).then(cb);
	});

	When(/^the user clicks the Ok button$/, function(cb) {
		user.waits(1000);
		user.findsAll('.spec-user-response-ok').get(0).click().then(cb);
	});

	When(/^the user clicks the Confirm button$/, function(cb) {
		user.findsAll('.button.yellow.confirm-branch-bto').get(0).click().then(cb);
	});

	When(/^the user clicks the Ok button again$/, function(cb) {
		user.findsAll('.spec-user-response-ok.ico-check').get(1).click().then(cb);
	});

	When(/^the user scrolls to bottom$/, function(cb) {
		scrollToBottom().then(cb);
	});

	Then(/^the take qrvey counter should not be blank$/, function(cb) {
		var ele = element(by.binding('counter_format')),
			isVisible = EC.visibilityOf(ele);

		brw.wait(isVisible, 5000).then(function() {
			ele.getText().then(function(_text) {
				expect(_text.substring(0, 1)).to.not.be.empty &&
					expect(_text.substring(0, 1)).to.not.be.undefined &&
					expect(_text.substring(0, 1)).to.be.at.least(0) &&
					(expect(_text).to.contain('s') || expect(_text).to.contain('m'));
			});
		}).then(cb);
	});
};
