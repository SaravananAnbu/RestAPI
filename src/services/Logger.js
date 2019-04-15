import * as winston from 'winston'

const { combine, timestamp, label, printf } = winston.format
const apiFormat = printf((info) => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})

const logger = winston.createLogger({
  level: 'debug',
  format: combine(
    label({ 'label': 'WEBAPI' }),
    timestamp(),
    apiFormat
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true
    }),
    new winston.transports.File({
      filename: 'app.log',
      level: 'warn',
      handleExceptions: true
    })
  ],
  exitOnError: false
})

export const Logger = {
  info: (info) => {
    logger.info(info)
  },

  warn: (warn) => {
    logger.warn(warn)
  },

  error: (error) => {
    logger.error(error)
  },

  debug: (debug) => {
    logger.debug(debug)
  },

  debugToFile: (debug) => {
    logger.info(debug)
  },

  errorStackTrace: (error) => {
    console.log(error)
  }
}
