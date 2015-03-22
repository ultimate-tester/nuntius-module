/**
 * Created by Devel on 3/22/2015.
 */

var assert = require('assert');
var module = require('./../index');

describe('Test the Nuntius Module', function () {
    this.timeout(0);

    it('SMTP protocol', function (done) {
        module.startSMTP(25);
    });
});