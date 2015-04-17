var crypto = require('crypto');
var accounts = require("accounts.js");

var phoneToken = function(result) {
    this._accountId = result.accountId;
    this._token = result.token;
};

phoneToken.prototype.getAccount = function(callback) {
    accounts.byId(this._accountId, callback);
};


var _generateToken = function() {
    return crypto.createHash('sha256').update(__config.token_salt + Math.random()).digest('base64');
};

var _getTokensById = function(accountId, callback) {
    __db.query("SELECT * FROM phoneTokens WHERE accountId = ?", [accountId], function(err, results) {
        if (err) {
            console.log(err);
            callback(null);
        }
        var ltokens = [];
        for (var x = 0; x < results.length; x++) {
            ltokens.push(new phoneToken(results[x]));
        }
        callback(ltokens);
    });
};

var _getAccountByToken = function(token, callback) {
    __db.query("SELECT phoneTokens.*, accounts.* FROM phoneTokens INNER JOIN accounts ON phoneTokens.accountId = accounts.id WHERE phoneTokens.token = ?", [token], function(err, results) {
        if (err) {
            console.log(err);
            callback(null);
        }
        var laccount = null;
        for (var x = 0; x < results.length; x++) {
            laccount = new accounts._account(results[x]);
        }
        callback(laccount);
    });
};

var _create = function(account) {
    var ltoken = {
        "accountId": account,
        "token": _generateToken()
    };

    __db.query("INSERT INTO phoneTokens SET ?", laccount, function(err, result) {
        if (err) {
            callback(null);
            console.log(err);
        }
        callback(new account(ltoken));

    });

};

var _verify = function() {
    __db.query("CREATE TABLE IF NOT EXISTS  `phoneTokens` ( \
  `accountId` INT , \
  `token` VARCHAR(45));");
};

module.exports = {
    verify: _verify,
    getTokensById: _getTokensById,
    getAccountsByToken: _getAccountByToken
};