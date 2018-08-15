module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	Then(/^the user has an app and a webform of type "([^"]*)" with "([^"]*)" question$/, function(typeOfQrvey, typeOfQuestion, cb) {
		us.isLogged().then(function(_userId) {
			apps.createNewApp('Test ' + typeOfQrvey + ' ' + typeOfQuestion).then(function(appData){
				appID = appData.appid;
				// console.log('appID', appID);
				// console.log('typeOfQuestion', typeOfQuestion);
				qs.createQrvey( appID, _userId, typeOfQrvey, typeOfQuestion).then(function() {
					//
				});
			}).then(cb);
		});
	});

	When(/^the user opens the actions panel$/, function(cb) {
		var el = '.spec-automatiq-block-action-view-open';

		webpage.waitsFor(el);
		maker.findsAll(el).get(0).click().then(cb);
	});

	When(/^the user put the message in sms$/, function(cb) {
		//brw.explore();
		element.all(by.css('.subjectSMS')).get(0).click().then(function(){
			element.all(by.css('.subjectSMS')).get(0).sendKeys(rand.getSentence(15)).then(cb);
		});
	});

	When(/^the user put the message in sms in not found$/, function (cb) {
		element.all(by.css('.subjectSMS')).get(1).sendKeys(rand.getSentence(15)).then(cb);
	});

	When(/^the user selects the schedule process (\d+) of the list in pages design$/, function(position, cb) {
		var el = '.spec-qrvey-flow';

		maker.finds('.action-another-process .automatiq-select').click();
		webpage.waitsFor(el);
		maker.findsAll(el).get(position - 1).click().then(cb);
	});

	When(/^the user writes the message$/, function(cb) {
		maker.finds('.spec-automatiq-show-message input').sendKeys(rand.getSentence(10)).then(cb);
	});

	When(/^the user selects the "([^"]*)" process (\d+)$/, function(typeOfProccess, position, cb) {
		maker.findsAll('.automatiq-select span').get(2).click().then(function() {
			maker.findsAll('.spec-automatiq-list-items div li').get(position).click();
		}).then(cb);
	});

	When(/^the user selects the "([^"]*)" process (\d+) in "([^"]*)"$/, function (typeOfProccess, position, typeOfAction, cb) {

		element(by.css('.spec-examinedata-select-qrvey-type')).click().then(function () {
			element(by.css('.spec-examinedata-qrvey-quiz')).click().then(function(){
				element(by.css('.spec-examinedata-select-qrvey')).click().then(function(){
					element.all(by.css('.spec-automatiq-list-items div li')).get(position).click();
				});
			});
		}).then(cb);
	});

	When(/^the user clicks on "([^"]*)" condition$/, function(condition, cb) {
		var el = maker.findsAll('.spec-automatiq-add-condition-examine a');

		if (condition == 'add_condition') el.get(1).click().then(cb);
		else el.get(0).click().then(cb);
	});

	When(/^the user select the "([^"]*)" filter for condition$/, function(filter, cb) {
		var _fil_pos;
		if (filter == 'score') _fil_pos = 0;
		else if(filter == 'rank') _fil_pos = 1;

		element(by.css('.spec-automatiq-select-field span')).click().then(function(){
			element.all(by.css('.spec-automatiq-select-field ul div li')).get(_fil_pos).click().then(cb);
		});
	});

	When(/^the user selects the filter option "([^"]*)"$/, function (filteredOption, cb) {
		var _ele;
		if (filteredOption == 'equals') _ele = 0;
		else if (filteredOption == 'not equal') _ele = 1;
		else if (filteredOption == 'greater than') _ele = 2;
		else if (filteredOption == 'less than') _ele = 3;
		else if (filteredOption == 'between') _ele = 4;

		element(by.css('.spec-automatiq-select-condition')).click().then(function () {
			element.all(by.css('.spec-automatiq-select-condition ul div li')).get(_ele).click().then(cb);
		});
	});

	When(/^the user writes "([^"]*)" in the filter input$/, function (value, cb) {
		element(by.css('.spec-automatiq-filter-text input')).sendKeys(value).then(cb);
	});

	When(/^the user writes "([^"]*)" in the "([^"]*)" value input$/, function (value, limit, cb) {
		var _pos;
		if(limit == 'min') _pos = 0;
		else if(limit == 'max') _pos = 1;

		element.all(by.css('.spec-automatiq-filter-text input')).get(_pos).sendKeys(value).then(cb);
	});

	When(/^the user sort the condition "([^"]*)"$/, function(condition, cb) {

		maker.findsAll('.spec-automatiq-select-action-open').get(4).click();
		maker.findsAll('.spec-automatiq-sort-option ul div li').get(0).click();
		maker.findsAll('.spec-automatiq-sort-by .spec-automatiq-select-action-open').click().then(function() {
			var el = maker.findsAll('.spec-automatiq-sort-by ul li');

			if (condition == 'asc') el.get(0).click();
			else el.get(1).click();
		}).then(cb);
	});

	When(/^the user fills a new action inside "([^"]*)"$/, function(action, cb) {
		maker.findsAll('.spec-automatiq-block-action-view-open').get(1).click().then(function () {
			//webpage.waitsFor('.spec-automatiq-select-action-open');
			var el = maker.findsAll('.spec-automatiq-select-action-open');

			if (action == 'examinedata') el.get(5).click();
			else if (action == 'findrecord') el.get(2).click();
			else el.get(1).click();

			maker.findsAll('.spec-automatiq-select-action-send-sms').get(1).click().then(cb);
		});
	});

	When(/^the user fills a new update action inside "([^"]*)" with record found$/, function (action, cb) {
		maker.findsAll('.spec-automatiq-block-action-view-open').get(1).click();
		var el = maker.findsAll('.at-action-dd .spec-automatiq-select-action-open');
		el.get(1).click();
		// brw.explore();
		maker.findsAll('.spec-automatiq-select-action-update-webform').get(1).click().then(cb);
	});

	When(/^the user fills a new sms action inside "([^"]*)" with record not found$/, function (action, cb) {
		//browser.explore();
		scrollToBottom().then(function(){
			element.all(by.css('.spec-automatiq-block-action-view-open')).get(2).click().then(function () {
				element.all(by.css('.at-action-dd .spec-automatiq-select-action-open')).get(2).click().then(function(){
					element.all(by.css('.spec-automatiq-select-action-send-sms')).get(2).click().then(cb);
				});
			});
		});
	});

	When(/^the user add an add contact action inside "([^"]*)"$/, function(action, cb) {
		maker.findsAll('.spec-automatiq-block-action-view-open').get(1).click();
		var el = maker.findsAll('.at-action-dd .spec-automatiq-select-action-open');
		if (action == 'examinedata') el.get(6).click();
		else el.get(1).click();
		maker.findsAll('.spec-automatiq-select-action-add-contact').get(1).click().then(cb);
	});

	When(/^the user add an update contact action inside "([^"]*)"$/, function(action, cb) {
		maker.findsAll('.spec-automatiq-block-action-view-open').get(1).click();
		var el = maker.findsAll('.at-action-dd .spec-automatiq-select-action-open');
		if (action == 'examinedata') el.get(4).click();
		else el.get(1).click();
		maker.findsAll('.spec-automatiq-select-action-update-contact').get(1).click().then(cb);
	});

	When(/^the user add an delete contact action inside "([^"]*)"$/, function(action, cb) {
		maker.findsAll('.spec-automatiq-block-action-view-open').get(1).click();
		var el = maker.findsAll('.at-action-dd .spec-automatiq-select-action-open');
		if (action == 'examinedata') el.get(4).click();
		else el.get(1).click();
		maker.findsAll('.spec-automatiq-select-action-delete-contact').get(1).click().then(cb);
	});

	When(/^the user fills the fields for update contact in pages$/, function(cb) {
		brw.ignoreSynchronization = false;
		element.all(by.css('.spec-form-update-contact input')).get(4).sendKeys('{{matchEmail}}').then(function(){
			element.all(by.css('.spec-form-update-contact input')).get(5).sendKeys('{{name}}').then(function(){
				element.all(by.css('.spec-form-update-contact input')).get(6).sendKeys('{{phone}}').then(function(){
					element.all(by.css('.spec-form-update-contact input')).get(7).sendKeys('{{email}}').then(cb);
				});
			});
		});
	});

	When(/^the user select "([^"]*)" record$/, function(record, cb) {
		var el = maker.finds('.add-action-button');
		brw.executeScript('window.scrollTo(1658, 10);').then(function(){
			webpage.waits(2000);
			if (record == 'not_found')  el.click().then(cb);
		});
	});

	When(/^the user selects the "([^"]*)" type in examinedata of "([^"]*)"$/, function(typeOfQrvey, typeOfRecord, cb) {
		if(typeOfRecord=='pages'){
			maker.findsAll('.spec-examinedata-select-qrvey-type').click();
			maker.finds('.spec-examinedata-qrvey-' + typeOfQrvey).click().then(cb);
		}else{
			maker.findsAll('.spec-automatiq-find-record-app span').click();
			maker.finds('.spec-automatiq-find-' + typeOfQrvey).click().then(cb);
		}
	});

	When(/^the user selects the "([^"]*)" type in find record of "([^"]*)"$/, function(typeOfQrvey, typeOfRecord, cb) {
		if(typeOfRecord == 'pages'){
			maker.findsAll('.spec-automatiq-find-record-app span').click();
			maker.finds('.spec-automatiq-find-' + typeOfQrvey).click().then(cb);
		}else{
			typeOfQrvey = (typeOfQrvey == 'forms')? 'form' : typeOfQrvey;
			maker.findsAll('.spec-automatiq-find-record-app span').click();
			maker.finds('.spec-automatiq-find-' + typeOfQrvey).click().then(cb);
		}
	});

	When(/^the user selects the qrvey in position (\d+) in find record$/, function(position, cb) {
		var el = '.spec-select-qrvey-find-record li';

		maker.findsAll('.spec-automatiq-find-record-select-qrvey').click();
		webpage.waitsFor(el);
		maker.findsAll(el).get(position).click().then(cb);
	});

	When(/^the user selects the qrvey in position (\d+) in examine data$/, function(position, cb) {
		var el = '.spec-select-qrvey-examinedata li';

		maker.findsAll('.spec-select-qrvey-examinedata').click();
		webpage.waitsFor(el);
		maker.findsAll(el).get(position).click().then(cb);
	});

	When(/^the user select the address question to compare$/, function(cb) {
		maker.finds('.spec-automatiq-select-field span').click();
		maker.findsAll('.spec-automatiq-select-field ul div li').get(0).click();
		maker.finds('.spec-automatiq-input-equals').sendKeys(chance.street()).then(cb);
	});

	When(/^the user select the email question to compare$/, function(cb) {
		maker.finds('.spec-automatiq-select-field span').click();
		maker.findsAll('.spec-automatiq-select-field ul div li').get(1).click();

		maker.finds('.spec-automatiq-select-condition span').click();
		maker.findsAll('.spec-automatiq-select-condition ul div li').get(0).click();

		/*maker.finds('.spec-automatiq-filter-text input').sendKeys('carlos.vibanco@qrvey.com').then(cb);*/
		maker.finds('.spec-automatiq-input-equals').sendKeys('carlos.vibanco@qrvey.com').then(cb);
	});

	When(/^the user clicks on add condition$/, function(cb) {
		maker.findsAll('.spec-automatiq-add-condition-examine a').get(1).click().then(cb);
	});

	When(/^the user opens the actions in record$/, function(cb) {
		maker.findsAll('.spec-automatiq-block-action-view-open').get(2).click().then(cb);
	});

	When(/^the user opens the actions in "([^"]*)" record$/, function(record, cb) {
		maker.findsAll('.spec-automatiq-block-action-view-open').get(3).click().then(cb);
	});

	When(/^the user selects the "([^"]*)" action in record$/, function(action, cb) {
		maker.findsAll('.spec-automatiq-select-action-open').get(2).click();
		maker.findsAll('.spec-automatiq-select-action-' + action).get(2).click().then(cb);
	});

	When(/^the user selects the "([^"]*)" action in "([^"]*)" record$/, function(action, record, cb) {
		maker.findsAll('.spec-automatiq-select-action-open').get(3).click();
		maker.findsAll('.spec-automatiq-select-action-' + action).get(3).click().then(cb);
	});

	When(/^the user writes the message in record$/, function(cb) {
		maker.finds('.spec-automatiq-show-message input').sendKeys(rand.getSentence(10)).then(cb);
	});

	When(/^the user selects the "([^"]*)" type in show results$/, function(typeOfQrvey, cb) {
		maker.finds('.spec-automatiq-show-results-select-qrvey span').click();
		maker.finds('.spec-show-results-' + typeOfQrvey).click().then(cb);
	});

	When(/^the user selects the qrvey in position (\d+) in show results$/, function(position, cb) {
		var el = '.spec-show-results-qrvey ul div li';

		maker.findsAll('.spec-show-results-qrvey').click();
		webpage.waitsFor(el);
		maker.findsAll(el).get(position).click().then(cb);
	});

	When(/^the user select "([^"]*)" view in "([^"]*)"$/, function(_view, typeOfQrvey, cb) {
		var view = '';

		maker.finds('.automatiq-select-results-view').click();

		if (_view == 'detailed') view = 0;
		else if (_view == 'summary') view = 1;
		else if (_view == 'tabular') view = 2;

		if(typeOfQrvey == 'survey' && _view == 'tabular') view = 3;

		element.all(by.css('.automatiq-select-results-view ul div li')).get(view).click().then(cb);
	});

	When(/^the user fills the url$/, function(cb) {
		maker.finds('.spec-load-url-form-control').sendKeys('qrvey.com').then(cb);
	});

};
