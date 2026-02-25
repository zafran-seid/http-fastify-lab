import Fastify from "fastify";

const app = Fastify({ logger: true });

// GET /health
app.get("/health", async () => {
  return {
    status: "ok",
    uptime: process.uptime()
  };
});

// GET /ping
app.get("/ping", async () => {
  return { pong: true };
});

// GET /echo?msg=hello
app.get("/echo", async (request) => {
  const query = request.query as { msg?: string };

  return {
    msg: query.msg ?? ""
  };
});

// Start server
app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
