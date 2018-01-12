const Trie = require("./trie");

let testTrie;

beforeEach(() => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
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

  const newTest = new Trie();
  testData.forEach(x => newTest.add(x.name, x));

  testTrie = newTest;
});

describe("basic tests", () => {
  test("can retrieve water ", () => {
    const getWater = testTrie.getData("water");

    expect(getWater[0].id).toBe(6);
  });

  test("can retrieve book and bookshelf from book ", () => {
    const bookEntries = testTrie.getData("book");

    expect(bookEntries.length).toBe(2);
    expect(bookEntries[0].id).toBe(3);
    expect(bookEntries[1].id).toBe(5);
  });

  test("can retrieve all 'd' prefixes from 'd' ", () => {
    const dEntries = testTrie.getData("d");

    expect(dEntries.length).toBe(4);
    expect(dEntries[0].id).toBe(0);
    expect(dEntries[1].id).toBe(1);
    expect(dEntries[2].id).toBe(2);
    expect(dEntries[3].id).toBe(7);
  });

  test("can retrieve all 'do' data from 'do' node", () => {
    const doNode = testTrie.getNode("do");
    const doEntries = doNode.getData(null);

    expect(doEntries.length).toBe(2);
    expect(doEntries[0].id).toBe(0);
    expect(doEntries[1].id).toBe(1);
  });

  test("can retrieve all 'g' data from 'do' node", () => {
    const doNode = testTrie.getNode("do");
    const dogEntries = doNode.getData("g");

    expect(dogEntries.length).toBe(2);
    expect(dogEntries[0].id).toBe(0);
    expect(dogEntries[1].id).toBe(1);
  });
  
  test("returns null when key does not exist", () => {
    const nonExistingData = testTrie.getData("ukulele");
    expect(nonExistingData).toBeNull();
  })
});
