'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user doesn't have qrveys$/, function(cb) {
		brw.driver.manage().deleteAllCookies();
		navigate.goToUrl(brw.baseUrl);
		user_login.setCredentials(configer.get('username'), configer.get('password')).then(cb);
	});

	Given(/^the user has not verified its email$/, function(cb) {
		us.setFlag({ loginVerified: false }).then(function () {
			cb();
		});
	});

	Given(/^the user has verified its email$/, function(cb) {
		us.setFlag({ loginVerified: true }).then(function () {
			cb();
		});
	});

	When(/^the user logs in$/, function(cb) {
		navigate.goToUrl(brw.baseUrl);
		user_login.login(configer.get('username'), configer.get('password')).then(cb);
	});

	Then(/^their dashboard should be displayed$/, function(cb) {
		brw.waitForAngular();
		expect(navigate.getCurrentUrl()).to.eventually.not.contain('login').and.notify(cb);
	});

	Then(/^no Qrveys should be displayed$/, function(cb) {
		expect(qrvey.getTotal()).to.eventually.be.eql(0).and.notify(cb);
	});

	Then(/^a verify email remainder should be displayed$/, function(cb) {
		expect(qrvey.checkExistance('spec_email_verif_notif')).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the "([^"]*)" message should be displayed in the login$/, function(text, cb) {
		expect(navigate.textPresence(text)).to.eventually.be.false.and.notify(cb);
	});

	Then(/^a create Qrvey button should be displayed$/, function(cb) {
		expect(qrvey.checkExistance('spec_new_qrvey')).to.eventually.exist.and.notify(cb);
	});

	When(/^has verified its email$/, function(cb) {
		brw.driver.manage().deleteAllCookies();
		navigate.goToUrl(brw.baseUrl);
		user_login.login(configer.get('username'), configer.get('password')).then(cb);
	});

	Then(/^a verify email remainder should not be displayed$/, function(cb) {
		expect(qrvey.checkExistance('spec_email_verif_notif')).to.be.eventually.false.and.notify(cb);
	});

	Given(/^the user have qrveys$/, function(cb) {
		us.isLogged().then(function(_userId) {
			brw.driver.manage().deleteAllCookies();
			navigate.goToUrl(brw.baseUrl);
			user_login.login(configer.get('username'), configer.get('password'));
			qrvey.createQrvey(_userId, 'Qrvey question management test', 'Add and remove').then(cb);
		});
	});

	Then(/^a "([^"]*)" message should not be displayed in the login$/, function(text, cb) {
		expect(navigate.textPresence(text)).to.eventually.be.false.and.notify(cb);
	});

	Then(/^a list of their qrveys should be displayed$/, function(cb) {
		expect(qrvey.getTotal()).to.eventually.not.be.null.and.notify(cb);
	});

	Given(/^the user has not register$/, function(cb) {
		brw.driver.manage().deleteAllCookies();
		navigate.goToUrl(brw.baseUrl);

		var email = rand.getEmail();
		user_login.setCredentials(email, configer.get('password')).then(cb);
	});

	Then(/^the invalid user name or password message should be displayed in the login$/, function(cb) {
		expect(navigate.getCurrentUrl()).to.eventually.contain('login').and.notify(cb);
	});
};
