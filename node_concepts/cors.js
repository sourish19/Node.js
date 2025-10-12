import express from "express";
import cors from "cors";
import limiter from "./ratelimiter";

const app = express();

const corsConfig = () => {
  return cors({
    // origin represents the Origin header in the HTTP request.
    // Every browser will have a origin but tools like mobile,curl,postman will not so as thats why er do !origin
    origin: function (origin, callback) {
      const allowedOrigins =
        process.env.NODE_ENV === "production"
          ? ["https://example.com"]
          : ["http://localhost:3000"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-version"],
    exposedHeaders: ["Content-Range", "X-Content-Range", "X-Total-Count"], // client can see these
    credentials: true, // support for cookies and authorization credentials - to pass in the headers
    preflightContinue: false, // if false cors will handle if true we need to handle it ourselves
    maxAge: 600, // cache the preflight responses for 600 seconds - avoid sending options req multiple time
    optionsSuccessStatus: 204, // for no content
  });
};

app.use(corsConfig());

// Rate limiting 
app.use(limiter)

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
