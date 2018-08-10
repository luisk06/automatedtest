'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var qrveyUrl = null,
		today = null,
		qrveyQuestionName = null;

	Given(/^that there is a qrvey with a date question$/, function(cb) {
		brw.driver.manage().deleteAllCookies();
		navigate.goToUrl(brw.baseUrl);
		user_login.login(configer.get('username'), '123456');
		qrvey.createQrvey('Assuring date question works properly test qrvey', 'Assuring the repetitive bugs will not continueé to show up');
		qrvey.questionType('spec_da_qt');
		qrvey.fillDateQuestion('what is your favorite date for testing?').then(function() {
			expect(qrvey.checkQrveyPresence('what is your favorite date for testing?')).to.eventually.be.true;
		});
		qrvey.activeQrvey('\'' + 'Social' + '\'');
		var url = $('.spec-qrvey-url-share');
		var isVisible = EC.elementToBeClickable(url);
		brw.wait(isVisible, 5000); //wait for an element to become clickable
		url.getAttribute('value').then(function(url) {
			logger.log('dsqdq ', url);
			qrveyUrl = url;
			qrvey.setQrveyUrl(url);
		}).then(cb);
	});

	Given(/^that there is a qrvey with an optional date question$/, function(cb) {
		brw.driver.manage().deleteAllCookies();
		navigate.goToUrl(brw.baseUrl);
		user_login.login(configer.get('username'), configer.get('password'));
		qrvey.createQrvey('Assuring date question works properly test qrvey', 'Assuring the repetitive bugs will not continueé to show up');
		qrvey.questionType('spec_da_qt');
		qrvey.fillDateQuestion('what is your favorite date for testing?');
		navigate.clicksButton('.spec-dropdown-0');
		navigate.clicksButton('.change-require-question-0');
		qrvey.addQuestion();
		navigate.sendKeys('.spec-edit-question-name-1', 'what are your favorite choices for testing?');
		navigate.sendKeys('.spec-multichoice-question-1-option-0', 'this one?');
		navigate.sendKeys('.spec-multichoice-question-1-option-1', 'or rather this one?');
		expect(qrvey.checkQrveyPresence('what is your favorite date for testing?')).to.eventually.be.true;
		expect(qrvey.checkQrveyPresence('what are your favorite choices for testing?')).to.eventually.be.true;
		qrvey.activeQrvey('\'' + 'Social' + '\'');

		var url2 = $('.spec-qrvey-url-share');
		var isVisible2 = EC.elementToBeClickable(url2);
		brw.wait(isVisible2, 5000); //wait for an element to become clickable
		brw.sleep(6000);
		url2.getAttribute('value').then(function(url) {
			logger.log('dsqdq ', url);
			qrveyUrl = url;
		}, function(err) {
			logger.log('error' + err);
		}).then(cb);
	});

	Given(/^that the user is answering a date question$/, function(cb) {
		brw.ignoreSynchronization = true;

		logger.log('qrveyUrl', qrveyUrl);

		brw.get(qrveyUrl).then(function() {
			qrvey.pressTakeQrvey().then(function() {
				element(by.binding('question.text')).getText().then(function(questionName) {
					//logger.log(e);
					qrveyQuestionName = questionName;
					qrvey.setQrveyQuestionName(questionName);
				}).then(cb);
			});
		});
	});

	Given(/^the Ok button is displayed$/, function(cb) {
		element(by.binding('question.text')).getAttribute('value').then(function() {
			brw.sleep(3000);
			expect(element(by.css('.spec-user-response-ok')).isPresent()).to.eventually.be.true.and.notify(cb);
		});
	});

	When(/^the user clicks on the input for datepicker$/, function(cb) {
		expect(element(by.css('.spec-taker-date-answer-input')).isDisplayed()).to.eventually.be.true;
		element(by.css('.spec-taker-date-answer-input')).click().then(cb);
	});

	When(/^the picker is displayed$/, function(cb) {
		expect(element(by.css('.datepicker')).isDisplayed()).to.eventually.be.true.and.notify(cb);
	});

	When(/^they select the date in the picker$/, function(cb) {
		var timeStamp = new Date();
		today = timeStamp.getDate();
		// timeStamp = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
		expect(element(by.css('[data-date="' + today + '"]')).isDisplayed()).to.eventually.be.true;
		navigate.clicksButton('[data-date="' + today + '"]').then(cb);
		//element(by.css('[data-date="' + today + '"]')).click();
	});

	Then(/^the selected date should be shown in the input$/, function(cb) {
		element(by.css('.spec-taker-date-answer-input')).getAttribute('value').then(function(inputdate) {
			expect(+inputdate.substring(3, 5)).to.equal(today);
		}).then(cb);
	});

	Then(/^the Ok button should remain displayed$/, function(cb) {
		expect(element(by.css('.spec-user-response-ok')).isDisplayed()).to.eventually.be.true.and.notify(cb);
	});

	When(/^the user tries to write inside the input$/, function(cb) {
		element(by.css('.spec-taker-date-answer-input')).sendKeys('12345AZERTYazerty&é÷µÙ').then(cb);
	});

	Then(/^the input should remain empty$/, function(cb) {
		element(by.css('.spec-taker-date-answer-input')).getAttribute('value').then(function(inputdate) {
			expect(inputdate).to.be.empty;
		}).then(cb);
	});

	When(/^the user changes the readonly html attribute of the input$/, function(cb) {
		var datein = element(by.css('.spec-taker-date-answer-input'));
		// remove the "readonly" attribute
		brw.executeScript('arguments[0].removeAttribute(\'readonly\');', datein.getWebElement()).then(cb);
	});

	When(/^the user removes the datepicker thats blocking the Ok button$/, function(cb) {
		brw.executeScript('$(\'.datepickers-container\').remove();').then(cb);
	});

	Then(/^the qrvey should stay in the same question$/, function(cb) {
		brw.sleep(7000);
		expect(element(by.binding('question.text')).isDisplayed()).to.eventually.be.true;
		element(by.binding('question.text')).getText().then(function(questionName) {
			logger.log('qrveys.name', qrvey.getQrveyQuestionName());
			logger.log('qrveys.name2', questionName);
			expect(qrvey.getQrveyQuestionName()).to.be.equal(questionName);
		}).then(cb);
	});

	When(/^the user clicks on the skip question button$/, function(cb) {
		navigate.clicksButton('.skipbtn').then(cb);
	});

	Then(/^the qrvey should not be in the same question$/, function(cb) {
		if (element(by.binding('question.text')).isDisplayed()) {
			element(by.binding('question.text')).getText().then(function(questionName) {
				logger.log('qrveys.qrveyQuestionName', qrveyQuestionName);
				logger.log('qrveys.questionName', questionName);
				expect(qrveyQuestionName).to.not.be.equal(questionName);
			}).then(cb);
		} else {
			expect(qrvey.checkTextPresence('Thanks for participating!')).to.eventually.not.be.empty.and.notify(cb);
		}
	});

	Then(/^the qrvey shouldn't jump to the finish page or the next question$/, function(cb) {
		qrveyQuestionName.getAttribute('value').then(function(text) {
			logger.log('qrveys.text', text);
		}).then(cb);
	});

	Then(/^the next question or the done page should be displayed$/, function(cb) {
		if (element(by.binding('question.text')).isDisplayed()) {
			element(by.binding('question.text')).getText().then(function(questionName) {
				logger.log('qrveys.qrveyQuestionName', qrveyQuestionName);
				logger.log('qrveys.questionName', questionName);
				expect(qrveyQuestionName).to.not.be.equal(questionName);
			}).then(cb);
		} else {
			brw.wait(EC.elementToBeClickable($('.spec-user-email-field-confirm')), 5000).then(cb);
			//expect(qrvey.checkTextPresence("Thanks for participating!")).to.eventually.not.be.empty.and.notify(cb);
		}
	});
};
