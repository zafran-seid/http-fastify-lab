# http-fastify-lab

## Overview

This project demonstrates **basic HTTP client and server operations** using **Node.js, TypeScript, and Fastify**.  
It contains:

1. **HTTP clients**
   - `http-get.ts` → sends GET requests and prints status, headers, and body.
   - `http-post.ts` → sends POST requests with JSON body and prints response.

2. **Fastify server**
   - `server.ts` → minimal TypeScript server with the following endpoints:
     - `GET /health` → returns `{ status: "ok", uptime: <seconds> }`
     - `GET /ping` → returns `{ pong: true }`
     - `GET /echo?msg=hello` → echoes query parameter `{ msg: "hello" }`
