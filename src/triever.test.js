const Trie = require("./triever");

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
    const waterData = testTrie.getData("water");
    const ids = waterData.map(x => x.id);

    expect(ids).toHaveLength(1);
    expect(ids).toContain(6);
  });

  test("can retrieve book and bookshelf from book ", () => {
    const bookEntries = testTrie.getData("book");
    const ids = bookEntries.map(x => x.id);

    expect(ids).toHaveLength(2);
    expect(ids).toContain(3);
    expect(ids).toContain(5);
  });

  test("can retrieve all 'd' prefixes from 'd' ", () => {
    const dEntries = testTrie.getData("d");
    const ids = dEntries.map(x => x.id);

    expect(ids).toHaveLength(4);
    expect(ids).toContain(0);
    expect(ids).toContain(1);
    expect(ids).toContain(2);
    expect(ids).toContain(7);
  });

  test("can retrieve all 'do' data from 'do' node", () => {
    const doNode = testTrie.getNode("do");
    const doEntries = doNode.getData(null);
    const ids = doEntries.map(x => x.id);

    expect(ids).toHaveLength(2);
    expect(doEntries.length).toBe(2);
    expect(ids).toContain(0);
    expect(ids).toContain(1);
  });

  test("can retrieve all 'g' data from 'do' node", () => {
    const doNode = testTrie.getNode("do");
    const dogEntries = doNode.getData("g");
    const ids = dogEntries.map(x => x.id);

    expect(ids).toHaveLength(2);
    expect(ids).toContain(0);
    expect(ids).toContain(1);
  });

  test("returns null when key does not exist", () => {
    const nonExistingData = testTrie.getData("ukulele");
    expect(nonExistingData).toBeNull();
  });
});
