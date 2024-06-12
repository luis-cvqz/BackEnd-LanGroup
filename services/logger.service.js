const { createLogger, format, transports } = require("winston")
const { combine, timestamp, printf } = format
const DailyRotateFile = require("winston-daily-rotate-file")

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`
})

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '3m',
      maxFiles: '14d',
      level: 'error',
    })
  ],
})

module.exports = logger