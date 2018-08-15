'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var _title = '';

	When(/^the user try clicks on Load Theme button$/, function(cb) {
		user.finds('.spec_load_style_button').click().then(function(){
			throw new Error('Load Theme button is not blocked');
		}, function(){
			cb();
		});
	});

	When(/^the user try clicks on Upload Logo button$/, function(cb) {
		user.finds('.spec_customize_field_upload').click().then(function(){
			throw new Error(new Error('Upload Logo button is not blocked'));
		}, function(){
			cb();
		});
	});

	When(/^the user try writes another Label text$/, function(cb) {
		user.finds('. spec-customize-input-label').click().then(function(){
			throw new Error(new Error('Background color was changed'));
		}, function(){
			cb();
		});
	});

	When(/^the user try writes another Title$/, function(cb) {
		user.finds('.spec-customize-input-title').click().then(function(){
			throw new Error(new Error('Background color was changed'));
		}, function(){
			cb();
		});
	});

	When(/^the user try change background color$/, function(cb) {
		user.finds('.spec_customize_color_option_background').click().then(function(){
			throw new Error(new Error('Background color was changed'));
		}, function(){
			cb();
		});
	});

	When(/^the user try selects the "([^"]*)" position$/, function(position, cb) {
		user.finds('.spec-tab-'+position).click().then(function(){
			throw new Error(new Error('Incontext position was changed'));
		}, function(){
			cb();
		});
	});

	When(/^user try enters "([^"]*)" as title$/, function(title, cb) {
		_title = title;
		user.finds('.spec-customize-input-title').click().then(
		function(){
			user.finds('.spec-customize-input-title').sendKeys(_title).then(cb);
			throw new Error(new Error('Title was changed'));
		},
		function(){
			cb();
		});
	});

	Then(/^the customize is not changed$/, function(cb){
		cb();
	});
};
