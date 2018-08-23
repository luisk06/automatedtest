global.user = require('./helpers/user');
global.chai = require('chai');
global.sugar = require('./helpers/cucumber_sugar');

global.qrvey = require('./helpers/qrvey_helpers');
global.navigate = require('./helpers/navigate');
global.user_login = require('./helpers/user_login');
global.world = require('./helpers/world');
global.profile = require('./helpers/profile');
global.err = require('./helpers/errors');
global.logger = require('./helpers/logger');
global.configer = require('./config/config');
global.moment = require('moment');
global.utils = require('./helpers/util');
global.fs = require('fs');
global.glob = require('glob');
global.request = require('request');
global.unders = require('underscore');
global._ = require('lodash');
global.async = require('async');
global.dropFile = require('./helpers/drop-file.js');

// NewOnes
global.webpage = require('./helpers/webpage');
global.taker = require('./helpers/taker');
global.maker = require('./helpers/maker');
global.dos = require('./helpers/do');

// Random Answers Module
global.rand = require('./helpers/random');

//New
// global.glob('./support/apiservices/*.js', function (er, files) {
// 	console.log('matches', global);
// });
global.sqCommon = require('./apiservices/qcommon.services');
global.rs = require('./apiservices/request.services');
global.qs = require('./apiservices/qrvey.services');
global.mas = require('./apiservices/multipleAnswers.services');
global.as = require('./apiservices/answers.services');
global.pgs = require('./apiservices/pages.services');
global.ps = require('./apiservices/process.services');
global.cs = require('./apiservices/contacts.services');
global.ss = require('./apiservices/styles.services');
global.ds = require('./apiservices/dashboardan.services');
global.ws = require('./apiservices/widget.services');
global.prs = require('./apiservices/publicResults.services');
global.stripe = require('./apiservices/stripe.services');
global.apps = require('./apiservices/application.services');
global.us = require('./apiservices/users.services');
global.dts = require('./apiservices/dataloader.services');
global.ms = require('./apiservices/metrics.services');

// Alias
global._this = user;
global.expect = chai.expect;
global.EC = protractor.ExpectedConditions;

// Vars
global.brw = browser;
global.appID = null;
global.datalsetID = null;
global.appNAME = null;
global.appDESCRIPTION = null;
global.deferred = null;
global.isMobile = false;
global.scorePage = false;
global.isRemote = false;
global.hasAnswers = true;
global.qrveyURL = '';
global.qrveyIDForWidget = '';
global.nameOfScenarios = [];
global.counterTests = 0;
global.webhookURL = '';
global.pagesURL = '';
global.qrveyIdForIframe = '';
global.currentUrl = '';
global.runAnyTest = false;

//Gherking
global.Given = null;
global.When = null;
global.Then = null;