import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const verses = [
  {
    translation: "WEB",
    book: "genesis",
    chapter: 1,
    verse: 1,
    text: "In the beginning God created the heavens and the earth."
  },
  {
    translation: "WEB",
    book: "genesis",
    chapter: 1,
    verse: 2,
    text: "The earth was formless and empty. Darkness was on the surface of the deep and God's Spirit was hovering over the surface of the waters."
  },
  {
    translation: "WEB",
    book: "genesis",
    chapter: 1,
    verse: 3,
    text: "God said, \"Let there be light,\" and there was light."
  },
  {
    translation: "WEB",
    book: "genesis",
    chapter: 1,
    verse: 4,
    text: "God saw the light, and saw that it was good. God divided the light from the darkness."
  },
  {
    translation: "WEB",
    book: "genesis",
    chapter: 1,
    verse: 5,
    text: "God called the light Day, and the darkness he called Night. There was evening and there was morning, the first day."
  },
  {
    translation: "WEB",
    book: "psalms",
    chapter: 23,
    verse: 1,
    text: "Yahweh is my shepherd: I shall lack nothing."
  },
  {
    translation: "WEB",
    book: "psalms",
    chapter: 23,
    verse: 2,
    text: "He makes me lie down in green pastures. He leads me beside still waters."
  },
  {
    translation: "WEB",
    book: "psalms",
    chapter: 23,
    verse: 3,
    text: "He restores my soul. He guides me in the paths of righteousness for his name's sake."
  },
  {
    translation: "WEB",
    book: "psalms",
    chapter: 23,
    verse: 4,
    text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me."
  },
  {
    translation: "WEB",
    book: "psalms",
    chapter: 23,
    verse: 5,
    text: "You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over."
  },
  {
    translation: "WEB",
    book: "psalms",
    chapter: 23,
    verse: 6,
    text: "Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh's house forever."
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 1,
    text: "Seeing the multitudes, he went up onto the mountain. When he had sat down, his disciples came to him."
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 2,
    text: "He opened his mouth and taught them, saying,"
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 3,
    text: "Blessed are the poor in spirit, for theirs is the Kingdom of Heaven."
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 4,
    text: "Blessed are those who mourn, for they shall be comforted."
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 5,
    text: "Blessed are the gentle, for they shall inherit the earth."
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 6,
    text: "Blessed are those who hunger and thirst after righteousness, for they shall be filled."
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 7,
    text: "Blessed are the merciful, for they shall obtain mercy."
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 8,
    text: "Blessed are the pure in heart, for they shall see God."
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 9,
    text: "Blessed are the peacemakers, for they shall be called children of God."
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 10,
    text: "Blessed are those who have been persecuted for righteousness' sake, for theirs is the Kingdom of Heaven."
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 11,
    text: "Blessed are you when people reproach you, persecute you, and say all kinds of evil against you falsely, for my sake."
  },
  {
    translation: "WEB",
    book: "matthew",
    chapter: 5,
    verse: 12,
    text: "Rejoice, and be exceedingly glad, for great is your reward in heaven. For that is how they persecuted the prophets who were before you."
  },
  {
    translation: "WEB",
    book: "john",
    chapter: 3,
    verse: 16,
    text: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life."
  },
  {
    translation: "WEB",
    book: "john",
    chapter: 3,
    verse: 17,
    text: "For God didn't send his Son into the world to judge the world, but that the world should be saved through him."
  },
  {
    translation: "WEB",
    book: "john",
    chapter: 3,
    verse: 18,
    text: "He who believes in him is not judged. He who doesn't believe has been judged already, because he has not believed in the name of the one and only Son of God."
  },
  {
    translation: "WEB",
    book: "romans",
    chapter: 8,
    verse: 1,
    text: "There is therefore now no condemnation to those who are in Christ Jesus, who don't walk according to the flesh, but according to the Spirit."
  },
  {
    translation: "WEB",
    book: "romans",
    chapter: 8,
    verse: 2,
    text: "For the law of the Spirit of life in Christ Jesus made me free from the law of sin and of death."
  },
  {
    translation: "WEB",
    book: "romans",
    chapter: 8,
    verse: 3,
    text: "For what the law couldn't do, in that it was weak through the flesh, God did, sending his own Son in the likeness of sinful flesh and for sin, he condemned sin in the flesh;"
  },
  {
    translation: "WEB",
    book: "romans",
    chapter: 8,
    verse: 4,
    text: "that the ordinance of the law might be fulfilled in us, who walk not after the flesh, but after the Spirit."
  },
  {
    translation: "WEB",
    book: "micah",
    chapter: 6,
    verse: 8,
    text: "He has shown you, O man, what is good. What does Yahweh require of you, but to do justly, to love mercy, and to walk humbly with your God?"
  },
  {
    translation: "WEB",
    book: "proverbs",
    chapter: 9,
    verse: 10,
    text: "The fear of Yahweh is the beginning of wisdom. The knowledge of the Holy One is understanding."
  },
  {
    translation: "WEB",
    book: "1_thessalonians",
    chapter: 5,
    verse: 21,
    text: "Test all things, and hold firmly that which is good."
  }
];

async function main() {
  await prisma.bibleVerse.deleteMany();
  await prisma.bibleVerse.createMany({ data: verses });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
