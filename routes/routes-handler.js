
function defineRoutes(app) {
    app.get('/', (req, res) => {
        res.send('hi :)');
    });

    app.use('/login', require('./user/login-routes'));
    app.use('/register', require('./user/register-routes'));
    app.use('/chat', require('./chat/chat-routes'));
    app.use('/user', require('./user/user-routes'));
}

module.exports = defineRoutes;