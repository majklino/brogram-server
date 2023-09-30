const express = require('express');
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
        await sqlService.connect();
        let results = await sqlService.loginUser(username, password);
        await sqlService.disconnect();
        if(results == null){
            res.json({success: {status: "WRONG_CREDENTIALS", message: "the username and/or password are incorrect!", data: results}});
        }
        else{
        res.json({success: {status: "USER_LOGGED_IN", message: "the user has been successfully logged in", data: results}});
        }
    }
    
});

module.exports = router;
