const express = require('express');
const config = require('config');

const log = require('../../helpers/logger');
const sqlService = require('../../model/master/sql-service');

const router = express.Router();


router.get('/friends', async function(req, res) {
    const requestData = req.query;
    let id = requestData.id;
    let online_uuid = requestData.online_uuid;

    await sqlService.connect();
    let userAuthorized = await sqlService.checkUserAuthorization(id, online_uuid);
    
    
    if (userAuthorized){
        let friends = await sqlService.getListOfFriends(id);
        res.json({ success: { status: "FRIENDS OBTAINED", friends: friends } });
    }
    else{
        res.json({ error: { status: "NOT AUTHORIZED" } });
    }

    await sqlService.disconnect();
});

module.exports = router;
