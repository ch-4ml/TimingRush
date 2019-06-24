const express = require('express');
const router = express.Router();

const userRouter = require('./user_router');
const gameRouter = require('./game_router');
const dataRouter = require('./data_router');
const userModel = require('../model/user_model');
const gameModel = require('../model/game_model');
const dataModel = require('../model/data_model');
const moment = require('moment'); require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

router.use(userRouter);
router.use(gameRouter);
router.use(dataRouter);

// 게임 방 참여
router.get('/join/:game_no', (req, res) => {
    game_no = req.params.game_no;
    user_no = req.session.user.no;
    gameModel.selectOneByGameNo(game_no).then(result => {
        game = {
            no: result[0][0].no,
            title: result[0][0].title,
            att_limit: result[0][0].att_limit,
            chip_limit: result[0][0].chip_limit,
            range_begin: result[0][0].range_begin,
            range_end: result[0][0].range_end,
            start_date: result[0][0].start_date,
            finish_date: result[0][0].finish_date
        }
        dataModel.selectCountByUserNoAndGameNo(user_no, game_no).then(result => {
            const att_count = result[0][0]['COUNT(no)'];
            console.log(att_count);
            console.log(game);
            const data = {
                game: game,
                user: req.session.user,
                att_count: att_count
            };
            res.render('game', {data: data});
        }).catch(err => {res.status(500).send(err)});
    }).catch(err => {res.status(500).send(err)});    
});

// 게임 참여(RUSH)
router.post('/join/:game_no', (req, res) => {
    const game_no = req.params.game_no;
    let user = req.session.user;
    const rush_chip = parseInt(req.body.chip);
    if(rush_chip > user.chip) {
        res.status(500).send("칩이 부족합니다.");
    }
    dataModel.selectCountByUserNoAndGameNo(user.no, game_no).then(result => {
        let att_count = result[0][0]['COUNT(no)'];

        if(att_count == 0) user.game_att += 1;
        gameModel.selectOneByGameNo(game_no).then(result => {
            const game = result[0][0];
            const data = {
                user_no: user.no,
                game_no: game.no,
                nickname: user.nickname,
                att_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                rush_chip: rush_chip,
                win_check: 0
            }
            if(att_count >= game.att_limit) {
                res.status(200).send({msg: "Rush 횟수가 초과되었습니다."});
                return;
            }
            if(rush_chip > game.chip_limit) {
                res.status(200).send({msg: "Rush chip 제한이 초과되었습니다."});
                return;
            }
            if(rush_chip + game.chip >= game.check_point) {
                game.check_status = 1; // 체크포인트 달성
                user.chip += game.end_point * 20 / 100;
                data.win_check = 2;
            }
            if(rush_chip + game.chip >= game.end_point) {
                game.status = 0;
                user.chip += (game.end_point * 70 / 100);
                user.game_win += 1; 
                data.win_check = 1;
            }
            att_count += 1;
            game.chip += rush_chip;
            user.chip -= rush_chip;
            dataModel.insert(data).then(result => {
                userModel.update(user).then(result => {
                    gameModel.update(game).then(result => {
                        userModel.selectOneByUserNo(user_no).then(result => { // 6
                            req.session.user = result[0][0];
                            gameModel.selectOneByGameNo(game.no).then(result => { // 7
                                const data = {
                                    user: req.session.user,
                                    game: result[0][0],
                                    att_count: att_count
                                };
                               res.status(200).send({data: data});
                            }).catch(err => {res.status(500).send(err)});
                        }).catch(err => {res.status(500).send(err)});
                    }).catch(err => {res.status(500).send(err)});
                }).catch(err => {res.status(500).send(err)});
            }).catch(err => {res.status(500).send(err)});
        }).catch(err => {res.status(500).send(err)});
    });
});

module.exports = router;