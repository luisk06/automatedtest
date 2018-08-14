'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^that the current user has no styles$/, function(cb) {
		ss.getAll().then(function(_resp) {
			if (_resp.data.length > 0) {
				for (var i = 0; i < _resp.data.length; i++) {
					var styleID = _resp.data[i].styleid;
					ss.delete(styleID).then(function() {
						logger.log('Deleted style id: ', styleID);
					});
				}
			} else cb();
		}).then(cb);
	});

	When(/^the modal "([^"]*)" is displayed$/, function(arg1, cb) {
		user.finds('.modal.fade').isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.true;
		}).then(cb);
	});

	Then(/^the modal "([^"]*)" should be displayed$/, function(arg1, cb) {
		user.finds('.modal.fade').isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.true;
		}).then(cb);
	});

	When(/^the user clicks on "([^"]*)" color option$/, function(arg1, cb) {
		var el = '.spec_customize_color_option_' + arg1;

		user.waits(el);
		user.finds(el).click().then(cb);
	});

	When(/^set the "([^"]*)" color on "([^"]*)"$/, function(arg1, arg2, cb) {
		user.finds('.spec_customize_color_option_' + arg2).click();
		user.finds('.inputhex').clear().sendKeys(arg1).then(cb);
	});

	When(/^the user clicks on the customize reset button$/, function(cb) {
		var el = '.spec_customize_btn_reset';

		webpage.waitsFor(el);
		user.finds(el).click().then(cb);
	});

	Then(/^the "([^"]*)" should have "([^"]*)" as color$/, function(arg1, arg2, cb) {
		var rgb = utils.hexToRgb(arg2);
		var rgbFormated = '('.concat(rgb.r).concat(', ').concat(rgb.g).concat(', ').concat(rgb.b).concat(')');
		var el = '.spec_customize_color_option_' + arg1;

		webpage.waitsFor(el);
		user.finds(el).getAttribute('value').then(function(_value) {
			expect(_value).to.be.equal(arg2); // Error, asigna valor al ingresar el valor
		}).then(function() {
			if (arg1 != 'answer_font') {
				element(by.css('.spec_customize_color_preview_option_' + arg1)).getAttribute('style').then(function(res) {
					expect(res, err.differentRgb(rgbFormated, res)).to.contain(rgbFormated);
				}).then(cb);
			} else cb();
		});
	});

	Then(/^the text "([^"]*)" should be diplayed$/, function(text, cb) {
		webpage.getsTextExists(text).then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});

	When(/^the user changes the "([^"]*)" color by "([^"]*)"$/, function(arg1, arg2, cb) {
		var el = '.spec_customize_color_option_' + arg1;

		webpage.waitsFor(el);
		user.finds(el).click();
		user.finds('.inputhex').clear().sendKeys(arg2).then(cb);
	});

	Then(/^the "([^"]*)" input is displayed$/, function(inputName, cb) {
		user.finds('.spec_customize_input_' + inputName).isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.true;
		}).then(cb);
	});

	When(/^the user clicks on the "([^"]*)" button in the modal$/, function(arg1, cb) {
		user.finds('.spec_customize_modal_btn_' + arg1).click().then(cb);
	});

	Then(/^the "([^"]*)" button in the modal should be displayed$/, function(arg1, cb) {
		user.finds('.spec_customize_modal_btn_' + arg1).isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.true;
		}).then(cb);
	});

	Then(/^the "([^"]*)" button in the modal is displayed and have "([^"]*)" as text$/, function(arg1, arg2, cb) {
		var _el = '.spec_customize_modal_btn_' + arg1;

		user.finds(_el).isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.true;
		});
		user.finds(_el).getAttribute('innerHTML').then(function(_text) {
			expect(_text).to.be.equal(arg2);
		}).then(cb);
	});

	When(/^the user write the name "([^"]*)" in the input$/, function(arg1, cb) {
		user.finds('.spec_customize_input_insert_a_name').sendKeys(arg1).then(cb);
	});

	Then(/^the user should clicks on "([^"]*)" button$/, function(arg1, cb) {
		user.finds('.spec_customize_modal_btn_' + arg1).click().then(cb);
	});

	When(/^the user clicks in "([^"]*)" on the modal$/, function(arg1, cb) {
		user.finds('.spec_customize_' + arg1 + '_button').click().then(cb);
	});

	When(/^the user looking for "([^"]*)" button don't found$/, function(arg1, cb) {
		user.finds('.spec_customize_btn_' + arg1).isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.false;
		}).then(cb);
	});

	Then(/^the modal "([^"]*)" should not be displayed$/, function(arg1, cb) {
		user.finds('.spec_customize_modal_' + arg1).isDisplayed().then(function(_displayed) {
			expect(_displayed).to.be.false;
		}).then(cb);
	});

	Then(/^the "([^"]*)" style created should be exist in the list$/, function(arg1, cb) {
		var el = '.spec_customize_themes_nameInput';

		webpage.waitsFor(el);
		maker.getsInputTextExists(el, arg1).then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});
};