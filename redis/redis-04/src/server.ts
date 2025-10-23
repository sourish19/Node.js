// ANOTHER WAY OF CONNECTIONG REDIS 
import express from "express";
import { Redis } from "ioredis";

const app = express();

const PORT = process.env.PORT || 3000;

const client = new Redis({
  host: "localhost",
  port: 6379,
});

// Event Listener
client.on("connect", () => {
  console.log("Redis is connected on PORT 6379");
});

const setValuesInRedis = async () => {
  try {
    // await client.connect();
    const test = await client.set("testKey", "testValue");
    const test2 = await client.lpush('anime', 'one piece', 'naruto', 'bleach');
    console.log(test,test2);
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  } finally {
    // await client.flushall("SYNC")
    await client.quit();
  }
};

const getValuesFromRedis = async () => {
  try {
    const test2 = await client.lrange('anime',0,-1)
    const test = await client.get("testKey");
    console.log(test,test2);
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
}

const flushRedisValues = async()=>{
  try {
    await client.flushall("SYNC")
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
}

app.get("/set", (req, res) => {
  setValuesInRedis()
  res.send("Set values!");
});

app.get("/get", (req, res) => {
  getValuesFromRedis()
  res.send("Get values!");
});

app.get("/flush", (req, res) => {
  flushRedisValues()
  res.send("Flush values!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
