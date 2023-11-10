const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const log = require('./helpers/logger');

const app = express();
const PORT = process.env.PORT || config.get('port');

//DB config
const db = config.get('mongoURI');

//Connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => log.info('MongoDB connected...'))
    .catch((err) => log.error(err));

// Use body-parser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Define routes
defineRoutes = require('./routes/routes-handler');
defineRoutes(app);

// Start the server
let server = app.listen(PORT, () => {
    log.info(`Server running on port ${PORT}`);
});
