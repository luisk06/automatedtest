module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user go to pages dashboard$/, function(cb) {
		maker.finds('.spec_pages_button').click().then(cb);
	});

	When(/^the user clicks the "([^"]*)" button$/, function(button, cb) {
		if (button == 'Create Page') {
			maker.finds('#spec_new_page').click().then(cb);
		} else if (button == 'Create') {
			maker.finds('.spec-button-create-process').click().then(cb);
		}
	});

	When(/^the user create a page with "([^"]*)" as title$/, function(title, cb) {
		maker.createPage(title).then(cb);
	});

	When(/^the user create a page$/, function(cb) {
		maker.createPage().then(cb);
	});

	When(/^the user writes the page name$/, function(cb) {
		maker.finds('.spec-input-new-process-name').clear().sendKeys(rand.getSentence(5)).then(cb);
	});

	When(/^the user mark the access level as "([^"]*)"$/, function(access, cb) {
		cb();
	});

	When(/^the user writes the page description$/, function(cb) {
		maker.finds('.spec-input-new-process-description').clear().sendKeys(rand.getSentence(15)).then(cb);
	});

	When(/^the page is created$/, function(cb) {
		cb();
	});
};
