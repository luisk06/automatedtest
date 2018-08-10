'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the user actives the Never Expire$/, function(cb) {
		navigate.clicksButton('.spec-active-never-expire + label').then(cb);
	});

	When(/^the user actives the "([^"]*)" option$/, function(typeOfOption, cb) {
		element(by.css('.spec-dropdown-type-number')).click();
		element(by.css('.spec-maker-type-' + typeOfOption)).click().then(cb);
	});

	When(/^the user selects "([^"]*)" question type from the dropdown menu$/, function(typeOfQuestion, cb) {
		var _type = '';

		switch (typeOfQuestion) {
			case 'multiple choice':
			case 'multiple_choice':
			case 'multiple-choice':
				_type = 'spec_mc_qt';
				break;
			case 'image':
				_type = 'spec_img_qt';
				break;
			case 'expression':
				_type = 'spec_ex_qt';
				break;
			case 'numeric':
				_type = 'spec_nu_qt';
				break;
			case 'ranking':
				_type = 'spec_rn_qt';
				break;
			case 'rating':
				_type = 'spec_rt_qt';
				break;
			case 'short text':
			case 'short_text':
			case 'short-text':
				_type = 'spec_tf_qt';
				break;
			case 'slider bar':
			case 'slider_bar':
			case 'slider-bar':
				_type = 'spec_sl_qt';
				break;
			case 'yes no':
			case 'yes-no':
			case 'yes_no':
				_type = 'spec_yn_qt';
				break;
			case 'date':
				_type = 'spec_da_qt';
				break;
			case 'nps':
				_type = 'spec_nps_qt';
				break;
			default:
				throw 'Error, type of question is undefined when the user try to select ' + typeOfQuestion + ' in the dropdown menu';
		}

		element(by.css('#questionType_dropdown')).click();
		element(by.css('#' + _type)).click().then(function() {
			if (_type == 'slider bar') {
				expect(hasClass(element(by.id('spec-slidebar-number-option-3')), 'active')).to.eventually.be.true;
				expect(hasClass(element(by.id('spec-slidebar-number-option-5')), 'active')).to.eventually.not.be.true;
				expect(hasClass(element(by.id('spec-slidebar-number-option-7')), 'active')).to.eventually.not.be.true;
				expect(hasClass(element(by.id('spec-slidebar-number-option-9')), 'active')).to.eventually.not.be.true;
			}
		}).then(cb);
	});
};