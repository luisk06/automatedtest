var notifier = require('node-notifier'),
	_runAnyTest = false,
	_baseUrl = 'https://oemdev.qrvey.com';

var $config = {
	directConnect: true,
	ignoreUncaughtExceptions: false, // to protractor v4.0.10
	// seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
	baseUrl: _baseUrl + '/app/index.html#',
	capabilities: {
		'browserName': 'chrome',
		'name': 'Qrvey Test',
		'chromeOptions': {
			// 'args': ['--start-maximized', 'use-fake-ui-for-media-stream', 'incognito'],
			'args': ['--start-maximized', 'use-fake-ui-for-media-stream'],
			'prefs': {
				'profile.managed_default_content_settings.notifications': 1
			}
		}
	},
	specs: [
		'features/**/**.feature'
	],
	allScriptsTimeout: 50000,
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	cucumberOpts: {
		require: [
			'step_definitions/**/*_steps.js',
			'support/apiservices/*.js',
			'support/config/*.js',
			'support/helpers/*.js',
			'support/ngModules/*.js',
			'support/hooks/AfterFeatures.automation.js',
			'support/hooks/afterHook.js',
			'support/hooks/beforeHook.js',
			'support/hooks/hooks.js',
		],
		format: 'pretty', // format: 'json',
		tags: ['@complete', '~@widgets', '~@iframes', '~@todo', '~@tests'],
		keepAlive: false
	},
	onPrepare: function() {
		global.env = 'staging';
		global.server = 'qstg';
		global.stripeStatus = false;

		global.rootServer = 'remote';

		require('log-timestamp');

		// NgModules
		require('./support/disableNgAnimate');
		// require('./support/trackMouse');

		// Dimension for test
		browser.driver.manage().window().setSize(2440, 900);
		browser.driver.manage().window().maximize();

		// globalsVars
		require('./support/globalsVars');

		// Globals functions to the Spec
		require('./support/globalsFunctions');

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

		// General config to Widgets
		var _configW = {
			'url': 'https://qwidgets.herokuapp.com',
			'token': 'TlyeWkQ5tH4m05r3WXUqc9ILayESPlhd6hJaCut0'
		};

		// Envirotment
		configer.setup(_config);
		configer.set('environment', 'REMOTE');

		ws.config(_configW);
	},
	onComplete: function() {
		logger.log('onComplete');
		_runAnyTest = true;
	},
	onCleanUp: function() {
		if (_runAnyTest && isRemote) {
			logger.log('CleanUp!');
		}
	},
	afterLaunch: function(exitCode) {
		logger.log('afterLaunch', exitCode);

		notifier.notify({
			title: 'Qrvey',
			message: 'Finish the tests',
			icon: './UI/app/fav1.png'
		});
	}
};

exports.config = $config;