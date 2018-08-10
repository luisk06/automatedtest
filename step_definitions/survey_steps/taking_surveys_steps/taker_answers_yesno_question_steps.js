'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user selects "([^"]*)" asnwers$/, function(optionAnswers, cb) {
		user.choicesAnswer(optionAnswers).then(cb);
	});

	Then(/^the user should jump to the finished qrvey page$/, function(cb) {
		var el = '.head-module-answer h2';

		user.waitsFor(el);

		user.isDisplayed(el).then(function(isdisplayed) {
			if (isdisplayed) {
				user.findsAll(el).first().getText().then(function(_text) {
					expect(_text).to.be.equal('Answers submitted.');
				}).then(cb);
			} else cb('The finished qrvey page not found');
		});
	});

	Then(/^the user should jump to the finished quiz page$/, function(cb) {
		logger.info('scorePage', scorePage);

		if(!scorePage){
			user.isDisplayed('.no-thnk').then(function(isdisplayed) {

				console.log('looking for .no-thnk', isdisplayed);

				if (isdisplayed){

					user.isDisplayed('.big-check').then(function (isdisplayed) {

						console.log('looking for .big-check');
						return expect(isdisplayed).to.be.true;

					}).then(function () {

						return user.isDisplayed('.powered.footer');

					}).then(function (isdisplayed) {

						console.log('looking for .powered.footer');
						return expect(isdisplayed).to.be.true;

					}).then(function () {
						cb();
					});

				} else {
					user.waitsFor('.scoreboard');

					user.isDisplayed('.scoreboard').then(function (isdisplayed) {
						return expect(isdisplayed).to.be.true;
					}).then(function () {
						return user.finds('.scoreboard .passing-message').getText();
					}).then(function (_val) {
						console.log('VAL ---->' , _val);
						expect(_val).to.be.a('string');
						return expect(_val.length).to.be.above(1);
					}).then(function () {
						return user.isDisplayed('.powered.footer');
					}).then(function (isdisplayed) {
						console.log('looking for .powered.footer');
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
			user.waitsFor('.scoreboard');

			user.isDisplayed('.scoreboard').then(function(isdisplayed) {
				return expect(isdisplayed).to.be.true;
			}).then(function () {
				return user.isDisplayed('.powered.footer');
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
		user.waits(1500);
		var el = element(by.css('input[type=email]'));
		el.sendKeys(email).then(cb);
	});

	Then(/^the user should see to the take qrvey page$/, function(cb) {
		var el = '.spec-user-response-ok';

		user.isDisplayed(el).then(function(isdisplayed) {
			expect(isdisplayed).to.be.true;
		}).then(cb);
	});
};
