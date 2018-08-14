'use strict';

var DataloaderService = function() {

	var esHost = (env != 'dev') ? 'https://search-qrvey-stagin-mnceo4hoqvwrr7xf7gx44gnfc4.us-east-1.es.amazonaws.com' : 'https://search-dev-datarouter-gmxema2ksexyzucvofzz7qu6zi.us-east-1.es.amazonaws.com';
	var esIndex = (env != 'dev') ? 'flights2018-q1' : 'flightsdata093';

	this.createDataloader = function(_name, _description) {

		_name = (typeof _name !== 'undefined')? _name : 'The Dataloader name';
		_description = (typeof _description !== 'undefined')? _description : 'The Dataloader description';

		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/dataloader',
				data: {
					'name': _name,
					'description': _description,
					'totalAnswersRows': 0,
					'numResponses': 0,
					'savingAnswers':false
				},
				headers: {
					'content-type': 'application/json'
				}
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in createDataloader function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.getES = function (qrveyId) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/api/qrvey/' + qrveyId,
				headers: {
					'content-type': 'application/json'
				},
				json: true
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in getES function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.createES = function (_appId, _name, _description) {
		// console.log('running createES');

		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/v3/app/' + _appId + '/qollect/dataloader/elasticsearch',
				data: {
					'name': _name || 'Untitled Dataset',
					'description': _description || '',
					'numResponses': 0,
					'savingAnswers': false,
					'totalAnswersRows': 0
				},
				headers: {
					'content-type': 'application/json'
				},
				json: true
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in createES function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.testConnectionES = function(url){
		// console.log('running testConnectionES');

		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/v3/qollect/dataloader/elasticsearch/testconnection',
				data: {
					'connectionData': {
						'host': url || esHost
					}
				},
				headers: {
					'content-type': 'application/json'
				},
				json: true
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in testConnectionES function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.getIndexesES = function(url){
		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/v3/qollect/dataloader/elasticsearch/getindexes',
				data: {
					'connectionData': {
						'host': url || esHost
					}
				},
				headers: {
					'content-type': 'application/json'
				},
				json: true
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in getIndexesES function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.getIndexTypesES = function(url, index){
		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/v3/qollect/dataloader/elasticsearch/getindextypes',
				data: {
					'connectionData': {
						'host': url || esHost,
						'index': index || esIndex,
					}
				},
				headers: {
					'content-type': 'application/json'
				},
				json: true
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in getIndexTypesES function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.getQuestionModelES = function (type, index, url){
		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/v3/qollect/dataloader/elasticsearch/getquestionmodel',
				data: {
					'connectionData': {
						'host': url || esHost,
						'index': index || esIndex,
						'type': type || 'aType'
					}
				},
				headers: {
					'content-type': 'application/json'
				},
				json: true
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in getQuestionModelES function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.activateES = function (_appId, _dataId, _data){
		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/v3/app/' + _appId + '/qollect/dataloader/elasticsearch/' + _dataId + '/activate',
				data: _data,
				headers: {
					'content-type': 'application/json'
				},
				json: true
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(_resp);
			} catch (err) {
				logger.error('Error, no response in getQuestionModel function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.transforColumns = function (_columns){
		var temp = [];

		_columns.forEach(function (elem) {
			var numberType, questionObj;

			if (elem.type.indexOf('NUMERIC') > - 1) {
				numberType = elem.type.split('-')[1];

				// console.log(numberType);

				if (numberType == 'C') {
					numberType = 'Currency';
				} else if (numberType == 'P') {
					numberType = 'Percentage';
				} else if (numberType == 'G' || !numberType) {
					numberType = 'General';
				}
			}

			questionObj = JSON.parse(JSON.stringify(elem));
			questionObj['text'] = elem.displayName;
			questionObj['displayName'] = elem.displayName;
			questionObj['answers'] = [];
			questionObj['id'] = (elem.id || randomId());
			questionObj['time'] = 4;
			questionObj['auxText'] = elem.displayName;

			if (elem.type == 'NUMERIC') {
				questionObj['numberType'] = numberType;
				questionObj['type'] = 'NUMERIC';
			}

			temp.push(questionObj);
		});

		return temp;
	};

	this.uploadFile = function(_styleID) {
		var defer = protractor.promise.defer(),
			options = {
				method: 'DELETE',
				url: '/api/styles/' + _styleID,
			};

		rs.sendInfo(options, function(_resp) {
			try {
				return defer.fulfill();
			} catch (err) {
				logger.error('Error, no response in uploadFile function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.elasticsearch = function (_appId, _user, _name){
		var defer = protractor.promise.defer(),
			_this = this,
			dataID = '',
			questionData = [];

		console.log('_appId', _appId);
		this.createES(_appId, _name)
			.then(function (data) {
				console.log('data', data);

				dataID = data.qrveyid;
				return _this.testConnectionES();
			})
			.then(function () {
				return _this.getIndexesES();
			})
			.then(function () {
				return _this.getIndexTypesES();
			})
			.then(function (type) {
				return _this.getQuestionModelES(type);
			})
			.then(function (dataModel) {
				questionData = _this.transforColumns(dataModel.columns);
				console.log('dataID', dataID);
				return _this.getES(dataID);
			})
			.then(function (dataES) {
				dataES.questions.data = questionData;
				dataES.connection = {
					'connectionData': {
						'host': esHost,
						'index': esIndex,
						'type': 'aType'
					}
				};
				return _this.activateES(_appId, dataID, dataES);
			})
			.then(function (data) {
				return defer.fulfill(data);
			})
			.catch(function () {
				defer.reject();
			});

		return defer.promise;
	};

	this.elasticsearchAsDraft = function (_appId, _user, _name){
		var defer = protractor.promise.defer();

		this.createES(_appId, _name)
			.then(function (data) {
				return defer.fulfill(data);
			})
			.catch(function () {
				defer.reject();
			});

		return defer.promise;
	};

	this.dataloader = function (_appId, _user, _name){
		console.log(_name);
	};

	this.createDataset = function (_appId, _user, _type, _state, _name){
		var defer = protractor.promise.defer(),
			_this = this;

		console.log('_appId', _appId);

		us.isLogged().then(function () {
			if (_type === 'elasticsearch') {
				logger.log('create a elasticsearch');
				logger.log('_state', _state);

				if(typeof _state === 'undefined' || _state == 'active'){
					return _this.elasticsearch(_appId, _user, _name);
				} else if (_state == 'draft'){
					return _this.elasticsearchAsDraft(_appId, _user, _name);
				} else throw new Error('Type is undefined or ilegal string: ' + _state);
			} else if (_type == 'dataloader') {
				logger.log('create a dataloader');
				return _this.dataloader(_appId, _user, _name);
			} else throw new Error('Type is undefined or ilegal string: ' + _type);
		})
			.then(function (_data) {
				logger.log('Finish the creating a ' + _type);
				defer.fulfill(_data);
			})
			.catch(function () {
				defer.reject();
			});

		return defer.promise;
	};
};

module.exports = new DataloaderService();
