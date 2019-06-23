var conn = require('./connect');

class Game {
    // 게임 생성
    insert(game) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO game SET ?';
            conn.promise().query(sql, game).then(results => {
                let result = game;
                result.no = results[0]['insertId'];
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 진행중인(활성화) 게임 목록
    selectOn() {
        const sql = 'SELECT no, title, att_limit, chip_limit, range_begin, range_end, start_date, finish_date FROM game WHERE status=1';
        return new Promise((resolve, reject) => {
            conn.promise().query(sql).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 게임 선택
    selectOneByGameNo(no) {
        const sql = 'SELECT * FROM game WHERE no=?'
        return new Promise((resolve, reject) => {
            const game_no = no;
            conn.promise().query(sql, game_no).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }

    // 사람들이 투자할 때 마다 변경됨
    update(game) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE game SET ? WHERE no=?';
            const game_no = game.no;
            conn.promise().query(sql, [game, game_no]).then(results => {
                resolve('SUCCESS UPDATE GAME');
            }).catch(err => {
                reject(err)
            });
        });
    }

    // 게임 종료 시 호출(상태만 비활성화)
    delete(no) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE game SET ? WHERE no=?';
            const param = {status: 0};
            conn.promise().query(sql, [param, no]).then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
module.exports = new Game();