var _entriesToJson = function(entries) {
    var ljson = [];
    for (var x = 0; x < entries.length; x++) {
        ljson.push(entries[x].toJson());
    }
    return ljson;
}

module.exports = {
    entriresToJson: _entriesToJson
}