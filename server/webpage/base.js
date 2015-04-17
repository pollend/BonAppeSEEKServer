var defaultMenu = require("./menu/defaultMenu.js");

var createWebpage = function(pages, id, app) {
    app.get(pages[id].pageId(), function(req, res) {

        //render the jade
        pages[id].data(function(output) {
            res.render(pages[id].body(), {
                URL: __config.url,
                menus: defaultMenu,
                data: output
            });
        });
    });
};

var base = function(app) {

    //pages
    var pages = [];

    //creates a page object for this association
    var home = require("./home");
    pages.push(new home());


    for (var i = 0; i < pages.length; i++) {
        createWebpage(pages, i, app);

    }

};

module.exports = base;