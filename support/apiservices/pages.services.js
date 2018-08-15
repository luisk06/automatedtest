'use strict';

var PagesService = function() {

	this.validField = function(_field, _name, _nameFunction) {
		if (typeof _field === 'undefined') {
			throw new Error('Undefined ' + _name + ' of Qrvey in ' + _nameFunction + ' function');
		}

		return this;
	};

	this.create = function (_name, _description, _type, _appid) {
		this.validField(_name, 'name', 'create');

		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/' + configer.get('apiVersion') + '/app/' + _appid + '/automatiq/page',
				data: {
					appid: _appid,
					name: _name,
					description: _description,
					authentication: (typeof _type === 'undefined') ? 'PUBLIC' : ''
				},
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			};

		rs.sendInfo(options, function(_resp) {
			try {
				_resp = JSON.parse(_resp);
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in create function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.update = function (userId, userEmail, pageId, _qrveyObject, _appid) {
		this.validField(pageId, 'pageId', 'update');
		this.validField(userId, 'userId', 'update');
		this.validField(userEmail, 'userEmail', 'update');
		this.validField(_qrveyObject, 'qrveyModel', 'update');

		_qrveyObject.pageid = pageId;
		_qrveyObject.userid = userId;
		_qrveyObject.userEmail = userEmail;
		_qrveyObject.appid = _appid;

		// console.log('_qrveyObject', _qrveyObject);
		// console.log('_qrveyObject with stringify', JSON.stringify(_qrveyObject));

		var defer = protractor.promise.defer(),
			dataQrvey = JSON.stringify(_qrveyObject),
			options = {
				method: 'PUT',
				url: '/api/' + configer.get('apiVersion') + '/app/' + _appid + '/automatiq/page/' + pageId,
				data: dataQrvey
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

	this.deleteAll = function(_appID) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'DELETE',
				url: '/api/' + configer.get('apiVersion') + '/localdevpapi/app/' + _appID + '/automatiq/pages'
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

	this.createsPages = function (_type, _appID, _state, _isStartPage) {
		var defer = protractor.promise.defer(),
			_qrveyObj = null,
			_this = this,
			_name = 'Page with ' + (_type ? _type : null) + ' by API';

		this.create(_name, 'Null', undefined, _appID).then(function(_data) {
			_qrveyObj = findModel('pages/' + _type);

			if (typeof _state === 'undefined') _data.action = 'ON_SAVE';
			else if (typeof _state !== 'undefined' && _state == 'activate') _data.action = 'ON_ACTIVATE';

			if (typeof _isStartPage !== 'undefined'){
				_data.isStartPage = true;
				_data.isValid = true;
				_data.navBar = true;

				apps.get(_appID).then(function(appData){
					// console.log('appData', appData);

					appData = JSON.parse(appData).appInfo;
					// var app = JSON.stringify(_data);

					appData.pages = [];
					appData.pages.push(_data);
					appData.status = 'RUNNING';

					return apps.update(_data.userid, _appID, appData);
				}).then(function () {
					// console.log('resp', resp);
				}).catch(function () {
					defer.reject();
				});
			}

			_data.body = _qrveyObj.body;

			// console.log('_data', _data);
			// console.log('pageid', _data.pageid);

			return _this.update(userIDT, _data.userEmail, _data.pageid, _data, _appID);
		}).then(function(_data) {
			logger.log('data:', _data);

			return defer.fulfill();
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};
};

module.exports = new PagesService();
