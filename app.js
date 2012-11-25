/**
 * Connect tabspire + vimspire!
 * @author Wolfe Styke - <wstyke@gmail.com>
 */
var express = require('express');
var redis = require('redis');
var io = require('socket.io');

var api_tabspire = require('./api/v0/api_tabspire.js');

var db = redis.createClient();
var app = express(),
    server = require('http').createServer(app),
    io = io.listen(server);

/** MIDDLE-WARE */
app.use(express.bodyParser());

/*
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
*/

API_TABSPIRE_REGEX = /\/api\/\d*\/tabspire\/([\w]*)/;

app.use(function(req, res, next) {
    var match = API_TABSPIRE_REGEX.exec(req.originalUrl);
    if (match.length !== 2) {
        // Didn't find capture group for tabspire ID.
        return next({});
    }
    req.tabspireId = match[1];
    if (req.tabspireId in socketById) {
        req.tabspireIo = socketById[req.tabspireId];
    }
    next();
});


/** GET + POST */
app.get('/', function(req, res) {
    // res.send(req.online.length + ' users online');
});

app.post('/api/0/tabspire/:tabspireId/openTabByName', function(req, res) {
    api_tabspire.openTabByName(req, res);
});

var socketById = {};
var socketToId = {};

/**  SOCKET.IO  */
io.sockets.on('connection', function(socket) {
    lastSocket = socket;
    socket.emit('testFromServer', { hello: 'world' });
    socket.on('testFromExt', function(data) {
        console.log(data);
    });

    socket.on('id:register', function(data) {
        if (!('socketId' in data)) {
            return;
        }
        var socketId = data['socketId'];
        socketById[socketId] = socket;
        socketToId[socket] = socketId;
    });
});

io.sockets.on('disconnect', function(socket) {
    var socketId = socketToId[socket];
    delete socketToId[socket];
    delete socketById[socketId];
});




server.listen(3000);
console.log('Listening on port 3000');
