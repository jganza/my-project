import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";
import { getScripture } from "../src/lib/scripture";
import { createFakePrisma, seedVerses } from "./helpers";

const prisma = createFakePrisma({ verses: seedVerses });

describe("get_scripture", () => {
  it("returns 3 verses ordered for John 3:16-18", async () => {
    const result = await getScripture(prisma, "John 3:16-18", "WEB");
    expect(result[0].verses).toHaveLength(3);
    expect(result[0].verses[0].verse).toBe(16);
    expect(result[0].verses[2].verse).toBe(18);
  });

  it("returns 6 verses for Psalm 23", async () => {
    const result = await getScripture(prisma, "Psalm 23", "WEB");
    expect(result[0].verses).toHaveLength(6);
  });
});

describe("GET /v1/scripture", () => {
  it("returns a textBlock for a seed reference", async () => {
    const app = await createApp({ prisma });
    const response = await app.inject({
      method: "GET",
      url: "/v1/scripture",
      query: { ref: "John 3:16-18", translation: "WEB" }
    });

    expect(response.statusCode).toBe(200);
    const body = response.json() as { results: Array<{ textBlock: string }> };
    expect(body.results[0].textBlock).toContain("For God so loved the world");

    await app.close();
  });
});
