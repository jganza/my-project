import type { PrismaClient } from "@prisma/client";
import { formatReference, parseReference } from "@adonai/bible";

export type ScriptureVerse = { book: string; chapter: number; verse: number; text: string };

export type ScriptureResult = {
  reference: string;
  translation: string;
  verses: ScriptureVerse[];
  textBlock: string;
  missing?: Array<{ book: string; chapter: number; startVerse?: number; endVerse?: number }>;
};

function buildMissingVerses(expectedStart: number, expectedEnd: number, present: number[]) {
  const missing: Array<{ start: number; end: number }> = [];
  let currentStart: number | null = null;

  for (let value = expectedStart; value <= expectedEnd; value += 1) {
    if (!present.includes(value)) {
      if (currentStart === null) {
        currentStart = value;
      }
    } else if (currentStart !== null) {
      missing.push({ start: currentStart, end: value - 1 });
      currentStart = null;
    }
  }
  if (currentStart !== null) {
    missing.push({ start: currentStart, end: expectedEnd });
  }
  return missing;
}

export async function getScripture(prisma: PrismaClient, reference: string, translation: string) {
  const parsed = parseReference(reference);
  const results: ScriptureResult[] = [];

  for (const entry of parsed) {
    const useTranslation = entry.translation ?? translation;
    const expectedBook = entry.bookId;

    const where = {
      translation: useTranslation,
      book: expectedBook,
      ...(entry.kind === "chapter-range"
        ? {
            chapter: {
              gte: entry.startChapter,
              lte: entry.endChapter ?? entry.startChapter
            }
          }
        : { chapter: entry.startChapter }),
      ...(entry.kind === "verse" || entry.kind === "verse-range"
        ? {
            verse: {
              gte: entry.startVerse,
              lte: entry.endVerse ?? entry.startVerse
            }
          }
        : {})
    };

    const verses = await prisma.bibleVerse.findMany({
      where,
      orderBy: [{ chapter: "asc" }, { verse: "asc" }]
    });

    const mapped = verses.map((verse) => ({
      book: verse.book,
      chapter: verse.chapter,
      verse: verse.verse,
      text: verse.text
    }));

    const textBlock = mapped.map((verse) => verse.text).join(" ");
    const missing: Array<{ book: string; chapter: number; startVerse?: number; endVerse?: number }> = [];

    if (entry.kind === "verse" || entry.kind === "verse-range") {
      const expectedStart = entry.startVerse ?? 1;
      const expectedEnd = entry.endVerse ?? entry.startVerse ?? 1;
      const present = mapped.map((verse) => verse.verse);
      const gaps = buildMissingVerses(expectedStart, expectedEnd, present);
      for (const gap of gaps) {
        missing.push({
          book: expectedBook,
          chapter: entry.startChapter,
          startVerse: gap.start,
          endVerse: gap.end
        });
      }
    } else if (entry.kind === "chapter-range") {
      const presentChapters = new Set(mapped.map((verse) => verse.chapter));
      for (let chapter = entry.startChapter; chapter <= (entry.endChapter ?? entry.startChapter); chapter += 1) {
        if (!presentChapters.has(chapter)) {
          missing.push({ book: expectedBook, chapter });
        }
      }
    } else if (mapped.length === 0) {
      missing.push({ book: expectedBook, chapter: entry.startChapter });
    }

    results.push({
      reference: formatReference(entry),
      translation: useTranslation,
      verses: mapped,
      textBlock,
      missing: missing.length > 0 ? missing : undefined
    });
  }

  return results;
}
