/**
 * @file add.js
 * @description Test sample file.
 * @author Zero Zhang
 */

var add = require('../../src/add');

describe('Test add', function () {
    it('1 + 2 = 3', function () {
        expect(add(1, 2)).equal(3);
    });
});
