import winston from "winston"
import { logsPath } from "../config/test.config"

const generateLogPath = () => {
  const now = new Date();
  var formattedDate = now.toLocaleString('sv-SE').toString();
  formattedDate = formattedDate.replace(", ", "_");
  formattedDate = formattedDate.replaceAll(":", "");
  formattedDate = formattedDate.replaceAll("-", "");
  formattedDate = formattedDate.replace(" ", "");
  return `${logsPath}/${formattedDate}`
}

const logsDirectory = generateLogPath()

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    })
  ),
  transports: [
    new winston.transports.File({
      filename: "ErrorLog.log",
      level: "error",
      dirname: logsDirectory
    }),
    new winston.transports.File({
      filename: "AllLog.log",
      dirname: logsDirectory
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

export const playwrightLogger = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isEnabled: (_name, _severity) => true,
  log: (_name, severity, message, args) => {
    logger.log(severity, message.toString(), args)
  }
}
