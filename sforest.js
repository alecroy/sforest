'use strict';

function SForest() {
  this.trees = [];
}

SForest.prototype.isEmpty = function() {
  return (this.trees.length === 0);
};

module.exports = SForest;
