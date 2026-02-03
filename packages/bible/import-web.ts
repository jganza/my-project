import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { PrismaClient } from "@prisma/client";
import { normalizeBook } from "./book-map";

const prisma = new PrismaClient();

type Options = {
  file?: string;
  translation: string;
  truncate: boolean;
};

function parseArgs(args: string[]): Options {
  const options: Options = { translation: "WEB", truncate: false };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--file") {
      options.file = args[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--translation") {
      options.translation = args[index + 1] ?? "WEB";
      index += 1;
      continue;
    }
    if (arg === "--truncate") {
      options.truncate = true;
    }
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options.file) {
    throw new Error("Usage: pnpm bible:import --file ./data/web.tsv --truncate");
  }

  const filePath = path.resolve(process.cwd(), options.file);
  const raw = await fs.readFile(filePath, "utf-8");

  const records = parse(raw, {
    columns: true,
    delimiter: "\t",
    skip_empty_lines: true,
    trim: true
  }) as Array<Record<string, string>>;

  if (records.length === 0) {
    throw new Error("No rows found in TSV file.");
  }

  if (options.truncate) {
    await prisma.bibleVerse.deleteMany({ where: { translation: options.translation } });
  }

  const batchSize = 5000;
  let inserted = 0;

  for (let start = 0; start < records.length; start += batchSize) {
    const slice = records.slice(start, start + batchSize).map((row) => {
      const bookInput = row.book ?? row.Book ?? row.BOOK;
      const bookId = normalizeBook(String(bookInput));
      if (!bookId) {
        throw new Error(`Unknown book: ${bookInput}`);
      }

      return {
        translation: row.translation ?? row.Translation ?? row.TRANSLATION ?? options.translation,
        book: bookId,
        chapter: Number(row.chapter ?? row.Chapter ?? row.CHAPTER),
        verse: Number(row.verse ?? row.Verse ?? row.VERSE),
        text: String(row.text ?? row.Text ?? row.TEXT)
      };
    });

    await prisma.bibleVerse.createMany({ data: slice, skipDuplicates: true });
    inserted += slice.length;

    if (inserted % (batchSize * 2) === 0) {
      console.log(`Imported ${inserted}/${records.length} rows...`);
    }
  }

  console.log(`Import complete. Inserted ${inserted} rows.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
