var _baseUrl = 'https://automatedqastg.qrvey.com',
	_bsUser = require('./../support/config/config.browserstack').userBs,
	_bsKey = require('./../support/config/config.browserstack').keyBs;

//Selenium fast add-on
// require('./support/fast-selenium');

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

		// disableNgAnimate
		// require('./support/disableNgAnimate');

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
		browser.driver.getSession().then(function(session) {
			console.log('SauceOnDemandSessionID=' + session.getId() + 'job-name=IDAM v2 - Protractor Test Suite');
		});
	}
};

exports.config = $config;
