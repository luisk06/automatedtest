'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the audience answers the "([^"]*)" poll$/, function(typeOfQuestion, cb) {
		webpage.waits(3000).then(function(){
			if(typeOfQuestion == 'numeric') typeOfQuestion = 'numeric-mask';
			taker.answersQuestion(typeOfQuestion).then(cb);
		});
	});
};