'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var options = {
		jon_snow: 'Y06NPO18a0',
		tyrion_lannister: 'Y06NPO18a1',
		daenerys_targaryen: 'Y06NPO18aIOYO1MRX',
		arya_stark: 'Y06NPO18aBXQTYT78',
		ghost: 'Y06NPO18aF68SZSWT'
	};

	var optionImages = {
		jon_snow: 'http://assets.viewers-guide.hbo.com/larges1-ep1-people-avatar-rgb-snow-jon-1024x1024.jpg',
		tyrion_lannister: 'http://www.trystancraft.com/costume/wp-content/uploads/2015/02/TyrionLannister-season4.jpg',
		daenerys_targaryen: 'http://www.fandomisinthedetails.com/uploads/1/9/2/0/19201953/8161305_orig.jpg',
		arya_stark: 'https://pbs.twimg.com/profile_images/713341866620485633/r74dChcE.jpg',
		ghost: 'http://pixel.nymag.com/imgs/daily/vulture/2016/05/23/23-direwolves.w529.h352.jpg'
	};

	When(/^the user clicks on the "([^"]*)" filter as image$/, function(arg1, cb) {
		var el = '.spec-filter-container g[data-id="' + options[arg1] + '"]';
		webpage.waitsFor(el);
		element(by.css('.spec-filter-container g[data-id="' + options[arg1] + '"]')).click().then(cb);
	});

	Then(/^the "([^"]*)" image answer filter should appear in the histogram filters$/, function(arg1, cb) {
		logger.log('answer:', arg1);
		logger.log('options:', optionImages[arg1]);
		element.all(by.css('.spec-analize-filters-list li .value-filter-bar img')).get(0).getAttribute('src').then(function(res) {
			logger.log('Name', res);
			expect(res, 'filter not found on image filter histogram').to.contain(optionImages[arg1]);
		}).then(cb);
	});
};
