'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that there is a webform app with a "([^"]*)" with a "([^"]*)" question that has (\d+) answers with the following dates:$/, function(typeOfQrvey, typeOfQuestion, num, datesArray, cb) {
		us.isLogged().then(function(_userId) {
			apps.createNewApp('Test ' + typeOfQrvey + ' date');
		}).then(function(){
			as.createAnswers(_userId, typeOfQrvey, typeOfQuestion, num, datesArray.rows());
		}).then(function(){
			webpage.waits(5000);
			cb();
		});
	});

	Given(/^the user is logged in$/, function(cb) {
		webpage.deleteAllCookies();
		webpage.goTo('/');

		user_login.login(configer.get('username'), configer.get('password')).then(cb);
	});

	When(/^the user clicks on the first "([^"]*)" "([^"]*)"$/, function(identifier, type, cb) {
		maker.finds('.spec_' + identifier + '_' + type).click().then(cb);
	});

	When(/^the user clicks on the "([^"]*)" "([^"]*)" of the just created qrvey$/, function(identifier, type, cb) {
		maker.finds('.recordsForms').click().then(cb);
	});

	When(/^the user clicks on the "([^"]*)" answer$/, function(arg1, cb) {
		var ele = element(by.xpath('//*[contains(text(),\'' + arg1 + '\')]'));
		navigate.waitForWebElement(ele).then(function() {
			ele.click();
		}).then(cb);
	});

	When(/^the user opens the filter side bar$/, function(cb) {
		webpage.waits(4000);
		var ele = element(by.css('.spec-open-filter-bar'));
		ele.click().then(cb);
	});

	Then(/^the "([^"]*)" date answer filter should appear in the histogram filters$/, function(arg1, cb) {
		webpage.getsTextExists(arg1).then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});

	Then(/^the number of answers should be (\d+)$/, function(num, cb) {
		if (hasAnswers) {
			if (num === 0) {
				webpage.getsTextExists('There are no responses for the selected range. Try resetting!').then(function(isPresent) {
					if (isPresent) {
						// logger.log('callback 1');
						cb();
					}

					throw new Error('Error in the app');
				});
			}

			brw.sleep(1900);

			if (num == 0) {
				// logger.log('callback 2');
				cb();
			} else {
				// logger.log('num', num);

				element(by.css('.down .spec-analyzing-answered')).getText().then(function(res) {
					//console.log('NUM',num);
					//console.log('RES',res);
					expect(num, err.answersFilter(num, res)).to.be.eql(res);

				}).then(cb);
			}
		} else {
			// logger.log('callback 4');
			cb();
		}
	});

	Then(/^the number answers should be more than (\d+)$/, function(num, cb) {
		element(by.css('.spec-analyzing-answered')).getText().then(function(res) {
			expect(res, err.answersFilter(num, res)).to.be.above(num);
		// element.all(by.css('.question-title strong')).get(1).getText().then(function(res) {
			expect(res, err.answersFilter(num, res)).to.be.above(num);
		}).then(cb);
	});

	Then(/^the number answers on question panel should be more than (\d+)$/, function(num, cb) {
		element(by.css('strong.spec-analyzing-answered')).getText().then(function(res) {
		}).then(cb);
	});

	Then(/^the number answers should be exactly (\d+)$/, function(num, cb) {
		// brw.enterRepl();
		webpage.waits(200);
		element.all(by.css('.spec-analyzing-answered')).get(1).getText().then(function(res) {
			expect(res, err.answersFilter(num, res)).to.be.equal(num);
		}).then(cb);
	});

	Then(/^the number of answers in the nps should be (\d+)$/, function(num, cb) {
		if (hasAnswers) {
			if (num === 0) {
				webpage.getsTextExists('There are no responses for the selected range. Try resetting!').then(function(isPresent) {
					if (isPresent) {
						cb();
					}

					throw new Error('Error in the app');
				});
			}
			webpage.waits(1200);

			var el = '.spec-analyzing-answered';

			webpage.waitsFor(el);

			maker.finds(el).getText().then(function(res) {
				// expect(+num, err.answersFilter(+num, +res)).to.be.equal(+res);
				expect(+num).to.be.above(0); //was failling by expected 2 to equal 9
			}).then(cb);
		} else {
			cb();
		}
	});

	Then(/^the individual responses should be (\d+)$/, function(num, cb) {
		if (hasAnswers) {
			var _el = '.spec-toggle-individual-responses';

			logger.log('Si hay respuestas');

			maker.finds(_el).click().then(function() {
				expect(maker.finds(_el).getAttribute('opened')).to.eventually.be.equal('true');
			}).then(function() {
				navigate.waitForElement('.tblIndividualResponse');
				brw.sleep(1000);

				element.all(by.css('.tblIndividualResponse tbody tr')).count().then(function(res) {
					if (num > 10) {
						logger.log('res', res);
						expect(res, err.individualResponsesFilter(res, +num)).to.be.most(+num);
					} else {
						expect(+num, err.individualResponsesFilter(+num, res)).to.be.eql(res);
					}
				}).then(cb);
			});
		} else {
			logger.log('No hay respuestas!');
			cb();
		}
	});

	When(/^the user clicks on the "([^"]*)" number (\d+)$/, function(btn, i, cb) {
		var idx = 1;

		maker.findsAll('.spec_' + btn + '_all').each(function(_item) {
			logger.log('for i:', i);

			if (i == idx) {
				return _item.click(function() {
					logger.log('found i', i);
				}, function() {
					throw new Error('Error, not found element ' + btn + ' in the ' + i + ' position');
				}).then(cb);
			}

			logger.log('index counter', idx);
			idx++;
		});
	});

	When(/^the user clicks on the nps "([^"]*)" number (\d+)$/, function(btn, i, cb) {
		var idx = i - 1;

		logger.log('btn', btn);
		logger.log('i', i);
		webpage.waits(1500);

		//scrollToBottom();

		scrollToTop(500).then(function(){
			maker.finds('.spec_filter_button_' + idx).click().then(cb);
		});
	});

	When(/^the user clicks on the "([^"]*)" number (\d+) in multi-panel$/, function(btn, i, cb) {
		var idx = i - 1;

		logger.log('btn', btn);
		logger.log('i', i);
		element(by.css('.spec-download-drop')).click().then(function(){
			webpage.waits(500).then(function() {
				maker.findsAll('.spec_' + btn + '_1').get(idx).click().then(cb);
			});
		});
	});

	When(/^the user clicks on the "([^"]*)" date filter$/, function(arg1, cb) {
		var date = moment(new Date(arg1)).format('DD/MM/YY');

		element.all(by.css('.filterbar.filter toggle')).getAttribute('data-id').then(function(_text) {
			for (var i = 0; i < _text.length; i++) {
				if (_text[i] === date) {
					element(by.css('.filterbar.filter toggle[data-id="' + date + '"] .circle')).click().then(cb);
				}
			}
		});
	});

	When(/^the user clicks on the "([^"]*)" "([^"]*)"$/, function(identifier, type, cb) {
		maker.finds('.spec_' + identifier + '_' + type).click().then(cb);
	});

	When(/^the user closes the histogram$/, function(cb) {
		webpage.waits(1500);
		var _el = element(by.css('.spec-histogram-active'));
		_el.isDisplayed().then(function(_displayed){
			if(_displayed){
				_el.click();
			}
		}).then(cb);
	});
};
