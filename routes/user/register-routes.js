const express = require('express');
const config = require('config');

const log = require('../../helpers/logger');
const generateHash = require('../../helpers/hash-generator');
const sqlService = require('../../model/master/sql-service');
const getWebSocketHub = require('../../hubs/web-socket-hub')

const webSocketHub = getWebSocketHub(null);
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
            password = config.get('salt') + password;
            let hash = generateHash(password);
            results = await sqlService.registerNewUser(username, hash, public_key);

            let newUsers = await sqlService.getAllUsers();
            let userJson = {
                type: "NEW USER",
                data: newUsers
            }
            userJson = JSON.stringify(userJson);
            webSocketHub.broadcastMessageToAll(userJson);

            res.json({ success: { status: "USER_REGISTERED" } });
        }

        await sqlService.disconnect();
    }
});

module.exports = router;
