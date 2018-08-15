'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user has a "([^"]*)" with a "([^"]*)" question$/, function(typeOfQrvey, typeOfQuestion, cb) {
		us.isLogged().then(function(_userId) {
			var options = undefined;
			var extraOptions = undefined;

			if (typeOfQuestion == 'multiple_choice_with_allow_multiple_selections') {
				typeOfQuestion = 'multiple_choice';
				options = 'with_allow_multiple_selections';
			} else if (typeOfQuestion == 'nps_without_textfield') {
				typeOfQuestion = 'nps';
				options = 'without';
			} else if (typeOfQuestion.includes('decimal')) {
				options = typeOfQuestion.split('_')[1];
				typeOfQuestion = 'numeric';
				extraOptions = {decimal: true};
			}
			// console.log('imhere', typeOfQuestion);
			qs.createQrvey(appID, _userId, typeOfQrvey, typeOfQuestion, 'active', options, extraOptions).then(function(_data) {
				qrveyIDForWidget = findHashInUrl(_data.url);

				if (typeOfQrvey == 'incontext' || typeOfQrvey == 'progressive') {
					var _url = configer.get('url') + '/widget/' + typeOfQrvey + '/q/' + _data.lookupID;
					logger.log('opening', _url);
					webpage.deleteAllCookies();
					// console.log('URL', _url);
					webpage.openUrl(_url, true);
					brw.ignoreSynchronization = true;
				} else {
					logger.log('opening', _data.url);
					webpage.deleteAllCookies();
					webpage.openUrl(_data.url, true);
					brw.ignoreSynchronization = true;
				}
			}).then(cb);
		});
	});

	When(/^the user selects the desired answer choice in "([^"]*)"$/, function(typeOfQrvey, cb) {
		//if (typeOfQrvey == 'incontext' || typeOfQrvey == 'progressive') {
		var num = rand.getNumber({ min: 0, max: 2 });
		logger.log('num', num);
		//element.all(by.css('.mc-listing li')).get(num).click().then(cb);
		element.all(by.css('.answers-listing li')).get(num).click().then(cb);
		//}
	});

	When(/^the user selects the desired answer choice to "([^"]*)" in "([^"]*)"$/, function(typeOfQuestion, typeOfQrvey, cb) {
		if (typeOfQrvey == 'incontext' || typeOfQrvey == 'progressive') {
			if(typeOfQuestion == 'multiple_choice'){
				var num = rand.getNumber({ min: 0, max: 2 });
				logger.log('num', num);
				element.all(by.css('.mc-listing li')).get(num).click().then(cb);
			}else if(typeOfQuestion == 'date'){
				var newDate = new Date(rand.getDate());

				taker.finds('.datepicker-here').click();
				taker.finds('[data-date="' + newDate.getDate() + '"]').click().then(cb);
			}
		}
	});

	When(/^clicks on the Ok button in "([^"]*)"$/, function(typeOfQrvey, cb) {
		scrollToBottom();
		if (typeOfQrvey == 'incontext') {
			element(by.css('.send-incontext.button')).click().then(cb);
		} else if (typeOfQrvey == 'progressive') {
			element(by.css('.button.yellow.ico-check.send-progressive')).click().then(cb);
		}
	});

	Then(/^the success message should be displayed$/, function(cb) {
		element(by.css('.thankmessage-layer .bigtext')).getAttribute('innerHTML').then(function(_html) {
			expect(_html).to.be.equal('Thanks for your answer. <span>You are awesome!</span>');
		}).then(cb);
	});

	Then(/^the window should be hidden$/, function(cb) {
		var el = '.button.yellow';

		webpage.waits(1000).then(function(){
			element(by.css(el)).isDisplayed().then(function(_isdisplayed) {
				expect(_isdisplayed).to.be.false;
			}, function() {
				cb();
			}).then(cb);
		});

	});

	When(/^the user selects (\d+) answer choices in "([^"]*)"$/, function(num, typeOfQrvey, cb) {
		if (typeOfQrvey == 'incontext') {
			var _allElements = element.all(by.css('.mc-listing li'));
			_allElements.get(0).click();
			_allElements.get(1).click();
			_allElements.get(2).click().then(cb);
		}
	});
};
