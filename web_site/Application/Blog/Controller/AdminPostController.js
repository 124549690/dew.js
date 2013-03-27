/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var Iconv = Dew("use", "Tool.Iconv");
var LString = Dew("use", "Lang.LString");

var AdminPostController = 
{
    __name__ : "AdminPostController", 
    __proto__ : Dew("use", "Server.Web.Controller.ActionController"), 
    
    viewAction : function ()
    {
        var request = this.request;
        var response = this.response;
        
        var page = Math.max(request.getQuery("page") | 0, 1);
        var postModel = this.model("use", "post");
        postModel.countTotalRow(function (err, data)
        {
            if (err)
            {
                response.statusCode = 500;
                return response.end();
            }
            
            var rowTotal = data[0].row;
            var pageSize = 50;
            var pageTotal = Math.max(Math.ceil(rowTotal / pageSize), 1);
            var startIndex = Math.min(page, pageTotal);
            
            postModel.set({pageSize : pageSize, startIndex : startIndex});
            postModel.postAllView(function (err, data)
            {
                if (err)
                {
                    response.statusCode = 500;
                    return response.end();
                }
                
                var i = 0, len = data.length;
                
                for (; i < len; i++)
                {
                    data[i].content = LString.stripTags(data[i].content);
                }
                
                response.end(JSON.stringify(
                {
                    table: data, 
                    pages: 
                    {
                        totalRows: rowTotal, 
                        totalPages: pageTotal, 
                        perPageRow: pageSize, 
                        nowPage: startIndex
                    }
                }));
            });
        });
    }, 
    
    editAction : function ()
    {
        var request = this.request;
        var response = this.response;
        
        var self = this;
        var pid = Math.max(request.getQuery("pid") | 0, 1);
        
        var postPwdModel = this.model("use", "postPwd");
        postPwdModel.set("pid", pid);
        postPwdModel.getPwd(function (err, data)
        {
            var pwd = !data.length ? false : data[0].password
            
            var postModel = self.model("use", "post");
            postModel.set("pid", pid);
            postModel.postView(function (err, data)
            {
                if (err)
                {
                    response.statusCode = 500;
                    return response.end();
                }
                
                response.end(JSON.stringify({data: data[0], pwd: pwd}));
            });
        });
    }, 
    
    saveAction : function ()
    {
        var request = this.request;
        var response = this.response;
        var posts = request.posts;
        var querys = request.querys;
        
        var self = this;
        var pid = Math.max(querys.pid | 0, 1);
        var pwd = "pass" in posts ? posts.pass : "";
        var isExistsPwd = Boolean(pwd.length);
        
        var title = "title" in posts ? posts.title : "no title";
        title = LString.addSlashes(Iconv("utf16", "utf8", title));
        
        var content = "content" in posts ? posts.content : "no content";
        content = LString.addSlashes(Iconv("utf16", "utf8", content));
        
        var postModel = this.model("use", "post");
        postModel.set({pid : pid, title : title, content : content, isExistsPwd : isExistsPwd});
        postModel.postEdit(savePost);
        
        // savePost -> handlePostPwd
        
        function savePost (err, data)
        {
            if (err)
            {
                response.statusCode = 500;
                return response.end();
            }
            
            var postPwdModel = self.model("use", "postPwd");
            postPwdModel.set("pid", pid);
            
            if (isExistsPwd)
            {
                postPwdModel.set("pwd", pwd);
                postPwdModel.setPwd(handlePostPwd);
            }
            else
            {
                postPwdModel.removePwd(handlePostPwd);
            }
        }
        
        function handlePostPwd ()
        {
            response.end("{\"state\":1}");
        }
    }, 
    
    delAction : function ()
    {
        var request = this.request;
        var response = this.response;
        
        var pid = request.getQuery("pid", "");
        var list = pid.split("-");
        var i = 0, len = list.length;
        
        for (; i < len; i++)
        {
            if (isNaN(list[i]))
            {
                response.statusCode = 500;
                return response.end();
            }
        }
        
        var postModel = this.model("use", "post");
        postModel.set("list", list.join(","));
        postModel.postDel(function (err, data)
        {
            if (err)
            {
                response.statusCode = 500;
                response.end();
            }
            else
            {
                response.end("{\"state\":1}");
            }
        });
    }, 
    
    addAction : function ()
    {
        var request = this.request;
        var response = this.response;
        var posts = request.posts;
        
        var self = this;
        var pwd = "pass" in posts ? posts.pass : "";
        var isExistsPwd = Boolean(pwd.length);
        
        var title = posts.title || "no title";
        title = LString.addSlashes(Iconv("utf16", "utf8", title));
        
        var content = posts.content || "no content";
        content = LString.addSlashes(Iconv("utf16", "utf8", content));
        
        var postModel = this.model("use", "post");
        postModel.set({title : title, content : content, isExistsPwd : isExistsPwd});
        postModel.postAdd(savePost);
        
        // savePost -> handlePostPwd ?
        
        function savePost (err, data, extInfo)
        {
            if (err || !extInfo.insertID)
            {
                response.statusCode = 500;
                return response.end();
            }
            
            if (!isExistsPwd)
            {
                return response.end("{\"state\":1}");
            }
            
            var postPwdModel = self.model("use", "postPwd");
            postPwdModel.set({pid : extInfo.insertID, pwd : pwd});
            postPwdModel.setPwd(handlePostPwd);
        }
        
        function handlePostPwd ()
        {
            response.end("{\"state\":1}");
        }
    }
};

module.exports = AdminPostController;