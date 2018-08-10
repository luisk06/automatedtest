'use strict';

var user_login = function() {

	this.setUserName = function(username, password) {
		element(by.id('spec-input-useremail-register')).clear().sendKeys(username);
		element(by.id('spec-input-userpass-register')).clear().sendKeys(password);
		return element(by.css('.spec-register-btn')).click();
	};

	this.setCredentials = function(username, password) {
		element(by.id('spec-inputlogin-user')).sendKeys(username);
		return element(by.id('spec-inputlogin-password')).sendKeys(password);
	};

	this.setPassword = function(password) {
		return element(by.id('spec-input-userpass-register')).clear().sendKeys(password);
	};

	this.pressSignIn = function() {
		return element(by.css('.spec-register-btn')).click();
	};

	this.pressLogin = function() {
		return element(by.css('.spec-login-btn')).click();
	};

	this.setFirstName = function(first) {
		return element(by.css('spec_profile_first_name')).clear().sendKeys(first);
	};

	this.setLastName = function(last) {
		return element(by.css('.spec-login-btn')).clear().sendKeys(last);
	};

	this.modifyPassword = function(pass) {
		return element(by.css('.spec-login-btn')).clear().sendKeys(pass);
	};

	this.setOrganization = function(organization) {
		return element(by.css('.spec-login-btn')).clear().sendKeys(organization);
	};

	this.signup = function(username, password) {
		brw.driver.manage().deleteAllCookies();
		element(by.css('#spec-input-useremail-register')).sendKeys(username);
		element(by.css('#spec-input-userpass-register')).sendKeys(password);
		return element(by.css('.spec-register-btn')).submit();
	};

	this.login = function(username, password) {
		navigate.sendKeys('#spec-inputlogin-user', username);
		navigate.sendKeys('#spec-inputlogin-password', password);
		return navigate.clicksButton('.spec-login-btn');
	};
};

module.exports = new user_login();
