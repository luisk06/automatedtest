'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on the "([^"]*)" option in aurora$/, function(type, cb) {
		var idx = 1;
		if(type == 'relational-database') idx = 2;
		user.findsAll('.apps-names li').get(idx).click().then(cb);
	});

	When(/^the user writes the "([^"]*)" on aurora$/, function(field, cb) {
		var el = '';
		var value = 'dbuser';

		if(field == 'host'){
			el = 'connection.connectionData.host';
			value = 'sampledata-cluster.cluster-cmpvnhedgyhj.us-east-1.rds.amazonaws.com';
		}else if(field == 'username'){
			el = 'connection.connectionData.user';
		}else if(field == 'password'){
			el = 'connection.connectionData.password';
		}

		element(by.model(el)).sendKeys(value).then(cb);
	});

	When(/^the user clicks on the Test button on aurora$/, function(cb) {
		element(by.css('.button-test')).click().then(cb);
	});

	When(/^the user clicks on the Next button on aurora$/, function(cb) {
		element(by.css('.spec-button-next')).click().then(cb);
	});

	When(/^the user clicks on the Ok button on aurora$/, function(cb) {
		element(by.css('.spec-button-add')).click().then(cb);
	});

	When(/^the user clicks on the Save button on aurora$/, function(cb) {
		element(by.css('.button.yellow')).click().then(cb);
	});

	When(/^the user selects the database origin$/, function(cb) {
		webpage.waitsFor('.spec-dropdown-database');

		element(by.css('.spec-dropdown-database span')).click();
		element.all(by.css('.spec-dropdown-database .options.show span')).get(1).click().then(cb);
	});

	When(/^the user selects a row on aurora$/, function(cb) {
		webpage.waitsFor('.dbtable-views-table');
		element.all(by.css('.dbtable-views-table tr')).get(1).click().then(cb);
	});

	Then(/^the user should be in the dataloader analyze$/, function(cb) {
		expect(navigate.getCurrentUrl()).to.eventually.contain('loader-analyze').and.notify(cb);
	});
};