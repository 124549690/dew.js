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
        var page = Math.max(this.request.getQuery("page") | 0, 1);
        
        this.view.assign({
          rowTotal : 188, 
          pageSize : 8, 
          pageStep : 7, 
          startIndex : page
        });
        this.response.end(this.view.fetch("index.tpl"));
    }
};

module.exports = IndexController;