
// Constructor
var page = function()
{
}

/**
 * the id used to associate with the page
 * @return {string} the page get
 */
page.prototype.pageId = function()
{

}

/**
 * used for the body of the page
 */
page.prototype.body = function()
{

}

/**
 * the name that is displayed on the menu
 * @return {string} the menu name
 */
page.prototype.menuName = function()
{
	return "";
}

/**
 * the data used by the jade parser 
 * @return {string} jade date
 */
page.prototype.data = function()
{
	return {};
}

module.exports = page;