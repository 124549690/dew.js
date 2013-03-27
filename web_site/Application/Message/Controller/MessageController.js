/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var LString = Dew("use", "Lang.LString");
var LDate = Dew("use", "Lang.LDate");
var Iconv = Dew("use", "Tool.Iconv");
var Pager = require("../Library/Pager");

var filterRegex = /[\x00-\x1f　]/g;

var MessageController = 
{
    __name__ : "MessageController", 
    __proto__ : Dew("use", "Server.Web.Controller.ActionController"), 
    
    _pageSize : 10, 
    
    readAction : function ()
    {
        var session = this.session;
        var request = this.request;
        var response = this.response;
        
        var self = this;
        var pageTotal, startIndex;
        
        // countTotalRow -> getMessage -> getReply -> finish
        
        var messageModel = this.model("use", "message");
        messageModel.countTotalRow(countTotalRow);
        
        function countTotalRow (err, data)
        {
            if (err || !data.length) return response.end("未知错误...|3");
            
            var page = Math.max(request.getQuery("page") | 0, 1);
            
            pageTotal = Math.ceil(data[0].row / self._pageSize);
            startIndex = Math.min(page, pageTotal);
            
            messageModel.set({startIndex : startIndex, pageSize : self._pageSize});
            messageModel.getMessage(getMessage);
        }
        
        var count, message;
        
        function getMessage (err, data)
        {
            if (err || !data.length) return response.end("未知错误...|3");
            
            message = [];
            count = data.length;
            
            for (var index = 0; index < count; index++)
            {
                message[index] = [data[index]];
                
                messageModel.set("mid", data[index].mid);
                messageModel.getReply(getReply.bind(global, index));
            }
        }
        
        function getReply (index, err, data)
        {
            if (!err && data.length)
            {
                data.unshift(message[index][0]);
                message[index] = data;
            }
            
            !--count && finish();
        }
        
        function finish ()
        {
            var page = new Pager(startIndex, pageTotal).ajaxSubPage("_m_build('page_");
            var executeTime = (new Date() - request.requestTime) / 1000;
            
            if (1 == request.getQuery("isajax"))
            {
                response.end(JSON.stringify([message, page, executeTime]));
            }
            else
            {
                self.view.assign
                ({
                    isLogin : session.has("user_verify"), 
                    message : message, 
                    subpage : page, 
                    timer : executeTime
                });
                
                response.end(self.view.fetch("index.tpl"));
            }
        }
    }, 
    
    addAction : function ()
    {
        var session = this.session;
        var request = this.request;
        var response = this.response;
        var posts = request.posts;
        var querys = request.querys;
        
        if (!("nicknama" in posts && "message" in posts))
        {
            response.end("未知错误...|3");
        }
        
        if (posts.userCode != session.get("user_code"))
        {
            return response.end("验证码错误或已过期，请点击验证码再输入...|2");
        }
        
        session.set("user_code", "");
        
        var nicknama = posts.nicknama.trim().replace(filterRegex, "");
        var nicknamaLen = LString.strlen(nicknama, "utf16", 2);
        if (nicknamaLen < 4 || nicknamaLen > 16)
        {
						return response.end("昵称过长或过短...|2");
        }
        nicknama = Iconv("utf16", "utf8", LString.addSlashes(nicknama));
        
        var content = posts.message.trim().replace(filterRegex, "");
        var contentLen = content.length;
        if(contentLen < 14 || contentLen > 140)
        {
            return response.end("留言内容过长或过短...|2");
        }
        content = Iconv("utf16", "utf8", LString.addSlashes(content));
        
        var from = querys.from;
        var messageModel = this.model("use", "message");
        messageModel.set({nicknama : nicknama, content : content});
        
        if ("message" === from)
        {
            messageModel.addMessage(function (err, data, extInfo)
            {
                if (err || !extInfo.insertID) return response.end("留言失败...|3");
                
                var output = "留言成功...|1|";
                output += hex(nicknama) + ",";
                output += hex(LDate.format("Y-m-d h:i:s")) + ",";
                output += hex(content) + ",";
                output += hex("mid_" + extInfo.insertID);
                
                response.end(output);
            });
        }
        else if ("reply" === from)
        {
            if (!("mid" in querys)) return response.end("回复失败...|3");
            
            messageModel.set("mid", querys.mid | 0);
            messageModel.checkMessageId(function (err, data)
            {
                if (err || !data.length) return response.end("回复失败...|3");
                
                messageModel.addReply(function (err, data, extInfo)
                {
                    if (err || !extInfo.insertID) return response.end("回复失败...|3");
                    
                    var output = "回复成功...|1|";
                    output += hex(nicknama) + ",";
                    output += hex(LDate.format("Y-m-d h:i:s")) + ",";
                    output += hex(content) + ",";
                    output += hex("rid_" + extInfo.insertID);
                    
                    response.end(output);
                });
            });
        }
				else
				{
						response.end("未知错误...|3");
				}
    }, 
    
    removeAction : function ()
    {
        var session = this.session;
        var request = this.request;
        var response = this.response;
        var querys = request.querys;
        
        if (!session.has("user_verify"))
        {
            return response.end("您无权限删除留言...|3");
        }
        
        var messageModel = this.model("use", "message");
        
        if ("mid" in querys)
        {
            messageModel.set("mid", querys.mid | 0);
            messageModel.removeAllReply(function (err, data)
            {
                if (err) return response.end("删除失败|3");
                
                messageModel.removeMessage(function (err, data, extInfo)
                {
                    if (err || !extInfo.affectedRows)
                    {
                        response.end("删除失败|3");
                    }
                    else
                    {
                        response.end("删除成功|1");
                    }
                });
            });
        }
        else if ("rid" in querys)
        {
            messageModel.set("rid", querys.rid | 0);
            messageModel.removeReply(function (err, data, extInfo)
            {
                if (err || !extInfo.affectedRows)
                {
                    response.end("删除失败|3");
                }
                else
                {
                    response.end("删除成功|1");
                }
            });
        }
        else
        {
            response.end("未知错误...|3");
        }
    }
};

function hex (str)
{
    var ret = "";
    var hex = "0123456789abcdef";
    var i = 0, len = str.length;
    
    for (; i < len; i++)
    {
        ret += hex[str.charCodeAt(i) >> 4] + hex[str.charCodeAt(i) & 0xf];
    }
    
    return ret;
}

module.exports = MessageController;