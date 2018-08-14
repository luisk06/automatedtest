'use strict';

var QrveyService = function () {

	this.validField = function (_field, _name, _nameFunction) {
		if (typeof _field === 'undefined') {
			throw new Error('Undefined ' + _name + ' of Qrvey in ' + _nameFunction + ' function');
		}

		return this;
	};

	this.get = function (appId, _qrveyId, typeOfQrvey) {
		this.validField(appId, 'appId', 'get');
		this.validField(_qrveyId, 'qrveyId', 'get');

		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/api/' + configer.get('apiVersion') + '/app/' + appId + '/qollect/' + typeOfQrvey + '/' + _qrveyId,
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in create function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.create = function (appId, _name, _description) {
		this.validField(appId, 'appId', 'create');
		this.validField(_name, 'name', 'create');

		if (configer.get('typeOfQrvey') == 'qrvey') configer.set('typeOfQrvey', 'survey');

		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/api/' + configer.get('apiVersion') + '/app/' + appId + '/qollect/' + configer.get('typeOfQrvey'),
				data: {
					name: _name,
					description: _description
				},
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				}
			};

		rs.sendInfo(options, function (_resp) {
			try {
				_resp = JSON.parse(_resp);

				if (_resp.status == 'IN_PROGRESS') {
					return defer.fulfill(_resp);
				}

				var msj = 'Error, qrvey is not IN_PROGRESS status in create function.';
				logger.error(msj);
				throw new Error(msj);
			} catch (err) {
				logger.error('Error, no response in create function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.rightQuestionsQuiz = function (_qrveyObject) {
		/* to review */ /* no Async function */
		async.each(_qrveyObject.questions.data, function (item, next) {
			item.score = 1;

			if (item.type == 'NUMERIC') {
				item.time = 10;
				item.right_answer = 10;
			} else if (item.type == 'SINGLE_CHOICE' || item.type == 'IMAGE') {
				item.right_answer = item.answers[0].answerid;
			} else if (item.type == 'DATE') {
				item.right_answer = getDateFormat(new Date());
				logger.info('DATE', item.right_answer);
			} else if (item.type == 'YES_NO') {
				item.right_answer = 'Yes';
			}
			next();
		}, function (err) {
			if (err) throw new Error('Error choosing right question on quiz, ' + err);
		});
	};

	this.update = function (appId, _userID, _qrveyID, _qrveyObject) {
		this.validField(appId, 'appId', 'update');
		this.validField(_userID, 'userID', 'update');
		this.validField(_qrveyID, 'qrveyID', 'update');
		this.validField(_qrveyObject, 'qrveyModel', 'update');

		_qrveyObject.qrveyid = _qrveyID;
		_qrveyObject.userid = _userID;
		_qrveyObject.appid = appId;
		_qrveyObject.introPage = true;

		switch (configer.get('typeOfQrvey')) {
			case null:
			case undefined:
				throw new Error('This options is undefined or null');
			case 'qrvey':
				_qrveyObject.appType = 'SURVEY';
				break;
			default:
				_qrveyObject.appType = configer.get('typeOfQrvey').toUpperCase();
		}

		if (configer.get('typeOfQrvey') == 'quiz') {
			this.rightQuestionsQuiz(_qrveyObject);
		}

		var defer = protractor.promise.defer(),
			dataQrvey = JSON.stringify(_qrveyObject),
			options = {
				method: 'PUT',
				url: '/api/' + configer.get('apiVersion') + '/app/' + appId + '/qollect/' + configer.get('typeOfQrvey') + '/' + _qrveyID,
				// url: '/api/' + configer.get('typeOfQrvey') + '/' + _qrveyID
				data: dataQrvey
			};

		rs.sendInfo(options, function (_resp) {
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

	this.activate = function (appId, _qrveyID, _qrveyObject) {
		this.validField(appId, 'appId', 'activate');
		this.validField(_qrveyID, 'qrveyID', 'activate');
		this.validField(_qrveyObject, 'qrveyObject', 'activate');

		// if (configer.get('typeOfQrvey') == 'qrvey') {
		//     var _url = '/api/sendqrvey/' + _qrveyID;
		// } else {
		//     var _url = '/api/' + configer.get('typeOfQrvey') + '/' + _qrveyID + '/activate';
		// }

		var _url = '/api/' + configer.get('apiVersion') + '/app/' + appId + '/qollect/' + configer.get('typeOfQrvey') + '/' + _qrveyID + '/activate';

		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: _url,
				data: _qrveyObject
			};

		rs.sendInfo(options, function (_resp) {
			try {
				if (_resp.substring(0, 1) === '{') {
					return defer.fulfill(JSON.parse(_resp));
				}
			} catch (err) {
				logger.error('Error, no response in activate function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.activateQuestion = function (appId) { // Only polling questions
		this.validField(appId, 'appId', 'activateQuestion');

		var _qrveyId = configer.get('QrveyId'),
			_questionId = configer.get('QrveyAnswerId'),
			defer = protractor.promise.defer(),
			dataQrvey = JSON.stringify({
				'activeQuestionID': _questionId
			}),
			options = {
				method: 'PUT',
				url: '/api/' + configer.get('apiVersion') + '/app/' + appId + '/qollect/audiencepoll/' + _qrveyId + '/activequestion',
				// url: '/api/audiencepoll/' + _qrveyId + '/activequestion',
				data: dataQrvey
			};

		logger.log('_qrveyId:', _qrveyId);
		logger.log('_questionId:', _questionId);

		rs.sendInfo(options, function (_resp) {
			logger.log('========ActivePollQuestion===========');
			logger.info('data: ', _resp);
			logger.log('=================================');

			try {
				// return defer.fulfill(JSON.parse(_resp));
				return defer.fulfill();
			} catch (err) {
				logger.error('Error, no response in activateQuestion function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.getUrlResponse = function (_url) {
		this.validField(_url, 'url', 'getUrlResponse');

		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: _url,
				headers: {
					'Content-Type': 'application/json'
				}
			};

		rs.sendCustomUrlInfo(options, function (_resp) {
			try {
				return defer.fulfill();
			} catch (err) {
				logger.error('Error, no response.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.shared = function (appId, _qrveyID) {
		this.validField(appId, 'appId', 'shared');
		this.validField(_qrveyID, 'qrveyID', 'shared');

		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				// url: '/api/' + configer.get('typeOfQrvey') + '/' + _qrveyID + '/url'
				url: '/api/' + configer.get('apiVersion') + '/app/' + appId + '/qollect/' + configer.get('typeOfQrvey') + '/url'
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in shared function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.delete = function (appId, _qrveyID) {
		this.validField(appId, 'appId', 'delete');
		this.validField(_qrveyID, 'qrveyID', 'delete');

		var defer = protractor.promise.defer(),
			options = {
				method: 'DELETE',
				url: '/api/' + configer.get('apiVersion') + '/app/' + appId + '/qollect/' + configer.get('typeOfQrvey') + '/' + _qrveyID
				// url: '/api/qrvey/' + _qrveyID
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp).qrveyid);
			} catch (err) {
				logger.error('Error, no response in delete function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.finish = function (appId, _qrveyID) {
		this.validField(appId, 'appId', 'finish');
		this.validField(_qrveyID, 'qrveyID', 'finish');

		var defer = protractor.promise.defer(),
			options = {
				method: 'PUT',
				url: '/api/' + configer.get('apiVersion') + '/app/' + appId + '/qollect/' + configer.get('typeOfQrvey') + '/' + _qrveyID + '/status/3'
				// url: '/api/qrvey/' + _qrveyID + '/status/3'
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in shared function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.getTempCode = function (appId, _qrveyID) {
		this.validField(appId, 'appId', 'getTempCode');
		this.validField(_qrveyID, 'qrveyID', 'getTempCode');

		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/api/' + configer.get('apiVersion') + '/app/' + appId + '/qollect/' + configer.get('typeOfQrvey') + '/' + _qrveyID + '/tempcode'
				// url: '/api/' + configer.get('typeOfQrvey') + '/' + configer.get('QrveyId') + '/tempcode'
			};

		rs.sendInfo(options, function (_resp) {
			try {
				return defer.fulfill(JSON.parse(_resp));
			} catch (err) {
				logger.error('Error, no response in shared function.');
				logger.error(_resp);

				throw new Error(_resp);
			}
		});

		return defer.promise;
	};

	this.createQuestionAsActive = function (_appId, _user, _nameTypeQuestion, _extraOptions, _type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description',
			qrveyObj = findModel(_nameTypeQuestion),
			_tempQrveyId = '',
			tempModel = null;

		qrveyObj.status = 'IN_PROGRESS';

		// logger.log('qrveyObj', qrveyObj);

		// configer.set('QrveyId', 'Non created');
		if (_nameTypeQuestion.includes('numeric') && typeof _extraOptions !== 'undefined') {
			if (typeof _extraOptions.decimal !== 'undefined') {
				logger.log('NUMERIC WITH DECIMALS');
				qrveyObj.questions.data[0].allowDecimals = true;
			}
		}

		if (typeof qrveyObj.customStyle !== 'undefined') {
			qrveyObj.customStyle.userid = _user;
		}

		this.create(_appId, _title, _description).then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			_tempQrveyId = _model.qrveyid;

			if (_type == 'quiz') {
				qrveyObj.emailRequired = true;
				qrveyObj.validateCompleteQuestions = true;
				qrveyObj.duration = {
					'neverExpires': true
				};
				qrveyObj.emailReqConfig = {
					'not_allow_duplicates': true,
					'title': 'E-mail'
				};
			}

			if (_type == 'checklist') {
				qrveyObj.emailRequired = true;
				qrveyObj.emailReqConfig = {
					'not_allow_duplicates': true,
					'title': 'Email'
				};
			}

			return _this.update(_appId, _user, _model.qrveyid, qrveyObj);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);

			tempModel = JSON.parse(_qrveyModel);

			try {
				if (typeof tempModel.questions.data !== 'undefined') {
					if (typeof tempModel.questions.data[0] !== 'undefined') configer.set('QrveyAnswerId', tempModel.questions.data[0].id);
					if (typeof tempModel.questions.data[1] !== 'undefined') configer.set('QrveyAnswerId2', tempModel.questions.data[1].id);
				}
			} catch (e) {
				logger.log('You should not take questions', e);
				throw new Error(e);
			}

			logger.log('========================================');
			return _this.activate(_appId, _tempQrveyId, _qrveyModel);
		}).then(function (_resp) {
			if (typeof _resp.url !== 'undefined') {
				logger.log('===============2. qrveyActive===============');
				logger.info('status: ', _resp);
				logger.log('========================================');

				configer.set('QrveyId', _tempQrveyId);

				logger.info('configer.QrveyId', _tempQrveyId);

				return defer.fulfill(_resp);
			}

			logger.error('qrveyActive: Err ', _resp);
			throw new Error(_resp);

		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createQuestionAsDraft = function (_appId, _user, _nameTypeQuestion) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description',
			_tempQrveyId = '',
			qrveyObj = findModel(_nameTypeQuestion);

		qrveyObj.status = 'IN_PROGRESS';

		configer.set('QrveyId', 'Non created');

		this.create(_appId, _title, _description).then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			_tempQrveyId = _model.qrveyid;

			return _this.update(_appId, _user, _model.qrveyid, qrveyObj);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);

			if (JSON.parse(_qrveyModel).questions.data) {
				configer.set('QrveyAnswerId', JSON.parse(_qrveyModel).questions.data[0].id);
			}

			logger.log('========================================');

			defer.fulfill(_tempQrveyId);
		}).catch(function(){
			defer.reject();
		});

		return defer.promise;
	};

	this.createQuestionAsDraftIntoEmpty = function (_appId, _qrveyId, typeOfQrvey, _user, _nameTypeQuestion) {
		var defer = protractor.promise.defer(),
			_this = this,
			newQuestion = findQuestion(_nameTypeQuestion);

		configer.set('QrveyId', 'Non created');

		// console.log('_appId ---> ', _appId);
		// console.log('_qrveyId ---> ', _qrveyId);
		// console.log('typeOfQrvey ---> ', typeOfQrvey);

		this.get(_appId, _qrveyId, typeOfQrvey).then(function (_qrveyModel) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _qrveyModel.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			configer.set('QrveyId', _qrveyModel.qrveyid);

			newQuestion.id = randomId(8);

			logger.info('newQustion', newQuestion);

			if (_qrveyModel.questions){
				_qrveyModel.questions.data.push(newQuestion);
			} else {
				_qrveyModel.questions = {
					'data': [
						newQuestion
					]
				};
			}

			// console.log('new qrveyModel', _qrveyModel);
			// console.log('_user', _user);
			// console.log('qrveyId', _qrveyModel.qrveyid);

			return _this.update(_appId, _user, _qrveyModel.qrveyid, _qrveyModel);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);
			logger.log('========================================');

			if (JSON.parse(_qrveyModel).questions.data) {
				configer.set('QrveyAnswerId', JSON.parse(_qrveyModel).questions.data[0].id);
				getIds(JSON.parse(_qrveyModel).questions.data); // get all questions ids
			}

			logger.log('========================================');

			defer.fulfill();
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.passingScore = function (_appId, _qrveyId, _userId, _score){
		this.validField(_appId, 'appId', 'passingScore');
		this.validField(_qrveyId, 'qrveyId', 'passingScore');
		this.validField(_userId, 'userId', 'passingScore');
		this.validField(_score, 'score', 'passingScore');

		var defer = protractor.promise.defer(),
			_this = this;

		this.get(_appId, _qrveyId, 'quiz').then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			_model.passingScore = {
				'score': _score,
				'passmsg': 'The success message',
				'failmsg': 'The wrong message'
			};

			logger.info('PassingScore', _model.passingScore);

			return _this.update(_appId, _userId, _model.qrveyid, _model);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);
			logger.log('========================================');

			defer.fulfill();
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.resultsOnQuiz = function (_appId, _qrveyId, _userId, _displayed){
		this.validField(_appId, 'appId', 'resultsOnQuiz');
		this.validField(_qrveyId, 'qrveyId', 'resultsOnQuiz');
		this.validField(_userId, 'userId', 'resultsOnQuiz');
		this.validField(_displayed, 'displayed', 'resultsOnQuiz');

		var defer = protractor.promise.defer(),
			_this = this;

		this.get(_appId, _qrveyId, 'quiz').then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			_model.showScore = _displayed;
			scorePage = _displayed;

			logger.info('ResultsOnQuiz', _model.showScore);

			return _this.update(_appId, _userId, _model.qrveyid, _model);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);
			logger.log('========================================');

			defer.fulfill();
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createQuestionAsFinished = function (_appId, _user, _nameTypeQuestion) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description',
			_tempQrveyId = '',
			activeData = '',
			_qrveyModel = findModel(_nameTypeQuestion);

		configer.set('QrveyId', 'Non created');

		this.create(_appId, _title, _description).then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');

			_tempQrveyId = _model.qrveyid;

			// _qrveyModel.status = "FINISHED";

			configer.set('QrveyAnswerId', 'Non created');
			return _this.update(_appId, _user, _model.qrveyid, _qrveyModel);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);
			logger.info('status: ', _qrveyModel.status);
			configer.set('QrveyAnswerId', JSON.parse(_qrveyModel).questions.data[0].id);
			logger.log('========================================');

			return _this.activate(_appId, _tempQrveyId, _qrveyModel);
		}).then(function (_resp) {
			if (typeof _resp.url !== 'undefined') {
				logger.log('===============qrveyActive===============');
				logger.info('status: ', _resp);
				logger.log('========================================');

				activeData = _resp;

				configer.set('QrveyId', _tempQrveyId);
				logger.info('configer.QrveyId', _tempQrveyId);
				logger.log('qrveyModel:', _qrveyModel);
				return defer.fulfill(activeData);
			}

			logger.error('qrveyActive: Err ', _resp);
			throw new Error(_resp);

		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createQrvey = function (_appId, _user, _type, _name, _state, _options, _extraOptions) {
		this.validField(_appId, 'appId', 'createQrvey');
		this.validField(_user, 'userId', 'createQrvey');

		// _type == survey, nps, quiz, checklist
		// _name == tipo de pregunta (NPS y checklist pueden no llevar)
		// _state == activado, draft, finished
		// _options == opciones particulares para las preguntas

		logger.log('_name', _name);

		if (_type == 'survey') configer.set('typeOfQrvey', 'survey');
		else if (_type == 'incontext') configer.set('typeOfQrvey', 'incontextfeedback');
		else if (_type == 'polling') configer.set('typeOfQrvey', 'audiencepoll');
		else if (_type == 'forms') configer.set('typeOfQrvey', 'form');
		else if (_type == 'progressive') configer.set('typeOfQrvey', 'progressiveapp');
		else if (_type == 'questionnaire') configer.set('typeOfQrvey', 'onlineform');
		else if (typeof _type !== 'undefined') configer.set('typeOfQrvey', _type);

		if (_name === undefined || _name === null) {
			if (_type == 'checklist') _name = 'checklist';
			if (_type == 'nps') _name = 'nps';
		}

		if (_type == 'checklist' && _name != 'checklist' && _name !== undefined && _name !== null) {
			_name = 'checklist';
		}

		if (_type == 'nps' && _name != 'nps' && _name !== undefined && _name !== null) {
			_name = 'nps';
		}

		var defer = protractor.promise.defer(),
			_this = this;

		us.isLogged().then(function () {
			_name = _this.getNameOfQuestion(_name, _options);

			logger.info('appId is ' + _appId);
			logger.info('current type is ' + _type);
			logger.info('current name is ' + _name);
			logger.info('current options is ' + _options);
			logger.info('current state is ' + _state);

			if (typeof _state === 'undefined' || _state == 'active') {
				logger.log('create a qrvey in active state');
				return _this.createQuestionAsActive(_appId, _user, _name, _extraOptions, _type);
			} else if (_state == 'draft') {
				logger.log('create a qrvey in draft state');
				return _this.createQuestionAsDraft(_appId, _user, _name, _type);
			} else if (_state == 'finished') {
				logger.log('create a qrvey in finished state');
				return _this.createQuestionAsFinished(_appId, _user, _name, _type);
			} else throw new Error('State is undefined or ilegal string: ' + _state);
		}).then(function (_data) {
			logger.log('Finish the create qrvey as ' + _state);
			defer.fulfill(_data);
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createQrveyEmpty = function (_appId, _user, _type){
		this.validField(_appId, 'appId', 'createQrvey');
		this.validField(_user, 'userId', 'createQrvey');

		// _type == survey, nps, quiz, checklist
		// _state == activado, draft, finished

		if (_type == 'survey') configer.set('typeOfQrvey', 'survey');
		else if (_type == 'forms') configer.set('typeOfQrvey', 'form');
		else if (typeof _type !== 'undefined') configer.set('typeOfQrvey', _type);

		var defer = protractor.promise.defer();
		var _this= this;

		us.isLogged().then(function () {
			logger.info('appId is ' + _appId);
			logger.info('current type is ' + _type);

			return _this.create(_appId, 'An empty qrvey');
		}).then(function(data){
			// console.log('DATA ---> ', data);
			configer.set('QrveyId', data.qrveyid);
			logger.log('Finish the create qrvey empty');
			defer.fulfill(data);
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.getNameOfQuestion = function (_name, _options) {
		if (_name == 'multiple_choice')
			_name = (typeof _options !== 'undefined') ? (_name + '_' + _options) : _name;
		if (_name == 'numeric')
			_name = (typeof _options !== 'undefined') ? (_name + '_' + _options) : (_name + '_general');
		if (_name == 'slide_bar')
			_name = (typeof _options !== 'undefined') ? (_name + '_' + _options) : _name + '_3';
		if (_name == 'nps')
			_name = (typeof _options !== 'undefined') ? (_name + '_' + _options + '_textfield') : 'nps_with_textfield';
		else
			logger.warn(_name, 'The rating, image, ranking, expression, date, short_text and long_text questions doesnt have options');

		logger.info('qrvey name is:', _name);

		return _name;
	};

	this.createManyQrvey = function (user, typeOfQrvey, typeOfQuestion, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createManyQrvey');

		var defer = protractor.promise.defer();
		var i = 0;

		async.times(num, function(n, next) {
			i = n + 1;
			logger.info('Number of qrveys created ' + i + ' of ' + num);

			this.createQrvey(user, typeOfQrvey, typeOfQuestion).then(function () {
				logger.log('created qrvey the #' + i);

				next(null, i);
			}).catch(function(){
				defer.reject();
			});
		}, function (err) {
			if (err) defer.reject();

			logger.log('Finished the test');
			return defer.fulfill();
		});

		return defer.promise;
	};

	this.createBranchs = function (_appId, _user, _type, _name, _state, _options) {
		// _type == survey, nps, polling, trivia, quiz
		// _name == tipo de pregunta (NPS y checklist pueden no llevar)
		// _state == activado, draft, finished
		// _options == opciones particulares para las preguntas

		if (_type == 'survey') configer.set('typeOfQrvey', 'survey');
		else if (_type == 'questionnaire') configer.set('typeOfQrvey', 'onlineform');
		else if (_type == 'progressive') configer.set('typeOfQrvey', 'progressiveapp');
		else throw new Error('This app doesnt support multiple questions');

		var defer = protractor.promise.defer(),
			_this = this;

		us.isLogged().then(function () {
			logger.info('current type is ' + _type);
			logger.info('current name is ' + _name);
			logger.info('current options is ' + _options);
			logger.info('current state is ' + _state);

			if (typeof _state === 'undefined' || _state == 'active') {
				logger.log('create a branch in active state');
				return _this.createBranchsAsActive(_appId, _user, _name, _type);
			} else if (_state == 'draft') {
				logger.log('create a branch in draft state');
				return _this.createBranchsAsDraft(_appId, _user, _name, _type);
			} else if (_state == 'finished') {
				logger.log('create a branch in finished state');
				return _this.createBranchsAsFinished(_appId, _user, _name, _type);
			} else throw new Error('State is undefined or ilegal string: ' + _state);
		}).then(function (_data) {
			logger.log('Finish the create a branch as ' + _state);
			defer.fulfill(_data);
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createAllQuestions = function (_appId, _user, _type, _state, _options) {
		// _type == survey, nps, polling, trivia, quiz
		// _name == tipo de pregunta (NPS y checklist pueden no llevar)
		// _state == activado, draft, finished
		// _options == opciones particulares para las preguntas

		if (_type == 'survey') configer.set('typeOfQrvey', 'survey');
		else if (_type == 'forms') configer.set('typeOfQrvey', 'form');
		else if (_type == 'quiz') configer.set('typeOfQrvey', 'quiz');
		else throw new Error('This app doesnt support multiple questions');

		var defer = protractor.promise.defer(),
			_this = this;

		us.isLogged().then(function () {
			logger.info('current type is ' + _type);
			logger.info('current name is ' + 'All questions');
			logger.info('current options is ' + _options);
			logger.info('current state is ' + _state);

			if (typeof _state === 'undefined' || _state == 'active') {
				logger.log('create a webform with all questions in active state');
				return _this.createAllQuestionsAsActive(_appId, _user, _type);
			} else if (_state == 'draft') {
				logger.log('create a webform with all questions in draft state');
				return _this.createAllQuestionsAsDraft(_appId, _user, _type);
			} else throw new Error('The state is undefined or ilegal string: ' + _state);
		}).then(function (_data) {
			logger.log('Finish the create a webform with all questions as ' + _state);
			defer.fulfill(_data);
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createCrossTab = function (_appId, _user, _type, _state, _options) {
		// _type == survey, nps, polling, trivia, quiz
		// _name == tipo de pregunta (NPS y checklist pueden no llevar)
		// _state == activado, draft, finished
		// _options == opciones particulares para las preguntas

		if (_type == 'survey') configer.set('typeOfQrvey', 'qrvey');
		else if (_type == 'progressive') configer.set('typeOfQrvey', 'progressiveapp');
		else throw new Error('This app doesnt support cross tab');

		var defer = protractor.promise.defer(),
			_this = this;

		us.isLogged().then(function () {
			logger.info('current type is ' + _type);
			logger.info('current options is ' + _options);
			logger.info('current state is ' + _state);

			if (typeof _state === 'undefined' || _state == 'active') {
				logger.log('create a cross tab in active state');
				_this.createCrossTabAsActive(_appId, _user, _type);
			} else if (_state == 'draft') {
				logger.log('create a branch in draft state');
				_this.createCrossTabAsDraft(_appId, _user, _type);
			} else if (_state == 'finished') {
				logger.log('create a branch in finished state');
				_this.createCrossTabAsFinished(_appId, _user, _type);
			} else throw new Error('The state is undefined or ilegal string: ' + _state);
		}).then(function (_data) {
			logger.log('Finish the create branch as ' + _state);
			defer.fulfill(_data);
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createChartBuilder = function (_appId, _user, _type, _chartType, _state, _options) {
		// _type == survey, nps, polling, trivia, quiz
		// _name == tipo de pregunta (NPS y checklist pueden no llevar)
		// _state == activado, draft, finished
		// _options == opciones particulares para las preguntas
		_chartType = (typeof _chartType !== 'undefined') ? _chartType : 'bar';

		if (_type == 'survey') configer.set('typeOfQrvey', 'survey');
		else if (_type == 'incontext') configer.set('typeOfQrvey', 'incontextfeedback');
		else if (_type == 'polling') configer.set('typeOfQrvey', 'audiencepoll');
		else if (_type == 'forms') configer.set('typeOfQrvey', 'form');
		else if (_type == 'progressive') configer.set('typeOfQrvey', 'progressiveapp');
		else if (_type == 'questionnaire') configer.set('typeOfQrvey', 'onlineform');
		else configer.set('typeOfQrvey', _type);

		logger.log('type', configer.get('typeOfQrvey'));

		var defer = protractor.promise.defer(),
			_this = this;

		us.isLogged().then(function () {
			logger.info('current type is ' + _type);
			logger.info('current options is ' + _options);
			logger.info('current state is ' + _state);

			if (typeof _state === 'undefined' || _state == 'active') {
				logger.log('create a chart builder in active state');
				return _this.createChartBuilderAsActive(_appId, _user, _type, _chartType);
			} else throw new Error('The state is undefined or ilegal string: ' + _state);
		}).then(function (_data) {
			logger.log('Finish the create chart builder as active');
			defer.fulfill(_data);
		}).catch(function(){
			defer.reject();
		});

		return defer.promise;
	};

	this.createBranchsAsActive = function (_appId, _user, _nameTypeQuestion) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description',
			qrveyObj = findBranchs(_nameTypeQuestion),
			_tempQrveyId = '',
			tempModel = null;

		if (typeof qrveyObj.customStyle !== 'undefined') {
			qrveyObj.customStyle.userid = _user;
		}

		this.create(_appId, _title, _description).then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			_tempQrveyId = _model.qrveyid;

			return _this.update(_appId, _user, _model.qrveyid, qrveyObj);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);

			tempModel = JSON.parse(_qrveyModel);

			try {
				if (typeof tempModel.questions.data !== 'undefined') {
					if (typeof tempModel.questions.data[0] !== 'undefined') configer.set('QrveyAnswerId', tempModel.questions.data[0].id);
					if (typeof tempModel.questions.data[1] !== 'undefined') configer.set('QrveyAnswerId2', tempModel.questions.data[1].id);
				}
			} catch (e) {
				logger.log('There are not questions', e);
				throw new Error(e);
			}

			logger.log('========================================');
			return _this.activate(_appId, _tempQrveyId, _qrveyModel);
		}).then(function (_resp) {
			if (typeof _resp.url !== 'undefined') {
				logger.log('===============2. qrveyActive===============');
				logger.info('status: ', _resp);
				logger.log('========================================');

				configer.set('QrveyId', _tempQrveyId);

				logger.info('configer.QrveyId', _tempQrveyId);

				return defer.fulfill(_resp);
			}

			logger.error('qrveyActive: Err ', _resp);
			throw new Error(_resp);

		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createAllQuestionsAsActive = function (_appId, _user, _type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description',
			qrveyObj = findAllQuestions(_type),
			_tempQrveyId = '',
			tempModel = null;

		if (typeof qrveyObj.customStyle !== 'undefined') {
			qrveyObj.customStyle.userid = _user;
		}

		this.create(_appId, _title, _description).then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			_tempQrveyId = _model.qrveyid;

			if (_type == 'forms') qrveyObj.appType = 'ONLINEFORM';
			if (_type == 'quiz') {
				qrveyObj.emailRequired = true;
				qrveyObj.emailReqConfig = {
					'not_allow_duplicates': true,
					'title': 'Email'
				};
			}

			return _this.update(_appId, _user, _model.qrveyid, qrveyObj);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);

			tempModel = JSON.parse(_qrveyModel);

			try {
				if (typeof tempModel.questions.data !== 'undefined') {

					/* To review */ /* forEachOf */
					async.forEachOf(tempModel.questions.data, function (item, key, next) {
						var _num = (key == 0) ? '' : key + 1;
						if (typeof item !== 'undefined') configer.set('QrveyAnswerId' + _num, item.id);
						next();
					}, function (err) {
						if (err) throw new Error('Error on setting qrveyAnswerID on createAllQuestionsAsActive method, ' + err);
					});
				}
			} catch (e) {
				logger.log('No lleva preguntas', e);
				throw new Error(e);
			}

			logger.log('========================================');
			return _this.activate(_appId, _tempQrveyId, _qrveyModel);
		}).then(function (_resp) {
			if (typeof _resp.url !== 'undefined') {
				logger.log('===============2. qrveyActive===============');
				logger.info('status: ', _resp);
				logger.log('========================================');

				configer.set('QrveyId', _tempQrveyId);

				logger.info('configer.QrveyId', _tempQrveyId);
				logger.info('configer propierties: '.configer);

				return defer.fulfill(_resp);
			}

			logger.error('qrveyActive: Err ', _resp);
			throw new Error(_resp);

		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createCrossTabAsActive = function (_appId, _user, _type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description',
			qrveyObj = findModel('cross_tab'),
			_tempQrveyId = '',
			tempModel = null;

		if (typeof qrveyObj.customStyle !== 'undefined') {
			qrveyObj.customStyle.userid = _user;
		}

		this.create(_appId, _title, _description).then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			_tempQrveyId = _model.qrveyid;

			if (_type == 'survey') qrveyObj.appType = 'SURVEY';
			else if (_type == 'progressive') qrveyObj.appType = 'PROGRESSIVEAPP';

			if (_type == 'quiz') {
				qrveyObj.emailRequired = true;
				qrveyObj.emailReqConfig = {
					'not_allow_duplicates': true,
					'title': 'Email'
				};
			}

			return _this.update(_appId, _user, _model.qrveyid, qrveyObj);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);

			tempModel = JSON.parse(_qrveyModel);

			try {
				if (typeof tempModel.questions.data !== 'undefined') {
					var i = 1;
					tempModel.questions.data.forEach(function (item) {
						if (typeof item !== 'undefined')
							configer.set('QrveyAnswerId' + ((i > 1) ? i : ''), item.id);

						i += 1;
					});
				}
			} catch (e) {
				logger.log('There are not questions', e);
				throw new Error(e);
			}

			logger.log('========================================');
			return _this.activate(_appId, _tempQrveyId, _qrveyModel);
		}).then(function (_resp) {
			if (typeof _resp.url !== 'undefined') {
				logger.log('===============2. qrveyActive===============');
				logger.info('status: ', _resp);
				logger.log('========================================');

				configer.set('QrveyId', _tempQrveyId);

				logger.info('configer.QrveyId', _tempQrveyId);

				return defer.fulfill(_resp);
			} else {
				logger.error('qrveyActive: Err ', _resp);
				throw new Error(_resp);
			}
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createChartBuilderAsActive = function (_appId, _user, _type, _chartType) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description',
			_model = (_chartType + '_chart_questions'),
			_tempQrveyId = '',
			tempModel = null;

		if (_type == 'quiz' || _type == 'forms' || _type == 'questionnaire') _model = _model + '_basic';
		var qrveyObj = findCharts(_model);

		if (typeof qrveyObj.customStyle !== 'undefined') qrveyObj.customStyle.userid = _user;

		logger.log('WEBFORM TYPE', configer.get('typeOfQrvey'));

		this.create(_appId, _title, _description).then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			_tempQrveyId = _model.qrveyid;

			if (_type == 'survey') qrveyObj.appType = 'SURVEY';
			else if (_type == 'progressive') qrveyObj.appType = 'PROGRESSIVEAPP';

			return _this.update(_appId, _user, _model.qrveyid, qrveyObj);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);

			tempModel = JSON.parse(_qrveyModel);

			try {
				if (typeof tempModel.questions.data !== 'undefined') {
					var i = 1;
					tempModel.questions.data.forEach(function (item) {
						if (typeof item !== 'undefined')
							configer.set('QrveyAnswerId' + ((i > 1) ? i : ''), item.id);

						i += 1;
					});
				}
			} catch (e) {
				logger.log('There are no questions', e);
				throw new Error(e);
			}

			logger.log('========================================');
			return _this.activate(_appId, _tempQrveyId, _qrveyModel);
		}).then(function (_resp) {
			if (typeof _resp.url !== 'undefined') {
				logger.log('===============2. qrveyActive===============');
				logger.info('status: ', _resp);
				logger.log('========================================');

				configer.set('QrveyId', _tempQrveyId);

				logger.info('configer.QrveyId', _tempQrveyId);

				return defer.fulfill(_resp);
			} else {
				logger.error('qrveyActive: Err ', _resp);
				throw new Error(_resp);
			}
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createBranchsAsDraft = function (_appId, _user, _nameTypeQuestion, _type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description',
			_tempQrveyId = '',
			qrveyObj = findBranchs(_nameTypeQuestion);

		configer.set('QrveyId', 'Non created');

		this.create(_appId, _title, _description).then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			_tempQrveyId = _model.qrveyid;

			if (_type == 'forms') qrveyObj.appType = 'ONLINEFORM';
			else if (_type == 'progressive') qrveyObj.appType = 'PROGRESSIVEAPP';

			_this.update(_appId, _user, _model.qrveyid, qrveyObj);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);
			configer.set('QrveyAnswerId', JSON.parse(_qrveyModel).questions.data[0].id);
			logger.log('========================================');

			defer.fulfill(_tempQrveyId);
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createAllQuestionsAsDraft = function (_appId, _user, _type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description',
			_tempQrveyId = '',
			qrveyObj = findAllQuestions(_type);

		configer.set('QrveyId', 'Non created');

		this.create(_appId, _title, _description).then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			_tempQrveyId = _model.qrveyid;

			if (_type == 'forms') qrveyObj.appType = 'ONLINEFORM';
			else if (_type == 'progressive') qrveyObj.appType = 'PROGRESSIVEAPP';

			return _this.update(_appId, _user, _model.qrveyid, qrveyObj);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);
			configer.set('QrveyAnswerId', JSON.parse(_qrveyModel).questions.data[0].id);
			logger.log('========================================');

			defer.fulfill(_tempQrveyId);
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};

	this.createCrossTabAsDraft = function (_appId, _user, _type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description',
			_tempQrveyId = '',
			qrveyObj = findModel('cross_tab');

		configer.set('QrveyId', 'Non created');

		this.create(_appId, _title, _description).then(function (_model) {
			logger.log('===========qrveyID===============');
			logger.info('qrveyId: ', _model.qrveyid);
			logger.log('=================================');
			configer.set('QrveyAnswerId', 'Non created');

			_tempQrveyId = _model.qrveyid;

			if (_type == 'survey') qrveyObj.appType = 'SURVEY';
			else if (_type == 'progressive') qrveyObj.appType = 'PROGRESSIVEAPP';

			return _this.update(_appId, _user, _model.qrveyid, qrveyObj);
		}).then(function (_qrveyModel) {
			logger.log('===============qrveyModel===============');
			logger.info('qrveyModel: ', _qrveyModel);
			configer.set('QrveyAnswerId', JSON.parse(_qrveyModel).questions.data[0].id);
			logger.log('========================================');

			defer.fulfill(_tempQrveyId);
		}).catch(function () {
			defer.reject();
		});

		return defer.promise;
	};
};

module.exports = new QrveyService();