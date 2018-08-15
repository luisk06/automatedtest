var _baseUrl = 'https://automatedqastg.qrvey.com',
	_bsUser = require('./../support/config/config.browserstack').userBs,
	_bsKey = require('./../support/config/config.browserstack').keyBs;

var $config = {
	seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
	ignoreUncaughtExceptions: true, // to protractor v4.0.10
	baseUrl: _baseUrl + '/app/index.html#',
	capabilities: {
		'browserstack.user': _bsUser,
		'browserstack.key': _bsKey,
		'os': 'OS X',
		'os_version': 'Sierra',
		'browserName': 'Chrome',
		'browser_version': '64.0',
		'resolution': '1920x1080',
		'browserstack.chrome.driver': '2.35',
		'chromeOptions': {
			'args': ['--window-size=1920,1080']
		}
	},
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
		tags: ['@complete', '~@formsMaking', '~@surveyMaking', '~@branchesMaking', '~@widgets', '~@iframes', '~@todo', '~@tests'],
		keepAlive: false
	},
	onPrepare: function() {
		global.env = 'staging';
		global.server = 'qstg';
		global.stripeStatus = true;

		global.rootServer = 'browserstack';

		// globalsVars
		require('./../support/globalsVars');
		global.chai = require('chai');

		// Globals functions to the Spec
		require('./../support/globalsFunctions');

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
		browser.driver.getSession().then(function(session) {
			console.log('SauceOnDemandSessionID=' + session.getId() + 'job-name=IDAM v2 - Protractor Test Suite');
		});
	}
};

exports.config = $config;
