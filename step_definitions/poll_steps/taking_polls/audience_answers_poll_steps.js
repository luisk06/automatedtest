'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the audience answers the "([^"]*)" poll$/, function(typeOfQuestion, cb) {
		user.waits(3000).then(function(){
			if(typeOfQuestion == 'numeric') typeOfQuestion = 'numeric-mask';
			user.answersQuestion(typeOfQuestion).then(cb);
		});
	});
};