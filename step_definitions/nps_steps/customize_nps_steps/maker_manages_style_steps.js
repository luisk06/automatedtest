'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	// When(/^the user moves to "([^"]*)" tab$/, function(arg1, callback) {
	When(/^the user moves to "([^"]*)" tab into customize$/, function(arg1, callback) {
		var el = '.spec_customize_themes_' + arg1 + '_tab';
		webpage.waitsFor(el);
		maker.finds('.spec_customize_themes_' + arg1 + '_tab').click().then(callback);
	});
};
