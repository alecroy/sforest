'use strict';

var SForest = require('../sforest');
var expect = require('chai').expect;

expect(SForest).to.not.equal(null);

describe('the SForest data structure', function() {
  describe('has a constructor', function() {
    it('that makes empty SForests', function() {
      expect(new SForest().isEmpty()).to.be.true;
    });

    it('that takes empty arrays and makes empty SForests', function() {
      expect(new SForest([]).isEmpty()).to.be.true;
    });

    it('that takes non-empty arrays and makes non-empty SForests', function() {
      expect(new SForest([1]).isEmpty()).to.be.false;
    });

    it('that turns [1, 2, .. 8] into an SForest "[1, 2, .. 8]"', function() {
      var oneThroughEight = new SForest([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(oneThroughEight.toString()).to.equal('[1, 2, 3, 4, 5, 6, 7, 8]');
    });
  });

  describe('conses and prints just like a list', function() {
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

  describe('can be prepended to just like a list', function() {
    var oneTwoThree = new SForest().prepend([1, 2, 3]);

    it('[].prepend() is empty', function() {
      expect(new SForest().prepend().isEmpty()).to.be.true;
    });

    it('[].prepend([]) is empty', function() {
      expect(new SForest().prepend([]).isEmpty()).to.be.true;
    });

    it('[].prepend([1, 2, 3]) is not empty', function() {
      expect(oneTwoThree).to.not.be.null;
      expect(oneTwoThree.isEmpty()).to.be.false;
    });

    it('[].prepend([1, 2, 3]) prints as "[1, 2, 3]"', function() {
      expect(oneTwoThree.toString()).to.equal('[1, 2, 3]');
    });

    it('[].prepend([1, 2, .. 8]) prints as "[1, 2, .. 8]"', function() {
      var oneThroughEight = new SForest().prepend([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(oneThroughEight.toString()).to.equal('[1, 2, 3, 4, 5, 6, 7, 8]');
    });
  });

  describe('has a head just like a list', function() {
    it('[] has a head of null', function() {
      expect(new SForest().head()).to.be.null;
    });

    it('[1, 2, 3] has a head of 1', function() {
      expect(new SForest([1, 2, 3]).head()).to.equal(1);
    });

    it('["X", "Y", "Z"] has a head of "X"', function() {
      expect(new SForest(['X', 'Y', 'Z']).head()).to.equal('X');
    });
  });
});
