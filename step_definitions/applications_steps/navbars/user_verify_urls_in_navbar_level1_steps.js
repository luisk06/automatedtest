'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user is in dashboard$/, function(cb) {
		expect(webpage.getCurrentUrl()).to.eventually.contain('/').and.notify(cb);
	});

	When(/^the user clicks on the "([^"]*)" in menu first level$/, function(option, cb) {
		user.finds('.spec-dropdown-menu-main').click();
		user.waits(600);
		user.finds('.spec_' + option + '_button').click().then(cb);
	});

	When(/^the user clicks on the "([^"]*)" in menu second level$/, function(option, cb) {
		if(option !== 'config'){
			if(option === 'webforms') user.finds('.spec_webform_dashboard').click().then(cb);
			else user.finds('.spec_' + option + '_button').click().then(cb);
		}else cb();
	});

	Then(/^the user should is on the "([^"]*)" url$/, function(option, cb) {
		var urlExpected = '/';

		if(option == '/apps'){
			urlExpected = '/';
		}else if(option == '/address_book'){
			urlExpected = '/address-book';
		}else if(option == '/config'){
			urlExpected = '/';
		}else{
			urlExpected = option;
		}

		expect(webpage.getCurrentUrl()).to.eventually.contain(urlExpected).and.notify(cb);
	});
};