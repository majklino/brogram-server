
function defineRoutes(app) {
    app.get('/', (req, res) => {
        res.send('hi :)');
    });
}

module.exports = defineRoutes;
