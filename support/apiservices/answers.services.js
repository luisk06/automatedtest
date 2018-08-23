'use strict';

var AnswerService = function() {

	this.createAnswers = function(user, typeOfQrvey, typeOfQuestion, num, Arrays, multiple, other, paths) {
		switch (typeOfQuestion) {
			case 'date':
				return this.dateQuestion(user, typeOfQrvey, num, Arrays);
			case 'expression':
				return this.expressionQuestion(user, typeOfQrvey, num);
			case 'expression with categories':
			case 'expression-with-categories':
			case 'expression_with_categories':
				return this.expression_CategoriesQuestion(user, typeOfQrvey, num);
			case 'yes no':
			case 'yes-no':
			case 'yes_no':
				return this.yesnoQuestion(user, typeOfQrvey, num);
			case 'slidebar':
			case 'slide_bar':
			case 'slide-bar':
			case 'slide bar':
				return this.slidebarQuestion(user, typeOfQrvey, num);
			case 'multiple choice':
			case 'multiple-choice':
			case 'multiple_choice':
				return this.multiplechoiceQuestion(user, typeOfQrvey, num, multiple, other, paths);
			case 'multiple choice multiple selection':
				return this.multipleChoiceWithMultipleSelectionQuestion(user, typeOfQrvey, num, multiple, other, paths);
			case 'numeric':
				return this.numericQuestion(user, typeOfQrvey, num);
			case 'ranking':
				return this.rankingQuestion(user, typeOfQrvey, num);
			case 'rating':
				return this.ratingQuestion(user, typeOfQrvey, num);
			case 'nps':
				return this.npsQuestion(user, num, Arrays);
			case 'short text':
			case 'short-text':
			case 'short_text':
				return this.shorttextQuestion(user, typeOfQrvey, num, false, null, null);
			case 'short text sentiment':
				return this.shorttextQuestion(user, typeOfQrvey, num, true, null, null);
			case 'long text':
			case 'long-text':
			case 'long_text':
				return this.longtextQuestion(user, typeOfQrvey, num);
			case 'checklist':
				return this.checklistQuestion(user, num);
			case 'image':
				return this.imageQuestion(user, typeOfQrvey, num);
			case 'email':
				return this.emailQuestion(user, typeOfQrvey, num);
			case 'address':
				return this.addressQuestion(user, typeOfQrvey, num);
			case 'us address':
			case 'us-address':
			case 'us_address':
				return this.usAddressQuestion(user, typeOfQrvey, num);
			case 'name':
				return this.nameQuestion(user, typeOfQrvey, num);
			case 'phone':
				return this.phoneQuestion(user, typeOfQrvey, num);
			case 'lookup text':
			case 'lookup-text':
			case 'lookup_text':
				return this.lookupQuestion(user, typeOfQrvey,'lookup_text', num);
			case 'lookup_google':
				return this.lookupQuestion(user, typeOfQrvey,'lookup_google', num);
			case 'lookup_webhook':
				return this.lookupQuestion(user, typeOfQrvey,'lookup_webhook', num);
			case 'password':
				return this.passwordQuestion(user, typeOfQrvey, num);
			case 'upload image':
			case 'upload-image':
			case 'upload_image':
				return this.uploadImageQuestion(user, typeOfQrvey, num);
		}
	};

	this.dateQuestion = function(user, typeOfQrvey, num, datesArray) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForDateQuestion');

		var i = 0,
			j = num,
			options = {},
			answersToGo = {},
			answersToGoCounter = 0,
			answerModel = findAnswers('date'),
			appID = configer.get('AppID'),
			defer = protractor.promise.defer();

		qs.createQrvey(appID, user, typeOfQrvey, 'date').then(function(_data) {
			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url);

			while (num > datesArray.length) {
				var mod = datesArray.length;
				datesArray.push(datesArray[i % mod]);
				i++;
			}

			answersToGo = Object.keys(datesArray);
			answersToGoCounter = answersToGo.length;

			if (answersToGo.length === 0) {
				return defer.fulfill();
			} else {
				dos.cycle(function (cb) {
					return cb(null, j >= 0);
				}, function(n, next) {
					answerModel.qrveyID = qrveyID;
					answerModel.qstring.q = qstring;

					answerModel.answers[0].data[0] = datesArray[n];

					if (typeOfQrvey == 'quiz') {
						answerModel.answers[0].data_ansid = Array();
						answerModel.profile.email = rand.getEmail();
					}

					i++;

					options = {
						url: '/api/qrveyanswers/' + qstring,
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						data: answerModel,
						json: true
					};

					rs.sendInfo(options, function(_resp) {
						logger.info('answer:', _resp);
						logger.info('counter:', answersToGoCounter);

						j--;

						next();
					});
				}, function(){
					logger.log('Finish the promise');
					return defer.fulfill();
				});
			}
		});

		return defer.promise;
	};

	this.expressionQuestion = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForExpressionQuestion');

		var i = 0,
			j = num,
			options = {},
			defer = protractor.promise.defer(),
			appID = configer.get('AppID'),
			answerModel = findAnswers('expression');

		qs.createQrvey(appID, user, typeOfQrvey, 'expression').then(function(_data) {
			var possibleAnswers = ['Happy', 'Exited', 'Dull', 'Tired', 'Impassive'],
				qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				qrveyanswerid = configer.get('QrveyAnswerId');

			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			answerModel.answers[0].id = qrveyanswerid;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {
				// for (i = 0; i < num; i++) {
				answerModel.answers[0].data = [];

				if (typeOfQrvey == 'quiz') {
					answerModel.answers[0].data_ansid = [qrveyanswerid];
					answerModel.profile.email = rand.getEmail();
				}

				while ((((num + i) * answerModel.answers[0].data.length) % 3) >= answerModel.answers[0].data.length) {
					answerModel.answers[0].data.push(possibleAnswers[(i + answerModel.answers[0].data.length) % possibleAnswers.length]);
				}

				i++;

				logger.info('responses ', answerModel.answers[0].data);
				logger.info('expression answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);
					logger.info('num:', num);

					j--;

					next();
				});
			}, function(){
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.multipleChoiceWithMultipleSelectionQuestion = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'multipleChoiceWithMultipleSelectionQuestion');

		var i = 0,
			j = num,
			options = {},
			defer = protractor.promise.defer(),
			appID = configer.get('AppID'),
			answerModel = findAnswers('multiple_choice_with_allow_multiple_selections');

		qs.createQrvey(appID, user, typeOfQrvey, 'multiple_choice', 'active', 'with_allow_multiple_selections').then(function(_data) {
			var possibleAnswers = ['Option A', 'Option B', 'Option C'],
				qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				qrveyanswerid = configer.get('QrveyAnswerId');

			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			answerModel.answers[0].id = qrveyanswerid;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {
				answerModel.answers[0].data = [];
				answerModel.answers[0].data_ansid = [];

				if (typeOfQrvey == 'quiz') {
					answerModel.answers[0].data_ansid = Array();
					answerModel.profile.email = rand.getEmail();
				}

				while ((((num + i) * answerModel.answers[0].data.length) % 3) >= answerModel.answers[0].data.length) {
					answerModel.answers[0].data.push(possibleAnswers[(i + answerModel.answers[0].data.length) % possibleAnswers.length]);
					answerModel.answers[0].data_ansid.push('');
				}

				i++;

				logger.info((1 + (num * i)) % possibleAnswers.length);
				logger.info('responses ', answerModel.answers[0].data);
				logger.info('responses lenght ', answerModel.answers[0].data.length);
				logger.info('responses data_ansid ', answerModel.answers[0].data_ansid);
				logger.info('multiple choice with allow multiple selections answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);
					logger.info('num:', num);

					j--;

					next();
				});
			}, function(){
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.expression_CategoriesQuestion = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForExpressionCategoriesQuestion');

		var i = 0,
			j = num,
			options = {},
			defer = protractor.promise.defer(),
			appID = configer.get('AppID'),
			answerModel = findAnswers('expression_with_categories');

		qs.createQrvey(appID, user, typeOfQrvey, 'expression_with_categories').then(function(_data) {
			var possiblePositiveAnswers = ['Happy', 'Exited', 'Enthusiastic', 'Lucky', 'Comfortable'],
				possibleNegativeAnswers = ['Unusual', 'Tired', 'Bored', 'Depressed', 'Sick'],
				qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				qrveyanswerid = configer.get('QrveyAnswerId');

			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			answerModel.answers[0].id = qrveyanswerid;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {
				var isPositve = Math.random() >= 0.5;
				logger.info('is positive', isPositve);

				answerModel.answers[0].data = [];

				if (typeOfQrvey == 'quiz') {
					answerModel.answers[0].data_ansid = [qrveyanswerid];
					answerModel.profile.email = rand.getEmail();
				}

				if (isPositve == true) {
					answerModel.answers[0].expression_type = 'positive';

					while ((((num + i) * answerModel.answers[0].data.length) % 3) >= answerModel.answers[0].data.length) {
						answerModel.answers[0].data.push(possiblePositiveAnswers[(i + answerModel.answers[0].data.length) % possiblePositiveAnswers.length]);
					}
					logger.info((1 + (num * i)) % possiblePositiveAnswers.length);
				} else {
					answerModel.answers[0].expression_type = 'negative';

					while ((((num + i) * answerModel.answers[0].data.length) % 3) >= answerModel.answers[0].data.length) {
						answerModel.answers[0].data.push(possibleNegativeAnswers[(i + answerModel.answers[0].data.length) % possibleNegativeAnswers.length]);
					}
					logger.info((1 + (num * i)) % possibleNegativeAnswers.length);
				}

				logger.info('responses ', answerModel.answers[0].data);
				logger.info('expression with categories answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);
					logger.info('num:', num);

					j--;

					next();
				});
			}, function(){
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.yesnoQuestion = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForYesNoQuestion');

		var i = 0,
			j = num,
			answerModel = null,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer();

		qs.createQrvey(appID, user, typeOfQrvey, 'yes_no').then(function(_data) {
			var possibleAnswers = ['Yes', 'No', 'Yes', 'Yes', 'No'],
				qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				qrveyanswerid = configer.get('QrveyAnswerId');

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {
				answerModel = findAnswers('yes_no');
				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = qrveyanswerid;

				if (typeOfQrvey == 'quiz') {
					answerModel.answers[0].data_ansid = [qrveyanswerid];
					answerModel.profile.email = rand.getEmail();
				}

				while (1 > answerModel.answers[0].data.length) {
					answerModel.answers[0].data.push(possibleAnswers[num % (i + 1) % possibleAnswers.length]);
				}

				i++;

				logger.info('responses ', answerModel.answers[0].data);
				logger.info('yes no answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', i);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.slidebarQuestion = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForSlidebarQuestion');

		var i = 0,
			j = num,
			options = {},
			answerModel = null,
			appID = configer.get('AppID'),
			defer = protractor.promise.defer();

		qs.createQrvey(appID, user, typeOfQrvey, 'slide_bar').then(function(_data) {
			var possibleAnswers = ['1', '2', '3', '2', '3'],
				qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				qrveyanswerid = configer.get('QrveyAnswerId');

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(next) {
				answerModel = findAnswers('slidebar');

				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = qrveyanswerid;

				if (typeOfQrvey == 'quiz') {
					answerModel.answers[0].data_ansid = [qrveyanswerid];
					answerModel.profile.email = rand.getEmail();
				}

				while (1 > answerModel.answers[0].data.length) {
					answerModel.answers[0].data.push(possibleAnswers[num % (i + 1) % possibleAnswers.length]);
				}

				i++;

				logger.info(num % (i + 1) % possibleAnswers.length);
				logger.info('responses ', answerModel.answers[0].data);
				logger.info('slidebar answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.multiplechoiceQuestion = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForMultipleChoiceQuestion');

		var i = 0,
			j = num,
			answerModel = null,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer();

		qs.createQrvey(appID, user, typeOfQrvey, 'multiple_choice').then(function(_data) {
			var possibleAnswers = ['Jon Snow', 'Tyrion Lannister', 'Daenerys Targaryen', 'Arya Stark', 'Ghost'],
				qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				qrveyanswerid = configer.get('QrveyAnswerId');

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {
				answerModel = findAnswers('multiple_choice');

				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = qrveyanswerid;
				answerModel.answers[0].data_ansid = [qrveyanswerid];

				if (typeOfQrvey == 'quiz') {
					answerModel.answers[0].data_ansid = [qrveyanswerid];
					answerModel.profile.email = rand.getEmail();
				}

				while (1 > answerModel.answers[0].data.length) {
					answerModel.answers[0].data.push(possibleAnswers[num % (i + 1) % possibleAnswers.length]);
				}

				i++;

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.imageQuestion = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForImageQuestion');

		var i = 0,
			j = num,
			answerModel = null,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer();

		qs.createQrvey(appID, user, typeOfQrvey, 'image').then(function(_data) {
			var possibleAnswers = ['Jon Snow', 'Tyrion Lannister', 'Daenerys Targaryen', 'Arya Stark', 'Ghost'],
				possibleAnswersID = ['Y06NPO18a0', 'Y06NPO18a1', 'Y06NPO18aIOYO1MRX', 'Y06NPO18aBXQTYT78', 'Y06NPO18aF68SZSWT'],
				qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				qrveyanswerid = configer.get('QrveyAnswerId');

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {
				answerModel = findAnswers('image');

				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = qrveyanswerid;

				if (typeOfQrvey == 'quiz') {
					answerModel.profile.email = rand.getEmail();
				}

				while (1 > answerModel.answers[0].data.length) {
					answerModel.answers[0].data.push(possibleAnswers[num % (i + 1) % possibleAnswers.length]);
					answerModel.answers[0].data_ansid.push(possibleAnswersID[num % (i + 1) % possibleAnswersID.length]);
				}

				i++;

				logger.info(num % (i + 1) % possibleAnswers.length);
				logger.info('responses ', answerModel.answers[0].data);
				logger.info('image answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.createAnswersForMultipleChoiceQuestionByUrl = function(num, url, typeOfQrvey) {
		var i = 0,
			j = num,
			options = {},
			defer = protractor.promise.defer(),
			answerModel = null;

		var qrveyID = configer.get('QrveyId'),
			qstring = findHashInUrl(url),
			qrveyanswerid = configer.get('QrveyAnswerId'),
			possibleAnswers = ['Jon Snow', 'Tyrion Lannister', 'Daenerys Targaryen', 'Arya Stark', 'Ghost'];

		dos.cycle(function (cb) {
			return cb(null, j >= 0);
		}, function(item, next) {
			answerModel = findAnswers('multiple_choice');

			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			answerModel.answers[0].id = qrveyanswerid;

			if (typeOfQrvey == 'quiz') {
				answerModel.answers[0].data_ansid = [qrveyanswerid];
				answerModel.profile.email = rand.getEmail();
			}

			while (1 > answerModel.answers[0].data.length) {
				answerModel.answers[0].data.push(possibleAnswers[num % (i + 1) % possibleAnswers.length]);
			}

			i++;

			logger.info(num % (i + 1) % possibleAnswers.length);
			logger.info('responses ', answerModel.answers[0].data);
			logger.info('multiple choice answer model', answerModel);

			options = {
				url: '/api/qrveyanswers/' + qstring,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				data: answerModel,
				json: true
			};

			rs.sendInfo(options, function(_resp) {
				logger.info('answer:', _resp);
				logger.info('counter:', j);

				j--;

				next();
			});
		}, function () {
			logger.log('Finish the promise');
			return defer.fulfill();
		});

		return defer.promise;
	};

	this.numericQuestion = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForNumericQuestion');

		var i = 0,
			j = num,
			options = {},
			defer = protractor.promise.defer(),
			appID = configer.get('AppID'),
			answerModel = findAnswers('numeric');

		qs.createQrvey(appID, user, typeOfQrvey, 'numeric').then(function(_data) {
			var possibleAnswers = [2, 5, 8, 3, 6, 9, 4, 1, 7],
				qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				qrveyanswerid = configer.get('QrveyAnswerId');

			answerModel.answers[0].id = qrveyanswerid;
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {
				answerModel.answers[0].data[0] = possibleAnswers[num % (i + 1) % possibleAnswers.length];

				i++;

				if (typeOfQrvey == 'quiz') {
					answerModel.answers[0].data_ansid = [qrveyanswerid];
					answerModel.profile.email = rand.getEmail();
				}

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.rankingQuestion = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForRankingQuestion');

		var defer = protractor.promise.defer(),
			i = 0,
			j = 0,
			k = num,
			options = {},
			appID = configer.get('AppID'),
			answerModel = findAnswers('ranking');

		qs.createQrvey(appID, user, typeOfQrvey, 'ranking').then(function(_data) {
			var possibleAnswers = ['Jon Snow', 'Tyrion Lannister', 'Daenerys Targaryen', 'Arya Stark'],
				qrveyID = configer.get('QrveyId'),
				qrveyanswerid = configer.get('QrveyAnswerId'),
				qstring = findHashInUrl(_data.url);

			answerModel.answers[0].id = qrveyanswerid;
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			dos.cycle(function (cb) {
				return cb(null, k >= 0);
			}, function(next) {

				j = 0;

				answerModel.answers[0].data = [];

				if (typeOfQrvey == 'quiz') {
					answerModel.answers[0].data_ansid = [qrveyanswerid];
					answerModel.profile.email = rand.getEmail();
				}

				while (j < possibleAnswers.length) {
					answerModel.answers[0].data.push(possibleAnswers[(num % (i + 1) + j) % possibleAnswers.length]);
					j++;
				}

				i++;

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.log('answerModel:', answerModel);

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', k);
					logger.info('num:', num);

					k--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.ratingQuestion = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForRatingQuestion');

		var defer = protractor.promise.defer(),
			i = 0,
			j = num,
			options = {},
			appID = configer.get('AppID'),
			answerModel = findAnswers('rating');

		qs.createQrvey(appID, user, typeOfQrvey, 'rating').then(function(_data) {
			var possibleAnswers = [1, 2, 3, 4, 5],
				qrveyID = configer.get('QrveyId'),
				qrveyanswerid = configer.get('QrveyAnswerId'),
				qstring = findHashInUrl(_data.url);

			answerModel.answers[0].id = qrveyanswerid;
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			if (typeOfQrvey == 'quiz') {
				answerModel.answers[0].data_ansid = [qrveyanswerid];
				answerModel.profile.email = rand.getEmail();
			}

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(next) {
				answerModel.answers[0].data = [];
				answerModel.answers[0].data.push(possibleAnswers[(num % (i + 1)) % possibleAnswers.length]);
				i++;

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.info('answerModel:', answerModel);
				logger.info('answerRR:', answerModel.answers[0].data);

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.npsQuestion = function(user, num, textArray) {
		var defer = protractor.promise.defer(),
			answerModel = findAnswers('nps_with_textfield'),
			i = 0,
			j = num,
			idx = 1,
			answersToGo = {},
			answersToGoCounter = 0,
			_data1 = null,
			appID = configer.get('AppID'),
			options = {};

		qs.createQrvey(appID, user, 'nps').then(function(_data) {
			var vecNum = [
					[0, 1, 2, 3, 4, 1, 4, 8],
					[2, 5, 7, 8, 3, 0, 0, 4, 2, 7, 1, 3, 9],
					[0, 8, 3, 6, 7, 2, 2, 6, 8, 6, 5, 3, 5, 4, 3, 6, 7, 8, 6, 3, 2]
				],
				npsID = configer.get('QrveyId'),
				qrveyanswerid1 = configer.get('QrveyAnswerId'),
				qrveyanswerid2 = configer.get('QrveyAnswerId2'),
				qstring = findHashInUrl(_data.url);

			logger.log('npsID:', npsID);

			while (num > textArray.length) {
				var mod = textArray.length;
				textArray.push(textArray[i % mod]);
				i++;
			}

			answersToGo = Object.keys(textArray);
			answersToGoCounter = answersToGo.length;

			if (answersToGo.length === 0) {
				return defer.fulfill();
			} else {
				dos.cycle(function (cb) {
					return cb(null, j >= 0);
				}, function(next) {

					if (num == 8) {
						idx = 0;
					} else if (num == 13) {
						idx = 1;
					} else if (num == 21) {
						idx = 2;
					} else throw new Error('The number ' + num + ' doesnt correct, the options are (8, 13, 21)');

					answerModel.qrveyID = npsID;
					answerModel.qstring.q = qstring;

					_data1 = [vecNum[idx][i]];

					logger.log('textArray', textArray);
					logger.log('item', i);
					logger.log('textArray[item][0]', textArray[n][0]);

					answerModel.answers[0].data = _data1;
					answerModel.answers[1].data = [textArray[n][0]];

					if (_data1 > 0 && _data1 <= 6) {
						answerModel.answers[0].userType = 'Detractor';
						answerModel.answers[1].userType = 'Detractor';
					} else if (_data1 > 6 && _data1 <= 8) {
						answerModel.answers[0].userType = 'Passive';
						answerModel.answers[1].userType = 'Passive';
					} else if (_data1 > 8) {
						answerModel.answers[0].userType = 'Promoter';
						answerModel.answers[1].userType = 'Promoter';
					}

					answerModel.answers[0].id = qrveyanswerid1;
					answerModel.answers[1].id = qrveyanswerid2;

					logger.log('Answer Model of life', answerModel);

					i++;

					options = {
						url: '/api/qrveyanswers/' + qstring,
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						data: answerModel,
						json: true
					};

					rs.sendInfo(options, function(_resp) {
						logger.info('answer:', _resp);
						logger.info('counter:', answersToGoCounter);

						j--;

						next();
					});
				}, function () {
					logger.log('Finish the promise');
					return defer.fulfill();
				});
			}
		});

		return defer.promise;
	};

	this.shorttextQuestion = function(user, typeOfQrvey, num, sentiment, text, filtered) {
		var defer = protractor.promise.defer(),
			answerModel = findAnswers('short_text'),
			i = 0,
			j = num,
			stAns = '',
			options = {},
			appID = configer.get('AppID'),
			possibleAnswers;

		qs.createQrvey(appID, user, typeOfQrvey, 'short_text').then(function(_data) {
			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url);

			if (sentiment !== 'undefined' && sentiment == true) {
				logger.log('sent');
				possibleAnswers = ['Thanks, I am happy with the product', 'Great quality, thanks', 'Very convenient',
					'Good and low prices', 'It was just okay', 'This is just amazing!',
					'It just sucks, dont come here', 'Never shop there', 'Please no, just dont buy there', 'Maybe I will return'
				];
			} else {
				logger.log('mmm');
				possibleAnswers = ['arya', 'stark', 'lannister', 'jon',
					'snow', 'daenerys ', 'targaryen',
					'great', 'tyrion', 'freedom', 'brienne', 'tarth'
				];
			}

			answerModel.answers[0].id = configer.get('QrveyAnswerId');
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(next) {

				stAns = '';
				answerModel.answers[0].data = [];

				if (typeOfQrvey == 'quiz') {
					answerModel.answers[0].data_ansid = [answerModel.answers[0].id];
					answerModel.profile.email = rand.getEmail();
				}

				if (i < text && text != null) {
					stAns = filtered;
				} else {
					if(sentiment==true && i==0){
						stAns = 'The food was bad, but the service was terrible';
					}else{
						stAns = chance.pickone(possibleAnswers);
					}

					if (filtered != null) {
						while (stAns.trim() == filtered) {
							stAns = chance.pickone(possibleAnswers);
						}
					}
				}

				i++;

				answerModel.answers[0].data.push(stAns);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.info('answerModel:', answerModel);
				logger.info('answerRR:', answerModel.answers[0].data);

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.longtextQuestion = function(user, typeOfQrvey, num, sentiment, text, filtered) {
		var defer = protractor.promise.defer(),
			answerModel = findAnswers('long_text'),
			i = 0,
			j = num,
			stAns = '',
			options = {},
			appID = configer.get('AppID');

		qs.createQrvey(appID, user, typeOfQrvey, 'long_text').then(function(_data) {
			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				possibleAnswers = [
					'A store is not as good as online',
					'I had trouble finding parking. Also no mobile pay is inconvenient',
					'In-store selection was poor for a very common size',
					'Would love to sign up for a newsletter with special deals.',
					'Your store is hard to get to. It\'s impossible during rush hours.',
					'Easy navigation for the website. Loved it!',
					'Very well organized!',
					'Good quality and good selection',
					'I love the sales.',
					'I had trouble finding parking. Also no mobile pay is inconvenient',
					'Good quality and good selection',
					'Of Tarth'
				];

			answerModel.answers[0].id = configer.get('QrveyAnswerId');
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(next) {

				stAns = '';
				answerModel.answers[0].data = [];

				if (typeOfQrvey == 'quiz') {
					answerModel.answers[0].data_ansid = [answerModel.answers[0].id];
					answerModel.profile.email = rand.getEmail();
				}

				if (i < text) {
					stAns = filtered;
				} else {
					stAns = chance.pickone(possibleAnswers);

					while (stAns.trim() == filtered) {
						stAns = chance.pickone(possibleAnswers);
					}
				}

				i++;

				answerModel.answers[0].data.push(stAns);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.info('answerModel:', answerModel);
				logger.info('answerRR:', answerModel.answers[0].data);

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.passwordQuestion = function(user, typeOfQrvey, num) {
		var defer = protractor.promise.defer(),
			answerModel = findAnswers('password'),
			j = num,
			stAns = '',
			appID = configer.get('AppID'),
			options = {};

		qs.createQrvey(appID, user, typeOfQrvey, 'password').then(function(_data) {
			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url);

			answerModel.answers[0].id = configer.get('QrveyAnswerId');
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(next) {

				stAns = '';
				answerModel.answers[0].data = [];

				if (typeOfQrvey == 'quiz') {
					answerModel.answers[0].data_ansid = [answerModel.answers[0].id];
					answerModel.profile.email = rand.getEmail();
				}

				var charNum = rand.getNumber({ float: false, min: 5, max: 15 });
				logger.info('charNum:', charNum);
				stAns = rand.getText(charNum);

				answerModel.answers[0].data.push(stAns);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.info('answerModel:', answerModel);
				logger.info('answerRR:', answerModel.answers[0].data);

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.uploadImageQuestion = function(user, typeOfQrvey, num) {
		var defer = protractor.promise.defer(),
			answerModel = findAnswers('upload_image'),
			j = num,
			appID = configer.get('AppID'),
			options = {};

		qs.createQrvey(appID, user, typeOfQrvey, 'upload_image').then(function(_data) {
			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url);

			answerModel.answers[0].id = configer.get('QrveyAnswerId');
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			var dataImage = getImage();

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(next) {
				// Start upload image
				options = {
					url: '/api/styles/upload/file?type=image/png&lookup=' + qstring,
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},
					json: true
				};

				rs.sendInfo(options, function (_resp) {
					// console.log('_resp.signedRequest', _resp.data.signedRequest);

					options = {
						url: _resp.data.signedRequest,
						method: 'PUT',
						signedRequest: true,
						headers: {
							'Content-Type': 'image/png',
							'Content-Disposition': 'attachment; filename=image/png'
						},
						data: dataImage
					};

					rs.sendCustomUrlInfo(options, function () {
						answerModel.answers.imageUrl = _resp.data.url;
						answerModel.questionsVersion = 2;
						answerModel.answers.imageUploadOption = 'None';

						options = {
							url: '/api/qrveyanswers/' + qstring,
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							data: answerModel,
							json: true
						};

						logger.info('answerModel:', answerModel);
						logger.info('answerRR:', answerModel.answers[0].data);

						rs.sendInfo(options, function (_resp3) {
							logger.info('answer:', _resp3);
							logger.info('counter:', j);

							j--;

							next();
						});
					});
				});

				// End upload image
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.lookupQuestion = function(user, typeOfQrvey,typeOfLookup, num) {
		var defer = protractor.promise.defer(),
			appID = configer.get('AppID'),
			answerModel = findAnswers('look_up'),
			j = num,
			options = {};

		qs.createQrvey(appID, user, typeOfQrvey, typeOfLookup).then(function(_data) {
			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				possibleAnswers = (typeOfLookup == 'lookup_webhook') ? ['Rey.Padberg@karina.biz', 'Chaim_McDermott@dana.io', 'Sherwood@rosamond.me',
					'Telly.Hoeger@billy.biz', 'Karley_Dach@jasper.info', 'Lucio_Hettinger@annie.ca',
					'Julianne.OConner@kory.org', 'Nathan@yesenia.net', 'Shanna@melissa.tv',
					'Sincere@april.biz'
				] : ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'];
			var _max = (typeOfLookup == 'lookup_webhook') ? 9 : 4;
			answerModel.answers[0].id = configer.get('QrveyAnswerId');
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(next) {

				answerModel.answers[0].data = [];

				var number = rand.getNumber({
					min: 0,
					max: _max
				});

				answerModel.answers[0].data.push(possibleAnswers[number]);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.info('answerModel:', answerModel);
				logger.info('answerRR:', answerModel.answers[0].data);

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.checklistQuestion = function(user, num) {
		var defer = protractor.promise.defer(),
			appID = configer.get('AppID'),
			answerModel = findAnswers('checklist'),
			// userEmail = configer.get('username'),
			i = 0,
			j = num,
			stAns = '',
			options = {};

		qs.createQrvey(appID, user, 'checklist').then(function(_data) {
			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				possibleAnswers = ['Technology', 'Science', 'Sports', 'Politics', 'Entertainment', 'Art & Culture', 'Fashion'];

			answerModel.answers[0].id = configer.get('QrveyAnswerId');
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			var uniqueEmailDefined = false;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(next) {

				stAns = '';
				if (answerModel.profile){
					answerModel.profile.email = rand.getRandomEmail(); // Only for Checklist
				}
				answerModel.answers[0].data = [];

				var answers = [];

				// var n = rand.getNumber({
				//     float: false,
				//     min: 0,
				//     max: 4
				// });

				// console.log('NUM', n);

				// i = 0;

				// while (i <= n) {
				//     answerModel.answers[0].data.push(chance.pickone(possibleAnswers));
				//     i++;
				// }

				// if (answerModel.answers[0].data.length == 0) {
				//     answerModel.answers[0].data.push(chance.pickone(possibleAnswers));
				// }

				while (((num * i) % possibleAnswers.length) >= (answers.length + 1) / 3) {
					var position = i * answers.length * (num + 1) % (answers.length + 3) % possibleAnswers.length;
					answers.push(possibleAnswers[position]);
				}

				i++;

				if (answers.length == 0) {
					if (uniqueEmailDefined == false) {
						if (answerModel.profile) answerModel.profile.email = 'test.filtered.email@qrvey.com';
						uniqueEmailDefined = true;
					}
					answers.push(possibleAnswers[0]);
				}

				answerModel.answers[0].data = _.uniq(answers);

				if (stAns === '') {
					stAns = 'not Empty :D';
				}

				answerModel.answers[0].data.push(stAns);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.info('answerModel:', answerModel);
				logger.info('answerRR:', answerModel.answers[0].data);

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});

			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.emailQuestion = function(user, typeOfQrvey, num) {
		var defer = protractor.promise.defer(),
			answerModel = findAnswers('email'),
			appID = configer.get('AppID'),
			j = num,
			options = {};

		qs.createQrvey(appID, user, typeOfQrvey, 'email').then(function(_data) {

			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url);

			answerModel.answers[0].id = configer.get('QrveyAnswerId');
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			dos.cycle(function(cb){
				return cb(null, j >= 0);
			}, function(next) {

				answerModel.answers[0].data = [];
				answerModel.answers[0].data.push(rand.getEmail());

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.info('answerModel:', answerModel);
				logger.info('answerRR:', answerModel.answers[0].data);

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});

			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.addressQuestion = function(user, typeOfQrvey, num) {
		var defer = protractor.promise.defer(),
			answerModel = findAnswers('address'),
			j = num,
			appID = configer.get('AppID'),
			options = {};

		qs.createQrvey(appID, user, typeOfQrvey, 'address').then(function(_data) {

			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url);

			answerModel.answers[0].id = configer.get('QrveyAnswerId');
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			dos.cycle(function(cb){
				return cb(null, j >= 0);
			}, function(item, next) {

				answerModel.answers[0].address = [];

				answerModel.answers[0].address = {
					street_address: rand.getAddress(),
					city: rand.getCity(),
					state: rand.getState(),
					postal_code: rand.getZip(),
					country: rand.getCountry()
				};

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.info('answerModel:', answerModel);
				logger.info('answerRR:', answerModel.answers[0].data);
				logger.info('answerAD:', answerModel.answers[0].address);
				logger.log('ans -> ', JSON.stringify(answerModel));

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});

			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.usAddressQuestion = function(user, typeOfQrvey, num) {
		var defer = protractor.promise.defer(),
			answerModel = findAnswers('us_address'),
			appID = configer.get('AppID'),
			j = num,
			options = {};

		qs.createQrvey(appID, user, typeOfQrvey, 'us_address').then(function(_data) {

			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url);

			answerModel.answers[0].id = configer.get('QrveyAnswerId');
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			dos.cycle(function(cb){
				return cb(null, j >= 0);
			}, function(item, next) {

				answerModel.answers[0].address = [];

				answerModel.answers[0].address = {
					address_line_1: rand.getAddress(),
					address_line_2: rand.getAddress(),
					city: rand.getCity(),
					state: rand.getState(''),
					stateName: rand.getState(),
					postal_code: rand.getZip(),
					country: 'USA'
				};

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.info('answerModel:', answerModel);
				logger.info('answerRR:', answerModel.answers[0].data);
				logger.info('answerAD:', answerModel.answers[0].address);
				logger.log('ans -> ', JSON.stringify(answerModel));

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.nameQuestion = function(user, typeOfQrvey, num) {
		var defer = protractor.promise.defer(),
			answerModel = findAnswers('name'),
			j = num,
			appID = configer.get('AppID'),
			options = {};

		qs.createQrvey(appID, user, typeOfQrvey, 'name').then(function(_data) {

			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url);

			answerModel.answers[0].id = configer.get('QrveyAnswerId');
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {

				answerModel.answers[0].name = [];
				answerModel.answers[0].name = {
					first_name: rand.getName(),
					last_name: rand.getLastname()
				};

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.info('answerModel:', answerModel);
				logger.info('answerRR:', answerModel.answers[0].data);
				logger.info('answerAD:', answerModel.answers[0].address);
				logger.log('ans -> ', JSON.stringify(answerModel));

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});

			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.phoneQuestion = function(user, typeOfQrvey, num) {
		var defer = protractor.promise.defer(),
			answerModel = findAnswers('phone'),
			appID = configer.get('AppID'),
			j = num,
			options = {};

		qs.createQrvey(appID, user, typeOfQrvey, 'phone').then(function(_data) {

			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url);

			answerModel.answers[0].id = configer.get('QrveyAnswerId');
			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {

				answerModel.answers[0].data = [];
				answerModel.answers[0].data.push('+' + rand.getPhone('').replace(/[()]/g, ''));

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				logger.info('answerModel:', answerModel);
				logger.info('answerRR:', answerModel.answers[0].data);
				logger.info('answerAD:', answerModel.answers[0].address);
				logger.log('ans -> ', JSON.stringify(answerModel));

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					next();
				});

			}, function () {
				logger.log('Finish the promise');
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.createAnswersForBranchs = function(user, typeOfQrvey, typeOfBranch, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForBranchs');

		var j = num,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer(),
			answerModel = findBranchAnswers(typeOfBranch);

		qs.createBranchs(appID, user, typeOfQrvey, typeOfBranch).then(function(_data) {
			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				qrveyanswerid = configer.get('QrveyAnswerId');

			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			answerModel.answers[0].id = qrveyanswerid;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {
				if (typeOfBranch == 'jump_to_mc' || typeOfBranch == 'jump_to_yesno' || typeOfBranch == 'jump_to_image') {
					answerModel.answers[1].data[0] = rand.getNumber({
						float: false,
						min: 1,
						max: 100
					});
				}

				logger.info('responses ', answerModel.answers[0].data);
				logger.info('branches with ' + typeOfBranch + ' options answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);

					j--;

					return next();
				});
			}, function () {
				logger.log('Finish the promise #' + j);
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.createAnswersForCrossTab = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForCrossTab');

		var j = num,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer(),
			answerModel = findAnswers('cross_tab');

		qs.createCrossTab(appID, user, typeOfQrvey).then(function(_data) {
			var qrveyID = configer.get('QrveyId'),
				qstring = findHashInUrl(_data.url),
				possibleAnswersMC = ['Option 1', 'Option 2'],
				possibleAnswersYN = ['Yes', 'No'],
				possibleAnswersIM = ['Option Q', 'Option W'],
				possibleAnsersIMID = ['26XUAVZ9a0', '26XUAVZ9a1'],
				qrveyanswerid = configer.get('QrveyAnswerId'),
				qrveyanswerid2 = configer.get('QrveyAnswerId2'),
				qrveyanswerid3 = configer.get('QrveyAnswerId3'),
				qrveyanswerid4 = configer.get('QrveyAnswerId4');

			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			answerModel.answers[0].id = qrveyanswerid;
			answerModel.answers[1].id = qrveyanswerid2;
			answerModel.answers[2].id = qrveyanswerid3;
			answerModel.answers[3].id = qrveyanswerid4;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {

				answerModel.answers[0].data = [];
				answerModel.answers[1].data = [];
				answerModel.answers[2].data = [];
				answerModel.answers[3].data = [];
				answerModel.answers[3].data_ansid = [];
				answerModel.answers[0].data.push(possibleAnswersMC[(rand.getBoolean()) ? 0 : 1]);
				answerModel.answers[1].data.push(rand.getNumber({ float: false, min: 1, max: 5 }));
				answerModel.answers[2].data.push(possibleAnswersYN[(rand.getBoolean()) ? 0 : 1]);
				var imgBool = rand.getBoolean();
				answerModel.answers[3].data.push(possibleAnswersIM[imgBool ? 0 : 1]);
				answerModel.answers[3].data_ansid.push(possibleAnsersIMID[imgBool ? 0 : 1]);

				logger.info('responses 1', answerModel.answers[0].data);
				logger.info('responses 2', answerModel.answers[1].data);
				logger.info('responses 3', answerModel.answers[2].data);
				logger.info('responses 4', answerModel.answers[3].data);
				logger.info('responses 4 ids', answerModel.answers[3].data_ansid);
				logger.info('cross tabulation answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);
					logger.info('num:', num);

					j--;

					next();
				});

			}, function () {
				logger.log('Finish the promise #' + j);
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.createAnswersForBarChartBuilder = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForBarChartBuilder');

		var j = num,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer(),
			_model = ('bar'+'_chart_questions'),
			basic = false;

		if(typeOfQrvey == 'quiz' || typeOfQrvey == 'forms' || typeOfQrvey == 'questionnaire') {
			_model = _model + '_basic';
			basic = true;
		}

		var answerModel = findChartAnswers(_model),
			qrveyID = null,
			qstring = null,
			possibleAnswersMC = null,
			possibleAnswersYN = null,
			possibleAnswersDT = null,
			qrveyanswerid = null,
			qrveyanswerid2 = null,
			qrveyanswerid3 = null,
			qrveyanswerid4 = null,
			qrveyanswerid5 = null,
			qrveyanswerid6 = null;

		qs.createChartBuilder(appID, user, typeOfQrvey, 'bar').then(function(_data) {

			if(basic){
				qrveyID = configer.get('QrveyId');
				qstring = findHashInUrl(_data.url);
				possibleAnswersMC = ['A', 'B'];
				possibleAnswersYN = ['Yes', 'No'];
				possibleAnswersDT = ['01/01/01', '02/02/02', '03/03/03', '04/04/04', '05/05/05'];
				qrveyanswerid = configer.get('QrveyAnswerId');
				qrveyanswerid2 = configer.get('QrveyAnswerId2');
				qrveyanswerid3 = configer.get('QrveyAnswerId3');
				qrveyanswerid4 = configer.get('QrveyAnswerId4');

				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = qrveyanswerid;
				answerModel.answers[1].id = qrveyanswerid2;
				answerModel.answers[2].id = qrveyanswerid3;
				answerModel.answers[3].id = qrveyanswerid4;

				dos.cycle(function (cb) {
					return cb(null, j >= 0);
				}, function(item, next) {

					if (typeOfQrvey == 'quiz') {
						answerModel.profile.email = rand.getEmail();
					}

					answerModel.answers[0].data = [];
					answerModel.answers[1].data = [];
					answerModel.answers[2].data = [];
					answerModel.answers[3].data = [];
					answerModel.answers[0].data.push(possibleAnswersMC[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[1].data.push(possibleAnswersYN[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[2].data.push(rand.getNumber({ float: false, min: 1, max: 300 }));
					answerModel.answers[3].data.push(possibleAnswersDT[rand.getNumber({ float: false, min: 0, max: 4 })]);

					logger.info('responses 1', answerModel.answers[0].data);
					logger.info('responses 2', answerModel.answers[1].data);
					logger.info('responses 3', answerModel.answers[2].data);
					logger.info('responses 4', answerModel.answers[3].data);
					logger.info('bar chart questions answer model', answerModel);

					options = {
						url: '/api/qrveyanswers/' + qstring,
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						data: answerModel,
						json: true
					};

					rs.sendInfo(options, function(_resp) {
						logger.info('answer:', _resp);
						logger.info('counter:', j);
						logger.info('num:', num);

						j--;

						next();
					});

				}, function () {
					logger.log('Finish the promise #' + j);
					return defer.fulfill();
				});

			}else{
				qrveyID = configer.get('QrveyId');
				qstring = findHashInUrl(_data.url);
				possibleAnswersMC = ['A', 'B'];
				possibleAnswersYN = ['Yes', 'No'];
				possibleAnswersDT = ['01/01/01', '02/02/02', '03/03/03', '04/04/04', '05/05/05'];
				qrveyanswerid = configer.get('QrveyAnswerId');
				qrveyanswerid2 = configer.get('QrveyAnswerId2');
				qrveyanswerid3 = configer.get('QrveyAnswerId3');
				qrveyanswerid4 = configer.get('QrveyAnswerId4');
				qrveyanswerid5 = configer.get('QrveyAnswerId5');
				qrveyanswerid6 = configer.get('QrveyAnswerId6');

				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = qrveyanswerid;
				answerModel.answers[1].id = qrveyanswerid2;
				answerModel.answers[2].id = qrveyanswerid3;
				answerModel.answers[3].id = qrveyanswerid4;
				answerModel.answers[4].id = qrveyanswerid5;
				answerModel.answers[5].id = qrveyanswerid6;

				dos.cycle(function (cb) {
					return cb(null, j >= 0);
				}, function(next) {

					answerModel.answers[0].data = [];
					answerModel.answers[1].data = [];
					answerModel.answers[2].data = [];
					answerModel.answers[3].data = [];
					answerModel.answers[4].data = [];
					answerModel.answers[5].data = [];
					answerModel.answers[0].data.push(possibleAnswersMC[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[1].data.push(rand.getNumber({ float: false, min: 1, max: 5 }));
					answerModel.answers[2].data.push(possibleAnswersYN[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[3].data.push(rand.getNumber({ float: false, min: 1, max: 300 }));
					answerModel.answers[4].data.push(rand.getNumber({ float: false, min: 1, max: 3 }).toString());
					answerModel.answers[5].data.push(possibleAnswersDT[rand.getNumber({ float: false, min: 0, max: 4 })]);

					logger.info('responses 1', answerModel.answers[0].data);
					logger.info('responses 2', answerModel.answers[1].data);
					logger.info('responses 3', answerModel.answers[2].data);
					logger.info('responses 4', answerModel.answers[3].data);
					logger.info('responses 5', answerModel.answers[4].data);
					logger.info('responses 6', answerModel.answers[5].data);
					logger.info('bar chart questions answer model', answerModel);

					options = {
						url: '/api/qrveyanswers/' + qstring,
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						data: answerModel,
						json: true
					};

					rs.sendInfo(options, function(_resp) {
						logger.info('answer:', _resp);
						logger.info('counter:', j);
						logger.info('num:', num);

						j--;

						next();
					});
				}, function () {
					logger.log('Finish the promise #' + j);
					return defer.fulfill();
				});
			}
		});

		return defer.promise;
	};

	this.createAnswersForWordCloudChartBuilder = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForWordCloudChartBuilder');

		var j = num,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer(),
			_model = ('wordcloud'+'_chart_questions');

		//if(typeOfQrvey == 'quiz' || typeOfQrvey == 'forms' || typeOfQrvey == 'questionnaire') {
		//_model = _model + '_basic';
		//basic = true;
		//}

		var answerModel = findChartAnswers(_model),
			qrveyID = null,
			qstring = null,
			possibleAnswersSB = null,
			possibleAnswersWE = null,
			qrveyanswerid = null,
			qrveyanswerid2 = null,
			qrveyanswerid3 = null,
			qrveyanswerid4 = null,
			qrveyanswerid5 = null,
			qrveyanswerid6 = null;

		qs.createChartBuilder(appID, user, typeOfQrvey, 'wordcloud').then(function(_data) {
			qrveyID = configer.get('QrveyId');
			qstring = findHashInUrl(_data.url);

			possibleAnswersSB = ['1', '2', '3', '2', '3'];
			possibleAnswersWE = ['Happy', 'Exited', 'Dull', 'Tired', 'Impassive'];

			qrveyanswerid = configer.get('QrveyAnswerId');
			qrveyanswerid2 = configer.get('QrveyAnswerId2');
			qrveyanswerid3 = configer.get('QrveyAnswerId3');
			qrveyanswerid4 = configer.get('QrveyAnswerId4');
			qrveyanswerid5 = configer.get('QrveyAnswerId5');
			qrveyanswerid6 = configer.get('QrveyAnswerId6');

			answerModel.qrveyID = qrveyID;
			answerModel.qstring.q = qstring;
			answerModel.answers[0].id = qrveyanswerid;
			answerModel.answers[1].id = qrveyanswerid2;
			answerModel.answers[2].id = qrveyanswerid3;
			answerModel.answers[3].id = qrveyanswerid4;
			answerModel.answers[4].id = qrveyanswerid5;
			answerModel.answers[5].id = qrveyanswerid6;

			dos.cycle(function (cb) {
				return cb(null, j >= 0);
			}, function(item, next) {

				answerModel.answers[0].data = [];
				answerModel.answers[1].data = [];
				answerModel.answers[2].data = [];
				answerModel.answers[3].data = [];
				answerModel.answers[4].data = [];
				answerModel.answers[5].data = [];
				answerModel.answers[0].data.push(rand.getParagraph());
				answerModel.answers[1].data.push(rand.getSentence());
				answerModel.answers[2].data.push(rand.getNumber({ float: false, min: 1, max: 300 }));
				answerModel.answers[3].data.push(possibleAnswersSB[rand.getNumber({ float: false, min: 0, max: 4 })]);
				answerModel.answers[4].data.push(possibleAnswersWE[rand.getNumber({ float: false, min: 0, max: 4 })]);
				answerModel.answers[5].data.push(rand.getNumber({ float: false, min: 1, max: 5 }));

				logger.info('responses 1', answerModel.answers[0].data);
				logger.info('responses 2', answerModel.answers[1].data);
				logger.info('responses 3', answerModel.answers[2].data);
				logger.info('responses 4', answerModel.answers[3].data);
				logger.info('responses 5', answerModel.answers[4].data);
				logger.info('responses 6', answerModel.answers[5].data);
				logger.info('word cloud chart questions answer model', answerModel);

				options = {
					url: '/api/qrveyanswers/' + qstring,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					data: answerModel,
					json: true
				};

				rs.sendInfo(options, function(_resp) {
					logger.info('answer:', _resp);
					logger.info('counter:', j);
					logger.info('num:', num);

					j--;

					next();
				});
			}, function () {
				logger.log('Finish the promise #' + j);
				return defer.fulfill();
			});
		});

		return defer.promise;
	};

	this.createAnswersForLineChartBuilder = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForLineChartBuilder');

		var j = num,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer(),
			_model = ('line'+'_chart_questions'),
			basic = false;

		if(typeOfQrvey == 'quiz' || typeOfQrvey == 'forms' || typeOfQrvey == 'questionnaire') {
			_model = _model + '_basic';
			basic = true;
		}

		var answerModel = findChartAnswers(_model),
			qrveyID = null,
			qstring = null,
			possibleAnswersMC = null,
			possibleAnswersYN = null,
			possibleAnswersDT = null,
			qrveyanswerid = null,
			qrveyanswerid2 = null,
			qrveyanswerid3 = null,
			qrveyanswerid4 = null,
			qrveyanswerid5 = null,
			qrveyanswerid6 = null;

		qs.createChartBuilder(appID, user, typeOfQrvey, 'line').then(function(_data) {

			if(basic){
				qrveyID = configer.get('QrveyId');
				qstring = findHashInUrl(_data.url);
				possibleAnswersMC = ['A', 'B'];
				possibleAnswersYN = ['Yes', 'No'];
				possibleAnswersDT = ['01/01/01', '02/02/02', '03/03/03', '04/04/04', '05/05/05'];
				qrveyanswerid = configer.get('QrveyAnswerId');
				qrveyanswerid2 = configer.get('QrveyAnswerId2');
				qrveyanswerid3 = configer.get('QrveyAnswerId3');
				qrveyanswerid4 = configer.get('QrveyAnswerId4');

				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = qrveyanswerid;
				answerModel.answers[1].id = qrveyanswerid2;
				answerModel.answers[2].id = qrveyanswerid3;
				answerModel.answers[3].id = qrveyanswerid4;

				dos.cycle(function (cb) {
					return cb(null, j >= 0);
				}, function(item, next) {

					if (typeOfQrvey == 'quiz') {
						answerModel.profile.email = rand.getEmail();
					}
					answerModel.answers[0].data = [];
					answerModel.answers[1].data = [];
					answerModel.answers[2].data = [];
					answerModel.answers[3].data = [];
					answerModel.answers[0].data.push(possibleAnswersMC[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[1].data.push(possibleAnswersYN[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[2].data.push(rand.getNumber({ float: false, min: 1, max: 300 }));
					answerModel.answers[3].data.push(possibleAnswersDT[rand.getNumber({ float: false, min: 0, max: 4 })]);

					logger.info('responses 1', answerModel.answers[0].data);
					logger.info('responses 2', answerModel.answers[1].data);
					logger.info('responses 3', answerModel.answers[2].data);
					logger.info('responses 4', answerModel.answers[3].data);
					logger.info('bar chart questions answer model', answerModel);

					options = {
						url: '/api/qrveyanswers/' + qstring,
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						data: answerModel,
						json: true
					};

					rs.sendInfo(options, function(_resp) {
						logger.info('answer:', _resp);
						logger.info('counter:', j);
						logger.info('num:', num);

						j--;

						next();
					});
				}, function () {
					logger.log('Finish the promise #' + j);
					return defer.fulfill();
				});
			}else{
				qrveyID = configer.get('QrveyId');
				qstring = findHashInUrl(_data.url);
				possibleAnswersMC = ['A', 'B'];
				possibleAnswersYN = ['Yes', 'No'];
				possibleAnswersDT = ['01/01/01', '02/02/02', '03/03/03', '04/04/04', '05/05/05'];
				qrveyanswerid = configer.get('QrveyAnswerId');
				qrveyanswerid2 = configer.get('QrveyAnswerId2');
				qrveyanswerid3 = configer.get('QrveyAnswerId3');
				qrveyanswerid4 = configer.get('QrveyAnswerId4');
				qrveyanswerid5 = configer.get('QrveyAnswerId5');
				qrveyanswerid6 = configer.get('QrveyAnswerId6');

				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = qrveyanswerid;
				answerModel.answers[1].id = qrveyanswerid2;
				answerModel.answers[2].id = qrveyanswerid3;
				answerModel.answers[3].id = qrveyanswerid4;
				answerModel.answers[4].id = qrveyanswerid5;
				answerModel.answers[5].id = qrveyanswerid6;

				dos.cycle(function (cb) {
					return cb(null, j >= 0);
				}, function(item, next) {

					answerModel.answers[0].data = [];
					answerModel.answers[1].data = [];
					answerModel.answers[2].data = [];
					answerModel.answers[3].data = [];
					answerModel.answers[4].data = [];
					answerModel.answers[5].data = [];
					answerModel.answers[0].data.push(possibleAnswersMC[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[1].data.push(rand.getNumber({ float: false, min: 1, max: 5 }));
					answerModel.answers[2].data.push(possibleAnswersYN[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[3].data.push(rand.getNumber({ float: false, min: 1, max: 300 }));
					answerModel.answers[4].data.push(rand.getNumber({ float: false, min: 1, max: 3 }).toString());
					answerModel.answers[5].data.push(possibleAnswersDT[rand.getNumber({ float: false, min: 0, max: 4 })]);

					logger.info('responses 1', answerModel.answers[0].data);
					logger.info('responses 2', answerModel.answers[1].data);
					logger.info('responses 3', answerModel.answers[2].data);
					logger.info('responses 4', answerModel.answers[3].data);
					logger.info('responses 5', answerModel.answers[4].data);
					logger.info('responses 6', answerModel.answers[5].data);
					logger.info('bar chart questions answer model', answerModel);

					options = {
						url: '/api/qrveyanswers/' + qstring,
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						data: answerModel,
						json: true
					};

					rs.sendInfo(options, function(_resp) {
						logger.info('answer:', _resp);
						logger.info('counter:', j);
						logger.info('num:', num);

						j--;

						next();
					});
				}, function () {
					logger.log('Finish the promise #' + j);
					return defer.fulfill();
				});
			}
		});

		return defer.promise;
	};

	this.createAnswersForSymbolChartBuilder = function(user, typeOfQrvey, num) {
		validField(typeOfQrvey, 'type Of Qrvey', 'createAnswersForSymbolChartBuilder');

		var j = num,
			options = {},
			appID = configer.get('AppID'),
			defer = protractor.promise.defer(),
			_model = 'symbol' + '_chart_questions',
			basic = false;

		if(typeOfQrvey == 'quiz' || typeOfQrvey == 'forms' || typeOfQrvey == 'questionnaire') {
			_model = _model + '_basic';
			basic = true;
		}

		var answerModel = findChartAnswers(_model),
			qrveyID = null,
			qstring = null,
			possibleAnswersMC = null,
			possibleAnswersYN = null,
			possibleAnswersDT = null,
			qrveyanswerid = null,
			qrveyanswerid2 = null,
			qrveyanswerid3 = null,
			qrveyanswerid4 = null,
			qrveyanswerid5 = null,
			qrveyanswerid6 = null;

		qs.createChartBuilder(appID, user, typeOfQrvey, 'symbol').then(function(_data) {

			if(basic){
				qrveyID = configer.get('QrveyId');
				qstring = findHashInUrl(_data.url);
				possibleAnswersMC = ['A', 'B'];
				possibleAnswersYN = ['Yes', 'No'];
				possibleAnswersDT = ['01/01/01', '02/02/02', '03/03/03', '04/04/04', '05/05/05'];
				qrveyanswerid = configer.get('QrveyAnswerId');
				qrveyanswerid2 = configer.get('QrveyAnswerId2');
				qrveyanswerid3 = configer.get('QrveyAnswerId3');
				qrveyanswerid4 = configer.get('QrveyAnswerId4');

				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = qrveyanswerid;
				answerModel.answers[1].id = qrveyanswerid2;
				answerModel.answers[2].id = qrveyanswerid3;
				answerModel.answers[3].id = qrveyanswerid4;

				dos.cycle(function (cb) {
					return cb(null, j >= 0);
				}, function(item, next) {

					if (typeOfQrvey == 'quiz') {
						answerModel.profile.email = rand.getEmail();
					}

					answerModel.answers[0].data = [];
					answerModel.answers[1].data = [];
					answerModel.answers[2].data = [];
					answerModel.answers[3].data = [];
					answerModel.answers[0].data.push(possibleAnswersMC[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[1].data.push(possibleAnswersYN[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[2].data.push(rand.getNumber({ float: false, min: 1, max: 300 }));
					answerModel.answers[3].data.push(possibleAnswersDT[rand.getNumber({ float: false, min: 0, max: 4 })]);

					logger.info('responses 1', answerModel.answers[0].data);
					logger.info('responses 2', answerModel.answers[1].data);
					logger.info('responses 3', answerModel.answers[2].data);
					logger.info('responses 4', answerModel.answers[3].data);
					logger.info('bar chart questions answer model', answerModel);

					options = {
						url: '/api/qrveyanswers/' + qstring,
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						data: answerModel,
						json: true
					};

					rs.sendInfo(options, function(_resp) {
						logger.info('answer:', _resp);
						logger.info('counter:', j);
						logger.info('num:', num);

						j--;

						next();
					});

				}, function () {
					logger.log('Finish the promise #' + j);
					return defer.fulfill();
				});

			}else{
				qrveyID = configer.get('QrveyId');
				qstring = findHashInUrl(_data.url);
				possibleAnswersMC = ['A', 'B'];
				possibleAnswersYN = ['Yes', 'No'];
				possibleAnswersDT = ['01/01/01', '02/02/02', '03/03/03', '04/04/04', '05/05/05'];
				qrveyanswerid = configer.get('QrveyAnswerId');
				qrveyanswerid2 = configer.get('QrveyAnswerId2');
				qrveyanswerid3 = configer.get('QrveyAnswerId3');
				qrveyanswerid4 = configer.get('QrveyAnswerId4');
				qrveyanswerid5 = configer.get('QrveyAnswerId5');
				qrveyanswerid6 = configer.get('QrveyAnswerId6');

				answerModel.qrveyID = qrveyID;
				answerModel.qstring.q = qstring;
				answerModel.answers[0].id = qrveyanswerid;
				answerModel.answers[1].id = qrveyanswerid2;
				answerModel.answers[2].id = qrveyanswerid3;
				answerModel.answers[3].id = qrveyanswerid4;
				answerModel.answers[4].id = qrveyanswerid5;
				answerModel.answers[5].id = qrveyanswerid6;

				dos.cycle(function (cb) {
					return cb(null, j >= 0);
				}, function(item, next) {

					answerModel.answers[0].data = [];
					answerModel.answers[1].data = [];
					answerModel.answers[2].data = [];
					answerModel.answers[3].data = [];
					answerModel.answers[4].data = [];
					answerModel.answers[5].data = [];
					answerModel.answers[0].data.push(possibleAnswersMC[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[1].data.push(rand.getNumber({ float: false, min: 1, max: 5 }));
					answerModel.answers[2].data.push(possibleAnswersYN[(rand.getBoolean()) ? 0 : 1]);
					answerModel.answers[3].data.push(rand.getNumber({ float: false, min: 1, max: 300 }));
					answerModel.answers[4].data.push(rand.getNumber({ float: false, min: 1, max: 3 }).toString());
					answerModel.answers[5].data.push(possibleAnswersDT[rand.getNumber({ float: false, min: 0, max: 4 })]);

					logger.info('responses 1', answerModel.answers[0].data);
					logger.info('responses 2', answerModel.answers[1].data);
					logger.info('responses 3', answerModel.answers[2].data);
					logger.info('responses 4', answerModel.answers[3].data);
					logger.info('responses 5', answerModel.answers[4].data);
					logger.info('responses 6', answerModel.answers[5].data);
					logger.info('bar chart questions answer model', answerModel);

					options = {
						url: '/api/qrveyanswers/' + qstring,
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						data: answerModel,
						json: true
					};

					rs.sendInfo(options, function(_resp) {
						logger.info('answer:', _resp);
						logger.info('counter:', j);
						logger.info('num:', num);

						j--;

						next();
					});
				}, function () {
					logger.log('Finish the promise #' + j);
					return defer.fulfill();
				});
			}
		});

		return defer.promise;
	};
};

module.exports = new AnswerService();