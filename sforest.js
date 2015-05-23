'use strict';

function SForest(array) {
  this.trees = [];

  if (array !== undefined) {
    this.trees = this.prepend(array).trees;
  }
}

SForest.prototype.isEmpty = function() {
  return (this.trees.length === 0);
};

SForest.prototype.cons = function(element) {
  var sf = new SForest();
  var tree;

  if (this.trees.length < 2 || // Don't even have two trees, add a 1
    this.trees[0].size < this.trees[1].size) { // Two trees, different sizes
    tree = { size: 1, value: element, left: null, right: null };
    sf.trees = [tree].concat(this.trees);
  } else { // A leading 2, a pair of trees of the same size
    tree = {
      size: this.trees[0].size * 2 + 1,
      value: element,
      left: this.trees[0],
      right: this.trees[1],
    };
    sf.trees = [tree].concat(this.trees.slice(2));
  }

  return sf;
};

SForest.prototype.prepend = function(array) {
  if (array === undefined) {
    return this;
  }

  var sf = this;
  for (var i = array.length - 1; i >= 0; i--) {
    sf = sf.cons(array[i]);
  }
  return sf;
};

SForest.prototype.head = function() {
  if (this.isEmpty()) {
    return null;
  }

  return this.trees[0].value;
};

SForest.prototype.iter = function(fn) {
  for (var i = 0; i < this.trees.length; i++) {
    iterTree(fn, this.trees[i]);
  }
};

function iterTree(fn, tree) {
  fn(tree.value); // Trees always have values
  if (tree.left !== null) {
    iterTree(fn, tree.left); // Left, then right
    iterTree(fn, tree.right);
  }
}

SForest.prototype.toString = function() {
  var strings = [];
  this.iter(function(elt) { strings.push(elt.toString()); });
  return '[' + strings.join(', ') + ']';
};

module.exports = SForest;
