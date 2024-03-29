const express = require('express');
const gameRouter = express.Router();
const gameModel = require('../model/game_model');

// INSERT
gameRouter.post('/game', (req, res) => {
    // 승리 조건 시작 범위
    const range_begin = parseInt(req.body.range_begin);
    // 승리 조건 끝 범위
    const range_end = parseInt(req.body.range_end);
    // 승리 조건(칩 개수)
    const end_point = getRandom(range_begin, range_end);
    // 보너스 조건(칩 개수)
    const check_point = getRandom(1, end_point);
    // 한 사람이 한 게임에서 투자할 수 있는 횟수  
    const att_limit = getRandom(1, getDigit(end_point));
    // 한 사람이 한 번에 투자할 수 있는 칩의 개수
    const chip_limit = getRandom(parseInt(end_point / 100 * 5), parseInt(end_point / 100 * 20));
    const start_date = req.body.start_date;
    const finish_date = req.body.finish_date;
    console.log('body: ', req.body);
    console.log(start_date, finish_date);
    const game = {
        title: req.body.title,
        chip: 0,
        att_limit: att_limit,
        chip_limit: chip_limit,
        range_begin: range_begin,
        range_end: range_end,
        end_point: end_point,
        check_point: check_point,
        start_date: start_date,
        finish_date: finish_date
    };
    console.log(game);
    const duration = new Date(finish_date).getTime() - new Date(start_date).getTime();
    console.log(duration / 1000 + '초 지속');
    gameModel.insert(game).then(result => {
        setTimeout(() => { gameModel.delete(result.no).then(); }, duration);
        res.redirect('/game');
    }).catch(err => {
        res.status(500).send({err: err});
    });
});

// SELECTALL
gameRouter.get('/game', (req, res) => {
    gameModel.selectOn().then(result => {
        const data = {
            result: result[0],
            user: req.session.user
        }
        res.render('gamelist', {data: data});
    }).catch(err => {
        console.log("Error here: ", err);
        res.status(500).send({err: err});
    });
});

// SELECTONE
gameRouter.get('/game/:no', (req, res) => {
    const game_no = req.params.no;
    gameModel.selectOneByGameNo(game_no).then(result => {
        res.status(200).send({result: result});
    }).catch(err => {
        res.status(500).send({err: err});
    });
});

gameRouter.get('/creategame', (req, res) => {
    const data = {
        user: req.session.user
    }
    res.render('creategame', {data: data});
});

// UPDATE
// gameRouter.post('/game/:no', (req, res) => {
//     const game = {
//         chip: req.body.chip
//     };

//     gameModel.update(game).then(result => {
//         res.status(200).send({result: result});
//     }).catch(err => {
//         res.status(500).send({err: err});
//     });
// });

// DELETE
gameRouter.get('/deleteGame/:no', (req, res) => {
    const no = req.params.no;
    gameModel.delete(no).then(result => {
        res.status(200).send({result: result});
    }).catch(err => {
        res.status(500).send({err: err});
    });
});

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDigit(num) {
    num = num.toString();
    digit = num.length;
    return digit;
}

module.exports = gameRouter;