'use strict';

var UserService = function () {
	this._status = false;
	this._defered = protractor.promise.defer();

	this.create = function (obj) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				data: {
					email: configer.get('username'),
					password: configer.get('password'),
					influencerID: null,
					isMobile: false
				},
				headers: {
					'content-type': 'application/json'
				}
			};

		if (!obj.automation || !_.get(obj, 'automation')){
			options.url = '/register';
		} else if (obj.automation){
			options.url = '/api/v3/registerandwaitstripe';
		}

		rs.sendInfo(options, function (_resp) {
			try {
				if (_resp.status == 200) {
					return defer.fulfill(configer.get('username'));
				} else {
					logger.error('Error, no response in create function.');
					logger.error(_resp);

					throw new Error(_resp);
				}
			} catch (err) {
				logger.error('Error, no response in create function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.isLogged = function (_status) {
		if (typeof _status !== 'undefined') {
			configer.set('isLogged', _status);
			this._statusLogin = true;
			this._defered.fulfill(userIDT);
		}

		return this._defered.promise;
	};

	this.login = function (username) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/login',
				data: {
					email: username,
					password: '123456'
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			};

		rs.sendInfo(options, function (_resp) {
			if (typeof _resp === 'undefined') throw new Error('The server not response.');

			try {
				_resp = JSON.parse(_resp);

				if (_resp.status == 200) {
					logger.log('===========Loggin at API=============');
					logger.log('User is logged with LoginSerice: ', _resp.user.userid);
					logger.log('=====================================');

					return defer.fulfill(_resp.user.userid);
				} else throw new Error('Error in login function' + _resp.toString());
			} catch (err) {
				logger.error('Error, no response in login.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.setFlag = function (params) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'PUT',
				url: '/api/user/flag',
				data: params,
				headers: {
					'content-type': 'application/json'
				}
			};

		rs.sendInfo(options, function (_resp) {
			try {
				// _resp = JSON.parse(_resp);

				if (_resp.value === true) {
					return defer.fulfill(_resp);
				}
			} catch (err) {
				if (err) throw new Error(err);
			}

			logger.error('Error, no response in set flag function.');
			logger.error(_resp);
			throw new Error(_resp);
		});

		return defer.promise;
	};

	this.setActive = function () {
		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/v3/localdevpapi/user/trialtoactive',
				headers: {
					'content-type': 'application/json'
				}
			};

		rs.sendInfo(options, function (_resp) {
			try {
				_resp = JSON.parse(_resp);
				logger.log('RESP');
				logger.log(_resp);
				logger.log('STATUS', _resp.status);

				if (_resp.status == 200) {
					return defer.fulfill(_resp);
				} else {
					logger.error('Error, not changed trial account to active.');
					throw _resp;
				}
			} catch (err) {
				if (err) throw new Error(err);
			}
		});

		return defer.promise;
	};

	this.getStripeStatus = function () {
		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/api/userprofile/',
				headers: {
					'content-type': 'application/json'
				}
			};

		rs.sendInfo(options, function (_resp) {
			try {
				_resp = JSON.parse(_resp);
				logger.log('RESP');
				logger.log(_resp);
				logger.log('STATUS', _resp.subscription);
				logger.log('PLANNAME', _resp.subscription.planName);

				if (_resp.subscription.planName){
					return defer.fulfill(_resp);
				} else {
					// console.log('ELSE');
					// return this.getStripeStatus();
				}

			} catch (err) {
				// console.log('err', err);
			}

			return defer.reject();
		});

		return defer.promise;
	};

	this.getting = function (obj) {
		var defer = protractor.promise.defer(),
			tempEmail = '',
			_this = this;

		this.create(obj)
			.then(function (email) {
				tempEmail = email;
				return _this.login(email);
			})
			.then(function (userId) {
				global.userIDT = userId;

				return _this.setFlag({
					loginVerified: true
				});
			})
			.then(function () {
				return _this.setFlag({
					isTempUser: true
				});
			})
			.then(function () {
				logger.info('global.stripeStatus', global.stripeStatus);
				if (global.stripeStatus) return _this.setActive();
			})
			.then(function (data) {
				logger.log('data', data);
				_this.isLogged(true);

				return defer.fulfill({
					'email': tempEmail
				});
			})
			.catch(function () {
				defer.reject();
			});

		return defer.promise;
	};
};

module.exports = new UserService();