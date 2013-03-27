/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var IndexController = 
{
    __name__ : "IndexController", 
    __proto__ : Dew("use", "Server.Web.Controller.ActionController"), 
    
    indexAction : function ()
    {
        this.response.end(this.view.fetch("index.tpl"));
    }
};

module.exports = IndexController;