'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var url = '';

	When(/^the user open the wordpress code section$/, function(cb) {
		user.finds('.dropwp').click().then(cb);
	});

	When(/^the user click on download plugin$/, function(cb) {
		user.finds('.downloadwpbutton').click().then(cb);
	});

	When(/^the "([^"]*)" wordpress plugin download is succefull$/, function(_app, cb) {
		url = 'https://cdn.qrvey.com/widget/v1/' + _app + '/wp_qrvey_' + _app + '.zip';
		qs.getUrlResponse(url).then(cb);
	});
};
