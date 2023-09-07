
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
        let results = await this.handler.executeQuery(query, [username, hash]);
        if(results.length == 0){
            return null
        }
        else{
            let user = results[0];
            if(user.uuid == null){
                let uuid = 'uuidBaby!!!';
                query = 'update users set uuid = ? where username = ?;'
                await this.handler.executeQuery(query, [uuid, username]);
                user.uuid = uuid;
            }
            return user;
        }
    }
}

module.exports = new SqlService();