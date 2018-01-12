function getNextPath(key) {
  return key.substring(1, key.length);
}

function getCurrentPath(key) {
  return key.substring(0, 1);
}

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
    if (!key) {
      this._data.push(entry);
    } else {
      const currentStep = getCurrentPath(key);
      const nextPath = getNextPath(key);

      this._childPaths[currentStep] =
        this._childPaths[currentStep] || new TrieNode(this);

      this._childPaths[currentStep].add(nextPath, entry);
    }
  }

  getNode(key) {
    if (!key) return this;

    const currentStep = getCurrentPath(key);
    if (!this._childPaths[currentStep]) return null;

    const nextPath = getNextPath(key);
    const matchingChildNode = this._childPaths[currentStep].getNode(nextPath);

    return matchingChildNode;
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
