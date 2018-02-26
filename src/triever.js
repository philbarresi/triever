/**
 * A node in a Trie that allows for prefix based searching
 * @class
 */
class TrieNode {
  constructor() {
    this._childPaths = {};
    this._data = [];

    return this;
  }

  add(key, entry) {
    const splitKey = (key || "").split("");
    const keyLength = splitKey.length - 1;
    let node = this;

    for (let i = keyLength; i >= 0; i--) {
      const currentKey = splitKey[keyLength - i];

      if (!node._childPaths[currentKey]) {
        node = node._childPaths[currentKey] = new TrieNode();
      } else {
        node = node._childPaths[currentKey];
      }
    }

    node._data.push(entry);

    return node;
  }

  getNode(key) {
    const splitKey = (key || "").split("");
    const keyLength = splitKey.length - 1;
    let node = this;

    for (let i = keyLength; i >= 0; i--) {
      node = node._childPaths[splitKey[keyLength - i]] || null;
      if (node === null) return null;
    }

    return node;
  }

  getData(key) {
    const rootNode = this.getNode(key);
    if (!rootNode) return null;

    // search from rootNode down
    const children = [rootNode];
    const results = [];

    // Under normal circumstances, mutating an array you're traversing 
    // is bad and this is less readable, but this has outperformed everything else
    for (let i = 0; i < children.length; i++) {
      const currentChild = children[i];

      if (currentChild._data.length) {
        results.push.apply(results, currentChild._data);
      }

      const grandchildNodes = Object.values(currentChild._childPaths);
      if (grandchildNodes.length) {
        children.push.apply(children, grandchildNodes);
      }
    }

    return results;
  }
}

module.exports = TrieNode;
