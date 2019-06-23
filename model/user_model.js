var conn = require('./connect');

class User {
    // 회원 가입
    insert(user) {
        return new Promise((resolve, reject) => {
            this.selectAll().then(results => {
                let flag = 0; // 1: 아이디 중복 / 2: 닉네임 중복
                for(const row of results[0]) {
                    if(row.id == user.id) {
                        flag = 1;
                        break;
                    }
                    if(row.nickname == user.nickname) {
                        flag = 2;
                        break;
                    }
                }
                switch(flag) {
                    case 1:
                        resolve("중복된 아이디입니다.");
                        break;
                    case 2:
                        resolve("중복된 닉네임입니다.");
                        break;
                    default:
                        const sql = 'INSERT INTO user SET ?';
                        conn.promise().query(sql, user).then(results => {
                            let result = user;
                            result.no = results[0]['insertId'];
                            resolve(result);
                        }).catch(err => {
                            reject(err);
                        });
                        break;
                }
            }).catch(err => {
                console.log("중복검사 중 오류: ", err);
                reject(err);
            });
        });
    }

    // 전체 회원 조회
    selectAll() {
        const sql = 'SELECT * FROM user';
        return new Promise((resolve, reject) => {
            conn.promise().query(sql).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 단일 회원 조회
    selectOneByUserNo(no) {
        const sql = 'SELECT * FROM user WHERE no=?';
        return new Promise((resolve, reject) => {
            conn.promise().query(sql, no).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 로그인
    selectOneByUser(user) {
        const sql = 'SELECT * FROM user WHERE id=? and password=?';
        return new Promise((resolve, reject) => {
            conn.promise().query(sql, [user.id, user.password]).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 회원 정보 변경
    update(user) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE user SET ? WHERE no=?';
            const user_no = user.no;

            conn.promise().query(sql, [user, user_no]).then(results => {
                resolve('UPDATE SUCCESS');
            }).catch(err => {
                console.error('UPDATE FAILED: ', err);
                reject(err);
            });
        });
    }

    // 회원 삭제
    delete(no) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM user WHERE no=?';
            conn.promise().query(sql, no).then(results => {
                resolve('DELETE SUCCESS');
            }).catch(err => {
                reject(err);
            });
        });
    }
}
module.exports = new User();