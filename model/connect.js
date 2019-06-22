var mysql = require('mysql2');
var config = {
    host : 'timingrush.crhxm1oyakyu.ap-northeast-2.rds.amazonaws.com',
    user : 'admin',
    password : '1q2w3e4r',
    port : 3306,
    database : 'timingrush'
};
var conn = mysql.createPool(config).promise();

module.exports = conn;