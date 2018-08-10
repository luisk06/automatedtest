'use strict';

// var db = require('qrvey-common').db;
// var requestUtil = require('qrvey-common').core.requestutil;

var QCommonServices = function() {

	this.sendAnswers = function (params) {
		var qlookup = params.qlookup;
		// var qString = (params.body && params.body.qstring && params.body.qstring.nextBodyId) ? params.body.qstring : null;
		var additionalParams = requestUtil.getAdditionalParams(params);
		if (params.body.subqrveyid) additionalParams.subqrveyid = params.body.subqrveyid;
		var authentication = (params.cookies && _.has(params.cookies, 'qveypagesession')) ? params.cookies.qveypagesession : null;
		additionalParams.authentication = _.clone(authentication);

		if (params.body.linked) {
			console.log('in linked');
			db.answers.saveQrveyMultipleAnswersByLookups(params.body.answers, additionalParams, function (err, data) {
				// console.log('***************************');
				// console.log('err -> ', err);
				// console.log('Data -> ', data);
				if (err) {
					//return next(err);
					if (err.status && err.status == '402') {
						return new Error('404 not found');
					}
					else {
						console.error(err, 'failed to get qrvey model for taker');
						return new Error('failed to get qrvey model for taker');
					}
				}
				if (data && data.redirectToTaker) {
					return data;
				}
				if (data) return data;
				return null;
			});
		} else {
			db.answers.saveQrveyAnswersByLookup(qlookup, params.body, additionalParams, function (err, data) {
				// console.log('***************************');
				// console.log('err -> ', err);
				// console.log('Data -> ', data);
				if (err) {
					//return next(err);
					if (err.status && err.status == '402') {
						return null;
					}
					else {
						console.error(err, 'failed to get qrvey model for taker');
						return new Error('failed to get qrvey model for taker');
					}
				}
				if (data && data.redirectToTaker) {
					return data;
				}
				if (data) return data;
				return null;
			});
		}

		return this;
	};
};

module.exports = new QCommonServices();