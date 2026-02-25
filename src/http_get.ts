import * as http from "http";
import * as https from "https";
import { URL } from "url";

// 1. Read URL from command line
const inputUrl = process.argv[2];

if (!inputUrl) {
  console.error("Usage: node dist/http-get.js <url>");
  process.exit(1);
}

// 2. Parse the URL
const url = new URL(inputUrl);

// 3. Choose http or https
const client = url.protocol === "https:" ? https : http;

// 4. Set request options (IMPORTANT for GitHub)
const options = {
  headers: {
    "User-Agent": "node-http-client"
  }
};

// 5. Send GET request
client.get(url, options, (res) => {
  // --- Status Code ---
  console.log(`Status code: ${res.statusCode}`);

  // --- Selected Headers ---
  console.log("content-type:", res.headers["content-type"]);
  console.log("date:", res.headers["date"]);

  let body = "";

  // 6. Read data chunks
  res.on("data", (chunk) => {
    body += chunk;
  });

  // 7. When response ends
  res.on("end", () => {
    console.log("\nBody (first 200 chars):");
    console.log(body.slice(0, 200));
  });
}).on("error", (err) => {
  console.error("Request error:", err.message);
});
