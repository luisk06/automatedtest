'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on design button$/, function (cb) {
		user.finds('.spec-tab-to-desing').click().then(cb);
	});

	When(/^the user open the header of "([^"]*)"$/, function (type, cb) {
		if (type == 'checklist') {
			user.finds('.spec_checklist_saved_layer').click().then(cb);
		} else {
			user.finds('.spec_title_description').sendKeys('Text').then(function () {
				cb('Description field is not blocked');
			}).catch(function () {
				cb();
			});
		}
	});

	When(/^the user try edits the title of "([^"]*)"$/, function (type, cb) {
		var _title = null;

		if (type == 'checklist') {
			_title = element(by.css('.spec_checklist_editing_title_description > div > input'));
		} else {
			_title = element(by.css('.spec_editing_title_description div input'));
		}

		_title.sendKeys('Testing input title').then(function(){
			expect(_title.getAttribute('value')).to.not.be.equal('Testing input title').and.notify(cb);
		}).catch(function(){
			cb();
		});
		// expect(_title.getAttribute('value')).to.not.be.equal('Testing input title').and.notify(cb); cb('the element can be edited');
	});

	When(/^the user try edits the description of "([^"]*)"$/, function (type, cb) {
		var _desc = null;

		if (type == 'checklist') {
			_desc = element(by.css('.spec_checklist_editing_title_description > div > textarea'));
		} else {
			_desc = element(by.css('.spec_editing_title_description div textarea'));
		}
		_desc.sendKeys('Testing input area').then(function () {
			expect(_desc.getAttribute('value')).to.eventually.not.be.equal('Testing input area').and.notify(cb);
		}).catch(function () {
			cb();
		});
		// expect(_desc.getAttribute('value')).to.not.be.equal('Testing input area').and.notify(cb); cb('the element can be edited');
	});

	When(/^the user clicks on description check$/, function (cb) {
		user.finds('.spec_allow_intropage').click().then(
			function () {
				throw new Error('Description check is not blocked');
			},
			function () {
				cb();
			}
		);
	});

	When(/^the user opens the question$/, function (cb) {
		user.finds('#question-1').click().then(cb);

		// var el = '.spec-question-title';
		// webpage.waitsFor(el);
		// element(by.css(el)).click().then(cb);
	});

	When(/^the user opens the question in form$/, function (cb) {
		cb();
	});

	When(/^the user opens the question on "([^"]*)"$/, function (typeOfQrvey, cb) {
		user.finds('.' + typeOfQrvey + '-questions-list').click().then(cb);
	});

	When(/^the user try to open the question on "([^"]*)"$/, function (typeOfQrvey, cb) {
		user.findsAll('.card.q-editable-card').get(0).click().then(function(){
			cb('The element is clickeabled');
		}).catch(function(){
			cb();
		});
	});

	Then(/^the question can not be edited$/, function (cb) {
		expect(hasClass(element(by.css('.main-container')), 'disable-cursor')).to.eventually.be.true.and.notify(cb);
	});

	When(/^the user try edits the question$/, function (cb) {
		user.finds('.spec-edit-question-name-0').click().then(
			function () {
				throw new Error('Question is not blocked');
			},
			function () {
				cb();
			}
		);
	});

	Then(/^the qrvey is not changed$/, function (cb) {
		cb();
	});
};