module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user fill section title$/, function(cb) {
		var _sectionTittle = 'Mark your favourites online sites';
		user.finds('.name-check-q input').sendKeys(_sectionTittle).then(cb);
	});

	When(/^the user opens the section$/, function(cb) {
		user.waits(2000).then(function(){
			element(by.css('.checklist-title-question')).click().then(cb);
		});
	});

	When(/^the user fill required options title$/, function(cb) {
		var i = 1;
		element.all(by.css('.input-ans-name')).each(function(item) {
			item.sendKeys('Store ' + i);
			i++;
		}).then(cb);
	});

	When(/^the user clicks outside the section box$/, function(cb) {
		scrollToTop();
		user.finds('.spec_title_description').click().then(cb);
	});

	When(/^the user clicks outside the checklist section$/, function(cb) {
		scrollToTop();
		browser.actions().mouseMove(element(by.css('#allow-intropage'))).click().perform().then(function(){
			cb();
		});
	});

	When(/^the user clicks outside the nps quetion$/, function(cb) {
		scrollToTop();
		element(by.css('.qrvey-info-editor-container')).click().then(cb);
	});

	When(/^the user clicks outside the section box on Not Widget$/, function(cb) {
		user.finds('.spec-tab-to-desing').click().then(cb);
	});

	When(/^the user try to click outside the section box$/, function(cb) {
		user.finds('.spec_title_description').click().then(function(){
			cb('the element is clickeabled');
		}).catch(function(){
			cb();
		});
	});

	When(/^the user clicks add option (\d+) times$/, function(_numberOfOptions, cb) {
		var i = 0;
		var addOption = user.findsAll('a.add-check').first();
		for (i = 0; i < _numberOfOptions; i++) {
			addOption.click();
			user.waits(600);
		}
		cb();
	});

	Then(/^the section is saved$/, function(cb) {
		var section = by.css('.checklist-created-question');

		user.waits(800);

		element(section).isDisplayed().then(function(_isDisplays) {
			expect(_isDisplays).to.be.true;
		}).then(function() {
			expect(hasClass(element(section), 'error')).to.eventually.be.false;
		}).then(cb);
	});

	When(/^the user adds (\d+) section$/, function(numberOfSections, cb) {
		var addButton = by.css('.check-add-state'),
			addSection = by.css('.spec-checklist-add-section');

		var i = 0;
		var array = gArray(numberOfSections);
		async.eachSeries(array, function(item, next){
			element.all(addButton).first().click().then(function() {
				user.waits(1000);
				browser.executeScript('arguments[0].click()',element(addSection)).then(function(){
					logger.info('finished i:',i);
				}).then(function(){
					i++;
					next();
				});
			});
		}, function(){
			cb();
		});
	});

	Then(/^the total options should be (\d+)$/, function(_numberOfOptions, cb) {
		var numberOfOptions = parseInt(_numberOfOptions);
		expect(element.all(by.css('.checklist-edit-question .edit-check')).count()).to.eventually.be.equal(numberOfOptions).and.notify(cb);
	});

	Then(/^all add buttons must be disabled$/, function(cb) {
		element.all(by.css('.checklist-edit-question .edit-check')).then(function(els) {
			els.forEach(function(ele, i, a) {
				expect(hasClass(a[i].element(by.css('a.add-check')), 'disabled-check')).to.eventually.be.true;
			});
		}).then(cb);
	});

	Then(/^the total of sections should be (\d+)$/, function(_numberOfSections, cb) {
		var numberOfSections = parseInt(_numberOfSections);
		expect(element.all(by.css('.check-created-question-container')).count()).to.eventually.be.equal(numberOfSections).and.notify(cb);
	});

	Then(/^the text on banner should display (\d+) sections$/, function(number, cb) {
		var _element = user.finds('.summary.questions b');
		_element.getText().then(function(actualNumber) {
			expect(actualNumber).to.equal(number);
		}).then(cb);
	});

	Then(/^the remaining sections to add should be (\d+)$/, function(number, cb) {
		var _element = user.finds('.counter-questions b');
		_element.getText().then(function(actualNumber) {
			var _actualNumber = actualNumber.match(/\d+/)[0];
			expect(_actualNumber).to.equal(number);
		}).then(cb);
	});
};