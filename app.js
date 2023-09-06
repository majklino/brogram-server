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
