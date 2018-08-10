module.exports = function() {
	
	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the page should show the site saved in the action$/, function(cb) {
		skipSync(true);
		brw.driver.switchTo().frame(brw.driver.findElement(by.tagName('iframe')));
		user.waitsFor('.white-logo').then(function() {
			cb();
		});
	});
};
	