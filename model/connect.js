const mysql = require('mysql2');
const config = {
    host : 'timingrush.crhxm1oyakyu.ap-northeast-2.rds.amazonaws.com',
    user : 'admin',
    password : '1q2w3e4r',
    port : 3306,
    database : 'timingrush'
};
const conn = mysql.createPool(config);

module.exports = conn;