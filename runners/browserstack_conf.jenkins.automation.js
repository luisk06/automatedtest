var _baseUrl = '';
var _server = '';

if (process.env.SERVER == 'dev'){
	_server = _baseUrl = 'qdev';
}
else if (process.env.SERVER == 'manual'){
	_server = _baseUrl = 'manualqastg';
}
else if (process.env.SERVER == 'automated'){
	_server = _baseUrl = 'automatedqastg';
}
else if (process.env.SERVER == 'oem'){
	_server = _baseUrl = 'oemstg';
}
else { // Stg by default
	_server = _baseUrl = 'qstg';
}


var $config = {
	seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
	ignoreUncaughtExceptions: true, // to protractor v4.0.10
	baseUrl: 'https://' + _baseUrl + '.qrvey.com' + '/app/index.html#',
	capabilities: {
		'browserstack.user': process.env.BROWSERSTACK_USER,
		'browserstack.key': process.env.BROWSERSTACK_ACCESSKEY,
		'os': 'OS X',
		'os_version': 'High Sierra',
		'browserName': 'Chrome',
		'browser_version': '68.0',
		'resolution': '1920x1080',
		'name': process.env.JOB_NAME + ' in Jenkins with Chrome',
		'browserstack.chrome.driver': '2.40',
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
			'../support/helpers/*.js',
			'../support/ngModules/*.js',
			'../support/hooks/AfterFeatures.automation.js',
			'../support/hooks/afterHook.js',
			'../support/hooks/beforeHook.js',
			'../support/hooks/hooks.js'
		],
		format: 'pretty',
		tags: ['@complete', '~@widgets', '~@iframe', '~@todo', '~@tests'],
		keepAlive: false,
		'no-colors': true
	},
	onPrepare: function() {
		global.env = process.env.SERVER;
		global.server = _server;
		global.stripeStatus = (_server == 'oemstg' || _server == 'oemdev') ? false : true;

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
			'url': 'https://' + _baseUrl + '.qrvey.com',
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

		logger.info('IDAM v2 Protractor Test Suite Completed....');
		brw.driver.getSession().then(function(session) {
			console.log('SessionID=' + session.getId() + 'job-name=IDAM v2 - Protractor Test Suite');
		});
	}
};

exports.config = $config;
