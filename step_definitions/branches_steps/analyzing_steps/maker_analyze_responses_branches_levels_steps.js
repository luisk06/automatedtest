'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Given(/^the user opens created branches of level (\d+)$/, function (level, cb) {
		webpage.waits(3000);
		scrollToBottom().then(function(){
			user.findsAll('.btn-branch').get(level - 1).click().then(cb);
		});
	});

	Then(/^a level (\d+) branch must be showed$/, function (_level, cb) {
		var _question = parseInt(_level) + 1;
		expect(user.findsAll('.spec-analyzing-question-number').get(_level).getText()).to.eventually.be.equal('Question ' + _question).and.notify(cb);
	});

	Then(/^the branch level (\d+) should have (\d+) answers$/, function (_level, _number, cb) {
		webpage.waits(1000);
		var _branchTitle = element.all(by.css('.spec-analyzing-question-number ~ strong')).get(_level);
		expect(_branchTitle.getText()).to.eventually.be.equal(_number.toString()).and.notify(cb);
	});
};