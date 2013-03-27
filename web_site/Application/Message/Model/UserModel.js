/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var UserModel = 
{
    __name__ : "UserModel", 
    __proto__ : Dew("use", "Server.Web.Model.StandardModel"), 
    
    _tableName : "message_user", 
    
    getUserPassword : function (callback)
    {
        var sql = "select upass from " + this._tableName 
          + " where uname='" + this.get("username") + "' limit 1";
        
        this.store("use", "mysql").query(sql, callback);
    }
};

module.exports = UserModel;