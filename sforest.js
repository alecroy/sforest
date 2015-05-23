'use strict';

function SForest() {
  this.trees = [];
}

SForest.prototype.isEmpty = function() {
  return (this.trees.length === 0);
};

SForest.prototype.cons = function(element) {
  var sf = new SForest();

  if (this.trees.length < 2) { // Room for just 1 more
    var tree = {size: 1, value: element, left: null, right: null};
    sf.trees = [tree].concat(this.trees);
  }

  return sf;
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
