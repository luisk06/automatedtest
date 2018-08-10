'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has a incontext external with a "([^"]*)" question$/, function (typeOfQuestion, cb) {
		us.isLogged().then(function (_userId) {
			var options = undefined;

			if (typeOfQuestion == 'multiple_choice_with_allow_multiple_selections') {
				typeOfQuestion = 'multiple_choice';
				options = 'with_allow_multiple_selections';
			} else if (typeOfQuestion == 'nps_without_textfield') {
				typeOfQuestion = 'nps';
				options = 'without';
			}

			qs.createQrvey(appID, _userId, 'incontext', typeOfQuestion, 'active', options).then(function (_data) {
				var _url = 'http://qwidgets.herokuapp.com/widget/incontext/q/' + _data.lookupID;
				logger.log('opening', _url);
				user.openUrl(_url, true);
				brw.ignoreSynchronization = true;
			}).then(cb);
		});
	});
};