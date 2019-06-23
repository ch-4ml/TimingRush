const express = require('express');
const dataRouter = express.Router();
const dataModel = require('../model/data_model');

// INSERT
dataRouter.get('/data', (req, res) => {
    dataModel.selectAll().then(results => {
        res.status(200).send(results[0]);
    }).catch(err => {
        res.status(500).send(err);
    });
});

module.exports = dataRouter;