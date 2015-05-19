'use strict';

var SForest = require('../sforest');
var expect = require('chai').expect;

expect(SForest).to.not.equal(null);

describe('the SForest data structure', function() {
  describe('has a constructor', function() {
    it('that constructs empty sforests', function() {
      expect(new SForest().isEmpty()).to.be.true;
    });
  });
});
