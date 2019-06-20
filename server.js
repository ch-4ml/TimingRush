// 모듈 임포트
const express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

// 회원 라우터

// 게임 라우터

// 미들웨어 설정
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));

// 서버 가동


