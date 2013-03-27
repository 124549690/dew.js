/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var PostPwdModel = 
{
    __name__ : "PostPwdModel", 
    __proto__ : Dew("use", "Server.Web.Model.StandardModel"), 
    
    _tableName : "blog_post_pwd", 
    
    setPwd : function (callback)
    {
        var sql = "replace " + this._tableName + " set password=\"" 
          + this.get("pwd") + "\",pid=" + this.get("pid");
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    getPwd : function (callback)
    {
        var sql = "select password from " + this._tableName 
          + " where pid=" + this.get("pid") + " limit 1";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    removePwd : function (callback)
    {
        var sql = "delete from " + this._tableName 
          + " where pid=" + this.get("pid") + " limit 1";
        
        this.store("use", "mysql").query(sql, callback);
    }
};

module.exports = PostPwdModel;