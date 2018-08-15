module.exports = function() {

	Given = this.Given;
	When = this.When;
	Then = this.Then;

	When(/^the user clicks on the upload Data button$/, function(cb) {
		element(by.css('.spec_dataloader_upload_data_button')).click().then(cb);
	});

	When(/^the user writes the name of dataloader$/, function(cb) {
		element(by.css('.spec_dataloader_name_modal')).sendKeys(rand.getText(36)).then(cb);
	});

	When(/^the user writes the description of dataloader$/, function(cb) {
		element(by.css('.spec_dataloader_description_modal')).sendKeys(rand.getText(176)).then(cb);
	});

	When(/^the user clicks on Save button in the modal$/, function(cb) {
		element(by.css('.spec_dataloader_save_btn_modal')).click().then(cb);
	});

	When(/^the user clicks on CSV as extention files$/, function(cb) {
		element(by.css('.spec_dataloader_select_csv_datasource_btn')).click().then(cb);
	});

	When(/^the user upload the csv file$/, function(cb) {
		var path = require('path'),
			remote = require('selenium-webdriver/remote'),
			absolutePath = path.resolve(__dirname, '../../../support/dataloader/data.csv'),
			el = element(by.css('.alrt.warn.reviewdatatypes'));

		brw.driver.setFileDetector(new remote.FileDetector());

		dropFile($('.drop-box'), absolutePath); // eslint-disable-line
		brw.wait(EC.presenceOf(el));

		cb();
	});

	When(/^the user convert the just uploaded spreadsheet to form$/, function(cb) {

		element(by.css('.spec-qrvey-item-0 .spec-touch-menu-qrvey')).click().then(function(){
			element.all(by.css('.spec-touch-menu-qrvey-duplicate-option')).get(1).click().then(function(){
				element(by.css('.spec-delete-qrvey-confirm')).click().then(cb);
			});
		});
	});

	When(/^the form with name "([^"]*)" must be added$/, function(name, cb) {
		element(by.xpath('//*[contains(text(),\'Untitled Data Upload\')]')).isDisplayed().then(function(_isDisplayed) {
			expect(_isDisplayed).to.be.true;
		}, function() {
			throw new Error('The form doesnt exist');
		}).then(cb);
	});

	When(/^the converted dataupload is succesfully activated$/, function(cb) {
		element(by.xpath('//*[contains(text(), "Untitled Data Upload")]')).click().then(cb);
	});

	When(/^the user opens the form with name "([^"]*)"$/, function(name, cb) {
		element(by.xpath('//*[contains(text(),"Untitled Data Upload")]')).click().then(cb);
	});

	When(/^the user clicks on the Save button in the Dataloader$/, function(cb) {
		element(by.css('.button.yellow')).click().then(cb);
	});

	When(/^the database should being to upload$/, function(cb) {
		var el = element(by.css('.spec_filters_button'));
		brw.wait(EC.presenceOf(el));
		expect(element(by.css('.spec_add_chart_button')).isDisplayed()).to.eventually.be.true.and.notify(cb);
	});

	Then(/^the csv file should being to upload$/, function(cb) {
		var el = element(by.css('.spec-filter-analyze'));
		brw.wait(EC.presenceOf(el));
		expect(element(by.css('.spec_add_chart_button')).isDisplayed()).to.eventually.be.true.and.notify(cb);
	});
};