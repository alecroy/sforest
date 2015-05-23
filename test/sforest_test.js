'use strict';

var SForest = require('../sforest');
var expect = require('chai').expect;

expect(SForest).to.not.equal(null);

describe('the SForest data structure', function() {
  describe('has a constructor', function() {
    it('that constructs an empty SForest, []', function() {
      expect(new SForest().isEmpty()).to.be.true;
    });
  });

  describe('conses just like a list', function() {
    it('1 cons [] is not empty', function() {
      var one = new SForest().cons(1);
      expect(one).to.not.be.null;
      expect(one.isEmpty()).to.be.false;
    });

    it('[] prints as "[]"', function() {
      expect(new SForest().toString()).to.equal('[]');
    });

    it('1 cons [] prints as "[1]"', function() {
      var one = new SForest().cons(1);
      expect(one.toString()).to.equal('[1]');
    });

    it('1 cons 2 cons [] prints as "[1, 2]"', function() {
      var oneTwo = new SForest().cons(2).cons(1);
      expect(oneTwo.toString()).to.equal('[1, 2]');
    });
  });
});
