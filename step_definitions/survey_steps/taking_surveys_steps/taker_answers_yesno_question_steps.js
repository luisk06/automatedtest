'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selects "([^"]*)" asnwers$/, function(optionAnswers, cb) {
		taker.choicesAnswer(optionAnswers).then(cb);
	});

	Then(/^the user should jump to the finished qrvey page$/, function(cb) {
		var el = '.head-module-answer h2';

		webpage.waitsFor(el);

		webpage.isDisplayed(el).then(function(isdisplayed) {
			if (isdisplayed) {
				maker.findsAll(el).first().getText().then(function(_text) {
					expect(_text).to.be.equal('Answers submitted.');
				}).then(cb);
			} else cb('The finished qrvey page not found');
		});
	});

	Then(/^the user should jump to the finished quiz page$/, function(cb) {
		logger.info('scorePage', scorePage);

		if(!scorePage){
			webpage.isDisplayed('.no-thnk').then(function(isdisplayed) {

				console.log('looking for .no-thnk', isdisplayed);

				if (isdisplayed){

					webpage.isDisplayed('.big-check').then(function (isdisplayed) {

						console.log('looking for .big-check');
						return expect(isdisplayed).to.be.true;

					}).then(function () {

						return webpage.isDisplayed('.powered.footer');

					}).then(function (isdisplayed) {

						console.log('looking for .powered.footer');
						return expect(isdisplayed).to.be.true;

					}).then(function () {
						cb();
					});

				} else {
					webpage.waitsFor('.scoreboard');

					webpage.isDisplayed('.scoreboard').then(function (isdisplayed) {
						return expect(isdisplayed).to.be.true;
					}).then(function () {
						return maker.finds('.scoreboard .passing-message').getText();
					}).then(function (_val) {
						logger.log('VAL ---->' , _val);
						expect(_val).to.be.a('string');
						return expect(_val.length).to.be.above(1);
					}).then(function () {
						return webpage.isDisplayed('.powered.footer');
					}).then(function (isdisplayed) {
						logger.log('looking for .powered.footer');
						return expect(isdisplayed).to.be.true;
					}).then(function () {
						cb();
					}).catch(function (err) {
						logger.error('Error', err);
					});
				}

			}).catch(function (err) {

				logger.error('Error', err);

			});
		} else {
			webpage.waitsFor('.scoreboard');

			webpage.isDisplayed('.scoreboard').then(function(isdisplayed) {
				return expect(isdisplayed).to.be.true;
			}).then(function () {
				return webpage.isDisplayed('.powered.footer');
			}).then(function (isdisplayed) {
				console.log('looking for .powered.footer');
				return expect(isdisplayed).to.be.true;
			}).then(function(){
				cb();
			}).catch(function(err){
				logger.error('Error', err);
			});
		}
	});

	When(/^the user enters "([^"]*)" as email$/, function(email, cb) {
		webpage.waits(1500);
		var el = element(by.css('input[type=email]'));
		el.sendKeys(email).then(cb);
	});

	Then(/^the user should see to the take qrvey page$/, function(cb) {
		var el = '.spec-user-response-ok';

		webpage.isDisplayed(el).then(function(isdisplayed) {
			expect(isdisplayed).to.be.true;
		}).then(cb);
	});
};
