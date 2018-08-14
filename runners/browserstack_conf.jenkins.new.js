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
		'browser_version': '55.0',
		'resolution': '1920x1080',
		'browserstack.chrome.driver': '2.29',
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

		// disableNgAnimate
		// require('./support/disableNgAnimate');

		// globalsVars
		// require('./support/globalsVars');
		global.chai = require('chai');

		// Globals functions to the Spec
		// require('./support/globalsFunctions');

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
			// 'username': 'testingqrvey+' + randomId() + '@gmail.com',
			'password': '123456'
		};

		// General config to Widgets
		// var _configW = {
		// 	'url': 'https://qwidgets.herokuapp.com',
		// 	'token': 'TlyeWkQ5tH4m05r3WXUqc9ILayESPlhd6hJaCut0'
		// };

		// Envirotment
		configer.setup(_config);
		configer.set('environment', 'SAUCE');

		// Config to User
		// us.getting().then(function(userInfo){
		// 	console.log('userInfo', userInfo);

		// 	user.setSetting('validUser', configer.get('username'));
		// 	user.setSetting('validPass', configer.get('password'));

		// 	ws.config(_configW);
		// });
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
