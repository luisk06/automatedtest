'use strict';

module.exports = function () {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	var getDateLabels = function(dateGroup) {
		var _answersArray;
		switch (dateGroup) {
			case 'Year':
				_answersArray = ['2001','2002','2003','2004','2005'];
				break;
			case 'Quarter':
				_answersArray = ['Q1 2001','Q1 2002','Q4 2002','Q1 2003','Q2 2004','Q2 2005'];
				break;
			case 'Month':
				_answersArray = ['Jan 2001','Feb 2002','Oct 2002','Dec 2002','Jan 2003','Mar 2003','Apr 2004','Jun 2004','May 2005'];
				break;
			case 'Week':
				_answersArray = ['W1 2001','W5 2002','W41 2002','W49 2002','W1 2003','W10 2003','W15 2004','W23 2004','W19 2005'];
				break;
			case 'Day':
			case 'No Grouping':
				_answersArray = ['01/01/2001', '02/02/2002', '03/03/2003', '04/04/2004', '05/05/2005', '01/02/2003', '06/05/2004', '10/11/2002', '12/02/2002'];
				break;
		}
		return _answersArray;
	};

	Then(/^the x asis labels should match with "([^"]*)" date group$/, function (dateGroup, cb) {
		webpage.waits(1500);
		var _answersArray = getDateLabels(dateGroup);

		element.all(by.css('.spec-text-labels g')).each(function(label){
			label.element(by.css('text')).getText().then(function(text){
				expect(_answersArray.includes(text), dateGroup + ' grouping is failing on ' + text).to.be.true;
			});
		}).then(cb);
	});

	Then(/^the pie texts should match with "([^"]*)" date group labels$/, function (dateGroup, cb) {
		webpage.waits(1500);
		var _answersArray = getDateLabels(dateGroup);

		element.all(by.css('.spec-piechart-graph g.fan')).each(function(label){
			label.element(by.css('text')).getText().then(function(text){
				expect(_answersArray.includes(text), dateGroup + ' grouping is failing on ' +text).to.be.true;
			});
		}).then(cb);
	});

	Then(/^the heatmap labels should match with "([^"]*)" date group labels$/, function (dateGroup, cb) {
		webpage.waits(1500);
		var _answersArray = getDateLabels(dateGroup);

		element.all(by.css('.spec-heatmap-label')).each(function(label){
			label.getText().then(function(text){
				expect(_answersArray.includes(text), dateGroup + ' grouping is failing on ' +text).to.be.true;
			});
		}).then(cb);
	});
};