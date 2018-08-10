'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has a process "([^"]*)"$/, function(typeOfProcess, cb) {
		ps.getWebhookUrl().then(function(_res){
			webhookURL=_res.webhook_url;
		});
		ps.createsProcess(typeOfProcess, true, appID, webhookURL).then(cb);
	});

	When(/^the user go to "([^"]*)" dashboard$/, function(dashboard, cb) {
		var urlToGo=brw.baseUrl+'/application/'+appID+'/workflows';

		navigate.goToUrl(urlToGo).then(cb);
	});

	When(/^the user opens the first process$/, function(cb) {
		element.all(by.repeater('process in processes.data')).then(function(els) {
			els.forEach(function(ele, i, a) {
				if (i == 0) {
					a[i].element(by.css('.spec-qrvey-title-link')).click().then(cb);
				}
			});
		});
	});

	When(/^the user opens the first process in workflow$/, function(cb) {
		element.all(by.repeater('process in WD.processes.data')).then(function(els) {
			els.forEach(function(ele, i, a) {
				if (i == 0) {
					a[i].element(by.css('.spec-qrvey-title-link')).click().then(function(){
						element(by.css('.arrowDropAN')).click().then(function(){
							element(by.xpath('//span[contains(text(),"Delete")]')).click().then(cb);
						});
					});
				}
			});
		});
	});

	When(/^the user opens the first "([^"]*)" process$/, function( process, cb) {
		// user.reloadbrw();
		//brw.explore();
		user.finds('.spec_workflows_button').click().then(function(){
			//element.all(by.xpath("//a[contains(@class, 'spec-qrvey-title-link qrvey-title-desktop') and contains(text(),'"+process+"')]")).first().click().then(cb);
			element.all(by.css('a.spec-qrvey-title-link.qrvey-title-desktop')).first().click().then(cb);
		});
	});

	When(/^the user opens the actions$/, function(cb) {
		user.finds('.spec-automatiq-block-action-view-open').click().then(cb);
	});

	When(/^the user opens the actions in wait$/, function(cb) {
		user.findsAll('.spec-automatiq-block-action-view-open').get(1).click().then(cb);
	});

	When(/^the user opens the actions in startflow$/, function(cb) {
		user.findsAll('.spec-automatiq-block-action-view-open').get(0).click().then(cb);
	});

	When(/^the user selects the "([^"]*)" in wait$/, function(typeOfAction, cb) {
		user.waits(1000).then(function(){
			user.finds('.spec-automatiq-select-action-open').click();
			user.finds('.spec-automatiq-select-action-' + typeOfAction).click().then(cb);
		});
	});

	When(/^the user adds a new action$/, function(cb) {
		user.finds('.spec-automatiq-add-new-action').click().then(cb);
	});

	When(/^the user selects the "([^"]*)" action$/, function(typeOfAction, cb) {
		user.waits(1000).then(function(){
			element(by.css('.spec-automatiq-select-action-open')).click().then(function(){
				element(by.css('.spec-automatiq-select-action-' + typeOfAction)).click().then(cb);
			});
		});
	});

	When(/^the user put (\d+) contacts as addressee$/, function(numOfEmails, cb) {
		var _contact = null,
			_counter = numOfEmails;

		for (var i = 1; i <= numOfEmails; i++) {
			_contact = rand.getEmail();

			logger.log('email ' + i, _contact);

			user.finds('.spec-automatiq-input-emails input.input').sendKeys(_contact);
			brw.actions().sendKeys(protractor.Key.ENTER).perform().then(function() {
				_counter--;

				logger.log('_counter', _counter);

				if (_counter == 0) {
					logger.log('_counter is 0');
					cb();
				}
			});
		}
	});

	When(/^the user put (\d+) contacts in sms$/, function (numOfContacts, cb) {
		var _contact = '+12028164512';

		user.waits(1000);
		user.finds('.spec-automatiq-input-emails input.input').sendKeys(_contact).then(cb);
	});

	When(/^the user put (\d+) contacts in sms in not found$/, function (numOfContacts, cb) {
		var _contact = '+12028164512';

		user.waits(1000);
		user.findsAll('.spec-automatiq-input-emails input.input').get(1).sendKeys(_contact).then(cb);
	});

	When(/^the user put the subject$/, function(cb) {
		var _text = rand.getText(81),
			_el = user.finds('.spec-automatiq-action-input-subject');

		_el.sendKeys(_text);
		_el.getAttribute('value').then(function(_value) {
			expect(_value.length).to.be.equal(80);
		}).then(cb);
	});

	When(/^the user put the message$/, function(cb) {
		var _text = rand.getText(150);

		skipSync(true);
		brw.driver.switchTo().frame(brw.driver.findElement(by.tagName('iframe')));
		element(by.css('.mce-content-body')).sendKeys(_text);
		brw.driver.switchTo().defaultContent();
		skipSync(false);

		cb();
	});

	When(/^the user clicks on templates icon$/, function (cb) {
		element.all(by.css('.mce-txt')).get(2).click().then(cb);
	});

	When(/^the user clicks on manage templates option$/, function (cb) {
		element.all(by.css('.mce-text')).get(0).click().then(cb);
	});

	When(/^the user clicks on Save as a new template option$/, function (cb) {
		element.all(by.css('.mce-text')).get(1).click().then(cb);
	});

	When(/^the user fills the template name$/, function (cb) {
		element(by.css('.template-name')).sendKeys('Template Name 1').then(cb);
	});

	When(/^the user clicks the save template button$/, function (cb) {
		element(by.css('.button.yellow')).click().then(cb);
	});

	When(/^the user clicks on Save to option$/, function (cb) {
		element.all(by.css('.mce-text')).get(2).click().then(cb);
	});

	Then(/^the email templates modal is showed$/, function (cb) {
		element(by.css('.modal-title')).getText().then(function (text) {
			expect(text).to.be.equal('EMAIL TEMPLATES');
		}).then(cb);
	});

	Then(/^template was sucefully saved$/, function (cb) {
		element(by.css('#toast-container .succesfully')).isPresent().then(function (_isPresent) {
			expect(_isPresent).to.be.true;
		}).then(cb);
	});

	Then(/^the changes in the template were saved$/, function (cb) {
		cb();
	});
};