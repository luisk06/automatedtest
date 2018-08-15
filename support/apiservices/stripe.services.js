'use strict';

var StripeServices = function() {

	this.setPlan = function(planText) {
		var defer = protractor.promise.defer();
		var planId = this.getPlanId(planText);
		var options = {
			url: '/api/v3/localdevpapi/user/changeplan',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'planId': planId
			},
			json: true
		};

		rs.sendInfo(options, function (_resp) {
			// console.log(_resp);
			try {
				if (_resp.status == 200){
					// console.log(_resp.message);
					return defer.fulfill();
				}
			} catch (err) {
				//
				console.log('err', err);
			}

			logger.error('Error, no response in setPlan function.');
			logger.error(_resp);

			throw new Error(_resp);
		});

		return defer.promise;
	};

	this.getPlanId = function(planText){
		var _plan = (env === 'dev') ? 'dev' : 'stg';

		if (planText == 'basic') return 'qrvey-basic-' + _plan;
		else if (planText == 'standard') return 'qrvey-standard-' + _plan;
		else throw new Error('The ' + planText + ' plan is undefined');
	};

	this.subscribe = function(){
		var defer = protractor.promise.defer();
		var options = {
			url: '/api/user/subscribe',
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'token': 'tok_visa' // tok_visa or tok_1B3sQdDbcyZ76uLNcXyUFE7t
			},
			json: true
		};

		rs.sendInfo(options, function(_resp) {
			try {
				if(_resp.status == 200 && _resp.info) return defer.fulfill();
			} catch (err) {
				//
			}

			logger.error('Error, no response in subscribe function.');
			logger.error(_resp);

			throw new Error(_resp);
		});

		return defer.promise;
	};
};

module.exports = new StripeServices();