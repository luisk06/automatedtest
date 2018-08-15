'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var _label = '',
		_title = '';

	When(/^user enters "([^"]*)" as label$/, function(label, cb) {
		_label = label;
		maker.finds('.spec-customize-input-label').clear();
		maker.finds('.spec-customize-input-label').sendKeys(_label).then(cb);
	});

	When(/^user enters "([^"]*)" as title$/, function(title, cb) {
		_title = title;
		maker.finds('.spec-customize-input-title').clear();
		maker.finds('.spec-customize-input-title').sendKeys(_title).then(cb);
	});

	Then(/^the incontext on "([^"]*)" position should contain customized label$/, function(position, cb) {
		if(position == 'right' || position == 'left'){
			maker.finds('.spec-incontext-' + position + ' .button-cta').getText().then(function(text){
				expect(text).to.be.equal(_label);
			}).then(cb);
		}else{
			logger.log('Label is not displayed');
			cb();
		}
	});

	Then(/^the incontext on "([^"]*)" position should contain customized title$/, function(position, cb) {
		if(webpage.isDisplayed('.spec-incontext-' +position + ' .content .titlecontent')){
			maker.finds('.spec-incontext-' + position + ' .content .titlecontent').getText().then(function(text){
				expect(text).to.be.equal(_title);
			}).then(cb);
		}
	});

	Then(/^the customize incontext input for "([^"]*)" should be disabled$/, function(input, cb) {
		var el = element(by.css('.spec-customize-input-'+input));
		expect(el.getAttribute('readonly')).to.be.eventually.equal('true').and.notify(cb);
	});

	Then(/^the customize incontext position button for "([^"]*)" should be disabled$/, function(position, cb) {
		element(by.css('.spec-tab-'+position)).click().then(function(){
			throw new Error('Element should not be clickable for Observer');
		},function(err){
			expect(err.message.toString()).to.be.contain('is not clickable at point');
		}).then(cb);
	});

	Then(/^the trigger time input should be disabled$/, function(cb) {
		var el = element(by.css('.trigger-time input'));
		expect(el.getAttribute('readonly')).to.be.eventually.equal('true').and.notify(cb);
	});
};
