/**
 * Connect tabspire + vimspire!
 * @author Wolfe Styke - <wstyke@gmail.com>
 */
var express = require('express');
var redis = require('redis');

var db = redis.createClient();
var app = express();


/** MIDDLE-WARE */
app.use(function(req, res, next) {
    var ua = req.headers['user-agent'];
    db.zadd('online', Date.now(), ua, next);
});

app.use(function(req, res, next) {
    var min = 60 * 1000;
    var ago = Date.now() - min;
    db.zrevrangebyscore('online', '+inf', ago, function(err, users) {
    if (err) return next(err);
        req.online = users;
        next();
    });
});


/** GET + POST */
app.get('/', function(req, res) {
   res.send(req.online.length + ' users online');
});


app.get('/hello.txt', function(req, res) {
    res.send('Hello World');
});



app.listen(3000);
console.log('Listening on port 3000');
