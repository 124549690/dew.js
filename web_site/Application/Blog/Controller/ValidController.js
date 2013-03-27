/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var ValidCode = Dew("use", "Tool.ValidCode");

var ValidController = 
{
    __name__ : "ValidController", 
    __proto__ : Dew("use", "Server.Web.Controller.ActionController"), 
    
    validCodeAction : function ()
    {
        var code = ValidCode();
        this.session.set("valid_code", code.value);
        this.response.end(code.expression);
    }
};

module.exports = ValidController;