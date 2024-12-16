const initOption = {
    capSQL: true
}
const pgp=require('pg-promise')(initOption)
const dbConfig = {
user: 'postgres',
password: '123456',
host: 'localhost',
port: '5432',
database: 'CNPM',
};


const db = pgp(dbConfig)
module.exports = { db };
