
function defineRoutes(app) {
    app.get('/', (req, res) => {
        res.send('hi :)');
    });

    // Enable CORS for all routes
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.use('/login', require('./user/login-routes'));
    app.use('/register', require('./user/register-routes'));
    app.use('/chat', require('./chat/chat-routes'));
    app.use('/user', require('./user/user-routes'));
}

module.exports = defineRoutes;