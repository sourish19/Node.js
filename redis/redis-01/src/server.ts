import express from "express";
import axios from "axios";

const PORT = process.env.PORT || 3000;

const options = {
  method: "GET",
  url: "https://api.freeapi.app/api/v1/public/books",
  headers: { accept: "application/json" },
};

const app = express();

// This is a local cache but other server cannot access it 
// Here i need to handle LRU, clear cache, server cache etc
const chacheMap = {
  pageCount: 0,
};

app.get("/", async (req, res) => {
  if(chacheMap.pageCount) return res.json({ pageCount: chacheMap.pageCount });

  const response = await axios.request(options);

  const pageCount = response.data.data.data.reduce(
    (acc: number, curr: { volumeInfo: { pageCount: number } }) =>
      acc + curr.volumeInfo.pageCount,
    0
  );

  chacheMap.pageCount = pageCount;

  return res.json({ pageCount });
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
