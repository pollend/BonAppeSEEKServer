var phoneToken = function(result) {
    this._accountId = result.accountId;
    this._token = result.token;
}

phoneToken.prototype.getAccount = function() {};

var _getTokens = function(accountId, callback) {
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


var _verify = function() {
    __db.query("CREATE TABLE IF NOT EXISTS  `phoneTokens` ( \
  `accountId` INT , \
  `token` VARCHAR(45));");
};

module.exports = {
    verify: _verify
};