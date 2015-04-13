
// Constructor
var Page = function()
{
}

/**
 * the id used to associate with the page
 * @return {string} the page get
 */
Page.prototype.pageId = function()
{

}

/**
 * used for the body of the page
 */
Page.prototype.body = function()
{

}

/**
 * the name that is displayed on the menu
 * @return {string} the menu name
 */
Page.prototype.menuName = function()
{
	return "";
}

/**
 * the data used by the jade parser 
 * @return {string} jade date
 */
Page.prototype.data = function()
{
	return {};
}

module.exports = Page;