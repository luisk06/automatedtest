var _baseUrl = '';

if (process.env.SERVER == 'dev') _baseUrl = 'https://qdev.qrvey.com';
else if (process.env.SERVER == 'qa') _baseUrl = 'https://qastg.qrvey.com';
else if (process.env.SERVER == 'staging') _baseUrl = 'https://qstg.qrvey.com';

//Selenium fast add-on
require('./../support/fast-selenium');

var $config = {
	seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
	ignoreUncaughtExceptions: true, // to protractor v4.0.10
	baseUrl: _baseUrl + '/app/index.html#',
	multiCapabilities: [{
		'browserstack.user': process.env.BROWSERSTACK_USER,
		'browserstack.key': process.env.BROWSERSTACK_ACCESSKEY,
		'name': process.env.JOB_NAME + '_job' + process.env.BUILD_NUMBER + '_chrome_browser_v55',
		'os': 'OS X',
		'os_version': 'Sierra',
		'browserName': 'Chrome',
		'browser_version': '68.0',
		'resolution': '1920x1080',
		'browserstack.chrome.driver': '2.40',
		'chromeOptions': {
			'args': ['--window-size=1920,1080'],
			'prefs': {
				'profile.managed_default_content_settings.notifications': 1
			}
		}
	}, {
		'browserstack.user': process.env.BROWSERSTACK_USER,
		'browserstack.key': process.env.BROWSERSTACK_ACCESSKEY,
		'name': process.env.JOB_NAME + '_job' + process.env.BUILD_NUMBER + '_firefox_browser_v55',
		'os': 'OS X',
		'os_version': 'Sierra',
		'browserName': 'firefox',
		'browser_version': '55.0',
		'resolution': '1920x1080',
		'chromeOptions': {
			'args': ['--window-size=1920,1080'],
			'prefs': {
				'profile.managed_default_content_settings.notifications': 1
			}
		}
	}],
	maxSessions: 2,
	specs: [
		'../features/**/**.feature'
	],
	allScriptsTimeout: 300000,
	getPageTimeout: 100000,
	tunnelIdentifier: 'testTunnel',
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	cucumberOpts: {
		require: [
			'../step_definitions/**/*_steps.js',
			'../support/apiservices/*.js',
			'../support/config/*.js',
			'../support/globals/*.js',
			'../support/helpers/*.js',
			'../support/ngModules/*.js',
			'../support/hooks/AfterFeatures.js',
			'../support/hooks/afterHook.js',
			'../support/hooks/beforeHook.js',
			'../support/hooks/hooks.js'
		],
		format: 'pretty',
		tags: ['@complete', '~@widgets', '~@iframes', '~@todo', '~@tests'],
		keepAlive: false,
		'no-colors': true
	},
	onPrepare: function() {
		global.env = 'staging';
		global.server = 'qstg';
		global.stripeStatus = true;

		global.rootServer = 'browserstack';
		global.chai = require('chai');

		// Config to promise Chai
		chai.use(require('sinon-chai'));
		chai.use(require('chai-as-promised'));

		// Enable logs
		logger.activateDebug(true);

		// Cross
		request = request.defaults({
			jar: true
		});

		// General config to API
		var _config = {
			'url': _baseUrl,
			'apiVersion': 'v3',
			'environment': 'STAGING',
			'password': '123456'
		};

		// Envirotment
		configer.setup(_config);
		configer.set('environment', 'SAUCE');
	},
	onComplete: function() {
		logger.log('onComplete');

		console.log('IDAM v2 Protractor Test Suite Completed....');
		brw.driver.getSession().then(function(session) {
			console.log('SessionID=' + session.getId() + 'job-name=IDAM v2 - Protractor Test Suite');
		});
	}
};

exports.config = $config;
