var _createRest = function(interfaces, id, app) {

    app.get("/rest/" + interfaces[id].pageId(), function(req, res) {
        console.log(req.query);

        interfaces[id].output(function(json) {
            try {
                res.send({
                    data: json
                });
            } catch (err) {
                res.send({
                    error: json
                });
            }
        }, req);

    });
}

var base = function(app) {

    //pages
    var interfaces = [];

    //creates a page object for this association
    var food = require("./food.js");
    interfaces.push(new food());

    var meal = require("./meal.js");
    interfaces.push(new meal());

    var feature = require("./feature.js");
    interfaces.push(new feature());

    for (var i = 0; i < interfaces.length; i++) {
        _createRest(interfaces, i, app);
    }
}

module.exports = base;