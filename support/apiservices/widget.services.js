'use strict';

var WidgetsService = function() {
	this._config = null;

	this.getSetting = function(key) {
		return this._config[key];
	};

	this.setSetting = function(key, value) {
		this._config[key] = value;
	};

	this.config = function(_config) {
		if (this._config === null) {
			this._config = _config;
			request = request.defaults({
				jar: true
			});
		} else {
			throw 'It has already been started plugin';
		}

		return this;
	};

	this.open = function(_nameOfWidget, _qrveyID, _callback) {
		this.getUrl('/widget/' + _nameOfWidget + '/q/' + _qrveyID).then(_callback);

		return this;
	};

	this.getUrl = function(_path) {
		logger.log('path:', _path);
		logger.log('url:', this._config.url + _path);
		logger.log('url:', this._config.url + _path);
		return brw.get(this._config.url + _path);
	};

	this.validField = function(_field, _name, _nameFunction) {
		if (typeof _field === 'undefined') {
			throw 'Undefined ' + _name + ' of Qrvey in ' + _nameFunction + ' function';
		}

		return this;
	};

	this.login = function() {
		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/login',
				data: {
					email: this._config.username,
					password: this._config.password
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			};

		this.sendInfo(options, function(_resp) {
			if (_resp.substring(0, 1) === '{') {
				_resp = JSON.parse(_resp);

				if (_resp.status == 200) {
					return defer.fulfill(_resp.user.userid);
				}
			}

			logger.log('Error in the login function');
			logger.log(_resp);

			throw _resp;
		});

		return defer.promise;
	};

	this.create = function(_name, _description, _type) {
		this.validField(_name, 'name', 'create');
		this.validField(_description, 'description', 'create');
		this.validField(_type, 'type', 'create');

		var defer = protractor.promise.defer(),
			options = {
				method: 'POST',
				url: '/devapi/' + this._config.versionAPI + '/user/' + this._config.userId + '/' + _type,
				data: {
					name: _name,
					description: _description
				},
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
					'x-api-key': this._config.token
				}
			};

		this.sendInfo(options, function(_resp) {
			if (_resp.substring(0, 1) === '{') {
				_resp = JSON.parse(_resp);

				if (_resp.status == 'IN_PROGRESS') {
					logger.log(_resp);
					defer.fulfill(_resp.qrveyid);
				} else {
					var msj = 'Fail, qrvey is not IN_PROGRESS status in create function.';
					logger.log(msj);
					throw msj;
				}
			} else {
				logger.log('Error, no response in create function.');
				logger.log(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

	this.update = function(_userID, _qrveyID, _qrveyObject, _type) {
		this.validField(_qrveyID, 'qrveyId', 'update');
		this.validField(_type, 'type', 'update');

		_qrveyObject.qrveyid = _qrveyID;
		_qrveyObject.userid = _userID;

		var defer = protractor.promise.defer(),
			dataQrvey = JSON.stringify(_qrveyObject),
			options = {
				method: 'PUT',
				url: '/devapi/' + this._config.versionAPI + '/user/' + this._config.userId + '/' + _type + '/' + _qrveyID,
				data: dataQrvey
			};

		this.sendInfo(options, function(_resp) {
			if (_resp.substring(0, 1) === '{') {
				defer.fulfill(_resp);
			} else {
				logger.log('Error, no response in update function.');
				throw _resp;
			}
		});

		return defer.promise;
	};

	this.activate = function(_qrveyID, _qrveyObject, _type) {
		this.validField(_qrveyID, 'qrveyId', 'activate');
		this.validField(_type, 'type', 'activate');

		var defer = protractor.promise.defer(),
			dataQrvey = _qrveyObject,
			options = {
				method: 'POST',
				url: '/devapi/' + this._config.versionAPI + '/user/' + this._config.userId + '/' + _type + '/' + _qrveyID + '/send',
				data: dataQrvey
			};

		this.sendInfo(options, function(_resp) {
			if (_resp.substring(0, 1) === '{') {
				defer.fulfill(JSON.parse(_resp));
			} else {
				logger.log('Error, no response in activate function.');
				throw _resp;
			}
		});

		return defer.promise;
	};

	this.shared = function(_qrveyID, _type) {
		this.validField(_qrveyID, 'qrveyId', 'shared');
		this.validField(_type, 'type', 'shared');

		var defer = protractor.promise.defer(),
			options = {
				method: 'GET',
				url: '/devapi/' + this._config.versionAPI + '/user/' + this._config.userId + '/' + _type + '/' + _qrveyID + '/url',
			};

		this.sendInfo(options, function(_resp) {
			if (_resp.substring(0, 1) === '{') {
				_resp = JSON.parse(_resp);
				defer.fulfill(_resp.url);
			} else {
				logger.log('Error, no response in shared function.');
				logger.log(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

	this.delete = function(_qrveyID, _type) {
		this.validField(_qrveyID, 'qrveyId', 'delete');
		this.validField(_type, 'type', 'delete');

		var defer = protractor.promise.defer(),
			options = {
				method: 'DELETE',
				url: '/devapi/' + this._config.versionAPI + '/user/' + this._config.userId + '/' + _type + '/' + _qrveyID,
			};

		this.sendInfo(options, function(_resp) {
			if (_resp.substring(0, 1) === '{') {
				_resp = JSON.parse(_resp);
				defer.fulfill(_resp.qrveyid);
			} else {
				logger.log('Error, no response in delete function.');
				logger.log(_resp);

				throw _resp;
			}
		});

		return defer.promise;
	};

	this.findModel = function(_name, _callback) {
		var readfile = fs.readFileSync('./support/models/' + _name + '.json', 'utf8');
		_callback(JSON.parse(readfile));
	};

	this.sendInfo = function(_options, _callback, sw) {
		if (typeof this._config.url !== 'undefined') {
			var options = {
				url: this._config.url + _options.url,
				method: _options.method,
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': this._config.token
				}
			};

			if (typeof _options.headers !== 'undefined') {
				options.headers = _options.headers;
				options.headers['x-api-key'] = this._config.token;
				options.form = _options.data;
			} else {
				options.body = _options.data;
			}

			if (typeof sw !== 'undefined') {
				logger.log('-------------------------------');
				logger.log('options', options);
				logger.log('-------------------------------');
			}

			request(options, function(error, response, body) {
				if (error) {
					error = logger.error('Request Fail: ', error);
				}
				_callback(body, error);
			});
		} else {
			throw 'Indefined the Url in the config';
		}
	};

	this.createQuestionType = function(_nameTypeQuestion) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description';

		_this.findModel(_nameTypeQuestion, function(qrveyObj) {
			_this.setQrveyId('Non created');
			_this.create(_title, _description).then(function(_qrveyId) {
				logger.log('===========qrveyID===============');
				logger.log('qrveyId: ', _qrveyId);
				logger.log('=================================');
				_this.setQrveyAnswerId('Not created');
				_this.update(userIDW, _qrveyId, qrveyObj).then(function(_qrveyModel) {
					logger.log('===============qrveyModel===============');
					logger.log('qrveyModel: ', _qrveyModel);
					_this.setQrveyAnswerId(JSON.parse(_qrveyModel).questions.data[0].id);
					logger.log('========================================');
					_this.activate(_qrveyId, _qrveyModel).then(function(_resp) {
						if (typeof _resp.ResponseMetadata !== 'undefined') {
							logger.log('===============qrveyActive===============');
							logger.log('status: ', _resp);
							logger.log('========================================');
						} else {
							throw 'qrveyActive: Err ' + _resp.status + ' ' + _resp.message;
						}
						_this.shared(_qrveyId).then(function(_url) {
							logger.log('===============qrveyUrl===============');
							logger.log('url: ', _url);
							logger.log('========================================');
							_this.setQrveyId(_qrveyId);

							defer.fulfill(_url);
						});
					});
				});
			});
		});

		return defer.promise;
	};

	this.createQuestionInDraft = function(_nameTypeQuestion) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description';

		_this.findModel(_nameTypeQuestion, function(qrveyObj) {
			_this.setQrveyId('Non created');
			_this.create(_title, _description).then(function(_qrveyId) {
				logger.log('===========qrveyID===============');
				logger.log('qrveyId: ', _qrveyId);
				logger.log('=================================');
				_this.setQrveyAnswerId('Not created');
				_this.update(userIDW, _qrveyId, qrveyObj).then(function(_qrveyModel) {
					logger.log('===============qrveyModel===============');
					logger.log('qrveyModel: ', _qrveyModel);
					_this.setQrveyAnswerId(JSON.parse(_qrveyModel).questions.data[0].id);
					logger.log('========================================');

					defer.fulfill(_qrveyId);
				});
			});
		});

		return defer.promise;
	};

	this.createQuestionInFinished = function(_nameTypeQuestion) {
		var defer = protractor.promise.defer(),
			_this = this,
			_title = 'Test API Request',
			_description = 'Test API Request Description';

		_this.findModel(_nameTypeQuestion, function(qrveyObj) {
			_this.setQrveyId('Non created');
			_this.create(_title, _description).then(function(_qrveyId) {
				logger.log('===========qrveyID===============');
				logger.log('qrveyId: ', _qrveyId);
				logger.log('=================================');

				qrveyObj.status = 'FINISHED';

				_this.setQrveyAnswerId('Not created');
				_this.update(userIDW, _qrveyId, qrveyObj).then(function(_qrveyModel) {
					logger.log('===============qrveyModel===============');
					logger.log('qrveyModel: ', _qrveyModel);
					_this.setQrveyAnswerId(JSON.parse(_qrveyModel).questions.data[0].id);
					logger.log('========================================');

					defer.fulfill(_qrveyId);
				});
			});
		});

		return defer.promise;
	};

	this.createQrveyWithYesNoQuestion = function() {
		var defer = protractor.promise.defer(),
			_this = this;

        // this.isLogged().then(function() {
		_this.createQuestionType('yes_no').then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.createAnswersForDateQuestion = function(num, datesArray) {
		var _this = this;

		return this.createQrveyWithDateQuestion().then(function(url) {
			var qrveyID = _this.getQrveyId();
			var qstring = url.substring(url.length - 5);
			var defer = protractor.promise.defer();
			var answerModel = JSON.parse(fs.readFileSync('./support/models/answers/date.json', 'utf8'));

			var i = 0;
			while (num > datesArray.length) {
				var mod = datesArray.length;
				datesArray.push(datesArray[i % mod]);
				i++;
			}
			var answersToGo = Object.keys(datesArray);
			if (answersToGo.length === 0) {
				return defer.promise.fulfill();
			} else {
				answersToGo.forEach(function(key) {
					answerModel.qrveyID = qrveyID;
					answerModel.qstring.q = qstring;
					answerModel.answers[0].data[0] = datesArray[key][0];
					logger.log('answer model', answerModel);
					var options = {
						url: _this._config.url + '/api/qrveyanswers/' + qstring,
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: answerModel,
						json: true
					};

					request(options, function(error, response, body) {
						if (error) {
							error = logger.error('Request Fail: ', error);
							return defer.reject(body, error);
						}
						logger.log('respuesta: ', body);
					});
					if (--answersToGo === 0) {
						return defer.promise.fulfill();
					}
				});
			}
		});
	};

	this.createQrveyWithDateQuestion = function() {
		var defer = protractor.promise.defer(),
			_this = this;

        // this.isLogged().then(function() {
		_this.createQuestionType('date').then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.createAnswersForExpressionQuestion = function(num) {
		var _this = this;

		return this.createQrveyWithExpressionQuestion().then(function(url) {
			var qrveyID = _this.getQrveyId();
			var qstring = url.substring(url.length - 5);
			var defer = protractor.promise.defer();
			var answerModel = JSON.parse(fs.readFileSync('./support/models/answers/expression.json', 'utf8'));
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			answerModel.answers[0].id = _this.getQrveyAnswerId();
			var possibleAnswers = ['Happy', 'Exited', 'Dull', 'Tired', 'Impassive'];
			for (var i = 0; i < num; i++) {
				answerModel.answers[0].data = [];
				while ((((num + i) * answerModel.answers[0].data.length) % 3) >= answerModel.answers[0].data.length) {
                    //let mod =  datesArray.length;
					answerModel.answers[0].data.push(possibleAnswers[(i + answerModel.answers[0].data.length) % possibleAnswers.length]);
				}
				logger.log((1 + (num * i)) % possibleAnswers.length);
				logger.log('responses ', answerModel.answers[0].data);
				logger.log('expression answer model', answerModel);
				var options = {
					url: _this._config.url + '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: answerModel,
					json: true
				};

				request(options, function(error, response, body) {
					if (error) {
						error = logger.error('Request Fail: ', error);
						return defer.reject(body, error);
					}

					logger.log('respuesta: ', body);

					if (i === num) {
						return defer.promise.fulfill();
					}
				});
			}
		});
	};

	this.createQrveyWithExpressionQuestion = function() {
		var defer = protractor.promise.defer(),
			_this = this;

        // this.isLogged().then(function() {
		_this.createQuestionType('expression').then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.createAnswersForMultipleChoiceQuestion = function(num) {
		var _this = this;

		return this.createQrveyWithMultipleChoiceQuestion().then(function(url) {
			var qrveyID = _this.getQrveyId();
			var qstring = url.substring(url.length - 5);
			var defer = protractor.promise.defer();

			var possibleAnswers = ['Jon Snow', 'Tyrion Lannister', 'Daenerys Targaryen', 'Arya Stark', 'Ghost'];
			for (var i = 0; i < num; i++) {
				var answerModel = JSON.parse(fs.readFileSync('./support/models/answers/multiple_choice.json', 'utf8'));
				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = _this.getQrveyAnswerId();

				while (1 > answerModel.answers[0].data.length) {
					answerModel.answers[0].data.push(possibleAnswers[num % (i + 1) % possibleAnswers.length]);
				}
				logger.log(num % (i + 1) % possibleAnswers.length);
				logger.log('responses ', answerModel.answers[0].data);
				logger.log('multiple choice answer model', answerModel);
				var options = {
					url: _this._config.url + '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: answerModel,
					json: true
				};
				request(options, function(error, response, body) {
					if (error) {
						error = logger.error('Request Fail: ', error);
						return defer.reject(body, error);
					}
					logger.log('respuesta: ', body);
					if (i === (num - 1)) {
						return defer.promise.fulfill();
					}
				});
			}
		});
	};

	this.createAnswersForYesNoQuestion = function(num) {
		var _this = this;

		return this.createQrveyWithYesNoQuestion().then(function(url) {
			var qrveyID = _this.getQrveyId();
			var qstring = url.substring(url.length - 5);
			var defer = protractor.promise.defer();

			var possibleAnswers = ['Yes', 'No', 'Yes', 'Yes', 'No'];
			for (var i = 0; i < num; i++) {
				var answerModel = JSON.parse(fs.readFileSync('./support/models/answers/yes_no.json', 'utf8'));
				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = _this.getQrveyAnswerId();

				while (1 > answerModel.answers[0].data.length) {
					answerModel.answers[0].data.push(possibleAnswers[num % (i + 1) % possibleAnswers.length]);
				}
				logger.log(num % (i + 1) % possibleAnswers.length);
				logger.log('responses ', answerModel.answers[0].data);
				logger.log('yes no answer model', answerModel);

				var options = {
					url: _this._config.url + '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: answerModel,
					json: true
				};
				request(options, function(error, response, body) {
					if (error) {
						error = logger.error('Request Fail: ', error);
						return defer.reject(body, error);
					}
					logger.log('respuesta: ', body);
					if (i === (num - 1)) {
						return defer.promise.fulfill();
					}
				});
			}
		});
	};

	this.createAnswersForSlidebarQuestion = function(num) {
		var _this = this;

		return this.createQrveyWithSlideBarQuestion().then(function(url) {
			var qrveyID = _this.getQrveyId();
			var qstring = url.substring(url.length - 5);
			var defer = protractor.promise.defer();

			var possibleAnswers = ['1', '2', '3', '2', '3'];
			for (var i = 0; i < num; i++) {
				var answerModel = JSON.parse(fs.readFileSync('./support/models/answers/slidebar.json', 'utf8'));
				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = _this.getQrveyAnswerId();

				while (1 > answerModel.answers[0].data.length) {
					answerModel.answers[0].data.push(possibleAnswers[num % (i + 1) % possibleAnswers.length]);
				}
				logger.log(num % (i + 1) % possibleAnswers.length);
				logger.log('responses ', answerModel.answers[0].data);
				logger.log('slidebar answer model', answerModel);

				var options = {
					url: _this._config.url + '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: answerModel,
					json: true
				};
				request(options, function(error, response, body) {
					if (error) {
						error = logger.error('Request Fail: ', error);
						return defer.reject(body, error);
					}
					logger.log('respuesta: ', body);
					if (i === (num - 1)) {
						return defer.promise.fulfill();
					}
				});
			}
		});
	};

	this.createQrveyWithMultipleChoiceQuestion = function(_type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_name = 'multiple_choice';

        // this.isLogged().then(function() {
		_name = (typeof _type !== 'undefined') ? (_name + '_' + _type) : _name;

		_this.createQuestionType(_name).then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.createQrveyWithMultipleChoiceQuestionInDraft = function(_type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_name = 'multiple_choice';

        // this.isLogged().then(function() {
		_name = (typeof _type !== 'undefined') ? (_name + '_' + _type) : _name;

		_this.createQuestionInDraft(_name).then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.createQrveyWithMultipleChoiceQuestionInFinished = function(_type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_name = 'multiple_choice';

        // this.isLogged().then(function() {
		_name = (typeof _type !== 'undefined') ? (_name + '_' + _type) : _name;

		_this.createQuestionInFinished(_name).then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.createQrveyWithNumericQuestion = function(_type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_name = 'numeric';

        // this.isLogged().then(function() {
		_name = (typeof _type !== 'undefined') ? (_name + '_' + _type) : (_name + '_general');

		_this.createQuestionType(_name).then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.createAnswersForNumericQuestion = function(num) {
		var _this = this,
			defer = protractor.promise.defer();

		return this.createQrveyWithNumericQuestion().then(function(url) {
			var i = 0,
				qrveyID = _this.getQrveyId(),
				qstring = url.substring(url.length - 5),
				answerModel = JSON.parse(fs.readFileSync('./support/models/answers/numeric.json', 'utf8'));

			answerModel.answers[0].id = _this.getQrveyAnswerId();
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			// var possibleAnswers = ['1', '2', 'Daenerys Targaryen', 'Arya Stark', 'Ghost', 'Little Finger'];
			for (i = 0; i < num; i++) {
				answerModel.answers[0].data[0] = '21321';

				var options = {
					url: _this._config.url + '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: answerModel,
					json: true
				};

                // logger.log('answerModel:', answerModel);

				request(options, function(error, response, body) {
					if (error) {
						error = logger.error('Request Fail: ', error);
						return defer.reject(body, error);
					}
					logger.log('respuesta: ', body);
				});
			}

			defer.fulfill({
				'qrveyId': qrveyID,
				'qstring': qstring
			});

			return defer.promise;
		});
	};

	this.createQrveyWithRankingQuestion = function() {
		var defer = protractor.promise.defer(),
			_this = this;

        // this.isLogged().then(function() {
		_this.createQuestionType('ranking').then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.createAnswersForRankingQuestion = function(num) {
		var _this = this,
			defer = protractor.promise.defer();

		return this.createQrveyWithRankingQuestion().then(function(url) {
			var i = 0,
				qrveyID = _this.getQrveyId(),
				qstring = url.substring(url.length - 5),
				answerModel = JSON.parse(fs.readFileSync('./support/models/answers/ranking.json', 'utf8'));

			answerModel.answers[0].id = _this.getQrveyAnswerId();
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			var possibleAnswers = ['Jon Snow', 'Tyrion Lannister', 'Daenerys Targaryen', 'Arya Stark'];

			for (i = 0; i < num; i++) {
				var j = 0;
				answerModel.answers[0].data = [];
				while (j < possibleAnswers.length) {
					answerModel.answers[0].data.push(possibleAnswers[(num % (i + 1) + j) % possibleAnswers.length]);
					j++;
				}
				var options = {
					url: _this._config.url + '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: answerModel,
					json: true
				};

				logger.log('answerModel:', answerModel);

				request(options, function(error, response, body) {
					if (error) {
						error = logger.error('Request Fail: ', error);
						return defer.reject(body, error);
					}
					logger.log('respuesta: ', body);
				});
			}

			defer.fulfill({
				'qrveyId': qrveyID,
				'qstring': qstring
			});

			return defer.promise;
		});
	};

	this.createQrveyWithRatingQuestion = function() {
		var defer = protractor.promise.defer(),
			_this = this;

        // this.isLogged().then(function() {
		_this.createQuestionType('rating').then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.createAnswersForRatingQuestion = function(num) {
		var _this = this,
			defer = protractor.promise.defer();

		return this.createQrveyWithRatingQuestion().then(function(url) {
			var i = 0,
				qrveyID = _this.getQrveyId(),
				qstring = url.substring(url.length - 5),
				answerModel = JSON.parse(fs.readFileSync('./support/models/answers/rating.json', 'utf8'));

			answerModel.answers[0].id = _this.getQrveyAnswerId();
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			var possibleAnswers = [1, 2, 3, 4, 5];

			for (i = 0; i < num; i++) {
				answerModel.answers[0].data = [];
				answerModel.answers[0].data.push(possibleAnswers[(num % (i + 1)) % possibleAnswers.length]);

				var options = {
					url: _this._config.url + '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: answerModel,
					json: true
				};

				logger.log('answerModel:', answerModel);
				logger.log('answerRR:', answerModel.answers[0].data);
				request(options, function(error, response, body) {
					if (error) {
						error = logger.error('Request Fail: ', error);
						return defer.reject(body, error);
					}
					logger.log('respuesta: ', body);
				});
			}

			defer.fulfill({
				'qrveyId': qrveyID,
				'qstring': qstring
			});

			return defer.promise;
		});
	};

	this.createQrveyWithShortTextQuestion = function() {
		var defer = protractor.promise.defer(),
			_this = this;

        // this.isLogged().then(function() {
		_this.createQuestionType('short_text').then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.createAnswersForShortTextQuestion = function(num) {
		var _this = this,
			defer = protractor.promise.defer();

		return this.createQrveyWithShortTextQuestion().then(function(url) {
			var i = 0,
				qrveyID = _this.getQrveyId(),
				qstring = url.substring(url.length - 5),
				answerModel = JSON.parse(fs.readFileSync('./support/models/answers/short_text.json', 'utf8'));

			answerModel.answers[0].id = _this.getQrveyAnswerId();
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			var possibleAnswers = ['Arya ', ' Stark', 'Lannister ', ' Jon', 'Snow ', ' ', 'Daenerys', ' Targaryen', 'Great ', ' ', 'Tyrion', 'Freedom ', 'Brienne', ' of Tarth'];
			for (i = 0; i < num; i++) {
				answerModel.answers[0].data = [];
				var stAns = '';
				while (((num * i) % possibleAnswers.length) >= (stAns.length + 1) / 7) {
					stAns = stAns + (possibleAnswers[(i * stAns.length * (num + 1) % (stAns.length + 3)) % possibleAnswers.length]);
				}
				if (stAns === '') {
					stAns = 'not Empty :D';
				}
				answerModel.answers[0].data.push(stAns);
				var options = {
					url: _this._config.url + '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: answerModel,
					json: true
				};

				logger.log('answerModel:', answerModel);
				logger.log('answerRR:', answerModel.answers[0].data);
				request(options, function(error, response, body) {
					if (error) {
						error = logger.error('Request Fail: ', error);
						return defer.reject(body, error);
					}
					logger.log('respuesta: ', body);
				});
			}

			defer.fulfill({
				'qrveyId': qrveyID,
				'qstring': qstring
			});

			return defer.promise;
		});
	};

	this.createQrveyWithSlideBarQuestion = function(_type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_name = 'slide_bar';

        // this.isLogged().then(function() {
		_name = (typeof _type !== 'undefined') ? (_name + '_' + _type) : _name + '_3';

		_this.createQuestionType(_name).then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.createNpsWithNpsQuestion = function(_type) {
		var defer = protractor.promise.defer(),
			_this = this,
			_name = 'nps';

        // this.isLogged().then(function() {
		_name = (typeof _type !== 'undefined') ? (_name + '_' + _type + '_textfield') : 'nps_with_textfield';

		_this.createQuestionType(_name).then(function(_data) {
			defer.fulfill(_data);
		});
        // });

		return defer.promise;
	};

	this.findHashInUrl = function(_url, callBack) {
		if (typeof _url !== 'undefined') {
			var lasti = _url.lastIndexOf('/') + 1;
			qrveyIDForWidget = _url.substring(lasti, _url.lenght);

			if (typeof callBack !== 'undefined') {
				callBack();
			} else {
				return qrveyIDForWidget;
			}
		} else {
			throw 'Url should not be empty';
		}
	};
};

module.exports = new WidgetsService();
