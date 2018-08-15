'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var templateQuestions = null,
		favoriteTemplate = null;

	Given(/^that the user sets the name and description$/, function(cb) {
		qrvey.fillQuestionNameAndDescription('This is a testacular name', 'and this is a testacular description').then(cb);
	});

	Given(/^the user clicks on the "([^"]*)" "([^"]*)" on the "([^"]*)"$/, function(identifier, type, location, cb) {
		brw.ignoreSynchronization = true;
		maker.finds('.spec_' + location + '_' + identifier + '_' + type).then(cb).click();
	});

	When(/^the user clicks on See Templates$/, function(cb) {
		maker.finds('.spec_design_template_button').then(cb).click();
	});

	When(/^the user clicks on a template categorie$/, function(cb) {
		maker.finds('.spec-friends-templates').then(cb).click();
	});

	When(/^the user clicks on a template$/, function(cb) {
		maker.finds('.spec-templates-selected-0').then(cb).click();
	});

	When(/^the user clicks on Select Template$/, function(cb) {
		element.all(by.css('.title')).getText().then(function(res) {
			templateQuestions = res;
		});
		maker.finds('.spec-selected-template-0').then(cb).click();
	});

	When(/^the user clicks on a template's blank star$/, function(cb) {
		element(by.css('.fav-star-template.spec-toogle-fav-0.active')).isPresent().then(function(res) {
			if (!res) {
				maker.finds('.spec-toogle-fav-0').click();
			} else {
				maker.finds('.spec-toogle-fav-0').click();
				maker.finds('.spec-toogle-fav-0').click();
			}
		}).then(function() {
			element(by.css('.spec-templates-selected-0 .name')).getText().then(function(res) {
				favoriteTemplate = res;
			});
		}).then(cb);
	});

	When(/^the user clicks on Use name and description from template$/, function(cb) {
		maker.finds('.spec-use-name-description-of-template').then(cb).click();
	});

	When(/^the user clicks on the i'm ok with that button$/, function(cb) {
		maker.finds('.spec_template_lose_ok').then(cb).click();
	});

	Then(/^the qrvey design page should be displayed$/, function(cb) {
		expect(brw.getCurrentUrl()).to.eventually.contain('design').and.notify(cb);
	});

	Then(/^the template star should be fulfilled$/, function(cb) {
		var el = element(by.css('.fav-star-template.spec-toogle-fav-0.active')),
			nav = webpage.isPresent(el);

		expect(nav).to.eventually.be.true.and.notify(cb);

		// expect(webpage.isPresent(element(by.css('.fav-star-template.spec-toogle-fav-0.active')))).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the template questions should be present$/, function(cb) {
		element.all(by.css('question in qrveyObject.questions.data')).getText().then(function(res) {
			logger.log('res:', res);
			for (var i = 0; i < res.length; i++) {
				logger.log('i:', i);
				logger.log('res[i]:', res[i]);
				logger.log('templateQuestions:', templateQuestions);
				logger.log('templateQuestions[i]:', templateQuestions[i].slice(0, -4));
				expect(res[i]).to.contain(templateQuestions[i].slice(0, -4));
			}
		}).then(cb);
	});

	Then(/^the template should appear in the favorites$/, function(cb) {
		maker.finds('.spec-fav-templates').click();
		webpage.waitsFor('.tabs-template-list .itemtab:nth-child(1) span.active');

		maker.finds('.spec-templates-selected-0 .name').getText().then(function(res) {
			logger.log('res: -> ', res);
			logger.log('favoriteTemplate: -> ', favoriteTemplate);

			expect(res).to.be.equal(favoriteTemplate);
		}).then(cb);
	});

	Then(/^a confirmation modal should be displayed$/, function(cb) {
		expect(webpage.isPresent(element(by.css('.spec_template_lose_progress')))).to.eventually.be.true.and.notify(cb);
	});

	Then(/^a cancel button should be displayed$/, function(cb) {
		expect(webpage.isPresent(element(by.css('.spec_template_lose_cancel')))).to.eventually.be.true.and.notify(cb);
	});

	Then(/^a i'm ok with that button should be displayed$/, function(cb) {
		expect(webpage.isPresent(element(by.css('.spec_template_lose_ok')))).to.eventually.be.true.and.notify(cb);
	});
};