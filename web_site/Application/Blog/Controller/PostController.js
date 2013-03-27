/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var LDate = Dew("use", "Lang.LDate");
var Pager = Dew("use", "Tool.Pager");
var HtmlSubString = Dew("use", "Tool.HtmlSubString");

var HttpRouter = Dew("use", "Server.Web.Router.HttpRouter");

var PostController = 
{
    __name__ : "PostController", 
    __proto__ : Dew("use", "Server.Web.Controller.ActionController"), 
    
    vaildPwdAction : function ()
    {
        var view = this.view;
        var session = this.session;
        var request = this.request;
        var response = this.response;
        
        var pid = Math.max(request.getQuery("pid") | 0, 1);
        var postPwdModel = this.model("use", "postPwd");
        postPwdModel.set("pid", pid);
        postPwdModel.getPwd(function (err, data)
        {
            if (err || !data.length || data[0].password !== request.getPost("pwd"))
            {
                view.assign("vaildpwdUrl", HttpRouter.assemble(
                  {controller : "PostController", action : "vaildPwdAction", module : "Blog"}, 
                  {pid : pid}));
                
                response.end(view.fetch("log_valid_pwd.tpl"));
            }
            else
            {
                var allowRead = session.get("allow_read", {});
                allowRead[pid] = true;
                session.set("allow_read", allowRead);
                
                response.statusCode = 301;
                response.redirectToRoute(
                  {controller : "PostController", action : "getAction", module : "Blog"}, 
                  {pid : pid});
                return response.end();
            }
        });
    }, 
    
    getAction : function ()
    {
        var view = this.view;
        var session = this.session;
        var request = this.request;
        var response = this.response;
        
        var pid = request.getQuery("pid") | 0;
        
        var postModel = this.model("use", "post");
        postModel.set("pid", pid);
        postModel.getPost(function (err, data)
        {
            if (err || !data.length || data[0].pid !== pid)
            {
                return response.end(view.fetch("404.tpl"));
            }
            
            var allowRead = session.get("allow_read", {});
            
            if (data[0].status & 4 && !(pid in allowRead))
            {
                response.statusCode = 301;
                response.redirectToRoute(
                  {controller : "PostController", action : "vaildPwdAction", module : "Blog"}, 
                  {pid : pid});
                return response.end();
            }
            
            var item, record = {isNext : false, isPrev : false};
            var i = 0, len = data.length;
            
            for (; i < len; i++)
            {
                item = data[i];
                
                if (item.pid == pid)
                {
                    item.ptime = LDate.format("Y-m-d H:i", item.ptime * 1000);
                    record.now = item;
                }
                else if (item.pid < pid)
                {
                    record.nextUrl = HttpRouter.assemble(
                      {controller : "PostController", action : "getAction", module : "Blog"}, 
                      {pid : item.pid});
                    
                    record.isNext = true;
                }
                else if (item.pid > pid)
                {
                    record.prevUrl = HttpRouter.assemble(
                      {controller : "PostController", action : "getAction", module : "Blog"}, 
                      {pid : item.pid});
                    
                    record.isPrev = true;
                }
            }
            
            var validCodeUrl = HttpRouter.assemble(
              {controller : "ValidController", action : "validCodeAction", module : "Blog"});
            
            var commentWriteUrl = HttpRouter.assemble(
              {controller : "CommentController", action : "writeAction", module : "Blog", method : "post"}, 
              {pid : pid});
            
            var commentReadUrl = HttpRouter.assemble(
              {controller : "CommentController", action : "readAction", module : "Blog"}, 
              {pid : pid, page : "#page#"});
            
            view.assign
            ({
                title : record.now.title, 
                data : record, 
                validCodeUrl : validCodeUrl, 
                commentWriteUrl : commentWriteUrl, 
                commentReadUrl : commentReadUrl, 
                timer : (new Date() - request.requestTime) / 1000
            });
            
            postModel.updateViewCount(function ()
            {
                response.end(view.fetch("read.tpl"));
            });
        });
    }, 
    
    getsAction : function ()
    {
        var view = this.view;
        var session = this.session;
        var request = this.request;
        var response = this.response;
        
        var querys = request.querys;
        var options = this.get("siteOptions");
        var postModel = this.model("use", "post");
        
        if ("tid" in querys)
        {
            var tid = Math.max(querys.tid | 0, 1);
            
            postModel.set("tid", tid);
            postModel.countTotalRow(getTotalRow);
        }
        else
        {
            postModel.countTotalRow(getTotalRow);
        }
        
        // getTotalRow -> getPostsData
        
        function getTotalRow (err, data)
        {
            if (err)
            {
                response.statusCode = 500;
                return response.end();
            }
            
            var rowTotal = data[0].row;
            var pageSize = options.logPageSize;
            var pageTotal = Math.max(Math.ceil(rowTotal / pageSize), 1);
            var startIndex = Math.min(Math.max(querys.page | 0, 1), pageTotal);
            var param = {page : "#page#"};
            
            if (postModel.has("tid"))
            {
                param.tid = postModel.get("tid");
            }
            
            var url = HttpRouter.assemble(
              {controller : "PostController", action : "getsAction", module : "Blog"}, param);
            
            var pager = Pager.getInstance
            ({
                url : url, 
                rowTotal : rowTotal, 
                pageSize : pageSize, 
                startIndex : startIndex
            });
            
            view.assign("pagers", pager.output());
            
            postModel.set({pageSize : pageSize, startIndex : startIndex});
            
            if (postModel.has("tid"))
            {
                postModel.getAllPostTag(getPostsData);
            }
            else
            {
                postModel.getAllPost(getPostsData);
            }
        }
        
        function getPostsData (err, data)
        {
            if (err)
            {
                response.statusCode = 500;
                return response.end();
            }
            
            var item, ptime, pid;
            var i = 0, len = data.length;
            var allowRead = session.get("allow_read", {});
            
            for (; i < len; i++)
            {
                item = data[i];
                
                pid = item.pid;
                ptime = item.ptime * 1000;
                
                item.day = LDate.format("d", ptime);
                item.monthYear = LDate.format("m/Y", ptime);
                item.url = HttpRouter.assemble(
                  {controller : "PostController", action : "getAction", module : "Blog"}, 
                  {pid : pid});
                
                if (item.status & 4)
                {
                    if (!(pid in allowRead))
                    {
                        item.isPwd = true;
                        continue;
                    }
                }
                
                item.isPwd = false;
                item.content = HtmlSubString(item.content, 200, 
                  "<span class=\"read-more\"><a target=\"_blank\" href=\"" 
                  + item.url + "\">[继续阅读......]</a></span>");
            }
            
            view.assign({posts : data, timer : (new Date() - request.requestTime) / 1000});
            response.end(view.fetch("index.tpl"));
        }
    }
};

module.exports = PostController;