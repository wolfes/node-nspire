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
 * Reload tab by name in tabspire.
 * @param {object} req The request.
 * @param {object} res The response.
 */
exports.reloadTabByName = function(req, res) {
    req.tabspireIo.emit('tab:reloadByName', {
       'tabName': req.body.tabName
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

/**
 * Open tab with specified url..
 * @param {object} req The request.
 * @param {object} res The response.
 */
exports.openURL = function(req, res) {
    req.tabspireIo.emit('tab:openByURL', {
        'url': req.body.url
    });
    res.send('');
};

/**
 * Reload currently focused tab.
 * @param {object} req The request.
 * @param {object} res The response.
 */
exports.reloadCurrentTab = function(req, res) {
    req.tabspireIo.emit('tab:reloadCurrent', {});
    res.send('');
};

/**
 * Reload/Open & Focus Marked Tab.
 * @param {object} req The request.
 * @param {object} res The response.
 */
exports.reloadFocusMark = function(req, res) {
    req.tabspireIo.emit('tab:reloadFocusMark', {
        'mark': req.body.markChar
    });
    res.send('');
};

/**
 * Focus Marked Tab.
 * @param {object} req The request.
 * @param {object} res The response.
 */
exports.focusMark = function(req, res) {
    req.tabspireIo.emit('tab:focusMark', {
        'mark': req.body.markChar
    });
    res.send('');
};

/**
 * Focus the focused tab.  Causes Chrome to gain focus.
 * @param {object} req The request.
 * @param {object} res The response.
 */
exports.focusCurrentWindow = function(req, res) {
    req.tabspireIo.emit('window:focusCurrent', {});
    res.send('');
};
