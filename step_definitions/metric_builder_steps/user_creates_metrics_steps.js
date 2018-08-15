'use strict';

module.exports = function () {

    Given = this.Given;
    When = this.When;
    Then = this.Then;

    When(/^the user clicks on Add Metric button$/, function (cb) {
        user.finds('.button.yellow.addMetric').click().then(cb);
    });

    When(/^the user sets the "([^"]*)" into the metric builder$/, function (type, cb) {
        var val = (type == 'name') ? rand.getWord(20) : rand.getParagraph(5);

        console.log(type, val);

        user.findsModel('mb.metric.' + type).sendKeys(val).then(cb);
    });

    When(/^the user opens the dataset drowdown$/, function (cb) {
        user.finds('#dpdDataset').click().then(cb);
    });

    When(/^the user selects the dataset$/, function (cb) {
        user.findsAll('.options.show span').get(0).click().then(cb);
    });

    When(/^the user opens the value drowdown$/, function (cb) {
        user.finds('#dpdValue').click().then(cb);
    });

    When(/^the user selects the value$/, function (cb) {
        user.findsAll('.options.show span').get(0).click().then(cb);
    });

    When(/^the user opens the aggregate drowdown$/, function (cb) {
        var el = user.finds('#dpdValueAggregate');

        scrollIntoElement(el);
        el.click().then(cb);
    });

    When(/^the user selects the aggregate/, function (cb) {
        user.findsAll('.options.show span').get(2).click().then(cb);
    });

    When(/^the user clicks on the save button into the metric modal$/, function (cb) {
        user.finds('.spec_save_chart_button').click().then(cb);
    });

    Then(/^the metric dashaboard should have at least 1 panel$/, function (cb) {
        user.findsAllRepeater('metric in metrics track by metric.metricid').count().then(function (_count){
            expect(_count).to.be.above(0);
        }).then(cb);
    });

    Then(/^the metric panel saved notify should be displayed$/, function (cb) {
        user.finds('#toast-container div').isDisplayed().then(function (_displayed){
            expect(_displayed).to.be.true;
        }).then(cb);
    });

    Given(/^the user have a metric on the builder$/, function (cb) {
        var metricObj = findModel('metric_builder');

        ms.createMetric(appID, metricObj).then(function(data){
            console.log('data', data);
        }).then(cb);
    });

    When(/^the user clicks on panel menu$/, function (cb) {
        user.finds('.more-drop').click().then(cb);
    });

    When(/^the user clicks on duplicate option$/, function (cb) {
        user.findsAll('.more-drop .options span').get(1).click().then(cb);
    });

    Then(/^the metric dashaboard should have (\d+) panel$/, function (num, cb) {
        webpage.waits(1500);
        user.findsAllRepeater('metric in metrics track by metric.metricid').count().then(function (_count) {
            expect(_count).to.be.equal(+num);
        }).then(cb);
    });

    Then(/^both panels should be equal$/, function (cb) {
        var txt1 = '';

        var el = user.findsAll('header');
        el.get(0).getText().then(function(_text){
            txt1 = _text;
            return el.get(1).getText();
        }).then(function(_text){
            expect(_text).to.be.equal(txt1);
        }).then(function(){
            el = user.findsAll('span.indicator-value');
            return el.get(0).getText()
        }).then(function(_text){
            txt1 = _text;
            return el.get(1).getText();
        }).then(function(_text){
            expect(_text).to.be.equal(txt1);
        }).then(cb);

    });

    When(/^the user clicks on delete option$/, function (cb) {
        user.findsAll('.more-drop .options span').get(2).click().then(cb);
    });

    When(/^the user clicks on Ok button in the modal$/, function (cb) {
        user.finds('.button.yellow.button-delete-theme.spec-confirm-button-analytiq').click().then(cb);
    });
};