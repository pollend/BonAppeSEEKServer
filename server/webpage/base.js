var createWebpage = function(pages,id,app)
{
 app.get(pages[id].pageId(),function(req,res){
    
       //list out all the associated pages
       var menu_items = [];
       for (var i = 0; i < pages.length; i++) 
       {
         if(pages[i].menuName() !== "")
         {
           menu_items.push({
           name:pages[i].menuName(),
           link:__config.url + pages[i].pageId()});
         }
       }
       //render the jade
       //
       pages[id].data(function(output)
       {

         res.render(pages[id].body(),
          {
            data:output,
            active_menu_name:pages[id].menuName(),
            menu:menu_items})
          });
       });
}

var base = function(app)
{

 //pages
 var pages = [];

 //creates a page object for this association
 var home = require("./home");
 pages.push(new home());


 for (var i = 0; i < pages.length; i++) 
 {
  createWebpage(pages,i,app);
  
 }

}

module.exports = base;