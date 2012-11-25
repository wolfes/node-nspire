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
    console.log(req.body.data);
    req.tabspireIo.emit('tab:openByName', {
       'name': req.body.tabName
    });
    res.send('');
};


