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
            expect(user.finds('#form_intro_title').getAttribute('value')).to.eventually.have.lengthOf(300);
            expect(user.finds('#form_intro_content').getAttribute('value')).to.eventually.have.lengthOf(1000);
            expect(user.finds('#form_intro_button').getAttribute('value')).to.eventually.have.lengthOf(20).and.notify(cb);
        });
    });

    Then(/^the user publish the webform$/, function (cb) {
        user.publishWebform().then(function () {
            expect(user.finds('.spec-webform-incomplete-alert').isPresent()).to.eventually.be.false;
            expect(user.finds('.spec-confirm-end-qrvey').isDisplayed()).to.eventually.be.true.and.notify(cb);
        });
    });
};