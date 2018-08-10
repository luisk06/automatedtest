module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user has a webform app with a checklist created with (\d+) of answers$/, function(numAnswers, cb) {
		us.isLogged().then(function(_userId) {
			apps.createNewApp('Test checklist').then(function(){
				as.createAnswers(_userId, 'checklist', 'checklist', numAnswers).then(function(_data) {
					logger.log('data', _data);
					user.waits(5000);
				}).then(cb);
			});
		});
	});

	When(/^the user selects "([^"]*)" from dropdown$/, function(typeOfView, cb) {
		user.waitsFor('.spec-filter-analyze');
		user.finds('.spec-filter-analyze').click().then(function() {
			user.finds('#spec-panelview-' + typeOfView).click().then(cb);
		});
	});

	When(/^the user selects "([^"]*)" from dropdown on "([^"]*)"$/, function(typeOfView, typeOfQrvey, cb) {
		if (typeOfQrvey !== 'incontextfeedback') {
			user.waitsFor('.spec-filter-analyze');
			user.finds('.spec-filter-analyze').click().then(function() {
				user.finds('#spec-panelview-' + typeOfView).click().then(cb);
			});
		}
		cb();
	});

	When(/^user selects "([^"]*)" from dropdown on "([^"]*)"$/, function(typeOfView, typeOfQrvey, cb) {
		if (typeOfQrvey !== 'incontextfeedback') {
			user.waitsFor('.spec-filter-analyze');
			user.finds('.spec-filter-analyze').click().then(function() {
				user.finds('#spec-panelview-' + typeOfView).click().then(cb);
			});
		}
		cb();
	});

	Then(/^the "([^"]*)" option on dropdown should contain a check$/, function(typeOfView, cb) {
		user.finds('.spec-filter-analyze').click().then(function() {
			expect(hasClass(element(by.css('#spec-panelview-' + typeOfView)), 'active')).to.eventually.be.true;
		}).then(cb);
	});
};
