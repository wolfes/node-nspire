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

API_TABSPIRE_REGEX = /\/api\/\d*\/tabspire\/([\w]*)/;

app.use(function(req, res, next) {
    console.log(req.originalUrl);
    var match = API_TABSPIRE_REGEX.exec(req.originalUrl);
    console.log(match);
    if (!match) {
        //console.log('no match');
        return next();
    }
    if (match.length < 2) {
        // Didn't find capture group for tabspire ID.
        //console.log('No capture group');
        return next();
    }
    req.tabspireId = match[1];
    if (req.tabspireId in socketById) {
        //console.log('Client id found: ' + req.tabspireId);
        req.tabspireIo = socketById[req.tabspireId];
    } else {
        res.send('Missing Tabspire Client Id');
        return next('Tabspire ClientId Missing.');
    }
    next();
});


/** GET + POST */
app.get('/', function(req, res) {
    res.send(
        'Welcome! <br /><br />This site connects Chrome & Vim with ' +
        '<a href=\'http://wstyke.com/tabspire/\'>Tabspire</a> and ' +
        '<a href=\'https://github.com/wolfes/vimspire\'>Vimspire</a>!' +
        '<br /><br />' +
        'More details coming soon!'
    );
});

app.post('/api/0/tabspire/:tabspireId/openTabByName', function(req, res) {
    api_tabspire.openTabByName(req, res);
});

app.post('/api/0/tabspire/:tabspireId/openGoogleSearch', function(req, res) {
    api_tabspire.openGoogleSearch(req, res);
});

app.post('/api/0/tabspire/:tabspireId/openURL', function(req, res) {
    api_tabspire.openURL(req, res);
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
        if ('oldSocketId' in data) {
            // Delete old socket.
            var oldSocketId = data['oldSocketId'];
            var oldSocket = socketById[oldSocketId];
            delete socketToId[oldSocket];
            delete socketById[oldSocketId];
        }
        var socketId = data['socketId'];
        socketById[socketId] = socket;
        socketToId[socket] = socketId;
    });
});

io.sockets.on('disconnect', function(socket) {
    if (socket in socketToId) {
        var socketId = socketToId[socket];
        delete socketToId[socket];
        delete socketById[socketId];
    }
});




server.listen(3000);
console.log('Listening on port 3000');
