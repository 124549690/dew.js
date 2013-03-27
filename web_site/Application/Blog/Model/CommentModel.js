/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var CommentModel = 
{
    __name__ : "CommentModel", 
    __proto__ : Dew("use", "Server.Web.Model.StandardModel"), 
    
    _tableName : "blog_comment", 
    
    countTotalRow : function (callback)
    {
        var sql = "select count(pid) as row from " + this._tableName;
        
        if (this.has("pid"))
        {
            sql += " where pid=" + this.get("pid");
        }
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    write : function (callback)
    {
        var sql = "insert " + this._tableName + " value(null," 
          + this.get("pid") + ",0,'" + this.get("name") + "','','" 
          + this.get("text") + "'," + this.get("ip") + "," + this.get("time") + ",0)";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    read : function (callback)
    {
        var sql = "select user,content,time from " + this._tableName 
          + " where pid=" + this.get("pid") + " order by time desc limit " + 
            ((this.get("startIndex") - 1) * this.get("pageSize")) + "," + this.get("pageSize");
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    view : function (callback)
    {
        var sql = "select cid,user,left(content,200) as content,time from " 
          + this._tableName + " order by time desc limit " + 
          ((this.get("startIndex") - 1) * this.get("pageSize")) + "," + this.get("pageSize");
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    del : function (callback)
    {
        var sql = "delete from " + this._tableName + " where cid in(" 
          + this.get("list") + ")";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    readOne : function (callback)
    {
        var sql = "select user,content,time from " + this._tableName 
          + " where cid=" + this.get("cid") + " limit 1";
        
        this.store("use", "mysql").query(sql, callback);
    }
};

module.exports = CommentModel;