'use strict';

var ApplicationServices = function() {

	this.validField = function(field, name, nameFunction) {
		if (typeof field === 'undefined') {
			throw new Error('Undefined ' + name + ' of App in ' + nameFunction + ' function');
		}

		return this;
	};

	this.get = function (appId) {
		this.validField(appId, 'appId', 'get');

		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/api/' + configer.get('apiVersion') + '/app/' + appId,
				headers: {
					'content-type': 'application/json'
				}
			};

		rs.sendInfo(options, function(_resp) {
			try {
				configer.set('AppID', _resp.appid);
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in create function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.create = function(name, description) {
		this.validField(name, 'name', 'create');
		this.validField(description, 'description', 'create');

		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/' + configer.get('apiVersion') + '/app/',
				data: {
					name: name,
					description: description
				},
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			};

		rs.sendInfo(options, function(_resp) {
			try {
				_resp = JSON.parse(_resp);
				configer.set('AppID', _resp.appid);
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in create function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.sharing = function (appId, emails, name) {
		this.validField(name, 'name', 'create');

		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/' + configer.get('apiVersion') + '/app/' + appId + '/shareapp',
				data: {
					name: name,
					emails: [emails]
				},
				headers: {
					'content-type': 'application/json'
				}
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in create function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.update = function(userID, appID, appObject) {
		this.validField(userID, 'userID', 'update');
		this.validField(appID, 'appID', 'update');
		this.validField(appObject, 'appModel', 'update');

		var defer = protractor.promise.defer(),
			dataApp = JSON.stringify(appObject),
			options = {
				method: 'PUT',
				url: '/api/' + configer.get('apiVersion') + '/app/' + appID,
				data: dataApp
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in update function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.deleteAll = function() {
		var defer = protractor.promise.defer(),
			options = {
				method: 'DELETE',
				url: '/api/' + configer.get('apiVersion') + '/localdevpapi/app/deleleteallapps'
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill();
			} catch (err) {
				logger.error('Error, no response in delete function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.createNewApp = function(name, description){
		var defer = protractor.promise.defer();

		name = (typeof name === 'undefined')? rand.getWord(2) : name;
		description = (typeof description === 'undefined') ? rand.getParagraph(7) : description;

		this.create(name, description).then(function(data){
			return defer.fulfill(data);
		}).catch(function(){
			return defer.reject();
		});

		return defer.promise;
	};
};

module.exports = new ApplicationServices();
