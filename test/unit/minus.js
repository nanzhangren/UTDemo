/**
 * @file minus.js
 * @description Test sample file.
 * @author Zero Zhang
 */

var minus = require('../../src/minus');

describe('Test minus', function () {
    it('3 - 2 = 1', function () {
        expect(minus(3, 2)).equal(1);
    });
});
