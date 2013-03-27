/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var Ip = Dew("use", "Tool.Ip"); 
var Pager = Dew("use", "Tool.Pager");
var Iconv = Dew("use", "Tool.Iconv");
var LString = Dew("use", "Lang.LString");

var HttpRouter = Dew("use", "Server.Web.Router.HttpRouter");

var writeState = 
{
		validCodeError: 0,  // 验证码错误
		validCodeExpire: 1, // 验证码过期
		maxTextError: 2,    // 文本过长
		minTextError: 3,    // 文本过短
		maxNameError: 4,    // 昵称过长
		minNameError: 5,    // 昵称过短
		nameError: 6,       // 用户名错误
		notAllowComment: 7, // 不允许评论
		done: 8,            // 完成
    failure : 9         // 失败
};

var maxNameLength = 16;
var minNameLength = 4;
var maxTextLength = 280;
var minTextLength = 14;

var CommentController = 
{
    __name__ : "CommentController", 
    __proto__ : Dew("use", "Server.Web.Controller.ActionController"), 
    
    writeAction : function ()
    {
        var session = this.session;
        var request = this.request;
        var response = this.response;
        var options = this.get("siteOptions");
        
        var self = this;
        var posts = request.posts;
        var querys = request.querys;
        
        if (!options.allowComment)
        {
            return response.end("{\"state\":" + writeState.notAllowComment + "}");
        }
        
        if (session.get("valid_code") != posts.code)
        {
            return response.end("{\"state\":" + writeState.validCodeError + "}");
        }
        
        session.remove("valid_code");
        
        var name = "nickname" in posts ? posts.nickname : "";
        name = LString.stripTags(name.trim().replace(/[\x00-\x1F　]/g, ""));
        var nameLength = LString.strlen(name, "GBK", 2);
        
        if (maxNameLength < nameLength)
        {
            return response.end("{\"state\":" + writeState.maxNameError + "}");
        }
        else if (minNameLength > nameLength)
        {
            return response.end("{\"state\":" + writeState.minNameError + "}");
        }
        
        var content = "text" in posts ? posts.text : "";
        content = LString.stripTags(content.trim().replace(/^　|　$/g, ""));
        var contentLength = content.length;
        
        if (maxTextLength < contentLength)
        {
            return response.end("{\"state\":" + writeState.maxTextError + "}");
        }
        else if (minTextLength > contentLength)
        {
            return response.end("{\"state\":" + writeState.minTextError + "}");
        }
        
        var pid = Math.max(querys.pid | 0, 1);
        
        var postModel = this.model("use", "post");
        postModel.set("pid", pid);
        postModel.checkPostId(function (err, data)
        {
            if (err || !data.length)
            {
                console.log(1)
                return response.end("{\"state\":" + writeState.failure + "}");
            }
            
            var time = new Date() / 1000 | 0;
            var commentModel = self.model("use", "comment");
            commentModel.set
            ({
                pid : pid, 
                name : Iconv("utf16", "utf8", LString.addSlashes(name)), 
                text : Iconv("utf16", "utf8", LString.addSlashes(content)), 
                ip : Ip.ip2long(request.userHostAddress), 
                time : time
            });
            
            commentModel.write(function (err)
            {
                if (err)
                {
                    return response.end("{\"state\":" + writeState.failure + "}");
                }
                
                postModel.updateCommentCount(function ()
                {
                    response.end(JSON.stringify(
                      {state: writeState.done, user: name, content: content, time: time}));
                });
            });
        });
    }, 
    
    readAction : function ()
    {
        var request = this.request;
        var response = this.response;
        var options = this.get("siteOptions");
        
        var pid = Math.max(request.getQuery("pid") | 0, 1);
        var page = Math.max(request.getQuery("page") | 0, 1);
        
        var commentModel = this.model("use", "comment");
        commentModel.set("pid", pid);
        commentModel.countTotalRow(function (err, data)
        {
            if (err)
            {
                response.statusCode = 500;
                return response.end();
            }
            
            var rowTotal = data[0].row;
            var pageSize = options.commentPageSize;
            var pageTotal = Math.max(Math.ceil(rowTotal / pageSize), 1);
            var startIndex = Math.min(page, pageTotal);
            
            commentModel.set({startIndex : startIndex, pageSize : pageSize});
            commentModel.read(function (err, data)
            {
                if (err)
                {
                    response.statusCode = 500;
                    return response.end();
                }
                
                var url = HttpRouter.assemble(
                  {controller : "CommentController", action : "readAction", module : "Blog"}, 
                  {pid: pid, page : "#page#"});
                
                var pager = Pager.getInstance
                ({
                    url : url, 
                    rowTotal : rowTotal, 
                    pageSize : pageSize, 
                    startIndex : startIndex
                }).output();
                
                response.end(JSON.stringify({data : data, pagers : pager}));
            });
        });
    }, 
    
    viewAction : function ()
    {
        var request = this.request;
        var response = this.response;
        
        var page = Math.max(request.getQuery("page") | 0, 1);
        var commentModel = this.model("use", "comment");
        commentModel.countTotalRow(function (err, data)
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
            
            commentModel.set({startIndex : startIndex, pageSize : pageSize});
            commentModel.view(function (err, data)
            {
                if (err)
                {
                    response.statusCode = 500;
                    return response.end();
                }
                
                response.end(JSON.stringify(
                {
                    comment : data, 
                    pages : 
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
    
    delAction : function ()
    {
        var request = this.request;
        var response = this.response;
        
        var cid = request.getQuery("cid", "");
        var list = cid.split("-");
        var i = 0, len = list.length;
        
        for (; i < len; i++)
        {
            if (isNaN(list[i]))
            {
                response.statusCode = 500;
                return response.end();
            }
        }
        
        var commentModel = this.model("use", "comment");
        commentModel.set("list", list.join(","));
        commentModel.del(function (err, data)
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
    
    readOneAction : function ()
    {
        var request = this.request;
        var response = this.response;
        
        var cid = Math.max(request.getQuery("cid") | 0, 1);
        var commentModel = this.model("use", "comment");
        commentModel.set("cid", cid);
        commentModel.readOne(function (err, data)
        {
            if (err || !data.length)
            {
                response.statusCode = 500;
                return response.end();
            }
            
            response.end(JSON.stringify(data[0]));
        });
    }
};

module.exports = CommentController;