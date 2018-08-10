'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on show more on detailed view$/, function(cb) {
		scrollToBottom().then(function(){
			element(by.css('.showmore-down')).click().then(function() {
				scrollToBottom();
				user.waits(1200);
			}).then(cb);
		});
	});

	When(/^the user excludes (\d+) answers from individual records list$/, function (numberExcluded, cb) {
		var _allElements = element.all(by.repeater('item in vm.IRPaginate[results.questionid].ACTIVE.Items track by item.answerid'));

		async.forEachOf(gArray(numberExcluded), function(n, key, next) {
			scrollToBottom();
			// console.log('KEY: ', key);
			brw.actions().mouseMove(_allElements.get(key).element(by.css('img.pic'))).click().perform();
			user.waits(1500);
			next();
		});
		scrollAxisY('1800');
		cb();
	});

	When(/^the user excludes (\d+) answers from individual records list on address questions$/, function (numberExcluded, cb) {
		var _allElements = element.all(by.repeater('item in vm.IRPaginate[results.questionid].ACTIVE.Items track by item.answerid'));

		async.forEachOf(gArray(numberExcluded), function(n, key, next) {
			scrollAxisY(1800);
			// console.log('KEY: ', key);
			brw.actions().mouseMove(_allElements.get(0).element(by.css('img.pic'))).click().perform();
			user.waits(1500);
			next();
		});
		scrollAxisY('1800');
		cb();
	});

	When(/^the user moves to individual records "([^"]*)" tab$/, function (tabType, cb) {
		element(by.xpath('//span[contains(text(),"'+tabType+'")]')).click().then(cb);
	});

	Then(/^the number of excluded records should be (\d+)$/, function (numberExcluded, cb) {
		user.waits(1300);
		var repeater = by.repeater('item in vm.IRPaginate[results.questionid].EXCLUDED.Items  track by item.answerid');
		expect(element.all(repeater).count()).to.eventually.be.equal(parseInt(numberExcluded)).and.notify(cb);
	});

	Then(/^the number of excluded records should be greater than 0$/, function (cb) {
		user.waits(1300);
		var repeater = by.repeater('item in vm.IRPaginate[results.questionid].EXCLUDED.Items  track by item.answerid');
		expect(element.all(repeater).count()).to.eventually.be.above(0).and.notify(cb);
	});
};
