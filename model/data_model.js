var conn = require('./connect');

class Data {
    selectAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM data';
            conn.promise().query(sql).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        })
    }

    // 유저의 투자 횟수 검사
    selectCountByUserNoAndGameNo(user_no, game_no) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT COUNT(no) FROM data WHERE user_no=? AND game_no=?';
            conn.promise().query(sql, [user_no, game_no]).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }

    insert(data) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO data SET ?';
            conn.promise().query(sql, data).then(results => {
                let result = data;
                result.no = results[0]['insertId'];
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }  
}
module.exports = new Data();