/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var PostModel = 
{
    __name__ : "PostModel", 
    __proto__ : Dew("use", "Server.Web.Model.StandardModel"), 
    
    _tableName : "blog_posts", 
    _pwdTableName : "blog_post_pwd", 
    _commentTableName : "blog_comment", 
    
    countTotalRow : function (callback)
    {
        var sql = "select count(pid) as row from " + this._tableName;
        
        if (this.has("tid"))
        {
            sql += " where tid=" + this.get("tid");
        }
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    getAllPost : function (callback)
    {
        var sql = "select pid,tid,title,content,ptime,status from " 
          + this._tableName + " order by ptime desc limit " + 
          ((this.get("startIndex") - 1) * this.get("pageSize")) + "," + this.get("pageSize");
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    getAllPostTag : function (callback)
    {
        var sql = "select pid,tid,title,content,ptime,status from " + this._tableName;
        
        if (this.has("tid"))
        {
            sql += " where tid=" + this.get("tid");
        }
        
        sql += " order by ptime desc limit " + ((this.get("startIndex") - 1) * this.get("pageSize")) 
          + "," + this.get("pageSize");
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    getPost : function (callback)
    {
        var sql = "(select pid,tid,title,content,ptime,view,reply,status from " + 
          this._tableName + " where pid=" + this.get("pid") + 
          " limit 1) union (select pid,null,null,null,null,null,null,null from " + 
          this._tableName + " where pid<" + this.get("pid") + 
          " order by pid desc limit 1) union (select pid,null,null,null,null,null,null,null from " + 
          this._tableName + " where pid>" + this.get("pid") + " limit 1)";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    checkPostId : function (callback)
    {
        var sql = "select pid from " + this._tableName 
          + " where pid=" + this.get("pid") + " limit 1";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    updateViewCount : function (callback)
    {
        var sql = "update " + this._tableName + " set view=view+1 where pid=" 
          + this.get("pid") + " limit 1";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    updateCommentCount : function (callback)
    {
        var sql = "update " + this._tableName 
          + " set reply=reply+1 where pid=" + this.get("pid") + " limit 1";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    postAllView : function (callback)
    {
        var sql = "select pid,tid,title,left(content,200) as content,ptime,status from " 
          + this._tableName + " order by ptime desc limit " + 
          ((this.get("startIndex") - 1) * this.get("pageSize")) + "," + this.get("pageSize");
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    postView : function (callback)
    {
        var sql = "select pid,tid,title,content,ptime,view,reply,status from " + 
          this._tableName + " where pid=" + this.get("pid") + " limit 1";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    postEdit : function (callback)
    {
        var	now = new Date / 1000 | 0;
        var sql = "update " + this._tableName + " set title='" + this.get("title") 
          + "',content='" + this.get("content") + "',mtime=" + now;
        
        if (this.get("isExistsPwd"))
        {
            sql += ",status=status|4";
        }
        else
        {
            sql += ",status=status&~4";
        }
        
        sql += " where pid=" + this.get("pid") + " limit 1";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    postDel : function (callback)
    {
        var postTableName = "blog_posts";
        var pwdTableName = "blog_post_pwd";
        var commentTableName = "blog_comment";
				var sql = "delete " + postTableName + "," + commentTableName + "," + pwdTableName 
          + " from " + postTableName + " left join " + commentTableName 
          + " on " + postTableName + ".pid=" + commentTableName 
          + ".pid left join " + pwdTableName + " on " + postTableName 
          + ".pid=" + pwdTableName + ".pid where " + postTableName 
          + ".pid in(" + this.get("list") + ")";
        
        this.store("use", "mysql").query(sql, callback);
    }, 
    
    postAdd : function (callback)
    {
        var	now = new Date / 1000 | 0;
        var sql = "insert " + this._tableName + " values(null,0,0,'" 
          + this.get("title") + "','" + this.get("content") + "'," 
          + now + "," + now + ",0,0,0,";
        
        if (this.get("isExistsPwd"))
        {
            sql += "6)";
        }
        else
        {
            sql += "2)";
        }
        
        this.store("use", "mysql").query(sql, callback, true);
    }, 
    
    
};

module.exports = PostModel;