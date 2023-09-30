
function defineRoutes(app) {
    app.get('/', (req, res) => {
        res.send('hi :)');
    });

    app.use('/login', require('./login/login-routes'));
    app.use('/register', require('./register/register-routes'));
}

module.exports = defineRoutes;