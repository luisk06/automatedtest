'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the "([^"]*)" should have "([^"]*)" as color on "([^"]*)" tab$/, function(arg1, arg2, arg3, cb) {
		maker.finds('.spec-customize-' + arg3 + '-tab').click().then(function(){
			var rgb = utils.hexToRgb(arg2);
			var rgbFormated = '('.concat(rgb.r).concat(', ').concat(rgb.g).concat(', ').concat(rgb.b).concat(')');
			maker.finds('.spec_customize_color_option_' + arg1).getAttribute('value').then(function(_value) {
				expect(_value).to.be.equal(arg2); // Error, asigna valor al ingresar el valor
			}).then(function() {
				if (arg1 != 'answer_font' && (arg3 != 'presenter' && arg1 != 'main_font')) {
					element(by.css('.spec_customize_color_preview_option_' + arg1)).getAttribute('style').then(function(res) {
						expect(res, err.differentRgb(rgbFormated, res)).to.contain(rgbFormated);
					}).then(cb);
				} else {
					cb();
				}
			});
		});
	});
};
