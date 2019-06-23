var conn = require('./connect');

class Data {
    selectAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM data';
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

    // 유저의 투자 횟수 검사
    selectCountByUserNoAndGameNo(user_no, game_no) {
        const sql = 'SELECT COUNT(no) FROM data WHERE ? AND ?';
        return new Promise((resolve, reject) => {
            conn.promise().query(sql, [user_no, game_no]).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
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