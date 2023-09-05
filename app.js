const express = require('express');
const config = require('config');
const log = require('./helpers/logger');

const app = express();
const PORT = process.env.PORT || config.get('port');

//Define routes
defineRoutes = require('./routes/routes-handler');
defineRoutes(app);

// Start the server
let server = app.listen(PORT, () => {
    log(`Server running on port ${PORT}`);
});

//sql
Handler = require('./model/core/db/dist/sql-handler');
var sql = new Handler();

async function query(){
    await sql.connect();
    var results = await sql.executeQuery('select * from users;');
    log(results);
    await sql.disconnect();
}

query();
