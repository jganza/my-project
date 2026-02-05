import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function assertCount(book: string, translation: string) {
  const count = await prisma.bibleVerse.count({ where: { book, translation } });
  if (count === 0) {
    throw new Error(`No verses found for ${book}.`);
  }
}

async function assertContiguousChapter(book: string, chapter: number, expectedCount: number, translation: string) {
  const verses = await prisma.bibleVerse.findMany({
    where: { book, chapter, translation },
    orderBy: { verse: "asc" }
  });

  if (verses.length === 0) {
    throw new Error(`No verses found for ${book} ${chapter}.`);
  }

  const numbers = verses.map((verse) => verse.verse);
  const missing = [] as number[];
  for (let i = 1; i <= expectedCount; i += 1) {
    if (!numbers.includes(i)) {
      missing.push(i);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing verses in ${book} ${chapter}: ${missing.join(", ")}`);
  }
}

async function main() {
  const translation = process.env.BIBLE_TRANSLATION ?? "WEB";
  await assertCount("genesis", translation);
  await assertCount("psalms", translation);
  await assertCount("matthew", translation);
  await assertCount("john", translation);
  await assertCount("romans", translation);

  await assertContiguousChapter("john", 3, 36, translation);

  const duplicates = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
    `SELECT COUNT(*)::bigint as count FROM (SELECT translation, book, chapter, verse, COUNT(*) FROM "BibleVerse" GROUP BY translation, book, chapter, verse HAVING COUNT(*) > 1) dup;`
  );
  if (duplicates[0]?.count && Number(duplicates[0].count) > 0) {
    throw new Error("Duplicate verses found in dataset.");
  }

  console.log("Import validation passed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
