# SForest

A skew-binary random access list based on C. Okasaki's book, *Purely Functional Data Structures*.

For a primer on this data structure, see [my blog post][sf-post].  It uses a linked list of logarithmic length to store complete binary trees of logarithmic depth.  The sizes of the trees correspond exactly to the place values of the digits in the [skew-binary numerical representation][wiki-sb] of the number of elements in the SForest (N).  This allows O(1) `head`, `tail`, and `cons` operations while maintaining O(log N) `index` and `update` operations.  The `map` and `iter` operations work in O(N) time.

Once created, SForests are never modified; they are intended to be used as purely functional data structures.  Passing destructive functions to `map` or `iter` are the exceptions to this rule (see the tests for more information).

## Install

~~~bash
git clone https://github.com/alecroy/sforest
cd sforest
npm install
~~~

## Behavior / Tests

~~~bash
$ grunt
Running "jshint:all" (jshint) task
>> 3 files lint free.

Running "jscs:all" (jscs) task
>> 3 files without code style errors.

Running "simplemocha:all" (simplemocha) task


  the SForest data structure
    has a constructor
      ✓ that makes empty SForests
      ✓ that takes empty arrays and makes empty SForests
      ✓ that takes non-empty arrays and makes non-empty SForests
      ✓ that turns [1, 2, .. 8] into an SForest "[1, 2, .. 8]"
    conses and prints just like a list
      ✓ 1 cons [] is not empty
      ✓ [] prints as "[]"
      ✓ 1 cons [] prints as "[1]"
      ✓ 1 cons 2 cons [] prints as "[1, 2]"
    can be prepended to just like a list
      ✓ [].prepend() is empty
      ✓ [].prepend([]) is empty
      ✓ [].prepend([1, 2, 3]) is not empty
      ✓ [].prepend([1, 2, 3]) prints as "[1, 2, 3]"
      ✓ [].prepend([1, 2, .. 8]) prints as "[1, 2, .. 8]"
    has a head just like a list
      ✓ [] has a head of null
      ✓ [1, 2, 3] has a head of 1
      ✓ ["X", "Y", "Z"] has a head of "X"
    has a tail just like a list
      ✓ [] has a tail of []
      ✓ [1] has a tail of []
      ✓ [1, 2] has a tail of [2]
      ✓ [1, 2, 3] has a tail of [2, 3]
      ✓ ["X", "Y", "Z"] has a tail of [Y, Z]
    can be indexed just like a list
      ✓ [][-1] is null
      ✓ []["cat"] is null
      ✓ [][0] is null
      ✓ [1][0] is 1
      ✓ [1, 2, 3][2] is 3
      ✓ [1, 2, 3, 4, 5, 6, 7, 8][0..7] are 1..8
    can be updated just like a list
      ✓ ([][-1] <- 7) makes []
      ✓ ([]["cat"] <- 7) makes []
      ✓ ([][0] <- 7) makes []
      ✓ ([1][0] <- 7)[0] is 7
      ✓ ([1, 2, 3][2] <- 7)[2] is 7
      ✓ ([1..8][0..7] <- 101..108)[0..7] is [101..108]
      ✓ updating an index does not change the original list
    can be mapped over just like a list
      ✓ mapping x -> x*x over [] makes []
      ✓ mapping x -> x*x over [2] makes [4]
      ✓ mapping x -> x*x over [1, 2, 3, 4] makes [1, 4, 9, 16]
      ✓ mapping a pure function over a list does not change it
      ✓ mapping a destructive function over a list changes it
    can be iterated over just like a list
      ✓ iterating over a list returns undefined
      ✓ iterating a pure function over a list does not change it
      ✓ iterating a destructive function over a list changes it


  42 passing (34ms)


Done, without errors.
~~~

## Usage

~~~javascript
var SForest = require('./sforest');

var sf = new SForest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log(sf.toString()); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
sf.iter(console.log);
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
~~~

[sf-post]: http://alecroy.me/2015/05/19/skew-binary-random-access-lists
[wiki-sb]: https://en.wikipedia.org/wiki/Skew_binary_number_system
