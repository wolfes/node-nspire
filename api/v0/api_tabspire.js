/**
 * API v0.0 -- Experimental :)
 * Author: Wolfe Styke - <wstyke@gmail.com>
 */


/**
 * Open tab by name in tabspire.
 * @param {object} req The request.
 * @param {object} res The response.
 */
exports.openTabByName = function(req, res) {
    req.tabspireIo.emit('tab:openByName', {
       'name': req.body.tabName
    });
    res.send('');
};

/**
 * Open tab with google search query.
 * @param {object} req The request.
 * @param {object} res The response.
 */
exports.openGoogleSearch = function(req, res) {
    req.tabspireIo.emit('search:normal', {
        'query': req.body.query
    });
    res.send('');
};
