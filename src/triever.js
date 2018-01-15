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
    let children = [rootNode];
    const results = [];

    while (children.length > 0) {
      const currentRoundChildren = [];

      children.forEach(currentChild => {
        if (currentChild._data.length) {
          results.push.apply(results, currentChild._data);
        }

        const grandchildNodes = Object.values(currentChild._childPaths);
        if (grandchildNodes.length) {
          currentRoundChildren.push.apply(
            currentRoundChildren,
            grandchildNodes
          );
        }
      });

      children = currentRoundChildren;
    }

    return results;
  }
}

module.exports = TrieNode;
