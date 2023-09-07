
class SqlService{
    constructor() {
        let Handler = require('../core/db/sql-handler');
        this.handler = new Handler()
    }

    async connect(){
        await this.handler.connect();
    }

    async disconnect(){
        await this.handler.disconnect();
    }

    async getAllUsers(){
        let query = 'select * from users;';
        let results = await this.handler.executeQuery(query, []);
        return results;
    }

    async loginUser(username, hash){
        let query = 'select username, uuid, nickname from users where username = ? and hash = ?;';
        console.log(username, hash, query);
        let results = await this.handler.executeQuery(query, [username, hash]);
        return results;
    }
}

module.exports = new SqlService();