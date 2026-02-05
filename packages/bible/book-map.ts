export type Book = {
  id: string;
  name: string;
  aliases: string[];
};

const baseBooks: Book[] = [
  { id: "genesis", name: "Genesis", aliases: ["gen"] },
  { id: "exodus", name: "Exodus", aliases: ["ex"] },
  { id: "leviticus", name: "Leviticus", aliases: ["lev"] },
  { id: "numbers", name: "Numbers", aliases: ["num"] },
  { id: "deuteronomy", name: "Deuteronomy", aliases: ["deut", "deu"] },
  { id: "joshua", name: "Joshua", aliases: ["josh"] },
  { id: "judges", name: "Judges", aliases: ["judg", "jdg"] },
  { id: "ruth", name: "Ruth", aliases: [] },
  { id: "1_samuel", name: "1 Samuel", aliases: ["1 sam", "1sam", "i samuel", "i sam"] },
  { id: "2_samuel", name: "2 Samuel", aliases: ["2 sam", "2sam", "ii samuel", "ii sam"] },
  { id: "1_kings", name: "1 Kings", aliases: ["1 kgs", "1kgs", "i kings", "i kgs"] },
  { id: "2_kings", name: "2 Kings", aliases: ["2 kgs", "2kgs", "ii kings", "ii kgs"] },
  { id: "1_chronicles", name: "1 Chronicles", aliases: ["1 chron", "1chron", "i chronicles", "i chron"] },
  { id: "2_chronicles", name: "2 Chronicles", aliases: ["2 chron", "2chron", "ii chronicles", "ii chron"] },
  { id: "ezra", name: "Ezra", aliases: [] },
  { id: "nehemiah", name: "Nehemiah", aliases: ["neh"] },
  { id: "esther", name: "Esther", aliases: ["esth", "est"] },
  { id: "job", name: "Job", aliases: [] },
  { id: "psalms", name: "Psalms", aliases: ["ps", "psa", "psalm"] },
  { id: "proverbs", name: "Proverbs", aliases: ["prov", "prv"] },
  { id: "ecclesiastes", name: "Ecclesiastes", aliases: ["eccl", "ecc"] },
  { id: "song_of_songs", name: "Song of Songs", aliases: ["song of solomon", "song", "sos"] },
  { id: "isaiah", name: "Isaiah", aliases: ["isa"] },
  { id: "jeremiah", name: "Jeremiah", aliases: ["jer"] },
  { id: "lamentations", name: "Lamentations", aliases: ["lam"] },
  { id: "ezekiel", name: "Ezekiel", aliases: ["ezek", "eze"] },
  { id: "daniel", name: "Daniel", aliases: ["dan"] },
  { id: "hosea", name: "Hosea", aliases: ["hos"] },
  { id: "joel", name: "Joel", aliases: [] },
  { id: "amos", name: "Amos", aliases: [] },
  { id: "obadiah", name: "Obadiah", aliases: ["obad"] },
  { id: "jonah", name: "Jonah", aliases: [] },
  { id: "micah", name: "Micah", aliases: ["mic"] },
  { id: "nahum", name: "Nahum", aliases: ["nah"] },
  { id: "habakkuk", name: "Habakkuk", aliases: ["hab"] },
  { id: "zephaniah", name: "Zephaniah", aliases: ["zeph", "zep"] },
  { id: "haggai", name: "Haggai", aliases: ["hag"] },
  { id: "zechariah", name: "Zechariah", aliases: ["zech", "zec"] },
  { id: "malachi", name: "Malachi", aliases: ["mal"] },
  { id: "matthew", name: "Matthew", aliases: ["matt", "mt", "mat"] },
  { id: "mark", name: "Mark", aliases: ["mk", "mrk"] },
  { id: "luke", name: "Luke", aliases: ["lk"] },
  { id: "john", name: "John", aliases: ["jn", "jhn"] },
  { id: "acts", name: "Acts", aliases: [] },
  { id: "romans", name: "Romans", aliases: ["rom"] },
  { id: "1_corinthians", name: "1 Corinthians", aliases: ["1 cor", "1cor", "i cor", "i corinthians"] },
  { id: "2_corinthians", name: "2 Corinthians", aliases: ["2 cor", "2cor", "ii cor", "ii corinthians"] },
  { id: "galatians", name: "Galatians", aliases: ["gal"] },
  { id: "ephesians", name: "Ephesians", aliases: ["eph"] },
  { id: "philippians", name: "Philippians", aliases: ["phil"] },
  { id: "colossians", name: "Colossians", aliases: ["col"] },
  { id: "1_thessalonians", name: "1 Thessalonians", aliases: ["1 thess", "1thess", "i thessalonians", "i thess"] },
  { id: "2_thessalonians", name: "2 Thessalonians", aliases: ["2 thess", "2thess", "ii thessalonians", "ii thess"] },
  { id: "1_timothy", name: "1 Timothy", aliases: ["1 tim", "1tim", "i timothy", "i tim"] },
  { id: "2_timothy", name: "2 Timothy", aliases: ["2 tim", "2tim", "ii timothy", "ii tim"] },
  { id: "titus", name: "Titus", aliases: [] },
  { id: "philemon", name: "Philemon", aliases: ["phlm", "phm"] },
  { id: "hebrews", name: "Hebrews", aliases: ["heb"] },
  { id: "james", name: "James", aliases: ["jas"] },
  { id: "1_peter", name: "1 Peter", aliases: ["1 pet", "1pet", "i peter", "i pet"] },
  { id: "2_peter", name: "2 Peter", aliases: ["2 pet", "2pet", "ii peter", "ii pet"] },
  { id: "1_john", name: "1 John", aliases: ["1 john", "1john", "i john"] },
  { id: "2_john", name: "2 John", aliases: ["2 john", "2john", "ii john"] },
  { id: "3_john", name: "3 John", aliases: ["3 john", "3john", "iii john"] },
  { id: "jude", name: "Jude", aliases: [] },
  { id: "revelation", name: "Revelation", aliases: ["rev", "revelations"] }
];

export const books = baseBooks;

const aliasMap = new Map<string, string>();

function normalizeAlias(value: string) {
  return value
    .toLowerCase()
    .replace(/[.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function addAlias(alias: string, bookId: string) {
  const normalized = normalizeAlias(alias);
  aliasMap.set(normalized, bookId);
  aliasMap.set(normalized.replace(/\s+/g, ""), bookId);
}

for (const book of books) {
  addAlias(book.name, book.id);
  addAlias(book.id.replace(/_/g, " "), book.id);
  for (const alias of book.aliases) {
    addAlias(alias, book.id);
  }
}

export function normalizeBook(input: string) {
  const normalized = normalizeAlias(input);
  if (aliasMap.has(normalized)) {
    return aliasMap.get(normalized) ?? null;
  }

  const compact = normalized.replace(/\s+/g, "");
  return aliasMap.get(compact) ?? null;
}

export function canonicalizeBookName(bookId: string) {
  const found = books.find((book) => book.id === bookId);
  return found?.name ?? bookId;
}
