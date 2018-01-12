/**
 * A node in a Trie that allows for prefix based searching
 * @class
 */
class TrieNode {
  constructor(parent) {
    this._childPaths = {};
    this._data = [];
    this._parent = parent || null;

    return this;
  }

  add(key, entry) {
    const splitKey = (key || "").split("");
    let node = this;

    for (let i = 0; i < splitKey.length; i++) {
      const currentKey = splitKey[i];

      if (!node._childPaths[currentKey])
        node._childPaths[currentKey] = new TrieNode(this);

      node = node._childPaths[currentKey];
    }

    node._data.push(entry);

    return node;
  }

  getNode(key) {
    const splitKey = (key || "").split("");
    let node = this;

    for (let i = 0; i < splitKey.length; i++) {
      const currentKey = splitKey[i];
      node = node._childPaths[currentKey] || null;
      if (node === null) return null;
    }

    return node;
  }

  getData(key) {
    // If no key left, get all data from all children
    // I.e., D should get Dog, Doge, Duck
    if (!key) {
      return Object.keys(this._childPaths).reduce(
        (entries, currentChildKey) => {
          return entries.concat(this._childPaths[currentChildKey].getData(key));
        },
        this._data
      );
    }

    // If there is a key, keep searching until we find it.
    const node = this.getNode(key);
    if (!node) return null;

    return node.getData(null);
  }
}

module.exports = TrieNode;
