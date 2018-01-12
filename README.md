# triever

## A library for quick insert and retrieval

`triever` is a compact, dependency-free library that allows for quick insertion and retrieval of values, keyed by prefix strings.

## Examples

```
const Trie = require("triever");

const testData = [
    {
      id: 0,
      name: "dog"
    },
    {
      id: 1,
      name: "doge"
    },
    {
      id: 2,
      name: "duck"
    },
    {
      id: 3,
      name: "book"
    },
    {
      id: 4,
      name: "shelf"
    },
    {
      id: 5,
      name: "bookshelf"
    },
    {
      id: 6,
      name: "water"
    },
    {
      id: 7,
      name: "delightful"
    }
  ];

const testTrie = new Trie();
testData.forEach(x => testTrie.add(x.name, x));

const bookEntries = testTrie.getData("book");
console.log(bookEntries); // prints #3, #5
```

## API

### `const trie = new Trie()`

Creates a new Trie with no data.

### `trie.add(key, value)`

Adds the `value` to the listing stored at location `key`. `key` must be a string.

### `trie.getNode(key)`

Gets the node at location `key` in the tree. `key` must be a string. Returns `null` if no nodes exist at that location. Useful for storing / caching partial parts of the tree in your application (ie, for livesearching).

### `trie.getData(key)`

Gets an array of entries that have keys starting with the `key` prefix. Returns `null` if the key does not exist.

## Installation

### From NPM

```
npm install triever
```

And in your file:

```
const Trie = require("triever");

const trie = new Trie();
trie.add("key", { value: 1 });
```

### In your browser

Adding a script reference to the file `/dist/triever.min.js` to your page will expose a global variable of `Trie`:

```
const trie = new Trie();
trie.add("key", { value: 1 });
```

## What's the name?

Naturally, triever is named after the `trie` data structure (also known as a radix tree, prefix tree, digital tree); however, equally important, it is named in honor of one of the best dog breeds in the world: the [Labrador Retriever](assets/good-doggo.jpg).
