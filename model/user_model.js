var conn = require('./connect');

class User {
    selectAll() {
        const sql = 'SELECT * FROM user';
        conn.query(sql).then(results => {
            console.log('SELECT');
            const info = results;
            for(const row of results) {
                console.log(row);
            }
            conn.end();
        }).catch(err => {
            console.error('SELECT FAILED: ', err);
            conn.end();
        });
    }

    insert(user) {
        const sql = 'INSERT INTO user SET ?';
        conn.query(sql, user).then(results => {
            console.log('INSERT');
            const info = results[0];
            console.log('MESSAGE: ', info['info']);
            conn.end();
        }).catch(err => {
            console.error('INSERT FAILED: ', err);
            conn.end();
        });
    }

    update(user) {
        const sql = 'UPDATE user SET ? WHERE no=?';
        const no = user.no;

        conn.query(sql, [user, no]).then(results => {
            console.log('UPDATE');
            const info = results[0];
            console.log("MESSAGE: ", info['info']);
            conn.end();
        }).catch(err => {
            console.error('UPDATE FAILED: ', err);
            conn.end();
        });
    }

    delete(no) {
        const sql = 'DELETE FROM user WHERE no=?';
        const no = no;
        conn.query(sql, no).then(results => {
            console.log('DELETE');
            const info = results[0];
            console.log('DELETED ROW: ', info['affectedRows']);
            conn.end();
        }).catch(err => {
            console.error('DELETE FAILED: ', err);
            conn.end();
        });
    }
}
module.exports = new User();