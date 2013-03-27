/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var Async = Dew("use", "Common.Async");
var LString = Dew("use", "Lang.LString");

var userNameFilterRegex = /[^a-zA-Z0-9]/g;

var UserController = 
{
    __name__ : "UserController", 
    __proto__ : Dew("use", "Server.Web.Controller.ActionController"), 
    
    loginAction : function ()
    {
        var session = this.session;
        var request = this.request;
        var response = this.response;
        var posts = request.posts;
        
        if (!("userName" in posts 
          && "userPassword" in posts 
          && "userCode" in posts))
        {
            return response.end("非法请求|3");
        }
        
        if (session.has("user_verify"))
        {
            return response.end("请勿重复登陆|1");
        }
        
        if (posts.userCode != session.get("user_code"))
        {
            return response.end("验证码错误或已过期，请点击图片再输入...|2");
        }
        
        session.set("user_code", "");
        
        var userModel = this.model("use", "user");
        userModel.set("username", posts.userName.replace(userNameFilterRegex, ""));
        userModel.getUserPassword(function (err, data)
        {
            if (err || !data.length) return response.end("未知错误...|3");
            
            if (data[0].upass === LString.md5(posts.userPassword))
            {
                session.set("user_verify", true);
                response.end("登录成功|1");
            }
            else
            {
                response.end("用户名或用户密码错误|2");
            }
        });
    }, 
    
    logoutAction : function ()
    {
        var session = this.session;
        var request = this.request;
        var response = this.response;
        
        if (session.has("user_verify"))
        {
            var key, cookies = request.cookies;
            
            for (key in cookies)
            {
                response.setCookie(key, "", -1);
            }
            
            session.destroy();
            response.end("注销成功|1");
        }
        else
        {
            response.end("注销失败|3");
        }
    }
};

module.exports = UserController;