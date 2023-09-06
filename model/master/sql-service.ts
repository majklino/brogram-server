
class SqlService {
    handler: any;

    constructor() {
        let Handler = require('../../core/db/dist/sql-handler');
        this.handler = new Handler()
    }

    public async connect(){
        await this.handler.connect();
    }

    public async disconnect(){
        await this.handler.disconnect();
    }

    public async getAllUsers(){
        let query = 'select * from users;';
        let results = await this.handler.executeQuery(query, []);
        return results;
    }

    public async loginUser(username: string, hash: string){
        let query = 'select username, uuid, nickname from users where username = ? and hash = ?;';
        console.log(username, hash, query);
        let results = await this.handler.executeQuery(query, [username, hash]);
    }
}

module.exports = new SqlService();