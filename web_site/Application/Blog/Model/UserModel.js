/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var UserModel = 
{
    __name__ : "UserModel", 
    __proto__ : Dew("use", "Server.Web.Model.StandardModel"), 
    
    _tableName : "blog_users", 
    
    getUserInfo : function (callback)
    {
        var sql = "select username,password,power,lasttime,lastip,status from " + 
          this._tableName + " where username='" + this.get("username") + "' limit 1";
        
        this.store("use", "mysql").query(sql, callback);
    }
};

module.exports = UserModel;