'use strict';

module.exports = function () {

    Given = this.Given;
    When = this.When;
    Then = this.Then;

    Given(/^the user just added "([^"]*)" question$/, function (type, cb) {
        maker.buildQuestion(type).then(function () {
            cb();
        });
    });

    When(/^the user add a custom intro page$/, function (cb) {
        scrollToTop();

        maker.addIntroPage().then(function () {
            expect(
                maker.findsValue('#form_intro_title')
            ).to.eventually.have.lengthOf(300);

            expect(
                maker.findsValue('#form_intro_content')
            ).to.eventually.have.lengthOf(1000);

            expect(
                maker.findsValue('#form_intro_button')
            ).to.eventually.have.lengthOf(20).and.notify(cb);
        });
    });

    Then(/^the user publish the webform$/, function (cb) {
        maker.publishWebform().then(function () {
            //     return webpage.getsTextExists('nps');
            // }).then(function (isNps) {
            //     console.log('isNps', isNps);
            expect(maker.finds('.spec-webform-incomplete-alert').isPresent()).to.eventually.be.false.and.notify(cb);
            // if(!isNps) expect(maker.finds('.spec-confirm-end-qrvey').isDisplayed()).to.eventually.be.true.and.notify(cb);
            // else cb();
        });
    });

    When(/^the user add description into the question$/, function (cb) {
        scrollToTop();

        var el = maker.finds('.textDesc textarea');

        maker.finds('.descText').click();
        el.sendKeys(
            rand.getParagraph(30)
        );

        el.getAttribute('value').then(function(_val){
            expect(_val.length).to.be.equal(2000);
        }).then(cb);
    });

    When(/^the user clicks on remove description into the question$/, function (cb) {
        scrollToTop();
        maker.finds('.descText').click().then(cb);
    });

    Then(/^the description field should be hidden$/, function (cb) {
        scrollToTop();

        expect(
            maker.finds('.descText').isPresent()
        ).to.eventually.be.true.and.notify(cb);
    });
};