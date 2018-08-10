module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on "([^"]*)" condition for new response$/, function (condition, cb) {
		//var el = user.findsAll('.spec-automatiq-add-condition span');
		var el = user.findsAll('.add-condition span');

		if (condition == 'add_condition') el.get(0).click().then(cb);
		else el.get(0).click().then(cb);
	});

};