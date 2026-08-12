const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./config/database");
const logger = require("./config/logger");

const startServer = async () => {
  await connectDatabase();

  const server = app.listen(env.port, () => {
    logger.info(
      `SecurePatch backend listening on port ${env.port}`
    );
  });

  const shutdown = async (signal) => {
    logger.info(`${signal} received. Shutting down...`);

    server.close(async () => {
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

startServer();