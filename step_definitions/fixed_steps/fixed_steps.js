'use strict';

module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;
	var locatorAnalyzeViewSelector = '.selected.spec-filter-analyze';

	Given(/^the user has an app$/, function(cb) {
		us.isLogged().then(function() {
			//user.waits(5000);
			apps.createNewApp().then(function(appData){
				logger.log('appData', appData);
				appID = appData.appid;
				appNAME = appData.name;
				appDESCRIPTION = appData.description;
			}).then(cb).catch(function(err){
				console.log('err', err);
			});
		});
	});

	Given(/^the user was subscribed$/, function(cb) {
		if (global.stripeStatus) {
			us.isLogged().then(function() {
				stripe.subscribe().then(function(){
					cb();
				});
			});
		} else cb();
	});

	Given(/^the user has an app called "([^"]*)"$/, function(name, cb) {
		us.isLogged().then(function() {
			apps.createNewApp(name).then(function(appData){
				// console.log('appData', appData.appid);
				appID = appData.appid;
			}).then(cb);
		});
	});

	Given(/^the user opened his app on "([^"]*)"$/, function(site, cb) {
		if(site == 'page-flows'){
			user.waits(1000);
			user.navTo('/application/' + appID + '/pages').then(cb);
		}else if(site == 'config'){
			user.navTo('/application/' + appID).then(cb);
		}else{
			user.navTo('/application/' + appID + '/' + site).then(cb);
		}
	});

	When(/^the clicks on settings tab$/, function(cb) {
		user.findsXpath("//div[contains(@class, 'tab') and contains(text(),'Settings')]").click().then(cb); // eslint-disable-line
	});

	Given(/^the user has "([^"]*)" plan$/, function(textPlan, cb) {
		if (global.stripeStatus) {
			stripe.setPlan(textPlan).then(cb);
		} else cb();
	});

	Given(/^the user has not apps$/, function(cb) {
		us.isLogged().then(function() {
			apps.deleteAll().then(function(){
				// console.log('All apps were deleted');
			}).then(cb);
		});
	});

	Given(/^the user clicks on the settings tab$/, function(cb) {
		user.findsAll('.tab').get(1).click().then(cb);
	});

	Given(/^the user has not qrveys$/, function(cb) {
		cb();

		/*
			qs.cleanAll();
		*/
	});

	When(/^the user clicks on the publish tab$/, function(cb) {
		user.finds('.spec-tab-to-share').click();
		expect(navigate.getCurrentUrl()).to.eventually.contain('share').and.notify(cb);
	});

	When(/^the user clicks on the active button$/, function(cb) {
		user.finds('.spec-qrvey-btn-active').click();
		webpage.waitsFor('.modal-box.new-nps-modal.spec-confirm-end-qrvey');
		user.finds('.modal-box.new-nps-modal.spec-confirm-end-qrvey .button').click().then(cb);
	});

	Then(/^the end button should be displayed$/, function(cb) {
		expect(user.finds('.spec-end-never-expire').isDisplayed()).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the webform is activated$/, function(cb) {
		cb();
	});

	Then(/^the publish page is show correctly$/, function(cb) {
		user.finds('.spec-tab-to-share').click();
		expect(navigate.getCurrentUrl()).to.eventually.contain('share').and.notify(cb);
	});

	Then(/^the webform should be activated correctly$/, function(cb) {
		user.finds('.spec-qrvey-btn-active').click();
		user.waits(500);
		element(by.css('.button.yellow.pause')).isDisplayed().then(function (_isDisplays) {
			expect(_isDisplays).to.be.true;
		}).then(cb);
	});

	Then(/^the webform should be reactivated correctly$/, function(cb) {
		user.finds('.button.yellow.reactivate.activate-qrvey-btn').click();
		user.waits(500);
		element(by.css('.button.yellow.pause')).isDisplayed().then(function (_isDisplays) {
			expect(_isDisplays).to.be.true;
		}).then(cb);
	});

	Given(/^that there is a ES connection$/, function(cb) {
		us.isLogged().then(function (_userId) {
			console.log('appID', appID);
			dts.createDataset(appID, _userId, 'elasticsearch').then(function(data){
				console.log('elasticsearch', data);
				cb();
			});
		});
	});

	Given(/^that there is a ES connection as draft$/, function(cb) {
		us.isLogged().then(function (_userId) {
			dts.createDataset(appID, _userId, 'elasticsearch', 'draft').then(function(data){
				// console.log('data', data);
				cb();
			});
		});
	});

	When(/^the user open the dataset as draft$/, function(cb) {
		user.finds('.spec-qrvey-title-link').click().then(cb);
	});

	When(/^the user go to the Summary View$/, function(cb) {
		user.finds(locatorAnalyzeViewSelector).getText().then(function(view){
			// console.log('view', view);

			if (view !== 'Summary'){
				user.finds('.spec-filter-analyze').click();
				user.finds('#spec-panelview-multi').click();
			}
		}).then(cb);
	});

	When(/^the user go to the Tabular View$/, function(cb) {
		user.finds(locatorAnalyzeViewSelector).getText().then(function(view){
			// console.log('view', view);

			if (view !== 'Tabular View'){
				user.finds('.spec-filter-analyze').click();
				user.finds('#spec-panelview-tabular').click();
				webpage.waitsFor('.dx-datagrid-headers');
			}
		}).then(cb);
	});

	When(/^the user adds an action as default$/, function(cb) {
		var url = 'https://qdev.qrvey.com/webhooks/automatiq/process/4d2541698f55592c678f80cd07b9855cf7cdf922574e5a1fa52ba5f35e2a224155b4bed88fc2ad90941b';
		user.finds('.spec-automatiq-block-action-view-open').click();
		user.finds('.spec-automatiq-select-action-open').click();
		user.finds('.spec-automatiq-select-action-webhook').click();
		user.finds('.spec_webhook_url_action').sendKeys(url).then(cb);
	});
};