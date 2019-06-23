const express = require('express');
const dataRouter = express.Router();
const dataModel = require('../model/data_model');

// INSERT
dataRouter.get('/data', (req, res) => {
    dataModel.selectAll().then(results => {
        const data = {
            result: result[0],
            user: req.session.user
        }
        res.render('data', {data: data});
    }).catch(err => {
        res.status(500).send(err);
    });
});

module.exports = dataRouter;