'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^user moves to "([^"]*)" tab$/, function(tab, cb) {
		webpage.waits(5000);
		user.finds('.dropdown-group-member').click().then(function(){
			element(by.css('.icn'+tab+' span')).click().then(cb);
		});
	});

	When(/^the user clicks on the "([^"]*)" number (\d+) on "([^"]*)" on detailed view$/, function (btn, i, typeOfQrvey, cb) {
		logger.log('btn', btn);
		logger.log('i', i);
		var index = i-1;
		logger.log(index);
		webpage.waits(2000).then(function(){
			var _element = user.findsAll('.spec-' + btn + '-'+i).get(index);
			_element.click().then(cb);
		});
	});
};