var accounts = require("./../database/accounts.js");
var table = require("./../database/table.js");
var errors = require("./errors.js");

var feature = function() {

};

feature.prototype.pageId = function() {
    return "account";
};

feature.prototype.output = function(callback, req) {
    if (req.query.hasOwnProperty("get")) {
        if (req.query.get == "login") {
            if (req.query.hasOwnProperty("username") && req.query.hasOwnProperty("password")) {
                if (req.query.username && req.query.password) {
                    accounts.login(req.query.username, req.query.password, function(result, err) {
                        if (!err) {
                            req.session.account = result;
                        }
                    });
                }
            }
        } else callback(errors.get);

    } else callback(errors.general);
};

module.exports = feature;