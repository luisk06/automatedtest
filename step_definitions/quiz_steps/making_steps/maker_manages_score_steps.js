'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user opens the score box$/, function (cb) {
		user.finds('.card.q-editable-card.border-top').click().then(cb);
	});

	When(/^the user clicks on the score check$/, function (cb) {
		user.finds('.showScore').click().then(cb);
	});

	When(/^the user puts the max score$/, function (cb) {
		user.findsName('score').sendKeys('1').then(cb);
	});

	When(/^the user puts the message of "([^"]*)" field$/, function (scoreState, cb) {
		// brw.enterRepl();
		user.findsName(scoreState + 'msg').sendKeys(scoreState + ' msg').then(cb);
	});

	Given(/^the user has a "([^"]*)" with some questions$/, function (typeOfQrvey, arr, cb) {
		us.isLogged().then(function (_userId) {

			logger.warn('_', _);

			arr = _.unzip(arr.rows());
			arr = arr[0];
			// console.log('arr ----> ', arr);

			qs.createQrveyEmpty(appID, _userId, typeOfQrvey).then(function (_model) {

				// console.log('qrveyId ----> ', _model);
				async.eachSeries(gArray(arr.length), function (n, next) {

					// console.log('N ----> ', n);
					// console.log('arr ----> ', arr);
					// console.log('arr ----> ', arr[n - 1]);

					qs.createQuestionAsDraftIntoEmpty(appID, _model.qrveyid, typeOfQrvey, _userId, arr[n - 1]).then(function () {
						// console.log('finishing the ' + n + ' question');
						return next();
					}).catch(function (err) {
						next(err);
					});

				}, function () {
					// console.log('all finished');
					cb();
				});

			}).catch(function (err) {
				logger.error('Error', err);
			});
		});
	});

	Given(/^the user passed (\d+) points as score$/, function (score, cb) {
		us.isLogged().then(function (_userId) {
			return qs.passingScore(appID, configer.get('QrveyId'), _userId, score);
		}).then(function () {
			cb();
		});
	});

	Given(/^the user shows the results at the end of the quiz$/, function (cb) {
		us.isLogged().then(function (_userId) {
			return qs.resultsOnQuiz(appID, configer.get('QrveyId'), _userId, true);
		}).then(function () {
			cb();
		});
	});

	Given(/^the user hides the results at the end of the quiz$/, function (cb) {
		us.isLogged().then(function (_userId) {
			return qs.resultsOnQuiz(appID, configer.get('QrveyId'), _userId, false);
		}).then(function () {
			cb();
		});
	});

	Given(/^the user activated the webform$/, function (cb) {
		us.isLogged().then(function () {
			return qs.get(appID, configer.get('QrveyId'), 'quiz');
		}).then(function (model) {
			logger.info('questions', model.questions);
			return qs.activate(appID, configer.get('QrveyId'), JSON.stringify(model));
		}).then(function (resp) {
			return user.openUrl(resp.url);
		}).then(function () {
			cb();
		});
	});

	When(/^the user choose the right answers$/, function (cb) {
		taker.answerAllOnTaker().then(function () {
			cb();
		});
	});

	When(/^the user choose the answers$/, function (cb) {
		taker.answerAllOnTaker(false).then(function () {
			cb();
		});
	});

	When(/^the user should passed the quiz$/, function (cb) {
		taker.getQuizStatus().then(function (_status) {
			expect(_status).to.be.equal('passed');
		}).then(cb);
	});

	When(/^the user should failed the quiz$/, function (cb) {
		taker.getQuizStatus().then(function (_status) {
			expect(_status).to.be.equal('not-passed');
		}).then(cb);
	});

	Then(/^the scoreboard should be displayed$/, function (cb) {
		webpage.isDisplayed('.circle').then(function (isdisplayed) {
			expect(isdisplayed).to.be.true;
		}).then(cb);
	});

	Then(/^the scoreboard should not be displayed$/, function (cb) {
		webpage.isDisplayed('.circle').then(function (isdisplayed) {
			expect(isdisplayed).to.be.false;
		}).then(cb);
	});

	Then(/^the success message should be displayed on the quiz$/, function (cb) {
		user.finds('.passing-message').getText().then(function (_text) {
			expect(_text).to.be.equal('The success message');
		}).then(cb);
	});

	Then(/^the wrong message should be displayed on the quiz$/, function (cb) {
		user.finds('.passing-message').getText().then(function (_text) {
			expect(_text).to.be.equal('The wrong message');
		}).then(cb);
	});

	Then(/^the message should be displayed on the quiz$/, function (cb) {
		user.finds('.passing-message').getText().then(function (_text) {
			expect(_text).to.be.a('string');
			// expect(_text).to.have.lengthOf.above(1);
		}).then(cb);
	});
};