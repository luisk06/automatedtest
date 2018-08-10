var notifier = require('node-notifier'),
	_runAnyTest = false,
	_baseUrl = 'http://localhost:1234';
// _baseUrl = 'https://qstg.qrvey.com';

var $config = {
	baseUrl: _baseUrl + '/app/index.html#',
	multiCapabilities: [{
		'browserName': 'chrome',
		'name': 'chrome_apple_iphone_6',
		'chromeOptions': {
			'mobileEmulation': {
				'deviceName': 'Apple iPhone 6'
			},
			'args': ['--start-maximized'],
			'prefs': {
				'profile.managed_default_content_settings.notifications': 1
			}
		}
	},
		//  {
		//     'browserName': 'chrome',
		//     'name': 'chrome_google_nexus_5',
		//     'chromeOptions': {
		//         'mobileEmulation': {
		//             'deviceName': "Google Nexus 5"
		//         },
		//         'args': ['--start-maximized'],
		//         'prefs': {
		//             'profile.managed_default_content_settings.notifications': 1
		//         }
		//     }
		// }
	],
	maxSessions: 1,
	specs: [
		'**/**.feature'
	],
	allScriptsTimeout: 300000,
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),
	cucumberOpts: {
		require: [
			'step_definitions/**/*_steps.js',
			'support/*.js',
		],
		exclude: ['reporter.js', 'fast-selenium.js', 'disableNgAnimate.js', 'globalsVars.js', 'globalsFunctions.js'],
		format: 'pretty',
		tags: ['@complete', '~@widgets', '~@iframes', '~@widgetDesign', '~@todo', '~@tests'],
		keepAlive: false
	},
	onPrepare: function () {
		global.env = 'mobile';

		// Config
		var disableNgAnimate = function () {
				angular
					.module('disableNgAnimate', [])
					.run(['$animate', function ($animate) {
						$animate.enabled(false);
					}]);
			},
			disableCssAnimate = function () {
				angular
					.module('disableCssAnimate', [])
					.run(function () {
						var style = document.createElement('style');
						style.type = 'text/css';
						style.innerHTML = '* {' +
							'-webkit-transition: none !important;' +
							'-moz-transition: none !important' +
							'-o-transition: none !important' +
							'-ms-transition: none !important' +
							'transition: none !important' +
							'}';
						document.getElementsByTagName('head')[0].appendChild(style);
					});
			};

		browser.addMockModule('disableNgAnimate', disableNgAnimate);
		browser.addMockModule('disableCssAnimate', disableCssAnimate);

		// browser.driver.manage().window().setSize(1440, 900);
		// browser.driver.manage().window().maximize();

		// Modules
		global.user = require('./support/user');
		global.chai = require('chai');
		global.sugar = require('./support/cucumber_sugar');
		global.UserMgmt = require('../../integrations/qdataexport/lib/usermgmt');
		global.qrvey = require('./support/qrvey_helpers');
		global.navigate = require('./support/navigate');
		global.user_login = require('./support/user_login');
		global.world = require('./support/world');
		global.profile = require('./support/profile');
		global.err = require('./support/errors');
		global.logger = require('./support/logger');
		global.configer = require('./support/config');
		global.moment = require('moment');
		global.utils = require('./support/util');
		global.fs = require('fs');
		global.request = require('request');

		global.ws = require('./support/apiservices/widget.services');

		//New
		global.rs = require('./support/apiservices/request.services');
		global.ls = require('./support/apiservices/login.services');
		global.qs = require('./support/apiservices/qrvey.services');
		global.as = require('./support/apiservices/answers.services');
		global.ps = require('./support/apiservices/process.services');
		global.cs = require('./support/apiservices/contacts.services');

		// Alias
		global._this = user;
		global.expect = chai.expect;
		global.EC = protractor.ExpectedConditions;

		// Vars
		global.brw = browser;
		global.deferred = null;
		global.isMobile = true;
		global.hasAnswers = true;
		global.qrveyIDForWidget = '';
		global.nameOfScenarios = [];

		// Globals functions to the Spec
		global.hasClass = function (element, cls) {
			return element.getAttribute('class').then(function (classes) {
				return classes.split(' ').indexOf(cls) !== -1;
			});
		};

		global.findModel = function (_name) {
			return JSON.parse(fs.readFileSync('./support/models/' + _name + '.json', 'utf8'));
		};

		global.findAnswers = function (_name) {
			return JSON.parse(fs.readFileSync('./support/models/answers/' + _name + '.json', 'utf8'));
		};

		global.Array.prototype.unique = function (a) {
				return function () {
					return this.filter(a)
				}
			}
			(function (a, b, c) {
				return c.indexOf(a, b + 1) < 0
			});

		global.validField = function (_field, _name, _nameFunction) {
			if (typeof _field === 'undefined') {
				throw 'Undefined ' + _name + ' of Qrvey in ' + _nameFunction + ' function';
			}
		};

		global.findHashInUrl = function (_url) {
			return _url.substring(_url.lastIndexOf('/') + 1, _url.lenght);
		};

		// Config to promise Chai
		chai.use(require("sinon-chai"));
		chai.use(require("chai-as-promised"));

		// Config to User

		require('./support/config.user');

		// Enable logs
		logger.activeDebug(true);

		// General config to API
		var _config = {
			'url': _baseUrl,
			'username': user.validUser(),
			'password': user.validPass(),
			'token': 'TlyeWkQ5tH4m05r3WXUqc9ILayESPlhd6hJaCut0' // to Devserver
			// 'token': 'TlyeWkQ5tH4m05r3WXUqc9ILayESPlhd6hJaCut0' // to Staging
		};

		// General config to Widgets
		var _configW = {
			'url': 'https://qwidgets.herokuapp.com',
			'username': user.validUser(),
			'password': user.validPass(),
			'token': 'TlyeWkQ5tH4m05r3WXUqc9ILayESPlhd6hJaCut0', // to Devserver
			// 'token': 'TlyeWkQ5tH4m05r3WXUqc9ILayESPlhd6hJaCut0' // to Staging
		};

		configer.setup(_config);

		request = request.defaults({
			jar: true
		});

		ls.config(_config).login().then(function (_userId) {
			global.userIDT = _userId;

			ls.isLogged(true);

			logger.log('===========Loggin at API=============');
			logger.log('User is logged with LoginSerice: ', _userId);
			logger.log('=====================================');
		});

		// ws.config(_configW).login().then(function(_userId) {
		//     global.userIDW = _userIdW;
		//
		//     ws.isLogged(true);
		//
		//     logger.log('===========Loggin at API=============');
		//     logger.log('User is logged as LoginSerice: ', _userId);
		//     logger.log('=====================================');
		// });
	},
	onComplete: function (runner, log) {
		logger.log('onComplete');
		_runAnyTest = true;
	},
	onCleanUp: function (exitCode) {
		if (_runAnyTest) {
			logger.log('CleanUp!');
		}
	},
	afterLaunch: function () {
		logger.log('afterLaunch');

		notifier.notify({
			title: 'Qrvey',
			message: 'Finish the tests',
			icon: './UI/app/fav1.png'
		});
	}
};

exports.config = $config;