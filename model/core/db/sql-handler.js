const config = require('config');
const mysql = require('mysql');

class CoreSqlHandler{
    constructor(){
        this.type = config.get('sql.type');
        this.host = config.get('sql.host');
        this.user = config.get('sql.user');
        this.password = config.get('sql.password');
        this.database = config.get('sql.database');
        this.connection = null;
        this.isConnected = false;
    }

    connect(){
        return new Promise((resolve, reject) => {
            if (this.type == 'mysql') {
                this.connection = mysql.createConnection({
                    host: this.host,
                    user: this.user,
                    password: this.password,
                    database: this.database
                });

                this.connection.connect((err) => {
                    if (err) {
                        reject('unable to connect!');
                    }
                    else {
                        this.isConnected = true;
                        resolve(true);
                    }
                });
            }
            else {
                reject('unknown database type!');
            }
        });
    }

    disconnect(){
        return new Promise((resolve, reject) => {
            if (this.type == 'mysql') {
                this.connection.end();
                this.isConnected = false;
                resolve(true);
            }
            else {
                reject('unknown database type!');
            }
        });
    }

    executeQuery(query, params){
        if(params == null){
            params = [];
        }
        return new Promise((resolve, reject) => {
            if(!this.isConnected){
                reject('not connected!');
            }
            if(this.type == 'mysql'){
                this.connection.query(query, params, function (error, results) {
                    if (error) { reject(error) };
                    resolve(results);
                });
            }
            else{
                reject('unknown database type!');
            }
        });
    }
}

module.exports = CoreSqlHandler;