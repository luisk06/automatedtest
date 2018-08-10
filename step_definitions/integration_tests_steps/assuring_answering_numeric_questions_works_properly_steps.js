'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var qrveyUrl = null;
	var userPass = '123456';

	Given(/^that there is a qrvey with a numeric question$/, function(cb) {
		brw.driver.manage().deleteAllCookies();
		navigate.goToUrl(brw.baseUrl);
		user_login.login(configer.get('username'), userPass);
		qrvey.createQrvey('Assuring numeric question works properly test qrvey', 'Assuring the numeric repetitive bugs will not continue to show up');
		qrvey.questionType('spec_nu_qt');
		qrvey.fillNumericQuestion('what is your favorite number of testing tests?');
		brw.sleep(1000);
		expect(qrvey.checkQrveyPresence('what is your favorite number of testing tests?')).to.eventually.be.true;
		qrvey.activeQrvey('\'' + 'Social' + '\'');
		var url = $('.spec-qrvey-url-share');
		var isVisible = EC.elementToBeClickable(url);
		brw.wait(isVisible, 5000); //wait for an element to become clickable
		url.getAttribute('value').then(function(url) {
			qrveyUrl = url;
			logger.log('new qrvey url: ', url);
		}).then(cb);
	});

	Given(/^that the user is answering a numeric question$/, function(cb) {
		brw.ignoreSynchronization = true;
		logger.log('accesing qrvey url: ', qrveyUrl);
		brw.get(qrveyUrl).then(function() {
			qrvey.pressTakeQrvey().then(function() {
				element(by.binding('question.text')).getText().then(function(questionName) {
					//logger.log(e);
					qrvey.setQrveyQuestionName(questionName);
					cb();
				}).then(cb);
			});
		});
	});

	Given(/^that there is a qrvey with an optional numeric question$/, function(cb) {
		brw.driver.manage().deleteAllCookies();
		navigate.goToUrl(brw.baseUrl);
		user_login.login(configer.get('username'), userPass);
		qrvey.createQrvey('Assuring numeric question works properly test qrvey', 'Assuring the repetitive bugs will not continue to show up');
		qrvey.questionType('spec_nu_qt');
		qrvey.fillDateQuestion('what is your favorite number for testing numbers?');
		navigate.clicksButton('.spec-dropdown-0');
		navigate.clicksButton('.change-require-question-0');
		qrvey.addQuestion();
		navigate.sendKeys('.spec-edit-question-name-1', 'what are your favorite choices for testing?');
		navigate.sendKeys('.spec-multichoice-question-1-option-0', 'this one?');
		navigate.sendKeys('.spec-multichoice-question-1-option-1', 'or rather this one?');
		expect(qrvey.checkQrveyPresence('what is your favorite number for testing numbers?')).to.eventually.be.true;
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

	When(/^the user writes in the input letters or invalid chars$/, function(cb) {
		user.waits(5000).then(function() {
			navigate.sendKeys('.spec-taker-answer-numeric-question', '&éeç!uoifsdp^ù::`^sfnvrh').then(cb);
		});
	});

	When(/^the user writes in the input a valid number$/, function(cb) {
		user.waits(5000).then(function() {
			navigate.sendKeys('.spec-taker-answer-numeric-question', '50').then(cb);
		});
	});

	Given(/^that there is a qrvey with a numeric question that allows decimals but has no min max$/, function(cb) {
		brw.driver.manage().deleteAllCookies();
		navigate.goToUrl(brw.baseUrl);
		user_login.login(configer.get('username'), userPass);
		qrvey.createQrvey('Assuring numeric question works properly test qrvey', 'Assuring the numeric repetitive bugs will not continue to show up');
		qrvey.questionType('spec_nu_qt');
		qrvey.fillNumericQuestion('what is your favorite number of testing tests?');
		element(by.css('.spec-maker-allow-decimals')).click();
		//navigate.clicksButton('.spec-maker-allow-decimals');
		expect(qrvey.checkQrveyPresence('what is your favorite number of testing tests?')).to.eventually.be.true;
		qrvey.activeQrvey('\'' + 'Social' + '\'');
		var url = $('.spec-qrvey-url-share');
		var isVisible = EC.elementToBeClickable(url);
		brw.wait(isVisible, 5000); //wait for an element to become clickable
		brw.sleep(2000);
		url.getAttribute('value').then(function(url) {
			qrveyUrl = url;
			logger.log('new qrvey url: ', url);
		}).then(cb);
	});

	When(/^the user writes in the input a number with more than one decimal symbol$/, function(cb) {
		user.waits(5000).then(function() {
			navigate.sendKeys('.spec-taker-answer-numeric-question', '24..434').then(cb);
		});
	});

	When(/^the user writes in the input a number with one decimal symbol$/, function(cb) {
		user.waits(5000).then(function() {
			navigate.sendKeys('.spec-taker-answer-numeric-question', '5.42324').then(cb);
		});
	});
};
