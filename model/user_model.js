var conn = require('./connect');

class User {
    selectAll() {
        const sql = 'SELECT * FROM user';
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

    insert(user) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO user SET ?';
            conn.promise().query(sql, user).then(results => {
                console.log('INSERT');
                let result = user;
                result.no = results[0]['insertId'];
                console.log('MESSAGE: ', results[0]['info']);
                resolve(result);
            }).catch(err => {
                console.error('INSERT FAILED: ', err);
                reject(err);
            });
        });
    }

    update(user) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE user SET ? WHERE no=?';
            const user_no = user.no;

            conn.promise().query(sql, [user, user_no]).then(results => {
                console.log("MESSAGE: ", results[0]['info']);
                resolve(result);
            }).catch(err => {
                console.error('UPDATE FAILED: ', err);
                reject(err);
            });
        });
    }

    delete(no) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM user WHERE no=?';
            const user_no = no;
            conn.promise().query(sql, user_no).then(results => {
                console.log('DELETE');
                console.log('DELETED ROW: ', results[0]['affectedRows']);
                resolve('DELETE SUCCESS');
            }).catch(err => {
                console.error('DELETE FAILED: ', err);
                reject(err);
            });
        });
    }
}
module.exports = new User();