'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;


	When(/^the user move to visualization tab$/, function(cb) {
		element(by.xpath("//span[text() = 'Visualization']")).click().then(cb); // eslint-disable-line
	});

	When(/^the user open global settings layer$/, function(cb) {
		element(by.css('div[panel-title *= "Global Settings"]')).click().then(cb);
	});

	When(/^the user clicks on Yes for max data points$/, function(cb) {
		webpage.waits(1500);
		element(by.id('rdmaxDataPoints1')).click().then(cb);
	});


	When(/^the user inputs (\d+) max data points$/, function(num, cb) {
		var input = element.all(by.css('qv-numeric[qv-on-change="onMultiseriesChange"] input')).last();
		browser.executeScript('arguments[0].select()',input).then(function(){
			input.sendKeys(num).then(cb);
		});
	});

	Then(/^the number of cells shoulb be (\d+)$/, function(num, cb) {
		element.all(by.css('.spec-heatmap-cell')).count().then(function(_lenght){
			expect(_lenght).to.be.equal(parseInt(num));
		}).then(cb);
	});



};