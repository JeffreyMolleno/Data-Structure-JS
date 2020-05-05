import { Queue } from "./Queue.js";

export function Tree(data) {
  var node = new Node(data);
  this._root = node;
}

export function Node(data) {
  this.data = data;
  this.parent = null;
  this.children = [];
}

Tree.prototype.traverseDF = function (callback) {
  (function recurse(currentNode) {
    for (let i = 0, length = currentNode.children.length; i < length; i++) {
      recurse(currentNode.children[i]);
    }

    callback(currentNode);
  })(this._root);
};

Tree.prototype.traverseBF = function (callback) {
  var queue = new Queue();

  queue.enqueue(this._root);

  let currentTree = queue.dequeue();

  while (currentTree) {
    for (var i = 0, length = currentTree.children.length; i < length; i++) {
      queue.enqueue(currentTree.children[i]);
    }

    callback(currentTree);
    currentTree = queue.dequeue();
  }
};

Tree.prototype.contains = function (callback, traversal) {
  traversal.call(this, callback);
};

Tree.prototype.add = function (data, toData, traversal) {
  var child = new Node(data);
  parent = null;

  let callback = function (node) {
    if (node.data === toData) {
      parent = node;
    }
  };

  this.contains(callback, traversal);

  if (parent) {
    parent.children.push(child);
    child.parent = parent;
  } else {
    throw new Error("Parent non-existent");
  }
};

Tree.prototype.remove = function (data, fromData, traversal) {
  var tree = this,
    parent = null,
    childToRemove = null,
    index;

  var callback = function (node) {
    if (node.data === fromData) {
      parent = node;
    }
  };

  this.contains(callback, traversal);

  if (parent) {
    index = findIndex(parent.children, data);
    console.log(index);
    if (index === undefined) {
      throw new Error("Node to remove non-existent");
    } else {
      childToRemove = parent.children.splice(index, 1);
    }
  } else {
    throw new Error("Parent does not exist");
  }

  return childToRemove;
};

function findIndex(arr, data) {
  var index;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].data === data) {
      index = i;
    }
  }

  return index;
}
