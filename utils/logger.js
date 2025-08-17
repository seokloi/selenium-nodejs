const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info", // default level
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.colorize(),
    format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/test.log", level: "info" }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

module.exports = logger;
