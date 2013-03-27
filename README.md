NodeJS 学习QQ群: 141227364

dew.js 需要 Node.js, MySQL, Memcached 等服务软件才能正常运行

框架自带示例采用 MySQL 作为数据储存，使用前请将 db.sql 文件导入到数据库中

示例后台用户名和密码
username: admin
password: admin123


dew.js 的 web 服务配置文件储存路径如下
node_modules\dewjs\lib\Server\Web\Web.json

    "memcached" : 
    {
        "connect" : 
        [
            {"id" : "mc1", "host" : "127.0.0.1", "port" : 11211}
        ], 
        
        "max_pools" : 1
    }, 

    "mysql" : 
    {
        "connect" : 
        [
            {
                "id" : "db1", 
                "host" : "127.0.0.1", 
                "port" : 3306, 
                "username" : "root", 
                "password" : "xiaoxin", 
                "dbname" : "dewjs", 
                "charset" : "utf8"
            }
        ], 
        
        "max_pools" : 1
    }, 

请根据实际服务端设置修改 Web.json 文件


启动 Dew.js 方式为 node [filepath]/dew.js

浏览器访问地址为 http://localhost