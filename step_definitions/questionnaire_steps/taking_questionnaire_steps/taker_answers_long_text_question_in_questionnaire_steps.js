'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selects answers in "([^"]*)" question$/, function(typeOfQuestion, cb) {
		user.answersQuestion(typeOfQuestion).then(function(){
			switch (typeOfQuestion) {
				case 'short text':
				case 'short_text':
					user.finds('.spec-taker-short-text-answers').getAttribute('value').then(function(_text){
						expect(_text.length).to.be.equal(255);
					});
					break;
				case 'long text':
				case 'long_text':
					user.finds('.spec-taker-long-text-answers').getAttribute('value').then(function(_text){
						expect(_text.length).to.be.equal(500);
					});
					break;
			}
		}).then(cb);
	});

	When(/^the user clicks on the Submit button$/, function(cb) {
		var el = '.spec-user-response-ok.submit-answers';

		user.waitsFor(el);
		user.finds(el).click().then(cb);
	});
};
