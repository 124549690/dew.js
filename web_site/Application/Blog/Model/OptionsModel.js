/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var OptionsModel = 
{
    __name__ : "OptionsModel", 
    __proto__ : Dew("use", "Server.Web.Model.StandardModel"), 
    
    _tableName : "blog_options", 
    
    getOption : function (callback)
    {
        var self = this;
        var name = this.get("name");
        var findKey = "_option_" + this._tableName + name;
        
        this.store("use", "memcached").get(findKey, function (err, data)
        {
            if (!err && findKey in data)
            {
                callback(err, JSON.parse(data[findKey]));
            }
            else
            {
                var sql = "select value from " + self._tableName 
                  + " where name='" + name + "' limit 1";
                
                self.store("use", "mysql").query(sql, function (err, data)
                {
                    if (err)
                    {
                        callback(err);
                    }
                    else if (!data.length)
                    {
                        callback(data);
                    }
                    else
                    {
                        
                        self.store("use", "memcached").set(findKey, data[0].value, function (err)
                        {
                            callback(err, JSON.parse(data[0].value));
                        });
                    }
                });
            }
        });
    }, 
    
    setOption : function (callback)
    {
        var self = this;
        var name = this.get("name");
        var valueToUtf8 = this.get("valueToUtf8");
        var valueToUtf16 = this.get("valueToUtf16");
        
        var sql = "update " + this._tableName + " set value='" 
          + valueToUtf8 + "' where name='" + name + "' limit 1";
        
        this.store("use", "mysql").query(sql, function (err)
        {
            if (err)
            {
                callback(err);
            }
            else
            {
                var findKey = "_option_" + self._tableName + name;
                
                self.store("use", "memcached").set(findKey, valueToUtf16, callback);
            }
        });
    }
};

module.exports = OptionsModel;