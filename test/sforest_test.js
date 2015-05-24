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

  describe('has a tail just like a list', function() {
    it('[] has a tail of []', function() {
      expect(new SForest().head()).to.be.null;
    });

    it('[1] has a tail of []', function() {
      expect(new SForest([1]).tail().toString()).to.equal('[]');
    });

    it('[1, 2] has a tail of [2]', function() {
      expect(new SForest([1, 2]).tail().toString()).to.equal('[2]');
    });

    it('[1, 2, 3] has a tail of [2, 3]', function() {
      expect(new SForest([1, 2, 3]).tail().toString()).to.equal('[2, 3]');
    });

    it('["X", "Y", "Z"] has a tail of [Y, Z]', function() {
      expect(new SForest(['X', 'Y', 'Z']).tail().toString()).to.equal('[Y, Z]');
    });
  });

  describe('can be indexed just like a list', function() {
    it('[][-1] is null', function() {
      expect(new SForest().index(-1)).to.be.null;
    });

    it('[]["cat"] is null', function() {
      expect(new SForest().index('cat')).to.be.null;
    });

    it('[][0] is null', function() {
      expect(new SForest().index(0)).to.be.null;
    });

    it('[1][0] is 1', function() {
      expect(new SForest([1]).index(0)).to.equal(1);
    });

    it('[1, 2, 3][2] is 3', function() {
      expect(new SForest([1, 2, 3]).index(2)).to.equal(3);
    });

    it('[1, 2, 3, 4, 5, 6, 7, 8][0..7] are 1..8', function() {
      var oneThroughEight = new SForest([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(oneThroughEight.index(0)).to.equal(1);
      expect(oneThroughEight.index(1)).to.equal(2);
      expect(oneThroughEight.index(2)).to.equal(3);
      expect(oneThroughEight.index(3)).to.equal(4);
      expect(oneThroughEight.index(4)).to.equal(5);
      expect(oneThroughEight.index(5)).to.equal(6);
      expect(oneThroughEight.index(6)).to.equal(7);
      expect(oneThroughEight.index(7)).to.equal(8);
    });
  });

  describe('can be updated just like a list', function() {
    it('([][-1] <- 7) makes []', function() {
      expect(new SForest().update(-1, 7).isEmpty()).to.be.true;
    });

    it('([]["cat"] <- 7) makes []', function() {
      expect(new SForest().update('cat', 7).isEmpty()).to.be.true;
    });

    it('([][0] <- 7) makes []', function() {
      expect(new SForest().update(0, 7).isEmpty()).to.be.true;
    });

    it('([1][0] <- 7)[0] is 7', function() {
      expect(new SForest([1]).update(0, 7).index(0)).to.equal(7);
    });

    it('([1, 2, 3][2] <- 7)[2] is 7', function() {
      expect(new SForest([1, 2, 3]).update(2, 7).index(2)).to.equal(7);
    });

    it('([1..8][0..7] <- 101..108)[0..7] is [101..108]', function() {
      var oneThroughEight = new SForest([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(oneThroughEight.update(0, 101).index(0)).to.equal(101);
      expect(oneThroughEight.update(1, 102).index(1)).to.equal(102);
      expect(oneThroughEight.update(2, 103).index(2)).to.equal(103);
      expect(oneThroughEight.update(3, 104).index(3)).to.equal(104);
      expect(oneThroughEight.update(4, 105).index(4)).to.equal(105);
      expect(oneThroughEight.update(5, 106).index(5)).to.equal(106);
      expect(oneThroughEight.update(6, 107).index(6)).to.equal(107);
      expect(oneThroughEight.update(7, 108).index(7)).to.equal(108);
    });

    it('updating an index does not change the original list', function() {
      var oneThroughEight = new SForest([1, 2, 3, 4, 5, 6, 7, 8]);
      expect(oneThroughEight.update(0, 101).index(0)).to.equal(101);
      expect(oneThroughEight.update(1, 102).index(1)).to.equal(102);
      expect(oneThroughEight.update(2, 103).index(2)).to.equal(103);
      expect(oneThroughEight.update(3, 104).index(3)).to.equal(104);
      expect(oneThroughEight.update(4, 105).index(4)).to.equal(105);
      expect(oneThroughEight.update(5, 106).index(5)).to.equal(106);
      expect(oneThroughEight.update(6, 107).index(6)).to.equal(107);
      expect(oneThroughEight.update(7, 108).index(7)).to.equal(108);
      expect(oneThroughEight).to.eql(new SForest([1, 2, 3, 4, 5, 6, 7, 8]));
    });
  });
});
