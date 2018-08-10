module.exports = function() {
	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var _el, _direction;

	When(/^the user adds (\d+) question to "([^"]*)" bucket (\d+)$/, function (numberOfQuestions, bucketType, bucketNumber, cb) {
		for(var i = 0; i<numberOfQuestions; i++){
			var answer = user.findsAll('.spec-bucket-answer.'+bucketType).get(0);
			answer.element(by.css('.spec-bucket-select')).click().then(function(){
				user.waits(500).then(function(){
					answer.all(by.repeater('(k, v) in buckets')).get(bucketNumber - 1).click().then(function (){
						user.waits(1000);
					});
				});
			});
		}
		cb();
	});

	When(/^the user moves to "([^"]*)" answers$/, function (category, cb) {
		_el = element(by.css('.modal .rz-pointer.rz-pointer-min')),
		_direction = (category == 'positive') ? -300 : 300;
		brw.actions().mouseDown(_el).mouseMove({
			x: _direction,
			y: 0
		}).mouseUp().perform().then(function(){
			user.waits(800);
		}).then(cb);
	});

	Then(/^the total of "([^"]*)" on "([^"]*)" side should be (\d+)$/, function (type, side, number, cb) {
		_direction = (side == 'positive') ? -300 : 300;
		brw.actions().mouseDown(_el).mouseMove({
			x: _direction,
			y: 0
		}).mouseUp().perform().then(function(){
			expect(element.all(by.css('.spec-'+type+'.'+side)).count()).to.eventually.be.equal(parseInt(number)).and.notify(cb);
		});
	});
};
