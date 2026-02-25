"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const url_1 = require("url");
const fs = __importStar(require("fs"));
const jsonFilePath = process.argv[3];
const inputUrl = process.argv[2];
if (!inputUrl || !jsonFilePath) {
    console.error("Usage: node dist/http-post.js <url> <json-file>");
    process.exit(1);
}
let jsonData;
try {
    jsonData = fs.readFileSync(jsonFilePath, "utf-8");
    JSON.parse(jsonData); // validate JSON
}
catch {
    console.error("Invalid or unreadable JSON file");
    process.exit(1);
}
// 3. Parse URL
const url = new url_1.URL(inputUrl);
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
        }
        catch {
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
