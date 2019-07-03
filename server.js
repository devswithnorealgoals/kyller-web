// server.js
require("dotenv").config()
var express = require('express');
// var path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require("body-parser");
var cors = require('cors')

var firebase = require("firebase");
// Required for side-effects
require("firebase/functions");
var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

firebase.initializeApp(firebaseConfig);
var functions = firebase.functions();
var getGameInfos = firebase.functions().httpsCallable('getGameInfos');
var killed = firebase.functions().httpsCallable('killed');

app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(serveStatic(__dirname + "/dist"));
// routes(app);
app.get('/api/game/:id', function (req, res, next) {
    getGameInfos({ gameId: req.params.id }).then(function (result) {
        res.json(result.data)
    }, function(error) {
        res.json(error)
    });
})
app.post('/api/game/:id/killed', function (req, res, next) {
    killed({
        gameId: req.params.id,
        playerName: req.body.playerName,
        status: req.body.status
    }).then(function (result) {
        res.json(result.data)
    }, function(error) {
        res.json(error)
    })
})
var port = process.env.PORT || 5000;
app.listen(port);


console.log('server started ' + port);