'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^there should be only (\d+) columns selected$/, function(columnNum, cb) {
		element.all(by.css('#columns-dropdown input[type=checkbox]:checked')).count().then(function(res){
			expect(res).to.be.equal(parseInt(columnNum));
		}).then(cb);
	});
};