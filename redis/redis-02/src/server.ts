import express from "express";
import axios from "axios";

import client from "./client";

const options = {
  method: "GET",
  url: "https://api.freeapi.app/api/v1/public/books",
  headers: { accept: "application/json" },
};

const app = express();

app.get("/", async (req, res) => {
  const value = await client.get("totalPageCount",(err, result) => {
    if (err) console.error(err);
    console.log(result);
  });

  // If we have a value in redis, return it & if not do the api call
  if (value) return res.json({ totalPageCount: value });

  const response = await axios.request(options);

  const totalPageCount = response.data.data.data.reduce(
    (acc: number, curr: { volumeInfo: { pageCount: number } }) =>
      acc + curr.volumeInfo.pageCount,
    0
  );

  // Set the value in redis
  await client.set("totalPageCount", totalPageCount);
  await client.expire("totalPageCount",1 * 24 * 60 * 60); // 1 day

  return res.json({ totalPageCount });
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});
