/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var HttpRouter = Dew("use", "Server.Web.Router.HttpRouter");

var AdminCenterController = 
{
    __name__ : "AdminCenterController", 
    __proto__ : Dew("use", "Server.Web.Controller.ActionController"), 
    
    indexAction : function ()
    {
        var view = this.view;
        var session = this.session;
        var request = this.request;
        var response = this.response;
        
        var pingUrl = HttpRouter.assemble(
          {controller : "AdminCenterController", action : "pingAction", module : "Blog"});
        
        var postViewUrl = HttpRouter.assemble(
          {controller : "AdminPostController", action : "viewAction", module : "Blog"}, 
          {page : "#page#"});
        
        var postEditUrl = HttpRouter.assemble(
          {controller : "AdminPostController", action : "editAction", module : "Blog"}, 
          {pid : "#id#"});
        
        var postSaveUrl = HttpRouter.assemble(
          {controller : "AdminPostController", action : "saveAction", module : "Blog", method : "post"}, 
          {pid : "#id#"});
        
        var postDelUrl = HttpRouter.assemble(
          {controller : "AdminPostController", action : "delAction", module : "Blog"}, 
          {pid : "#id#"});
        
        var postAddUrl = HttpRouter.assemble(
          {controller : "AdminPostController", action : "addAction", module : "Blog", method : "post"});
        
        var commentViewUrl = HttpRouter.assemble(
          {controller : "CommentController", action : "viewAction", module : "Blog"}, 
          {page : "#page#"});
        
        var commentDelUrl = HttpRouter.assemble(
          {controller : "CommentController", action : "delAction", module : "Blog"}, 
          {cid : "#id#"});
        
        var commentReadUrl = HttpRouter.assemble(
          {controller : "CommentController", action : "readOneAction", module : "Blog"}, 
          {cid : "#id#"});
        
        var dewConfigSetUrl = HttpRouter.assemble(
          {controller : "OptionsController", action : "setAction", module : "Blog", method : "post"});
        
        var dewConfigGetUrl = HttpRouter.assemble(
          {controller : "OptionsController", action : "getAction", module : "Blog"});
        
        view.assign
        ({
            pingUrl : pingUrl, 
            postViewUrl : postViewUrl, 
            postEditUrl : postEditUrl, 
            postSaveUrl : postSaveUrl, 
            postDelUrl : postDelUrl, 
            postAddUrl : postAddUrl, 
            commentViewUrl : commentViewUrl, 
            commentDelUrl : commentDelUrl, 
            commentReadUrl : commentReadUrl, 
            dewConfigSetUrl : dewConfigSetUrl, 
            dewConfigGetUrl : dewConfigGetUrl
        });
        
        response.end(view.fetch("center.tpl"));
    }, 
    
    pingAction : function ()
    {
        this.response.end("ok");
    }
};

module.exports = AdminCenterController;