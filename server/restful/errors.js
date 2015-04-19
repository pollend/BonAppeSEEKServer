var _custom = function(err) {
    return {
        id: -1,
        "error": err
    }

}

module.exports = {
    "custom": _custom,
    "id": {
        id: 0,
        "error": "illegal Id"
    },
    "general": {
        id: 1,
        "error": "illegal input"
    },
    "get": {
        id: 2,
        "error": "unknown get"
    },
    "empty": {
        id: 3,
        "error": "no entries found"
    },
    "usernameUsed": {
        id: 4,
        "error": "username already used"
    }

};