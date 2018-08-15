module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^user clicks on the "([^"]*)" number (\d+) on "([^"]*)"$/, function(btn, i, typeOfQrvey, cb) {
		logger.log('btn', btn);
		logger.log('i', i);
		var index = i - 1;
		if (typeOfQrvey == 'incontextfeedback') {
			index = i - 1;
		}
		webpage.waits(600).then(function() {
			var _element = maker.findsAll('.spec_' + btn + '_' + i).get(index);
			_element.click().then(cb);
		});
	});

	When(/^user clicks on the bucket button number (\d+) on "([^"]*)"$/, function(i, typeOfQrvey, cb) {
		logger.log('bucket test on ', typeOfQrvey);
		logger.log('i', i);
		var index = i - 1;
		if (typeOfQrvey == 'incontextfeedback') {
			index = i - 1;
		}
		webpage.waits(600).then(function() {
			element(by.css('.spec-download-drop')).click().then(function(){
				var _element = maker.findsAll('.spec_bucket_button_' + i).get(index);
				_element.click().then(cb);
			});
		});
	});

	When(/^the user create (\d+) "([^"]*)" buckets$/, function(numberOfBuckets, typeOfQuestion, cb) {
		var i = 0;
		var text = '';

		switch (typeOfQuestion) {
			case 'expression':
			case 'slider':
			case 'rating':
			case 'image':
			case 'ranking':
			case 'multiple_choice':
			case 'date':
				for (i = 0; i < numberOfBuckets; i++) {
					text = 'Bucket ' + (i + 1);
					maker.finds('.spec_bucket_name_input').sendKeys(text);
					brw.actions().sendKeys(protractor.Key.ENTER).perform();
				}
				cb();
				break;
			case 'positive':
			case 'negative':
				for (i = 0; i < numberOfBuckets; i++) {
					text = (typeOfQuestion == 'negative') ? 'Negative ' : 'Positive ';
					text += (i + 1);

					maker.finds('.spec_bucket_name_input').sendKeys(text);
					brw.actions().sendKeys(protractor.Key.ENTER).perform();
				}
				cb();
				break;
		}
	});

	When(/^the user adds (\d+) question to bucket (\d+)$/, function(numberOfQuestions, bucketNumber, cb) {
		for (var i = 0; i < numberOfQuestions; i++) {
			var answer = maker.findsAll('.spec-bucket-answer').get(0);
			answer.element(by.css('.spec-bucket-select')).click().then(function() {
				webpage.waits(500).then(function() {
					answer.all(by.repeater('(k, v) in buckets')).get(bucketNumber - 1).click().then(function() {
						webpage.waits(1000);
					});
				});
			});
		}
		cb();
	});

	When(/^the user clicks on "([^"]*)" "([^"]*)"$/, function(identifier, tagType, cb) {
		webpage.waits(500);
		maker.finds('.spec_' + identifier + '_' + tagType).click().then(cb);
	});

	When(/^the user clicks on "([^"]*)" "([^"]*)" on bucket (\d+)$/, function(identifier, tagType, bucketNumer, cb) {
		var buckets = maker.findsAll('.spec-bucket-item');
		buckets.get(bucketNumer - 1).element(by.css('.spec_' + identifier + '_' + tagType)).click().then(cb);
	});

	Then(/^the total of "([^"]*)" should be (\d+)$/, function(type, number, cb) {
		webpage.waits(5000);
		expect(element.all(by.css('.spec-' + type)).count()).to.eventually.be.equal(parseInt(number)).and.notify(cb);
	});

	Then(/^the total of "([^"]*)" should be greater than (\d+)$/, function(type, number, cb) {
		brw.sleep(1600);
		expect(element.all(by.css('.spec-' + type)).count()).to.eventually.be.above(parseInt(number)).and.notify(cb);
	});

	Then(/^the total of "([^"]*)" should be equal than (\d+)$/, function(type, number, cb) {
		brw.sleep(1600);
		expect(element.all(by.css('.spec-' + type)).count()).to.eventually.be.equal(parseInt(number)).and.notify(cb);
	});

	Then(/^the total of bucket label should be (\d+)$/, function(number, cb) {
		webpage.waits(1400);
		expect(element.all(by.css('.bucket_label')).count()).to.eventually.be.equal(parseInt(number)).and.notify(cb);
	});
};
