module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user creates (\d+) pages$/, function (pages, cb) {
		async.eachSeries(gArray(pages - 1), function(n, next) {
			maker.finds('.spec_pages_create_new_button').click();
			maker.finds('.spec-input-new-process-name').clear().sendKeys(rand.getSentence(5));
			maker.finds('.spec-input-new-process-description').clear().sendKeys(rand.getSentence(15));
			maker.finds('.spec-button-create-process').click();
			if (n == (pages - 1)) cb();
			else next();
		});
	});
};
