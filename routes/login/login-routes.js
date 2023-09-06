const express = require('express');
const log = require('../../helpers/logger');
const sqlService = require('../../model/master/dist/sql-service');

const router = express.Router();


router.get('/', (req, res) => {
    log(req.query);
    let username = req.query.username;
    let password = req.query.password;

    if(username == null){
        res.json({error: {status: "USER_NOT_SPECIFIED", message: "the request does not specify a username!"}});
    }
    else if(password == null){
        res.json({error: {status: "PASSWORD_NOT_SPECIFIED", message: "the request does not specify a password!"}});
    }
    else{
        sqlService.connect()
            .then(() => {
                sqlService.loginUser(username, password)
                    .then((results) => {
                        log(results);
                        sqlService.disconnect();
                        res.json({success: {status: "USER_LOGGED_IN", message: "the user has been successfully logged in", data: results}});
                    });
            });
    }
    

});

module.exports = router;