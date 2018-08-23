var expect = require('chai').expect;
var maker = require('../support/helpers/maker');

describe('The maker should have all function working', function () {
    describe('actionSearch()', function () {
        it('should exists and not throw an error', function () {
            console.log('maker', maker.actionSearch());
            expect(maker.actionSearch()).to.be.a('promise');
            expect(maker.actionSearch()).to.not.throw();
        });

        // xit('should return a promise', function () {
        //     assert.equal([1, 2, 3].indexOf(4), -1);
        // });
    });
});