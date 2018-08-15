'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user edits textarea of nps$/, function(cb) {
		user.finds('.spec-nps-answers-textfield').click().then(
		function(){
			throw new Error('Texarea is not blocked');
		},
		function(){
			cb();
		});
	});
};
