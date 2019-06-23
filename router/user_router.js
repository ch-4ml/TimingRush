const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const userRouter = express.Router();
const userModel = require('../model/user_model');

userRouter.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

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
    userModel.selectOneByUserNo(user_no).then(result => {
        res.status(200).send({result: result});
    }).catch(err => {
        res.status(500).send({err: err});
    });
});

// UPDATE IN GAME
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

// SIGNUP FORM
userRouter.get('/signup', (req, res) => {
    res.redirect('/signup.html');
});

// SIGNUP
userRouter.post('/signup', (req, res) => {
    const user = {
        id: req.body.id,
        password: req.body.password, 
        nickname: req.body.nickname, 
        chip: 5000, 
        game_att: 0,
        game_win: 0
    };
    console.log(user);

    userModel.insert(user).then(result => {
        res.status(200).send({result: result});
        console.log('result: ', result);
    }).catch(err => {
        res.status(500).send({err: err});
        console.log('err: ', err);
    });
});

// LOGIN FORM
userRouter.get('/login', (req, res) => {
    res.redirect('/login.html');
});

// LOGIN
userRouter.post('/login', (req, res) => {
    const user = {
        id: req.body.id,
        password: req.body.password
    };
    userModel.selectOneByUser(user).then(result => {
        console.log('result: ', result[0][0]);
        if(result[0][0] != undefined) {
            if(req.session.user) {
                console.log('이미 로그인되어 있음');
                res.redirect('/game');
            } else {
                req.session.user = {
                    no: result[0][0].no,
                    id: result[0][0].id,
                    nickname: result[0][0].nickname,
                    chip: result[0][0].chip,
                    game_att: result[0][0].game_att,
                    game_win: result[0][0].game_win
                };
                console.log(req.session.user);
                res.redirect('/game');
            }
        }
        else {}
    });
});

// LOGOUT
userRouter.get('/logout', (req, res) => {
    if(req.session.user) {
        req.session.destroy(err => {
            console.log('세션 삭제 실패: ', err);
            return;
        });
        console.log('세션 삭제 성공');
        res.redirect('/login.html');
    }
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