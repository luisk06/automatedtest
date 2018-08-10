'use strict';

var Profile = function() {

	var initialEmail,
		initialFirst,
		initialLast,
		initialOrganization;

	this.getInitialEmail = function() {
		return initialEmail;
	};

	this.getInitialFirst = function() {
		return initialFirst;
	};

	this.getInitialLast = function() {
		return initialLast;
	};

	this.getInitialOrganization = function() {
		return initialOrganization;
	};

	this.setFirstName = function(first) {
		return element(by.id('spec_profile_first_name')).clear().sendKeys(first);
	};

	this.setLastName = function(last) {
		return element(by.id('spec_profile_last_name')).clear().sendKeys(last);
	};

	this.modifyPassword = function(oldPass, newPass) {
		navigate.clearField('.spec_old_password');
		navigate.sendKeys('.spec_old_password', oldPass);
		navigate.clearField('.spec_new_password');
		navigate.sendKeys('.spec_new_password', newPass);
		navigate.clearField('.spec_confirm_new_password');
		navigate.sendKeys('.spec_confirm_new_password', newPass);
		navigate.clicksButton('.spec_save_change_password');
		return navigate.clicksButton('.spec_first_name_field');
	};

	this.clickChangePassword = function() {
		return navigate.clicksButton('.spec_change_password_button');
	};

	this.setOrganization = function(organization) {
		return element(by.id('spec_profile_organization')).clear().sendKeys(organization);
	};

	this.getValue = function(deferred, field) {
		logger.log('Looking for element by model ---> "' + field + '"');
		var aux = element(by.model(field));
		aux.getAttribute('value').then(function(value) {
            //logger.log(value);
			if (field === 'email') {
				initialEmail = value;
			} else if (field === 'first_name') {
				initialFirst = value;
			} else if (field === 'last_name') {
				initialLast = value;
			} else {
				initialOrganization = value;
			}
			deferred.fulfill(value);

		});
		return deferred.promise;
	};
};

module.exports = new Profile();
