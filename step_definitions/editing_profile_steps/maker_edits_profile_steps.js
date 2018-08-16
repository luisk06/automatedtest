'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var randNumber = 0,
		newFirstName,
		newLastName,
		newOrganization,
		newEmail,
		newPass = '1234azert',
		oldPass = '123456',
		firstNamePromise = protractor.promise.defer();

	Given(/^the user logs in with "([^"]*)"$/, function(email, cb) {
		webpage.deleteAllCookies();
		webpage.openUrl('/');
		randNumber = rand.getNumber({
			min: 1,
			max: 10000
		});

		user_login.login(email, '123456').then(function() {
			webpage.waits(2000);
		}).then(cb);
	});

	Given(/^the user access to profile settings$/, function(cb) {
		maker.finds('.spec-dropdown-menu-main').click();
		maker.finds('.spec_profile_button').click().then(cb);
	});

	When(/^the user clicks on the profile Image$/, function(cb) {
		brw.sleep(3200);
		maker.finds('.spec_profile_image').click().then(cb);
	});

	When(/^the user updates they "([^"]*)" "([^"]*)" to "([^"]*)" and a random number$/, function(identifier, type, keys, cb) {
		logger.log('randNumber', randNumber);
		profile.getValue(firstNamePromise, identifier);
		navigate.clearField('.spec_' + identifier + '_' + type);
		navigate.sendKeys('.spec_' + identifier + '_' + type, keys + randNumber).then(cb);
	});

	When(/^they update the information$/, function(cb) {
		profile.setFirstName(newFirstName);
		profile.setLastName(newLastName);
		profile.setOrganization(newOrganization);
		maker.finds('#spec_profile_first_name').click().then(cb);
	});

	Then(/^the user "([^"]*)" should be updated$/, function(identifier, cb) {
		var auxpromise = protractor.promise.defer();
		expect(profile.getValue(auxpromise, identifier)).to.eventually.contain(randNumber).and.notify(cb);
	});

	When(/^the user clicks on change password$/, function(cb) {
		profile.clickChangePassword().then(cb);
	});

	When(/^inputs they old password$/, function(cb) {
		navigate.clearField('.spec_old_password');
		navigate.sendKeys('.spec_old_password', oldPass).then(cb);
	});

	When(/^inputs they new password$/, function(cb) {
		navigate.clearField('.spec_new_password');
		navigate.sendKeys('.spec_new_password', newPass).then(cb);
	});

	When(/^confirms they new password$/, function(cb) {
		navigate.clearField('.spec_confirm_new_password');
		navigate.sendKeys('.spec_confirm_new_password', newPass).then(cb);
	});

	When(/^clicks on save$/, function(cb) {
		maker.finds('.spec_save_change_password').click();
		expect(webpage.getsTextExists('Changed!')).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the new password should be changed$/, function(cb) {
		webpage.deleteAllCookies();
		webpage.goTo('/');
		console.log('userEmail', user.getSetting('validUser'));
		user_login.login(user.getSetting('validUser'), newPass);
		expect(webpage.isDisplayed('.spec-dropdown-menu-main')).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the user should be able to login with it's new password$/, function(cb) {
		// navigate.goToProfile();
		maker.finds('.spec-dropdown-menu-main').click();
		maker.finds('.spec_profile_button').click();

		profile.clickChangePassword();
		profile.modifyPassword(newPass, oldPass);

		webpage.deleteAllCookies();
		webpage.goTo('/');
		user_login.login(user.getSetting('validUser'), oldPass);

		expect(webpage.isDisplayed('.spec-dropdown-menu-main')).to.eventually.be.true.and.notify(cb);
	});

	When(/^the user change you email by a new random email$/, function(cb) {
		newEmail = rand.getEmail({ domain: 'profile.com' });
		element.all(by.model('email')).get(1).clear().sendKeys(newEmail).then(cb);
	});

	When(/^the user clicks off field$/, function(cb) {
		element(by.css('.spec-profile-image-container')).click().then(cb);
	});

	Then(/^the message for change the email should be displayed$/, function(cb) {
		brw.sleep(1000);

		element.all(by.css('.spec-email-change-response')).get(0).getText().then(function(value) {
			expect(value.trim()).to.be.contain('Great! We just sent you an email');
		}).then(cb);
	});
};
