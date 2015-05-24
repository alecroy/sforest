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

SForest.prototype.tail = function() {
  if (this.isEmpty()) {
    return this;
  }

  var sf = new SForest();
  if (this.trees[0].size === 1) {
    sf.trees = this.trees.slice(1);
  } else {
    var firstTwoTrees = [this.trees[0].left, this.trees[0].right];
    sf.trees = firstTwoTrees.concat(this.trees.slice(1));
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

function mapTree(fn, tree) {
  if (tree.size === 1) {
    return {size: 1, value: fn(tree.value), left: null, right: null};
  }

  var newValue = fn(tree.value);
  var newLeft = mapTree(fn, tree.left);
  var newRight = mapTree(fn, tree.right);
  return {size: tree.size, value: newValue, left: newLeft, right: newRight};
}

SForest.prototype.map = function(fn) {
  var sf = new SForest();
  for (var i = 0; i < this.trees.length; i++) {
    sf.trees.push(mapTree(fn, this.trees[i]));
  }
  return sf;
};

SForest.prototype.index = function(index) {
  if (this.isEmpty() || !Number.isInteger(index) || index < 0) {
    return null;
  }

  for (var i = 0; i < this.trees.length; i++) {
    if (index < this.trees[i].size) { // It's in this tree
      var ptr = this.trees[i];
      while (index > 0) {
        if (index >= (1 + ptr.size) / 2) { // Go right, -2^i
          index -= (1 + ptr.size) / 2;
          ptr = ptr.right;
        } else { // Go left, -1
          index -= 1;
          ptr = ptr.left;
        }
      } // Index is 0, stop searching
      return ptr.value;
    } else {
      index -= this.trees[i].size;
    }
  }

  return null; // Looked at every tree and never found [i]
};

function updateTree(tree, index, element) {
  var newTree = {
    size: tree.size,
    value: tree.value,
    left: tree.left,
    right: tree.right,
  };

  if (index === 0) {
    newTree.value = element;
  } else {
    var leastOnRight = (1 + newTree.size) / 2;
    if (index >= leastOnRight) {
      newTree.right = updateTree(newTree.right, index - leastOnRight, element);
    } else {
      newTree.left = updateTree(newTree.left, index - 1, element);
    }
  }

  return newTree;
}

SForest.prototype.update = function(index, element) {
  if (this.isEmpty() || !Number.isInteger(index) || index < 0) {
    return this;
  }

  for (var i = 0; i < this.trees.length; i++) {
    if (index < this.trees[i].size) { // It's in this tree
      var sf = new SForest();
      sf.trees = this.trees.slice(0, i); // Before
      sf.trees.push(updateTree(this.trees[i], index, element)); // New tree
      sf.trees = sf.trees.concat(this.trees.slice(i + 1)); // After

      return sf;
    } else {
      index -= this.trees[i].size;
    }
  }

  return this; // Looked at every tree and never found/updated [i]
};

module.exports = SForest;
