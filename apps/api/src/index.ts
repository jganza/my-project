import { createApp } from "./app";

const app = await createApp();

const port = Number(process.env.PORT ?? 4000);
const host = "0.0.0.0";

app.listen({ port, host }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});

export type AppInstance = typeof app;
