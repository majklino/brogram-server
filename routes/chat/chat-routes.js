// User.findOne({ screen_name: response['response'].toLowerCase() })
//                     .then((foundUser) => {
//                         if (!foundUser) {
//                             var newUser = new User({
//                                 screen_name: response['response'].toLowerCase()
//                             });
//                             newUser.save();
//                         }
//                     });


const express = require('express');
const config = require('config');

const log = require('../../helpers/logger');
const sqlService = require('../../model/master/sql-service');
const Message = require('../../model/core/schemas/messages');

const router = express.Router();


router.post('/send', async function (req, res) {
    const requestData = req.body;
    let from = requestData.from;
    let to = requestData.to;
    let content = requestData.content;
    let online_uuid = requestData.uuid;

    log.info('from: ' + from);
    log.info('to: ' + to);
    log.info('content: ' + content);

    if (from == null) {
        res.json({ error: { status: "SENDER_NOT_SPECIFIED" } });
    }
    else if (to == null) {
        res.json({ error: { status: "RECEIVER_NOT_SPECIFIED" } });
    }

    await sqlService.connect();
    await sqlService.checkUserAuthorization(from, online_uuid);
    await sqlService.disconnect();

});

module.exports = router;
