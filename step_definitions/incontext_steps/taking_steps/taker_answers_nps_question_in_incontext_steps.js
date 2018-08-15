'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user answers the "([^"]*)" question in the "([^"]*)"$/, function(typeOfQuestion, typeOfQrvey, cb) {
		if (typeOfQrvey == 'incontext' || typeOfQrvey == 'progressive') {
			skipSync(true);

			if (typeOfQuestion == 'nps') {
				var num = rand.getNumber({ min: 0, max: 10 });
				element.all(by.css('.nps-score-widget li')).get(num).click().then(cb);
			} else if (typeOfQuestion == 'rating') {
				var stars = element(by.css('.spec-taker-rating-select-' + rand.getNumber({ min: 0, max: 4 })));
				stars.click().then(cb);
			} else if (typeOfQuestion == 'slidebar') {
				var _el = element(by.css('.s_circle'));

				// brw.actions().mouseDown(_el).perform();
				// brw.sleep(2000);
				// brw.actions().mouseMove(_el, {
				//     x: 1200,
				//     y: 0
				// }).perform();

				brw.actions().mouseDown(_el).mouseMove({
					x: -400,
					y: 0
				}).mouseUp().perform().then(function(){
					webpage.waits(800);
				}).then(cb);
			} else if (typeOfQuestion == 'short_text') {
				element(by.css('.textfield-area')).sendKeys('Texto..').then(cb);
			} else if (typeOfQuestion == 'long_text') {
				element(by.css('.answers-label.longtext textarea')).sendKeys('Texto..').then(cb);
			}
			// else if (typeOfQuestion == 'rating') {
			//     var any = rand.getNumber({ min: 0, max: 5 });
			//     any = (any > 0) ? any : 0;
			//
			//     user.finds('.spec-taker-rating-select-' + any).click().then(cb);
			// }
		}
	});
};