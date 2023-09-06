
function defineRoutes(app) {
    app.get('/', (req, res) => {
        res.send('hi :)');
    });

    app.use('/login', require('./login/login-routes'));
}

module.exports = defineRoutes;