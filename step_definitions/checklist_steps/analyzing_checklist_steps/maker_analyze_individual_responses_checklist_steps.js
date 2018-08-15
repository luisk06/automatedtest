module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user filter "([^"]*)" responses$/, function (checkType, cb) {
		webpage.waits(500).then(function() {
			maker.finds('.checklist-responses-filter .spec-filter-analyze-histogram').click().then(function() {
				webpage.waits(800).then(function(){
					maker.finds('.spec-filter-'+checkType).click().then(cb);
				});
			});
		});
	});

	Then(/^each response should only contain "([^"]*)" option list$/, function(checkType, cb) {
		var hiddenFilter = 'unchecked';
		if(checkType == 'unchecked'){
			hiddenFilter = 'checked';
		}

		var repeater = by.repeater('obj in item.answers | filter : {type : '+"'!HEADLINE'"+'} : true'); // eslint-disable-line
		element.all(repeater).then(function(els) {
			expect(els.length).to.be.above(0);
			els.forEach(function(ele, i, a) {
				expect(brw.isElementPresent(a[i].element(by.css('.spec-title-'+hiddenFilter)))).to.eventually.be.false.then(function(){
					expect(a[i].element(by.css('.spec-title-'+checkType)).isDisplayed()).to.eventually.be.true;
				});
			});
		}).then(cb);
	});

	When(/^the user type "([^"]*)" on keyword input$/, function (text, cb) {
		maker.finds('#response_search_check input').sendKeys(text).then(cb);
	});

	Then(/^the total of "([^"]*)" answers should be (\d+)$/, function (typeOfView, num, cb) {
		webpage.waits(500).then(function() {
			brw.executeScript('window.scrollTo(0,0);').then(function() {
				maker.finds('.spec-filter-analyze').click().then(function() {
					maker.finds('#spec-panelview-' + typeOfView).click();
				});
			});
		});

		var repeater = null;

		switch (typeOfView) {
			case 'single':
				repeater = by.css('b.answered');
				element(repeater).getText().then(function(res){
					expect(res).to.be.equal(num);

				}).then(cb);
				break;
			case 'multi':
				var answered = maker.finds('.question-title strong~strong');

				answered.getText().then(function(text) {
					expect(text).to.be.equal(num);
				}).then(cb);
				break;
			case 'individual':
				repeater = by.repeater('obj in item.answers | filter : {type : \'!HEADLINE\'} : true ');
				expect(element.all(repeater).count()).to.eventually.be.equal(parseInt(num)).and.notify(cb);
				break;
		}
	});
};
