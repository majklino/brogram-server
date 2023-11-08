const { createLogger, format, transports } = require('winston');
const { format: dateFormat } = require('date-fns');

// Define a custom timestamp format function
const customTimestamp = format((info) => {
    info.timestamp = dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');
    return info;
});

// Define the logger configuration
const logger = createLogger({
    level: 'debug',
    format: format.combine(
        customTimestamp(), // Use the custom timestamp format
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'info.log', level: 'info' }),
        new transports.File({ filename: 'error.log', level: 'warn' })
    ]
});

module.exports = logger;