import * as http from "http";
import * as https from "https";
import { URL } from "url";
import * as fs from "fs";

const jsonFilePath = process.argv[3];
const inputUrl = process.argv[2];

if (!inputUrl || !jsonFilePath) {
  console.error(
    "Usage: node dist/http-post.js <url> <json-file>"
  );
  process.exit(1);
}

let jsonData: string;

try {
  jsonData = fs.readFileSync(jsonFilePath, "utf-8");
  JSON.parse(jsonData); // validate JSON
} catch {
  console.error("Invalid or unreadable JSON file");
  process.exit(1);
}


// 3. Parse URL
const url = new URL(inputUrl);

// 4. Choose http or https
const client = url.protocol === "https:" ? https : http;

// 5. Request options
const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(jsonData),
    "User-Agent": "node-http-client"
  }
};

// 6. Send POST request
const req = client.request(url, options, (res) => {
  console.log(`Status code: ${res.statusCode}`);

  let body = "";

  res.on("data", (chunk) => {
    body += chunk;
  });

  res.on("end", () => {
    try {
      const parsed = JSON.parse(body);
      console.log("Echoed JSON:");
      console.log(JSON.stringify(parsed.json, null, 2));
    } catch {
      console.log(body);
    }
  });
});

// 7. Handle errors
req.on("error", (err) => {
  console.error("Request error:", err.message);
});

// 8. Write JSON body and finish request
req.write(jsonData);
req.end();


