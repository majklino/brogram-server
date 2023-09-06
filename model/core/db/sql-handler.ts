const config = require('config');
const mysql = require('mysql');
const log = require('../../../../helpers/logger');

class SqlHandler {
    type: string;
    host: string;
    user: string;
    password: string;
    database: string;
    connection: any;
    isConnected: boolean;

    constructor() {
        this.type = config.get('sql.type');
        this.host = config.get('sql.host');
        this.user = config.get('sql.user');
        this.password = config.get('sql.password');
        this.database = config.get('sql.database');
        this.connection = null;
        this.isConnected = false;
    }

    public connect(): any {
        return new Promise((resolve, reject) => {
            if (this.type == 'mysql') {
                this.connection = mysql.createConnection({
                    host: this.host,
                    user: this.user,
                    password: this.password,
                    database: this.database
                });

                this.connection.connect((err: any) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        log('MySql connected...');
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

    public disconnect(): any {
        return new Promise((resolve, reject) => {
            if (this.type == 'mysql') {
                this.connection.end();
                this.isConnected = false;
                log('MySql connection ended.');
                resolve(true);
            }
            else {
                reject('unknown database type!');
            }
        });
    }

    public executeQuery(query: string, params: any): any {
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

module.exports = SqlHandler;