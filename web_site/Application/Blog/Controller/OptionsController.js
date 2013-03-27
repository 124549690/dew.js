/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var HttpRouter = Dew("use", "Server.Web.Router.HttpRouter");

var LString = Dew("use", "Lang.LString");
var Iconv = Dew("use", "Tool.Iconv");

var optionsItem = ["title", "keyword", "name", "description", "allowComment"];

var OptionsController = 
{
    __name__ : "OptionsController", 
    __proto__ : Dew("use", "Server.Web.Controller.ActionController"), 
    
    setAction : function ()
    {
        var request = this.request;
        var response = this.response;
        
        var name, valueToUtf8 = "{";
        var posts = request.posts;
        var options = this.get("siteOptions");
        
        var list = Object.keys(options);
        var i = 0, len = list.length;
        var isContinue = Boolean(len);
        
        var count = optionsItem.length;
        
        while (isContinue)
        {
            name = list[i];
            
            if (count)
            {
                if (~optionsItem.indexOf(name))
                {
                    if (name in posts)
                    {
                        options[name] = isNaN(posts[name]) ? posts[name] : Number(posts[name]);
                    }
                    
                    count--;
                }
            }
            
            valueToUtf8 += "\"" + name + "\":" + (isNaN(options[name]) ? 
              "\"" + Iconv("utf16", "utf8", options[name]) + "\"" : options[name]);
            
            if (++i === len)
            {
                isContinue = false;
            }
            else
            {
                valueToUtf8 += ",";
            }
        }
        
        valueToUtf8 += "}";
        
        var optionsModel = this.model("use", "options");
        
        optionsModel.set
        ({
            name : "site", 
            valueToUtf8 : valueToUtf8, 
            valueToUtf16 : JSON.stringify(options)
        });
        
        optionsModel.setOption(function (err)
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
    
    getAction : function ()
    {
        var response = this.response;
        
        var data = {};
        var name, options = this.get("siteOptions");
        var i = 0, len = optionsItem.length;
        
        for (; i < len; i++)
        {
            name = optionsItem[i];
            data[name] = options[name];
        }
        
        response.end(JSON.stringify(data));
    }, 
    
    setSiteOptionsFlow : function (flow)
    {
        var self = this;
        var response = this.response;
        
        var optionsModel = this.model("use", "options");
        optionsModel.set("name", "site");
        optionsModel.getOption(function (err, data)
        {
            if (err)
            {
                response.statusCode = 500;
                response.end();
            }
            else
            {
                self.set("siteOptions", data);
                flow.next();
            }
        });
    }, 
    
    setSiteHeadInfoFlow : function (flow)
    {
        var data = this.get("siteOptions");
        
        this.view.assign
        ({
            title : data.title, 
            keyword : data.keyword, 
            name : data.name, 
            description : data.description
        });
        
        flow.next();
    }, 
    
    setSiteUrlFlow : function (flow)
    {
        var request = this.request;
        
        this.view.assign
        ({
            homeUrl : request.contextPath + "/", 
            loginUrl : HttpRouter.assemble(
              {controller : "UserController", action : "indexAction", module : "Blog"})
        });
        
        flow.next();
    }
};

module.exports = OptionsController;