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
// 1. Read URL from command line
const inputUrl = process.argv[2];
if (!inputUrl) {
    console.error("Usage: node dist/http-get.js <url>");
    process.exit(1);
}
// 2. Parse the URL
const url = new url_1.URL(inputUrl);
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
