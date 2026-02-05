import { canonicalizeBookName, normalizeBook } from "./book-map";

export type ParsedRef = {
  translation?: string;
  bookId: string;
  startChapter: number;
  startVerse?: number;
  endChapter?: number;
  endVerse?: number;
  kind: "verse" | "verse-range" | "chapter" | "chapter-range";
};

const TRANSLATION_REGEX = /^[A-Z]{2,6}$/;

function splitReferences(input: string) {
  return input
    .split(/[;,]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function extractTranslationSuffix(part: string) {
  const suffixMatch = part.match(/\((?<translation>[A-Za-z]{2,6})\)$/);
  if (suffixMatch?.groups?.translation) {
    return { part: part.replace(/\s*\([A-Za-z]{2,6}\)$/, "").trim(), translation: suffixMatch.groups.translation };
  }

  const trailing = part.match(/\s+(?<translation>[A-Za-z]{2,6})$/);
  if (trailing?.groups?.translation && TRANSLATION_REGEX.test(trailing.groups.translation.toUpperCase())) {
    return {
      part: part.replace(/\s+[A-Za-z]{2,6}$/, "").trim(),
      translation: trailing.groups.translation
    };
  }

  return { part };
}

function extractTranslationPrefix(input: string) {
  const prefixMatch = input.match(/^(?<translation>[A-Za-z]{2,6})\s*:\s*(?<rest>.+)$/);
  if (prefixMatch?.groups?.translation && prefixMatch.groups.rest) {
    return {
      translation: prefixMatch.groups.translation,
      rest: prefixMatch.groups.rest.trim()
    };
  }
  return { rest: input };
}

function parseSingle(reference: string): ParsedRef {
  const match = reference.match(/^(?<book>.+?)\s+(?<rest>\d.+)$/);
  if (!match?.groups?.book || !match.groups.rest) {
    throw new Error(`Unsupported reference format: ${reference}`);
  }

  const bookId = normalizeBook(match.groups.book);
  if (!bookId) {
    throw new Error(`Unknown book: ${match.groups.book}`);
  }

  const rest = match.groups.rest.trim();

  const chapterRangeMatch = rest.match(/^(?<start>\d+)\s*[-–]\s*(?<end>\d+)$/);
  if (chapterRangeMatch?.groups?.start && chapterRangeMatch.groups.end) {
    const startChapter = Number(chapterRangeMatch.groups.start);
    const endChapter = Number(chapterRangeMatch.groups.end);
    return {
      bookId,
      startChapter,
      endChapter,
      kind: "chapter-range"
    };
  }

  const verseMatch = rest.match(/^(?<chapter>\d+)(?::(?<verse>\d+)(?:\s*[-–]\s*(?<endVerse>\d+))?)?$/);
  if (!verseMatch?.groups?.chapter) {
    throw new Error(`Unsupported reference format: ${reference}`);
  }

  const chapter = Number(verseMatch.groups.chapter);
  const startVerse = verseMatch.groups.verse ? Number(verseMatch.groups.verse) : undefined;
  const endVerse = verseMatch.groups.endVerse ? Number(verseMatch.groups.endVerse) : undefined;

  if (!startVerse) {
    return {
      bookId,
      startChapter: chapter,
      kind: "chapter"
    };
  }

  if (endVerse && endVerse !== startVerse) {
    return {
      bookId,
      startChapter: chapter,
      startVerse,
      endVerse,
      kind: "verse-range"
    };
  }

  return {
    bookId,
    startChapter: chapter,
    startVerse,
    kind: "verse"
  };
}

export function parseReference(input: string): ParsedRef[] {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Empty reference");
  }

  const { translation: prefixTranslation, rest } = extractTranslationPrefix(trimmed);
  const pieces = splitReferences(rest);

  return pieces.map((piece) => {
    const { part, translation } = extractTranslationSuffix(piece);
    const parsed = parseSingle(part);
    return {
      ...parsed,
      translation: (translation ?? prefixTranslation)?.toUpperCase()
    };
  });
}

export function formatReference(parsed: ParsedRef) {
  const bookName = canonicalizeBookName(parsed.bookId);
  if (parsed.kind === "chapter") {
    return `${bookName} ${parsed.startChapter}`;
  }
  if (parsed.kind === "chapter-range") {
    return `${bookName} ${parsed.startChapter}–${parsed.endChapter}`;
  }
  if (parsed.kind === "verse-range") {
    return `${bookName} ${parsed.startChapter}:${parsed.startVerse}–${parsed.endVerse}`;
  }
  return `${bookName} ${parsed.startChapter}:${parsed.startVerse}`;
}

export { canonicalizeBookName } from "./book-map";
