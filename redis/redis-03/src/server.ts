// RATE LIMITER USING REDIS & EXPRESS
// Per-user key tracking
// Limited number of requests
// TTL window applied correctly

import express from "express";
import { Client } from "./client";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/visits", async (req, res) => {
  const userId = req.headers?.user;

  console.log(userId);

  let rateLimit = await Client.get(`ratelimit:${userId}`);

  if (!rateLimit) {
    const val = await Client.set(`ratelimit:${userId}`, 0);
    await Client.expire(`ratelimit:${userId}`, 10);
    rateLimit = val && "0";
  }

  if (Number(rateLimit) > 10) return res.status(429).send("Too many requests!");

  await Client.incr(`ratelimit:${userId}`);

  res.json({
    rateLimit: rateLimit,
  });
});

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
