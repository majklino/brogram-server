const express = require('express');

const log = require('../../helpers/logger');
const sqlService = require('../../model/master/sql-service');

const router = express.Router();


router.post('/', async function (req, res) {
    const requestData = req.body;
    let username = requestData.username;
    let password = requestData.password;
    let public_key = requestData.public_key;

    if (username == null || username == '') {
        res.json({ error: { status: "USER_NOT_SPECIFIED" } });
    }
    else if (password == null) {
        res.json({ error: { status: "PASSWORD_NOT_SPECIFIED" } });
    }
    else if (public_key == null) {
        res.json({ error: { status: "PUBLIC_KEY_NOT_SPECIFIED" } });
    }

    else {
        await sqlService.connect();
        let userExists = await sqlService.checkUserExistence(username);
        if (userExists) {
            res.json({ error: { status: "USERNAME_ALREADY_EXISTS" } });
        }
        else {
            results = await sqlService.registerNewUser(username, password, public_key);
            res.json({ error: { status: "USER_REGISTERED" } });
        }

        await sqlService.disconnect();
    }
});

module.exports = router;
