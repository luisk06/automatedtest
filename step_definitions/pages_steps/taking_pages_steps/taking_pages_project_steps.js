module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var _pagesURL = ''; // eslint-disable-line

	When(/^the user activate the main page$/, function (cb) {
		user.findsAll('.toggle span').get(0).click().then(cb);
	});

	When(/^the user clicks the copy project url button$/, function (cb) {
		user.finds('.project-url input').getAttribute('value').then(function(value){
			_pagesURL = value;
		}).then(cb);
	});

	When(/^the user open the project url$/, function (cb) {
		webpage.waits(1000);
		element(by.css('.project-url a')).getText().then(function(_url){
			webpage.openUrl(_url).then(cb);
		});

	});

	When(/^the user creates a "([^"]*)" action with "([^"]*)"$/, function (typeOfAction, typeOfqrvey, cb) {
		var  view = 'detailed';
		if(typeOfqrvey=='form' || typeOfqrvey=='questionnaire') view = 'tabular';
		maker.createsActionToPage(typeOfAction, typeOfqrvey, view).then(cb);
	});

	Then(/^the project is opened succefully$/, function (cb) {
		expect(qrvey.checkExistance('.great')).to.be.eventually.true.and.notify(cb);
	});
};