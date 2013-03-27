/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var MessageModel = 
{
    __name__ : "MessageModel", 
    __proto__ : Dew("use", "Server.Web.Model.StandardModel"), 
    
    _messageTableName : "message_msg", 
    _replyTableName : "message_reply", 
    
    countTotalRow : function (callback)
    {
        var sql = "select count(mid) as row from " + this._messageTableName;
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    getMessage : function (callback)
    {
        var sql = "select mid,muser,mcontent,mdate from " 
          + this._messageTableName + " group by mid desc limit "
          + ((this.get("startIndex") - 1) * this.get("pageSize")) + "," + this.get("pageSize");
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    checkMessageId : function (callback)
    {
        var sql = "select mid from " + this._messageTableName 
          + " where mid=" + this.get("mid") + " limit 1";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    addMessage : function (callback)
    {
        var sql = "insert " + this._messageTableName 
          + " value (null,'" + this.get("nicknama") 
          + "','" + this.get("content") + "',null)";
        
        this.store("use", "mysql").query(sql, callback, true);
    }, 
    
    getReply : function (callback)
    {
        var sql = "select rid,ruser,rcontent,mdate from "
          + this._replyTableName + " where mid=" + this.get("mid") 
          + " group by rid desc";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    addReply : function (callback)
    {
        var sql = "insert " + this._replyTableName + " value (null,'" 
          + this.get("mid") + "','"  + this.get("nicknama") 
          + "','" + this.get("content")  + "',null)";
        
        this.store("use", "mysql").query(sql, callback, true);
    }, 
    
    removeMessage : function (callback)
    {
        var sql = "delete from " + this._messageTableName 
          + " where mid=" + this.get("mid") + " limit 1";
        
        this.store("use", "mysql").query(sql, callback, true);
    }, 
    
    removeAllReply : function (callback)
    {
        var sql = "delete from " + this._replyTableName 
          + " where mid=" + this.get("mid");
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    removeReply : function (callback)
    {
        var sql = "delete from " + this._replyTableName + 
          " where rid=" + this.get("rid");
        
        this.store("use", "mysql").query(sql, callback, true);
    }
};

module.exports = MessageModel;