var _entriesToJson = function(entries) {
    var ljson = [];
    for (var x = 0; x < entries.length; x++) {
        ljson.push(entries[x].toJson());
    }
    return ljson;
}

var _checkError = function(err, connection, callback) {
    if (err) {
        connection.release();
        console.log(err);
        if (callback && typeof callback == "function") {
            callback(null, err);
        }
        return false;
    }
    return true;
}

module.exports = {
    entriresToJson: _entriesToJson,
    checkError: _checkError
}