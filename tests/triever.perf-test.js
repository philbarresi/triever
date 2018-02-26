const testData = require("./test-data.json");
const Trie = require("../src/triever.js");
const { users } = testData;
const perfTestTrie = new Trie();

console.log(users.length);

users.forEach(x => perfTestTrie.add(x.username, x));
console.log(perfTestTrie);

console.log("Added that");
