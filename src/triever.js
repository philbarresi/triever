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
        node._childPaths[currentKey] = new TrieNode(node);

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
    const rootNode = this.getNode(key);
    if (!rootNode) return null;

    // search from rootNode down
    let children = [rootNode];
    const results = [];

    while (children.length > 0) {
      const currentRoundChildren = [];

      children.forEach(currentChild => {
        if (currentChild._data) {
          results.push.apply(results, currentChild._data);
        }

        const grandchildNodes = Object.values(currentChild._childPaths);
        currentRoundChildren.push.apply(currentRoundChildren, grandchildNodes);
      });

      children = currentRoundChildren;
    }

    return results;
  }
}

module.exports = TrieNode;
