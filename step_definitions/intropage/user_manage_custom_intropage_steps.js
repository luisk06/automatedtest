'use strict';

module.exports = function () {

    Given = this.Given;
    When = this.When;
    Then = this.Then;

    Given(/^the user just added "([^"]*)" question$/, function (type, cb) {
        user.buildQuestion(type).then(function () {
            cb();
        });
    });

    When(/^the user add a custom intro page$/, function (cb) {
        scrollToTop();

        user.addIntroPage().then(function () {
            expect(
                user.findsValue('#form_intro_title')
            ).to.eventually.have.lengthOf(300);

            expect(
                user.findsValue('#form_intro_content')
            ).to.eventually.have.lengthOf(1000);

            expect(
                user.findsValue('#form_intro_button')
            ).to.eventually.have.lengthOf(20).and.notify(cb);
        });
    });

    Then(/^the user publish the webform$/, function (cb) {
        user.publishWebform().then(function () {
            //     return webpage.getsTextExists('nps');
            // }).then(function (isNps) {
            //     console.log('isNps', isNps);
            expect(user.finds('.spec-webform-incomplete-alert').isPresent()).to.eventually.be.false.and.notify(cb);
            // if(!isNps) expect(user.finds('.spec-confirm-end-qrvey').isDisplayed()).to.eventually.be.true.and.notify(cb);
            // else cb();
        });
    });

    When(/^the user add description into the question$/, function (cb) {
        scrollToTop();

        var el = user.finds('.textDesc textarea');

        user.finds('.descText').click();
        el.sendKeys(
            rand.getParagraph(30)
        );

        el.getAttribute('value').then(function(_val){
            expect(_val.length).to.be.equal(2000);
        }).then(cb);
    });

    When(/^the user clicks on remove description into the question$/, function (cb) {
        scrollToTop();
        user.finds('.descText').click().then(cb);
    });

    Then(/^the description field should be hidden$/, function (cb) {
        scrollToTop();

        expect(
            user.isPresent('.descText')
        ).to.eventually.be.true.and.notify(cb);
    });
};