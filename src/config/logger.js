const { createLogger, format, transports } = require("winston");

const formatCustom = format.combine(
  format.splat(),
  format.simple(),
  format.timestamp(),
  format.printf((info) => {
    return `[${info.timestamp}] ${info.level}: ${info.message}`;
  })
);

const logger = createLogger({
  transports: [
    new transports.File({
      format: formatCustom,
      level: process.env.NODE_ENV !== "production" ? "debug" : "info",
      maxSize: 500000,
      filename: require("path").join(process.env.LOGS_INFO),
    }),
    new transports.File({
      format: formatCustom,
      level: "error",
      maxSize: 500000,
      filename: require("path").join(process.env.LOGS_ERROR),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.splat(),
        // format.timestamp(),
        format.simple()
      ),
    })
  );
}

module.exports = { logger };
