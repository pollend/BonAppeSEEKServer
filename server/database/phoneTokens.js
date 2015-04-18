var crypto = require('crypto');
var accounts = require("accounts.js");
var table = require("./table.js");

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
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("SELECT * FROM phoneTokens WHERE accountId = ?", [accountId], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    var ltokens = [];
                    for (var x = 0; x < results.length; x++) {
                        ltokens.push(new phoneToken(results[x]));
                    }
                    callback(ltokens);
                    connection.release();
                }
            });
        }
    });
};

var _getAccountByToken = function(token, callback) {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection)) {
            connection.query("SELECT phoneTokens.*, accounts.* FROM phoneTokens INNER JOIN accounts ON phoneTokens.accountId = accounts.id WHERE phoneTokens.token = ?", [token], function(err, results) {
                if (table.checkError(err, connection, callback)) {
                    var laccount = null;
                    for (var x = 0; x < results.length; x++) {
                        laccount = new accounts._account(results[x]);
                    }
                    callback(laccount);
                    connection.release();
                }
            });
        }
    });
};

var _create = function(account) {
    var ltoken = {
        "accountId": account.getId(),
        "token": _generateToken()
    };
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection, callback)) {
            connection.query("INSERT INTO phoneTokens SET ?", ltoken, function(err, result) {
                if (table.checkError(err, connection, callback)) {
                    callback(new accounts._account(ltoken));
                    connection.release();
                }
            });
        }
    });

};

var _verify = function() {
    __db.getConnection(function(err, connection) {
        if (table.checkError(err, connection)) {
            connection.query("CREATE TABLE IF NOT EXISTS  `phoneTokens` ( \
          `accountId` INT , \
          `token` VARCHAR(45));", function(err, results) {
                if (table.checkError(err, connection))
                    connection.release();
            });
        }
    });
};

module.exports = {
    verify: _verify,
    getTokensById: _getTokensById,
    getAccountsByToken: _getAccountByToken
};