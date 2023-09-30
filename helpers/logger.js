const formatDate = require('./date-formatter');

function log(...args){
    formattedDate = formatDate();

    let messageText = `[${formattedDate}] `;
    args.forEach(arg => {
        if (messageText == ''){
            messageText += `${' '.repeat(formattedDate.length+1)}`;
        }
        console.log(messageText, arg);
        messageText = '';
    });

    //process.stdout.write(`${messageText}\n`);
    
}

module.exports = log;