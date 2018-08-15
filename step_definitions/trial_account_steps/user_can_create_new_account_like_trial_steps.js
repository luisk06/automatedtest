'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var newAccount = '';

	Given(/^the user has not register before$/, function(cb) {
        // newAccount = rand.getEmail({ domain: 'trial.com' });
		// newAccount = rand.getName().toLowerCase() + '.' + rand.getLastname().toLowerCase() + '@trial.com';
		newAccount = 'testingqrvey+' + randomId() + '@gmail.com';
		cb();
	});

	Given(/^the user stay in the register section$/, function(cb) {
		user.goTo('/register').then(cb);
	});

	When(/^the user does sign up$/, function(cb) {
		maker.toDoRegister(newAccount).then(cb);
	});

	Then(/^the "([^"]*)" message should be diplayed$/, function(message, cb) {
		webpage.getsTextExists(message).then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});

	Then(/^the user should have "([^"]*)" as the default plan$/, function(planText, cb) {
		user.finds('.spec_status_subscription').getText().then(function(_text) {
			expect(_text).to.be.equal(planText);
		}).then(cb);
	});

	Then(/^the Change Plan button should be displayed$/, function(cb) {
		user.finds('.spec-button-change-plan').isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.true;
		}).then(cb);
	});

	When(/^the user clicks on the Change Plan button$/, function(cb) {
		user.finds('.spec-button-change-plan').click().then(cb);
	});

	When(/^the user select the "([^"]*)" plan$/, function(typeOfPlan, cb) {
		var server = (env === 'dev') ? 'local' : 'stg';

		user.finds('#qrvey-' + typeOfPlan + '-' + server + ' + label').click();
		user.findsAll('.spec-button-subscribe').get(0).click().then(cb);
	});

	When(/^the user types your credit card number valid$/, function(cb) {
		brw.switchTo().frame(element(by.css('#card-element iframe')).getWebElement());
		skipSync(true);
		element(by.css('.ElementsApp .Input input[name^="cardnumber"]')).sendKeys('4000000000000077').then(cb);
	});

	When(/^the user types your credit card number (\d+) of "([^"]*)"$/, function(number, type, cb) {
		brw.switchTo().frame(element(by.css('#card-element iframe')).getWebElement());
		skipSync(true);

		element(by.css('.ElementsApp .Input input[name^="cardnumber"]')).sendKeys(number).then(cb);
	});

	When(/^the user types the date expires of credit card$/, function(cb) {
		var date_expires = rand.getExp();
		element(by.css('.ElementsApp .Input input[name^="exp-date"]')).sendKeys(date_expires).then(cb);
	});

	When(/^the user types your cvc number$/, function(cb) {
		var cvc = rand.getNumber({ min: 100, max: 999 });
		element(by.css('.ElementsApp .Input input[name^="cvc"]')).sendKeys(cvc).then(cb);
	});

	When(/^the user click on the Subscribe button$/, function(cb) {
        // brw.driver.switchTo();
		brw.getAllWindowHandles().then(function(handles) {
			brw.switchTo().window(handles[0]);
		});

		user.findsAll('.spec-button-subscribe').get(1).click().then(cb);
	});
};
