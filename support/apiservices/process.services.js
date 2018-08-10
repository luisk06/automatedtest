'use strict';

var ProcessService = function() {

	this.validField = function(_field, _name, _nameFunction) {
		if (typeof _field === 'undefined') {
			throw 'Undefined ' + _name + ' of Qrvey in ' + _nameFunction + ' function';
		}

		return this;
	};

	this.create = function(_name, _description, _appid) {
		this.validField(_name, 'name', 'create');
		this.validField(_description, 'description', 'create');

		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/automatiq/process',
				data: {
					name: _name,
					appid: _appid
					//description: _description
				},
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			};

		rs.sendInfo(options, function(_resp) {
			try {
				_resp = JSON.parse(_resp);

				if (_resp.status == 'NOT_RUNNING') {
					return defer.fulfill(_resp);
				}

				var msj = 'Error, qrvey is not NOT_RUNNING status in create function.';
				logger.error(msj);
				throw msj;
			} catch (err) {
				logger.error('Error, no response in create function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

	this.update = function(_userID, _processID, _qrveyObject) {
		this.validField(_userID, 'userID', 'update');
		this.validField(_processID, 'qrveyID', 'update');
		this.validField(_qrveyObject, 'qrveyModel', 'update');

		_qrveyObject.processid = _processID;
		_qrveyObject.userid = _userID;

		var defer = protractor.promise.defer(),
			dataQrvey = JSON.stringify(_qrveyObject),
			options = {
				method: 'PUT',
				url: '/api/automatiq/process/' + _processID,
				data: dataQrvey
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in update function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

	this.createsProcess = function(_type, _sw, _appid, _url) {
		var defer = protractor.promise.defer(),
			_qrveyObj = null,
			_this = this,
			_name = 'Process ' + (_type ? _type + ' ' : null) + 'by API';

		this.create(_name, 'Null', _appid).then(function(_data) {
			_qrveyObj = findModel('process_' + _type);

			logger.log('_data', _data);

			_data.action = 'on_Save';
			_data.triggers.push(_qrveyObj.triggers[0]);

			if (_type == 'scheduling' || _sw === true) {
				_data.body.push({
					'type': 'ACTION'
				});
			}

			if (_type == 'webhook' && _url != null) {
				_data.body.push({
					'type': 'WEBHOOK',
					'url': _url
				});
			}

			logger.log('_data', _data);

			return _this.update(userIDT, _data.processid, _data);
		})
		.then(function(_data) {
			logger.log('data:', _data);
			return defer.fulfill();
		})
		.catch(function(){
			defer.reject();
		});

		return defer.promise;
	};

	this.getWebhookUrl = function(){
		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/api/automatiq/process/T4teu5h/webhooks'
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in getAll styles function.');
				logger.error(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};
};

module.exports = new ProcessService();
