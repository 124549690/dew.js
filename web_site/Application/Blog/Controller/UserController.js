/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var LString = Dew("use", "Lang.LString");

var HttpRouter = Dew("use", "Server.Web.Router.HttpRouter");

var loginState = 
{
		validCodeError: 0,   // 验证码错误
		validCodeExpire: 1,  // 验证码过期
		maxNameError: 2,     // 用户名过长
		minNameError: 3,     // 用户名过短
		nameError: 4,        // 用户错误
		maxPasswordError: 5, // 密码过长
		minPasswordError: 6, // 密码过短
		nameOrPassError: 7,  // 用户名或密码错误
		done: 8,             // 完成
    failure: 9           // 失败
};

var maxNameLength = 16;
var minNameLength = 4;
		
var maxPwdLength = 32;
var minPwdLength = 6;
		
var checkUserName = /[^a-zA-Z0-9]/;

var UserController = 
{
    __name__ : "UserController", 
    __proto__ : Dew("use", "Server.Web.Controller.ActionController"), 
    
    indexAction : function ()
    {
        var view = this.view;
        var request = this.request;
        var response = this.response;
        
        if (request.isAuthenticated)
        {
            response.statusCode = 301;
            response.redirectToRoute(
              {controller : "AdminCenterController", action : "indexAction", module : "Blog"});
            return response.end();
        }
        
        var validCodeUrl = HttpRouter.assemble(
          {controller : "ValidController", action : "validCodeAction", module : "Blog"});
        
        var loginUrl = HttpRouter.assemble(
          {controller : "UserController", action : "loginAction", module : "Blog", method : "post"});
        
        var centerUrl = HttpRouter.assemble(
          {controller : "AdminCenterController", action : "indexAction", module : "Blog"});
        
        view.assign
        ({
            validCodeUrl : validCodeUrl, 
            loginUrl : loginUrl, 
            centerUrl : centerUrl
        });
        
        response.end(view.fetch("login.tpl"));
    }, 
    
    loginAction : function ()
    {
        var view = this.view;
        var session = this.session;
        var request = this.request;
        var response = this.response;
        var posts = request.posts;
        
        if (session.get("valid_code") != posts.code)
        {
            return response.end("{\"state\":" + loginState.validCodeError + "}");
        }
        
        session.remove("valid_code");
        
        var name = "user" in posts ? posts.user : "";
        var nameLength = name.length;
        
        if (checkUserName.test(name))
        {
            return response.end("{\"state\":" + loginState.validCodeError + "}");
        }
        
        if (maxNameLength < nameLength)
        {
            return response.end("{\"state\":" + loginState.maxNameError + "}");
        }
        else if (minNameLength > nameLength)
        {
            return response.end("{\"state\":" + loginState.minNameError + "}");
        }
        
        var pwd = "pwd" in posts ? posts.pwd : "";
        var pwdLength = pwd.length;
        
        if (pwdLength < minPwdLength)
        {
            return response.end("{\"state\":" + loginState.minPasswordError + "}");
        }
        
        if (pwdLength > maxPwdLength)
        {
            return response.end("{\"state\":" + loginState.maxPasswordError + "}");
        }
        
        var userModel = this.model("use", "user");
        userModel.set("username", name);
        userModel.getUserInfo(function (err, data)
        {
            if (err || !data.length || LString.md5(pwd) !== data[0].password)
            {
                return response.end("{\"state\":" + loginState.nameOrPassError + "}");
            }
            
            session.set("user", data[0]);
            response.end("{\"state\":" + loginState.done + "}");
        });
    }, 
    
    logoutAction : function ()
    {
        var session = this.session;
        var request = this.request;
        var response = this.response;
        
        if (session.has("user"))
        {
            var key, cookies = request.cookies;
            
            for (key in cookies)
            {
                response.setCookie(key, "", -1);
            }
            
            session.destroy();
        }
        
        response.statusCode = 301;
        response.redirectLocation(request.contextPath + "/");
        response.end();
    }, 
    
    isLoginFlow : function (flow)
    {
        var request = this.request;
        var response = this.response;
        
        if (!request.isAuthenticated)
        {
            response.statusCode = 301;
            response.redirectToRoute(
              {controller : "UserController", action : "indexAction", module : "Blog"});
            return response.end();
        }
        
        flow.next();
    }, 
    
    isLoginAjaxFlow : function (flow)
    {
        var request = this.request;
        var response = this.response;
        
        if (!request.isAuthenticated)
        {
            var url = HttpRouter.assemble(
              {controller : "UserController", action : "indexAction", module : "Blog"});
            
            return response.end("{\"state\":301,\"url\":\"" + url + "\"}");
        }
        
        flow.next();
    }, 
    
    userAuthFlow : function (flow)
    {
        var session = this.session;
        var request = this.request;
        
        if (session.has("user"))
        {
            request.isAuthenticated = true;
        }
        
        flow.next();
    }
};

module.exports = UserController;