'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var newTagName = null,
		oldTagName = null;

	When(/^the user type a new tag$/, function(cb) {
		var _text = rand.getText(4);

		element(by.css('input.input')).sendKeys(_text);
		brw.actions().sendKeys(protractor.Key.ENTER).perform();
		cb();
	});

	When(/^the user clicks on tags manager button$/, function(cb) {
		element(by.css('.spec-addressbook-manage-tags')).click().then(cb);
	});

	When(/^the user types the name of a new tag$/, function(cb) {
		newTagName = rand.getText(5);
		element(by.css('.spec-addressbook-tagmanager-tag-name')).sendKeys(newTagName).then(cb);
	});

	When(/^the user clicks on add button$/, function(cb) {
		element(by.css('.spec-addressbook-tagmanager-add-button')).click().then(cb);
	});

	When(/^the user clicks on delete button$/, function(cb) {
		var _el = element.all(by.css('.spec-addressbook-tagmanager-delete-button'));
		oldTagName = null;

		_el.count().then(function(_count) {
			if (_count == 1) {
				element(by.css('.spec-addressbook-tagmanager-input-name-tag')).getAttribute('value').then(function(_value) {
					oldTagName = _value;
				});
				element(by.css('.spec-addressbook-tagmanager-delete-button')).click();
			} else {
				element.all(by.css('.spec-addressbook-tagmanager-input-name-tag')).get(0).getAttribute('value').then(function(_value) {
					oldTagName = _value;
					logger.log('oldTag', oldTagName);
				});
				element.all(by.css('.spec-addressbook-tagmanager-delete-button')).get(0).click();
			}
		}).then(cb);
	});

	Then(/^the new tag should be displayed$/, function(cb) {
		logger.log('newTagName', newTagName);
		make.getsInputTextExists('.spec-addressbook-tagmanager-input-name-tag', newTagName).then(function(_value) {
			expect(_value).to.be.true;
		}).then(cb);
	});

	Then(/^the old tag should be not displayed$/, function(cb) {
		var _el = element.all(by.css('.spec-addressbook-tagmanager-input-name-tag'));

		_el.count().then(function(_count) {
			if (_count == 1) {
				_el.getAttribute('value').then(function(_value) {
					expect(_value).to.be.not.equal(oldTagName);
				}).then(cb);
			} else {
				_el.then(function(els) {
					els.forEach(function(ele, i, a) {
						a[i].getAttribute('value').then(function(_value) {
							expect(_value).to.be.not.equal(oldTagName);
						});
					});
				}).then(cb);
			}
		});
	});

	Given(/^that the current user has not tags$/, function(cb) {
		cs.getAllTags().then(function(data) {
			var addressbooktagsids = [];

			if (data.Items.length > 0) {
				Object.keys(data.Items).forEach(function(key) {
					addressbooktagsids.push(data.Items[key].addressbooktagid);
				});

				cs.deleteTags(addressbooktagsids).then(function(_data) {
					logger.log('deleted all tags', _data);

					cs.getAllTags().then(function(data) {
						expect(data.Items.length).to.be.equal(0);
					}).then(cb);
				});
			} else cb();
		});
	});

	Given(/^that the current user has at least 1 tag$/, function(cb) {
		var _text = rand.getText(5);

		cs.createTag(_text).then(function() {
			logger.log('created tag');
		}).then(cb);
	});
};
