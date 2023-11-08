
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

    async loginUser(username, hash, uuid){
        let query = 'select username, online_uuid, created_at from users where username = ? and hash = ?;';
        let results = await this.handler.executeQuery(query, [username, hash]);
        if(results.length == 0){
            return null
        }
        else{
            let user = results[0];
            if(user.online_uuid == null){
                query = 'update users set online_uuid = ? where username = ?;'
                await this.handler.executeQuery(query, [uuid, username]);
                user.online_uuid = uuid;
            }
            return user;
        }
    }

    async logoutUser(username, online_uuid){
        let query = 'select id from users where username = ? and online_uuid = ?;';
        let results = await this.handler.executeQuery(query, [username, online_uuid]);
        if(results.length == 0){
            return false;
        }
        else{
            query = 'update users set online_uuid = NULL, last_online = NOW() where username = ? and online_uuid = ?;'
            await this.handler.executeQuery(query, [username, online_uuid])
            return true;
        }
    }

    async checkUserExistence(username){
        let query = 'select username from users where username = ?;';
        let results = await this.handler.executeQuery(query, [username]);
        return results.length != 0;
    }

    async registerNewUser(username, hash, public_key){
        let query = 'insert into users (username, hash, public_key, created_at) values (?, ?, ?, NOW());';
        let res = await this.handler.executeQuery(query, [username, hash, public_key]);
        return;
    }
}

module.exports = new SqlService();