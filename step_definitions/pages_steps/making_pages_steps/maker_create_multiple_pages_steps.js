module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user creates (\d+) pages$/, function (pages, cb) {
		async.eachSeries(gArray(pages - 1), function(n, next) {
			user.finds('.spec_pages_create_new_button').click();
			user.finds('.spec-input-new-process-name').clear().sendKeys(rand.getSentence(5));
			user.finds('.spec-input-new-process-description').clear().sendKeys(rand.getSentence(15));
			user.finds('.spec-button-create-process').click();
			if (n == (pages - 1)) cb();
			else next();
		});
	});
};
