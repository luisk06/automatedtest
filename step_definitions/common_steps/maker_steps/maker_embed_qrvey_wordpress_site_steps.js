'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user opens the "([^"]*)" dashboard$/, function(site, cb) {
		var _url = '';

		if (site == 'wordpress') {
			_url = 'http://107.22.43.223/wp-admin/widgets.php';
		} else if (site == 'squarespace') {
			_url = 'https://amit-bhatnagar-b9tk.squarespace.com/config/settings/advanced/injection';
		}

		skipSync(true);
		webpage.waits(2500);
		webpage.openUrl(_url, true).then(cb);
	});

	When(/^the user makes login into "([^"]*)" dashboard$/, function(site, cb) {
		if (site == 'wordpress') {
			element(by.css('#user_login')).sendKeys('user');
			element(by.css('#user_pass')).sendKeys('XeKKO1n93TD1');
			element(by.css('#wp-submit')).click().then(cb);
		} else if (site == 'squarespace') {
			element(by.css('.sqs-email-text-content input')).sendKeys('amit@qrvey.com');
			element(by.css('.sqs-text-content input')).sendKeys('NkCyzuotx');
			user.findsAll('.buttons .button').get(1).click().then(cb);
		}
	});

	When(/^the user opens the "([^"]*)" widget form in wordpress dashboard$/, function(typeOfWidget, cb) {
		element(by.css('a.current')).click();
		element(by.css('#widget-17_qrvey' + typeOfWidget + 'widget-4')).click().then(cb);
	});

	When(/^the user send the qrvey data and save$/, function(cb) {
		user.findsAll('.widget-content tr td input').get(2).clear().sendKeys(qrveyIDForWidget);
		user.findsAll('.widget-content tr td input').get(3).clear().sendKeys('https://automatedqastg.qrvey.com/api');
		element(by.css('#widget-qrveyincontextwidget-4-savewidget')).click().then(cb);
	});

	When(/^the user opens the "([^"]*)" page with embedded qrvey$/, function(site, cb) {
		var _url = '';

		if (process.env.SERVER == 'dev') _baseUrl = 'https://qdev.qrvey.com';
		else if (process.env.SERVER == 'qa') _baseUrl = 'https://qastg.qrvey.com';
		else if (process.env.SERVER == 'staging') _baseUrl = 'https://qstg.qrvey.com';
		else if (process.env.SERVER == 'manual') _baseUrl = 'https://manualqastg.qrvey.com';
		else if (process.env.SERVER == 'automated') _baseUrl = 'https://automatedqastg.qrvey.com';

		if (site == 'wordpress') {
			_url = 'http://107.22.43.223';
		} else if (site == 'squarespace') {
			_url = 'https://amit-bhatnagar-b9tk.squarespace.com?q=' + qrveyIDForWidget + '&server=' + server + '&widget=incontext';
		} else if (site == 'tumblr') {
			_url = 'https://testqrveyco.tumblr.com/index.html?q=' + qrveyIDForWidget + '&server=' + server + '&widget=incontext';
		} else if (site == 'wix') {
			_url = 'https://carlosvibanco.wixsite.com/qrveyapp?q=' + qrveyIDForWidget + '&server=' + server + '&widget=incontext';
		}

		skipSync(true);

		webpage.waits(2500).then(function() {
			logger.log('site');
			webpage.openUrl(_url, true).then(cb);
		});

		if (site == 'wix') {
			brw.switchTo().frame(1);
			logger.log('WIX site');
		}
	});

	Then(/^the embed window should be hidden$/, function(cb) {
		var el = '.button.yellow';

		webpage.waitsFor('.button.yellow');

		element(by.css(el)).click().then(function(_isdisplayed) {
			expect(_isdisplayed).to.be.false.and.notify(cb);
		},
		function() {
			cb();
		});
	});
};