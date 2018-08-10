module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has not pages$/, function(cb) {
		cb();
	});

	Given(/^the user has a pages$/, function(cb) {
		pgs.createsPages('show_messages').then(cb);
	});

	Given(/^the navbar should have (\d+) tab$/, function(num, cb) {
		var el = element.all(by.css('.pages-nav-bar .scroll .items .item:not(.ng-hide)')).count();
		expect(el).to.eventually.be.equal(+num).and.notify(cb);
	});

	When(/^the user clicks on Slide Active page$/, function(cb) {
		user.waitsFor('.toggle');
		element.all(by.css('.pages-list.qrvey-list.qrvey-pages-list .page .toggle')).first().click().then(cb);
	});

	Then(/^the page should set star page$/, function(cb) {
		var el = element(by.css('.position')).getText();
		expect(el).to.eventually.be.equal('Start Page').and.notify(cb);
	});

	Given(/^the user has sign up form$/, function(cb) {
		us.isLogged().then(function(_userId) {
			qs.createQrvey(appID, _userId, 'forms', 'signup').then(function(data) {
				logger.log('data', data);
			}).then(cb);
		});
	});

	Given(/^the user has a "([^"]*)" page$/, function(type, cb) {
		user.createsPages(type).then(cb);
	});

	When(/^the user clicks on Authentificacions button$/, function(cb) {
		user.finds('.add-authentication').click().then(cb);
	});

	When(/^the user opens the form$/, function(cb) {
		user.finds('.automatiq-block.automatiq-block-view').click().then(cb);
	});

	When(/^the user opens the dropdown$/, function(cb) {
		user.findsAll('.automatiq-select').get(1).click().then(cb);
	});

	When(/^the user selects the sign up form$/, function(cb) {
		user.finds('.select-search input').sendKeys('Sign Up Form');
		user.findsAll('.li-qrvey').first().click().then(cb);
	});

	When(/^the user selects the fields for the login form$/, function(cb) {
		user.findsAll('.form-group .row input').get(1).sendKeys('Email');
		user.findsAll('.form-group:nth-child(2) .row .automatiq-select').get(0).click();
		user.findsAll('.form-group:nth-child(2) .row .automatiq-select li').get(1).click().then(cb);
	});

	When(/^the user selects the logout page$/, function(cb) {
		user.findsAll('.form-group:nth-child(3) .row .automatiq-select').get(0).click();
		user.findsAll('.form-group:nth-child(3) .row .automatiq-select li').get(0).click().then(cb);
	});

	When(/^the user clicks on Publish$/, function(cb) {
		//brw.explore();
		user.finds('.spec-automation-btn-activate').click().then(cb);
	});

	Then(/^the x button should be displayed$/, function(cb) {
		var el = user.finds('.add-authentication .close').isDisplayed();

		expect(el).to.eventually.be.true.and.notify(cb);
	});
};
