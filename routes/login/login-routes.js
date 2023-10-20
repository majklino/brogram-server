const express = require('express');

const generateUUID = require('../../helpers/uuid-generator');
const log = require('../../helpers/logger');
const sqlService = require('../../model/master/sql-service');

const router = express.Router();


router.post('/', async function(req, res) {
    const requestData = req.body;
    let username = requestData.username;
    let password = requestData.password;

    if(username == null || username == ''){
        res.json({error: {status: "USER_NOT_SPECIFIED", message: "the request does not specify a username!"}});
    }
    else if(password == null){
        res.json({error: {status: "PASSWORD_NOT_SPECIFIED", message: "the request does not specify a password!"}});
    }
    else{
        let uuid = generateUUID();
        await sqlService.connect();
        let results = await sqlService.loginUser(username, password, uuid);
        await sqlService.disconnect();
        if(results == null){
            res.json({error: {status: "WRONG_CREDENTIALS", message: "the username and/or password are incorrect!", data: results}});
        }
        else{
            res.json({success: {status: "USER_LOGGED_IN", message: "the user has been successfully logged in", data: results}});
        }
    }
    
});

router.post('/logout', async function(req, res) {
    const requestData = req.body;
    let username = requestData.username;
    let online_uuid = requestData.online_uuid;

    if(username == null || username == ''){
        res.json({error: {status: "USER_NOT_SPECIFIED", message: "the request does not specify a username!"}});
    }
    else if(online_uuid == null || online_uuid == ''){
        res.json({error: {status: "ONLINE_UUID_NOT_SPECIFIED", message: "the request does not specify an online uuid!"}});
    }
    else{
        await sqlService.connect();
        let results = await sqlService.logoutUser(username, online_uuid);
        await sqlService.disconnect();

        if(results == true){
            res.json({success: {status: "USER_LOGGED_OUT", message: "the user has been successfully logged out"}});
        }
        else{
            res.json({success: {status: "WRONG_CREDENTIALS", message: "the username and/or online_uuid are incorrect!"}});
        }
    }
    
});

module.exports = router;
