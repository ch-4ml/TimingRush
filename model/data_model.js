var conn = require('./connect');

class Data {
    selectAll() {
        const sql = 'SELECT * FROM data';
        return new Promise((resolve, reject) => {
            conn.promise().query(sql).then(results => {
                console.log('SELECT');
                for(const row of results) {
                    console.log(row);
                }
                resolve(results);
            }).catch(err => {
                console.error('SELECT FAILED: ', err);
                reject(err);
            });
        })
    }

    insert(data) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO user SET ?';
            conn.promise().query(sql, data).then(results => {
                console.log('INSERT');
                let result = data;
                result.no = results[0]['insertId'];
                console.log('MESSAGE: ', results[0]['info']);
                resolve(result);
            }).catch(err => {
                console.error('INSERT FAILED: ', err);
                reject(err);
            });
        });
    }  
}
module.exports = new Data();