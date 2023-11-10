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

const generateUUID = require('../../helpers/uuid-generator');
const generateHash = require('../../helpers/hash-generator');
const log = require('../../helpers/logger');
const sqlService = require('../../model/master/sql-service');

const router = express.Router();


router.post('/send', async function(req, res) {
    
    
});

module.exports = router;
