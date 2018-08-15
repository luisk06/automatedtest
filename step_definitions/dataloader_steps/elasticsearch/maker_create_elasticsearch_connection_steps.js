'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var elapsedTime = 0;

	When(/^the user clicks on the "([^"]*)" data upload option$/, function(type, cb) {
		element(by.css('.spec-dataupload-'+type)).click().then(cb);
	});

	When(/^the user writes the connection string URL$/, function(cb) {
		var connectionString = (env == 'dev')? 'dev-datarouter-gmxema2ksexyzucvofzz7qu6zi' : 'qrvey-stagin-mnceo4hoqvwrr7xf7gx44gnfc4';
		element(by.css('.spec-elasticsearch-connection-string')).sendKeys('https://search-' + connectionString + '.us-east-1.es.amazonaws.com').then(cb);
	});

	When(/^the user clicks on the Test button on Elasticsearch Values Modal$/, function(cb) {
		var locatorTestButton = by.css('.spec-elasticsearch-test-button');
		element(locatorTestButton).click().then(function(){
			expect(hasClass(element(locatorTestButton), 'successful'), 'The connection string was not validated').to.eventually.be.true.and.notify(cb);
		});
	});

	When(/^the user clicks Next button on Elasticsearch Values Modal$/, function(cb) {
		var locatorTestButton = by.css('.spec-elasticsearch-next-button');
		element(locatorTestButton).click().then(cb);
	});

	When(/^the user search "([^"]*)" on the index selection modal$/, function(index, cb) {
		var locatorTestButton = by.css('.spec-elasticsearch-selectindex-search');
		element(locatorTestButton).sendKeys(index).then(cb);
	});

	When(/^the user clicks on the row (\d+) on the index selection table$/, function(rowNum, cb) {
		element.all(by.css('.spec-elasticserch-indexselection-table-row')).get(rowNum - 1).click().then(cb);
	});

	When(/^the user clicks on the row (\d+) on the index type selection table$/, function(rowNum, cb) {
		element.all(by.css('.spec-elasticserch-indextypeselection-table-row')).get(rowNum - 1).click().then(cb);
	});

	When(/^the user clicks the next button on the index selection modal$/, function(cb) {
		element(by.css('.spec-elasticsearch-selectindex-next')).click().then(cb);
	});

	When(/^the user clicks to add on the index type selection modal$/, function(cb) {
		element(by.css('.spec-elasticsearch-selectindextype-add')).click().then(cb);
	});

	When(/^the user clicks to save on the identify data page$/, function(cb) {
		var world = this;
		var initTime;
		var endTime;

		element.all(by.css('.spec-elasticsearch-identifydata-save')).get(0).click().then(function(){
			brw.ignoreSynchronization = true;

			var _el = element(by.css('.spec_add_chart_button'));
			var isDisplayed = EC.visibilityOf(_el);
			var time = 300000;

			brw.executeScript('return window.performance.now()').then(function(_res){
				initTime = _res;
				logger.info('initTime:   ', initTime);
			}).then(function(){
				brw.wait(isDisplayed, time).then(function(){

					brw.executeScript('return window.performance.now()').then(function(res){
						endTime = res;
						logger.info('endTime:   ', endTime);
					}).then(function(){
						elapsedTime = (endTime - initTime)/1000;
						world.scenario.attach('The Custom view took '+ elapsedTime.toString() + ' seconds to load');
					});

				}, function(){
					expect.fail(0,1,'Custom view could not be loaded in 5 minutes');
				});
			});

		}).then(cb);
	});

	When(/^the user clicks on the record button$/, function(cb) {
		element(by.css('.spec_qrvey_results_button')).click().then(cb);
	});
};