import { describe, expect, it } from "vitest";
import { canonicalizeBookName, formatReference, parseReference } from "../index";

describe("parseReference", () => {
  const cases = [
    { input: "John 3:16", kind: "verse", bookId: "john", startChapter: 3, startVerse: 16 },
    { input: "Romans 8:1-4", kind: "verse-range", bookId: "romans", startChapter: 8, startVerse: 1, endVerse: 4 },
    { input: "Psalm 23", kind: "chapter", bookId: "psalms", startChapter: 23 },
    { input: "Matthew 5-7", kind: "chapter-range", bookId: "matthew", startChapter: 5, endChapter: 7 },
    { input: "1 Thessalonians 5:21", kind: "verse", bookId: "1_thessalonians", startChapter: 5, startVerse: 21 },
    { input: "I Thessalonians 5:21", kind: "verse", bookId: "1_thessalonians", startChapter: 5, startVerse: 21 },
    { input: "1Thessalonians 5:21", kind: "verse", bookId: "1_thessalonians", startChapter: 5, startVerse: 21 },
    { input: "1 Thess. 5:21", kind: "verse", bookId: "1_thessalonians", startChapter: 5, startVerse: 21 },
    { input: "Gen 1:1", kind: "verse", bookId: "genesis", startChapter: 1, startVerse: 1 },
    { input: "Ex 20:1", kind: "verse", bookId: "exodus", startChapter: 20, startVerse: 1 },
    { input: "Lev 19:1", kind: "verse", bookId: "leviticus", startChapter: 19, startVerse: 1 },
    { input: "Num 6:24", kind: "verse", bookId: "numbers", startChapter: 6, startVerse: 24 },
    { input: "Deut 6:4", kind: "verse", bookId: "deuteronomy", startChapter: 6, startVerse: 4 },
    { input: "Josh 1:9", kind: "verse", bookId: "joshua", startChapter: 1, startVerse: 9 },
    { input: "Judg 6:12", kind: "verse", bookId: "judges", startChapter: 6, startVerse: 12 },
    { input: "Ruth 1:16", kind: "verse", bookId: "ruth", startChapter: 1, startVerse: 16 },
    { input: "1 Sam 3:10", kind: "verse", bookId: "1_samuel", startChapter: 3, startVerse: 10 },
    { input: "2 Sam 7:16", kind: "verse", bookId: "2_samuel", startChapter: 7, startVerse: 16 },
    { input: "1 Kings 19:12", kind: "verse", bookId: "1_kings", startChapter: 19, startVerse: 12 },
    { input: "2 Kings 6:17", kind: "verse", bookId: "2_kings", startChapter: 6, startVerse: 17 },
    { input: "1 Chron 4:10", kind: "verse", bookId: "1_chronicles", startChapter: 4, startVerse: 10 },
    { input: "2 Chron 7:14", kind: "verse", bookId: "2_chronicles", startChapter: 7, startVerse: 14 },
    { input: "Ezra 7:10", kind: "verse", bookId: "ezra", startChapter: 7, startVerse: 10 },
    { input: "Neh 8:10", kind: "verse", bookId: "nehemiah", startChapter: 8, startVerse: 10 },
    { input: "Esth 4:14", kind: "verse", bookId: "esther", startChapter: 4, startVerse: 14 },
    { input: "Job 19:25", kind: "verse", bookId: "job", startChapter: 19, startVerse: 25 },
    { input: "Ps 23:1", kind: "verse", bookId: "psalms", startChapter: 23, startVerse: 1 },
    { input: "Prov 3:5-6", kind: "verse-range", bookId: "proverbs", startChapter: 3, startVerse: 5, endVerse: 6 },
    { input: "Eccl 3:1", kind: "verse", bookId: "ecclesiastes", startChapter: 3, startVerse: 1 },
    { input: "Song of Solomon 2:4", kind: "verse", bookId: "song_of_songs", startChapter: 2, startVerse: 4 },
    { input: "Song of Songs 2:4", kind: "verse", bookId: "song_of_songs", startChapter: 2, startVerse: 4 },
    { input: "Isa 6:1", kind: "verse", bookId: "isaiah", startChapter: 6, startVerse: 1 },
    { input: "Jer 29:11", kind: "verse", bookId: "jeremiah", startChapter: 29, startVerse: 11 },
    { input: "Lam 3:22", kind: "verse", bookId: "lamentations", startChapter: 3, startVerse: 22 },
    { input: "Ezek 36:26", kind: "verse", bookId: "ezekiel", startChapter: 36, startVerse: 26 },
    { input: "Dan 6:10", kind: "verse", bookId: "daniel", startChapter: 6, startVerse: 10 },
    { input: "Hos 14:9", kind: "verse", bookId: "hosea", startChapter: 14, startVerse: 9 },
    { input: "Joel 2:28", kind: "verse", bookId: "joel", startChapter: 2, startVerse: 28 },
    { input: "Amos 5:24", kind: "verse", bookId: "amos", startChapter: 5, startVerse: 24 },
    { input: "Obad 1", kind: "chapter", bookId: "obadiah", startChapter: 1 },
    { input: "Jonah 2:1", kind: "verse", bookId: "jonah", startChapter: 2, startVerse: 1 },
    { input: "Mic 6:8", kind: "verse", bookId: "micah", startChapter: 6, startVerse: 8 },
    { input: "Nah 1:7", kind: "verse", bookId: "nahum", startChapter: 1, startVerse: 7 },
    { input: "Hab 2:4", kind: "verse", bookId: "habakkuk", startChapter: 2, startVerse: 4 },
    { input: "Zeph 3:17", kind: "verse", bookId: "zephaniah", startChapter: 3, startVerse: 17 },
    { input: "Hag 2:9", kind: "verse", bookId: "haggai", startChapter: 2, startVerse: 9 },
    { input: "Zech 4:6", kind: "verse", bookId: "zechariah", startChapter: 4, startVerse: 6 },
    { input: "Mal 3:10", kind: "verse", bookId: "malachi", startChapter: 3, startVerse: 10 },
    { input: "Matt 28:19", kind: "verse", bookId: "matthew", startChapter: 28, startVerse: 19 },
    { input: "Mk 1:15", kind: "verse", bookId: "mark", startChapter: 1, startVerse: 15 },
    { input: "Lk 2:11", kind: "verse", bookId: "luke", startChapter: 2, startVerse: 11 },
    { input: "Jn 1:1", kind: "verse", bookId: "john", startChapter: 1, startVerse: 1 },
    { input: "Acts 1:8", kind: "verse", bookId: "acts", startChapter: 1, startVerse: 8 },
    { input: "Rom 12:2", kind: "verse", bookId: "romans", startChapter: 12, startVerse: 2 },
    { input: "1Cor 13:4", kind: "verse", bookId: "1_corinthians", startChapter: 13, startVerse: 4 },
    { input: "2Cor 5:17", kind: "verse", bookId: "2_corinthians", startChapter: 5, startVerse: 17 },
    { input: "Gal 5:22", kind: "verse", bookId: "galatians", startChapter: 5, startVerse: 22 },
    { input: "Eph 2:8", kind: "verse", bookId: "ephesians", startChapter: 2, startVerse: 8 },
    { input: "Phil 4:6", kind: "verse", bookId: "philippians", startChapter: 4, startVerse: 6 },
    { input: "Col 3:12", kind: "verse", bookId: "colossians", startChapter: 3, startVerse: 12 },
    { input: "1Tim 6:12", kind: "verse", bookId: "1_timothy", startChapter: 6, startVerse: 12 },
    { input: "2Tim 1:7", kind: "verse", bookId: "2_timothy", startChapter: 1, startVerse: 7 },
    { input: "Titus 2:11", kind: "verse", bookId: "titus", startChapter: 2, startVerse: 11 },
    { input: "Phlm 1:6", kind: "verse", bookId: "philemon", startChapter: 1, startVerse: 6 },
    { input: "Heb 11:1", kind: "verse", bookId: "hebrews", startChapter: 11, startVerse: 1 },
    { input: "Jas 1:5", kind: "verse", bookId: "james", startChapter: 1, startVerse: 5 },
    { input: "1Pet 5:7", kind: "verse", bookId: "1_peter", startChapter: 5, startVerse: 7 },
    { input: "2Pet 1:3", kind: "verse", bookId: "2_peter", startChapter: 1, startVerse: 3 },
    { input: "1John 4:8", kind: "verse", bookId: "1_john", startChapter: 4, startVerse: 8 },
    { input: "2John 1:6", kind: "verse", bookId: "2_john", startChapter: 1, startVerse: 6 },
    { input: "3John 1:4", kind: "verse", bookId: "3_john", startChapter: 1, startVerse: 4 },
    { input: "Jude 1:24", kind: "verse", bookId: "jude", startChapter: 1, startVerse: 24 },
    { input: "Rev 21:4", kind: "verse", bookId: "revelation", startChapter: 21, startVerse: 4 }
  ];

  it("parses known references", () => {
    for (const testCase of cases) {
      const parsed = parseReference(testCase.input)[0];
      expect(parsed.bookId).toBe(testCase.bookId);
      expect(parsed.kind).toBe(testCase.kind);
      expect(parsed.startChapter).toBe(testCase.startChapter);
      if (testCase.startVerse) {
        expect(parsed.startVerse).toBe(testCase.startVerse);
      }
      if (testCase.endVerse) {
        expect(parsed.endVerse).toBe(testCase.endVerse);
      }
      if (testCase.endChapter) {
        expect(parsed.endChapter).toBe(testCase.endChapter);
      }
    }
  });

  it("parses translation suffixes and prefixes", () => {
    expect(parseReference("John 3:16 WEB")[0].translation).toBe("WEB");
    expect(parseReference("John 3:16 (WEB)")[0].translation).toBe("WEB");
    expect(parseReference("WEB: John 3:16")[0].translation).toBe("WEB");
  });

  it("parses multiple references", () => {
    const refs = parseReference("John 3:16; Romans 8:1-2");
    expect(refs).toHaveLength(2);
    expect(refs[1].bookId).toBe("romans");
  });

  it("formats references", () => {
    const parsed = parseReference("John 3:16-18")[0];
    expect(formatReference(parsed)).toBe("John 3:16–18");
  });

  it("canonicalizes book names", () => {
    expect(canonicalizeBookName("john")).toBe("John");
  });
});
