const express = require('express');
const userRouter = express.Router();
const userModel = require('../model/user_model');

// INSERT
userRouter.post('/user', (req, res) => {
    const user = {
        id: req.body.id,
        password: req.body.password, 
        nickname: req.body.nickname, 
        chip: 5000, 
        game_att: 0,
        game_win: 0
    };

// SELECTALL
userRouter.get('/user', (req, res) => {
    userModel.selectAll().then(result => {
        res.status(200).send({result: result[0]});
    }).catch(err => {
        res.status(500).send({err: err});
    });
});

// SELECTONE
userRouter.get('/user/:no', (req, res) => {
    const user_no = req.params.no;
    userModel.selectOne(user_no).then(result => {
        res.status(200).send({result: result});
    }).catch(err => {
        res.status(500).send({err: err});
    });
})

// UPDATE(투자 시 접근)
userRouter.post('/user/:no', (req, res) => {
    const user = {
        no: req.params.no, 
        chip: req.body.chip, 
        game_att: req.body.game_att,
        game_win: req.body.game_win
    };

    userModel.update(user).then(result => {
        res.status(200).send({result: result});
    }).catch(err => {
        res.status(500).send({err: err});
    });
});

// DELETE
userRouter.get('/deleteUser/:no', (req, res) => {
    const no = req.params.no;
    userModel.delete(no).then(result => {
        res.status(200).send({result: result});
    }).catch(err => {
        res.status(500).send({err: err});
    });
});

module.exports = userRouter;