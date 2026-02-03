import type { PrismaClient } from "@prisma/client";

type User = { id: string; supabase_user_id: string; email: string };

type Conversation = { id: string; user_id: string; title: string };

type Message = {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  created_at: Date;
  metadata_json?: unknown;
};

type BibleVerse = {
  id: string;
  translation: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
};

let idCounter = 0;
const nextId = () => `id_${idCounter++}`;

export function createFakePrisma(seed: { verses: BibleVerse[] }) {
  const users: User[] = [];
  const conversations: Conversation[] = [];
  const messages: Message[] = [];
  const bibleVerses = [...seed.verses];

  const prisma = {
    user: {
      findUnique: async ({ where }: { where: { supabase_user_id: string } }) => {
        return users.find((user) => user.supabase_user_id === where.supabase_user_id) ?? null;
      },
      create: async ({ data }: { data: { supabase_user_id: string; email: string } }) => {
        const user = { id: nextId(), supabase_user_id: data.supabase_user_id, email: data.email };
        users.push(user);
        return user;
      }
    },
    conversation: {
      create: async ({ data }: { data: { user_id: string; title: string } }) => {
        const conversation = { id: nextId(), user_id: data.user_id, title: data.title };
        conversations.push(conversation);
        return conversation;
      }
    },
    message: {
      findMany: async ({ where, orderBy, take }: { where: { conversation_id: string }; orderBy?: { created_at: string }; take?: number }) => {
        const filtered = messages.filter((message) => message.conversation_id === where.conversation_id);
        const sorted = orderBy?.created_at === "asc" ? filtered.sort((a, b) => a.created_at.getTime() - b.created_at.getTime()) : filtered;
        return typeof take === "number" ? sorted.slice(0, take) : sorted;
      },
      create: async ({ data }: { data: { conversation_id: string; role: string; content: string; metadata_json?: unknown } }) => {
        const message: Message = {
          id: nextId(),
          conversation_id: data.conversation_id,
          role: data.role,
          content: data.content,
          created_at: new Date(),
          metadata_json: data.metadata_json
        };
        messages.push(message);
        return message;
      }
    },
    bibleVerse: {
      findMany: async ({
        where,
        orderBy
      }: {
        where: { translation: string; book: string; chapter: number | { gte: number; lte: number }; verse?: { gte: number; lte: number } };
        orderBy?: Array<{ chapter?: string; verse?: string }> | { verse: string };
      }) => {
        const chapterFilter = where.chapter;
        const chapterRange = typeof chapterFilter === "number" ? { gte: chapterFilter, lte: chapterFilter } : chapterFilter;
        const verseRange = where.verse ?? { gte: Number.MIN_SAFE_INTEGER, lte: Number.MAX_SAFE_INTEGER };
        const results = bibleVerses.filter((verse) => {
          return (
            verse.translation === where.translation &&
            verse.book === where.book &&
            verse.chapter >= chapterRange.gte &&
            verse.chapter <= chapterRange.lte &&
            verse.verse >= verseRange.gte &&
            verse.verse <= verseRange.lte
          );
        });
        if (Array.isArray(orderBy)) {
          return results.sort((a, b) => {
            if (a.chapter !== b.chapter) {
              return a.chapter - b.chapter;
            }
            return a.verse - b.verse;
          });
        }
        if (orderBy && "verse" in orderBy && orderBy.verse === "asc") {
          return results.sort((a, b) => a.verse - b.verse);
        }
        return results;
      }
    }
  };

  return prisma as unknown as PrismaClient;
}

export const seedVerses: BibleVerse[] = [
  { id: "v1", translation: "WEB", book: "john", chapter: 3, verse: 16, text: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life." },
  { id: "v2", translation: "WEB", book: "john", chapter: 3, verse: 17, text: "For God didn't send his Son into the world to judge the world, but that the world should be saved through him." },
  { id: "v3", translation: "WEB", book: "john", chapter: 3, verse: 18, text: "He who believes in him is not judged. He who doesn't believe has been judged already, because he has not believed in the name of the one and only Son of God." },
  { id: "v4", translation: "WEB", book: "psalms", chapter: 23, verse: 1, text: "Yahweh is my shepherd: I shall lack nothing." },
  { id: "v5", translation: "WEB", book: "psalms", chapter: 23, verse: 2, text: "He makes me lie down in green pastures. He leads me beside still waters." },
  { id: "v6", translation: "WEB", book: "psalms", chapter: 23, verse: 3, text: "He restores my soul. He guides me in the paths of righteousness for his name's sake." },
  { id: "v7", translation: "WEB", book: "psalms", chapter: 23, verse: 4, text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me." },
  { id: "v8", translation: "WEB", book: "psalms", chapter: 23, verse: 5, text: "You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over." },
  { id: "v9", translation: "WEB", book: "psalms", chapter: 23, verse: 6, text: "Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh's house forever." }
];
