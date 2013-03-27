
create database if not exists dewjs;

use dewjs;
-- --------------------------------------------------------
-- 留言板
-- --------------------------------------------------------

-- 用户表
create table if not exists message_user
(
    uid mediumint(8) unsigned not null auto_increment,
    uname varchar(16) not null,
    upass varchar(32) not null,
    udate timestamp not null,
    primary key (uid), 
    unique key uname(uname)
) charset=utf8 engine=MyISAM auto_increment=10000;

insert message_user values
(null, 'admin', '0192023a7bbd73250516f069df18b500', null);
-- 472a84ce7f8d3ee6b25253204092e262 等于 admin123


-- 留言表
create table if not exists message_msg
(
    mid mediumint unsigned auto_increment not null,
    muser varchar(16) not null,
    mcontent varchar(700) not null,
    mdate timestamp not null,
    primary key(mid)
) charset=utf8 engine=MyISAM auto_increment=10000;

insert message_msg values
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null),
(null, '测试', '测试留言测试留言测试留言测试留言测试留言测试留言测试留言测试留言', null);


-- 回复表
create table if not exists message_reply
(
    rid mediumint unsigned auto_increment not null,
    mid mediumint unsigned not null,
    ruser varchar(16) not null,
    rcontent varchar(700) not null,
    mdate timestamp not null,
    primary key(rid)
) charset=utf8 engine=MyISAM auto_increment=10000;

insert message_reply values
(null, 10009, '测试', '测试回复测试回复测试回复测试回复测试回复测试回复测试回复', null),
(null, 10009, '测试', '测试回复测试回复测试回复测试回复测试回复测试回复测试回复', null),
(null, 10010, '测试', '测试回复测试回复测试回复测试回复测试回复测试回复测试回复', null),
(null, 10011, '测试', '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', null), 
(null, 10018, '测试', '测试回复测试回复测试回复测试回复测试回复测试回复测试回复', null),
(null, 10018, '测试', '测试回复测试回复测试回复测试回复测试回复测试回复测试回复', null),
(null, 10018, '测试', '测试回复测试回复测试回复测试回复测试回复测试回复测试回复', null),
(null, 10019, '测试', '测试回复测试回复测试回复测试回复测试回复测试回复测试回复', null),
(null, 10016, '测试', '测试回复测试回复测试回复测试回复测试回复测试回复测试回复', null),
(null, 10015, '测试', '测试回复测试回复测试回复测试回复测试回复测试回复测试回复', null),
(null, 10015, '测试', '测试回复测试回复测试回复测试回复测试回复测试回复测试回复', null),
(null, 10014, '测试', '测试回复测试回复测试回复测试回复测试回复测试回复测试回复', null),
(null, 10013, '测试', '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', null);
-- --------------------------------------------------------




-- --------------------------------------------------------
-- 博客
-- --------------------------------------------------------

-- 选项
create table if not exists blog_options
(
		sid mediumint unsigned not null auto_increment comment '设置ID', 
		name tinytext not null comment '名', 
		value text not null comment '值', 
		
		primary key(sid)
) charset=utf8 engine=MyISAM auto_increment=10000;

insert into blog_options values
	(10000, 'site', '{"title":"轻博客","keyword":"日记,日志,记录,dewlog","name":"点滴记忆","description":"时间来也匆去也匆，偶尔会在这里停留","logPageSize":10,"allowComment":1,"commentPageSize":10}');


-- 文章
create table if not exists blog_posts
(
		pid mediumint unsigned not null auto_increment comment '文章ID', 
		tid tinyint unsigned not null comment '分类ID', 
		uid mediumint unsigned not null comment '用户ID', 
		
		title varchar(128) not null comment '标题', 
		# alias varchar(128) not null comment '别名', 
		content text not null comment '正文', 
		
		# 1339064918
		mtime int unsigned not null comment '最后修改时间', 
		ptime int unsigned not null comment '发布时间', 
		
		view mediumint unsigned not null comment '阅读次数', 
		reply mediumint unsigned not null comment '回复次数', 
		
		top tinyint unsigned not null comment '置顶等级', 
		# 2 允许评论、4 需要密码、8 附件、16 草稿、32 回收站
		status tinyint unsigned not null comment '状态', 
		
		key id (tid,uid), 
		primary key(pid)
) charset=utf8 engine=MyISAM auto_increment=10000;

insert into blog_posts values
	(10000, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10001, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499376, 1342499376, 4, 0, 0, 2),
	(10002, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 2, 0, 0, 2),
	(10003, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10004, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10005, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10006, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10007, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10008, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 2, 0, 0, 2),
	(10009, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 3, 0, 0, 2),
	(10010, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 3, 0, 0, 2),
	(10011, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 1, 0, 0, 2),
	(10012, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10013, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10014, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10015, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10016, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10017, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10018, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10019, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10020, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10021, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10022, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10023, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10024, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10025, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10026, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10027, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10028, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10029, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10030, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 1, 0, 0, 2),
	(10031, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10032, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10033, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10034, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10035, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10036, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10037, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10038, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10039, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10040, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10041, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10042, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10043, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10044, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10045, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10046, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10047, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10048, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10049, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10050, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10051, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10052, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10053, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 1, 0, 0, 2),
	(10054, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 2, 0, 0, 2),
	(10055, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 2, 0, 0, 2),
	(10056, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 2, 0, 0, 2),
	(10057, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 1, 0, 0, 2),
	(10058, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10059, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10060, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 0, 0, 0, 2),
	(10061, 0, 0, '测试', '<p>\r\n	测试日志的内容\r\n</p>', 1342499372, 1342499372, 1, 0, 0, 2),
	(10062, 0, 0, 'events.EventEmitter学习笔记', '<p>\r\n	var util = require(\'util\');<br />\r\nvar events = require(\'events\');\r\n</p>\r\n<p>\r\n	function Demo(){<br />\r\n&nbsp; &nbsp; <br />\r\n}\r\n</p>\r\n<p>\r\n	util.inherits(Demo,events.EventEmitter);\r\n</p>\r\n<p>\r\n	var demo = new Demo();\r\n</p>\r\n<p>\r\n	demo.on(\'newListener\',function(eventName,eventHandler){<br />\r\n&nbsp; &nbsp; if(eventName == \'test\'){<br />\r\n&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;eventHandler(\'newListener\');<br />\r\n&nbsp; &nbsp; }<br />\r\n});\r\n</p>\r\n<p>\r\n	demo.on(\'test\',function(data){<br />\r\n&nbsp; &nbsp; console.log(data);<br />\r\n});\r\n</p>\r\n<p>\r\n	demo.emit(\'test\',\'Musikar\');\r\n</p>', 1342499814, 1342499731, 7, 0, 0, 2),
	(10063, 0, 0, 'process学习笔记', '<p>\r\n	/* 代码1 <br />\r\nprocess.on(\'exit\',function(){\r\n</p>\r\n<p>\r\n	&nbsp;&nbsp;&nbsp; process.nextTick(function(){<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; console.log(arguments);//不会被执行<br />\r\n&nbsp;&nbsp;&nbsp; });\r\n</p>\r\n<p>\r\n	&nbsp;&nbsp;&nbsp; setTimeout(function(){<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; console.log(\'setTimeout\');//不会被执行<br />\r\n&nbsp;&nbsp;&nbsp; });<br />\r\n&nbsp;&nbsp;&nbsp; <br />\r\n&nbsp;&nbsp;&nbsp; console.log(\'still run\');<br />\r\n});<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码2<br />\r\nprocess.on(\'uncaughtException\',function(err){\r\n</p>\r\n<p>\r\n	&nbsp;&nbsp;&nbsp; var match;\r\n</p>\r\n<p>\r\n	&nbsp;&nbsp;&nbsp; if(match = /ReferenceError: (.*?) is not defined/.exec(err.toString())){<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; console.log(match[1]);<br />\r\n&nbsp;&nbsp;&nbsp; }\r\n</p>\r\n<p>\r\n	&nbsp;&nbsp;&nbsp; setTimeout(function(){<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; console.log(\'会被执行\');<br />\r\n&nbsp;&nbsp;&nbsp; },1000);<br />\r\n});\r\n</p>\r\n<p>\r\n	nonexists();<br />\r\nconsole.log(\'不会被执行\');<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码3<br />\r\n// Start reading from stdin so we don\'t exit.<br />\r\nprocess.stdin.resume();\r\n</p>\r\n<p>\r\n	process.on(\'SIGINT\', function () {<br />\r\n&nbsp; console.log(\'Got SIGINT.&nbsp; Press Control-D to exit.\');<br />\r\n});<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码4<br />\r\nprocess.stdin.resume();<br />\r\nprocess.stdin.setEncoding(\'utf8\');<br />\r\nprocess.stdin.on(\'data\',function(chunk){<br />\r\n&nbsp;&nbsp;&nbsp; console.log(arguments);<br />\r\n});\r\n</p>\r\n<p>\r\n	process.stdin.on(\'end\',function(){<br />\r\n&nbsp;&nbsp;&nbsp; console.log(arguments);<br />\r\n});<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码5<br />\r\nconsole.log(process.argv);<br />\r\nprocess.argv.forEach(function(v,i,args){<br />\r\n&nbsp;&nbsp;&nbsp; console.log(arguments);<br />\r\n});<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码6<br />\r\nconsole.log(process.execPath);\r\n</p>\r\n<p>\r\n	process.stdin.resume();<br />\r\nprocess.on(\'abort\',function(){<br />\r\n&nbsp;&nbsp;&nbsp; console.log(\'abort\');<br />\r\n});\r\n</p>\r\n<p>\r\n	process.abort();<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码7<br />\r\nconsole.log(process.cwd());\r\n</p>\r\n<p>\r\n	try{<br />\r\n&nbsp;&nbsp;&nbsp; process.chdir(\'/tmp\');<br />\r\n}catch(e){<br />\r\n&nbsp;&nbsp;&nbsp; console.log(arguments);<br />\r\n}<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码8<br />\r\nconsole.log(process.env);<br />\r\nconsole.log(process.getgid());<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码9<br />\r\ntry{<br />\r\n&nbsp;&nbsp;&nbsp; process.on(\'SIGHUP\',function(){<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; console.log(\'xss\');<br />\r\n&nbsp;&nbsp;&nbsp; });<br />\r\n&nbsp;&nbsp;&nbsp; process.kill(process.pid,\'SIGHUP\');<br />\r\n}catch(e){<br />\r\n&nbsp;&nbsp;&nbsp; console.log(e);<br />\r\n}<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码10<br />\r\nvar util = require(\'util\');<br />\r\nconsole.log(util.inspect(process.memoryUsage()));<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码11<br />\r\nconsole.log(process.umask(0644));<br />\r\nconsole.log(process.uptime());//Number of seconds Node has been running.<br />\r\n*/\r\n</p>\r\n<p>\r\n	<br />\r\nvar t = process.hrtime();\r\n</p>\r\n<p>\r\n	setTimeout(function(){\r\n</p>\r\n<p>\r\n	&nbsp;&nbsp;&nbsp; t = process.hrtime(t);<br />\r\n&nbsp;&nbsp;&nbsp; console.log("%d seconds %d nanoseconds",t[0],t[1]);\r\n</p>\r\n<p>\r\n	},2000);\r\n</p>\r\n<p>\r\n	&nbsp;\r\n</p>', 1342499868, 1342499868, 10, 0, 0, 2),
	(10064, 0, 0, '大端(Big Endian)与小端(Little Endian)详解', '<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>Byte Endian是指字节在内存中的组织，所以也称它为Byte Ordering，或Byte Order。<span>&nbsp;</span><br />\r\n&nbsp; &nbsp;&nbsp;&nbsp;对于数据中跨越多个字节的对象， 我们必须为它建立这样的约定:<br />\r\n(1) 它的地址是多少?<br />\r\n(2) 它的字节在内存中是如何组织的?<br />\r\n&nbsp; &nbsp; 针对第一个问题，有这样的解释:<br />\r\n&nbsp; &nbsp; 对于跨越多个字节的对象，一般它所占的字节都是连续的，它的地址等于它所占字节最低地址。(链表可能是个例外， 但链表的地址可看作链表头的地址)。<br />\r\n&nbsp; &nbsp; 比如: int x， 它的地址为0x100。 那么它占据了内存中的Ox100， 0x101， 0x102， 0x103这四个字节（32位系统，所以int占用4个字节）。<br />\r\n&nbsp; &nbsp; 上面只是内存字节组织的一种情况: 多字节对象在内存中的组织有一般有两种约定。 考虑一个W位的整数。<br />\r\n&nbsp; &nbsp; 它的各位表达如下:[Xw-1， Xw-2， ... ， X1， X0],它的<br />\r\n&nbsp; &nbsp; MSB (Most Significant Byte， 最高有效字节)为 [Xw-1， Xw-2， ... Xw-8];<br />\r\n&nbsp; &nbsp; LSB (Least Significant Byte， 最低有效字节)为 [X7，X6，...， X0]。<span>&nbsp;</span><br />\r\n&nbsp; &nbsp; 其余的字节位于MSB， LSB之间。</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>LSB和MSB谁位于内存的最低地址， 即谁代表该对象的地址?<span>&nbsp;</span><br />\r\n这就引出了大端(Big Endian)与小端(Little Endian)的问题。<br />\r\n如果LSB在MSB前面， 既LSB是低地址， 则该机器是小端; 反之则是大端。<br />\r\n具体这类CPU是大端还是小端，应该和具体设置有关。<br />\r\n（如，Power PC支持little-endian字节序，但在默认配置时是big-endian字节序）<br />\r\n一般来说，大部分用户的操作系统（如windows, FreeBsd,Linux）是Little Endian的。少部分，如MAC OS ,是Big Endian 的。<br />\r\n所以说，Little Endian还是Big Endian与操作系统和芯片类型都有关系。</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>Linux系统中，你可以在/usr/include/中（包括子目录）查找字符串BYTE_ORDER(或<br />\r\n_BYTE_ORDER, __BYTE_ORDER)，确定其值。BYTE_ORDER中文称为字节序。这个值一般在endian.h或machine/endian.h文件中可以找到,有时在feature.h中，不同的操作系统可能有所不同。</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>对于一个数0x1122<br />\r\n使用Little Endian方式时，低字节存储0x22，高字节存储0x11<br />\r\n而使用Big Endian方式时, 低字节存储0x11, 高字节存储0x22</span> \r\n</p>\r\n<br />\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>经一网友指正,才知道,上面的描述,是不准确的.</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>想了下,觉得如下描述可能更合适:</span> <br />\r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>助记:</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>1)所谓MSB (Most Significant Byte),名字很复杂,不知是否有人没搞懂,反正我开始看到这个词时候,就很糊涂,有点不完全理解.其实简单说MSB就是,一个数字中,最重要的那位,</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>举例来说,12004,中文读作,一万两千零四,那最高位的1,就表示了一万,此处就称作MSB,最有意义的位.</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>2)一般常见的数据存储,用文字写出来的时候,其内容书写格式,多数是从低地址到高地址.</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>举例,一个16进制数是 0x11 22 33, 而存放的位置是</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>地址0x3000 中存放11</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>地址0x3001 中存放22</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>地址0x3002 中存放33</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>连起来就写成地址0x3000-0x3002中存放了数据0x112233.</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>而这种存放和表示方式,正好符合大端.</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>解释的有点乱,希望有人能看懂.</span> \r\n</p>\r\n<br />\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>如果还有哪里有误,还请各位继续指正.谢谢.</span> \r\n</p>\r\n<br />\r\n<br />\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>bool IsBig_Endian()<br />\r\n//如果字节序为big-endian，返回true;<br />\r\n//反之为&nbsp; &nbsp;little-endian，返回false<br />\r\n{<br />\r\n&nbsp; &nbsp; unsigned short test = 0x1122;<br />\r\n&nbsp; &nbsp; if(*( (unsigned char*) &amp;test ) == 0x11)<br />\r\n&nbsp; &nbsp;&nbsp; &nbsp; return TRUE;<br />\r\nelse<br />\r\n&nbsp; &nbsp; return FALSE;</span> \r\n</p>\r\n<p style="color:#444444;text-indent:0px;background-color:#fcfdfe;text-align:left;">\r\n	<span>}//IsBig_Endian()</span> \r\n</p>', 1342499941, 1342499903, 13, 0, 0, 2),
	(10065, 0, 0, '判断机器字节存储顺序是big endian还是little endian', '8086机器都是使用little endian, 而摩托罗拉的power pc使用big endian<br />\n对于一个数0x1122<br />\n产用little endian方式时&nbsp;&nbsp; 低字节存储0x22，高字节存储0x11.<br />\n而使用big endian方式时,&nbsp; 低字节存储0x11, 高字节存储0x22<br />\n在这俩种字节方式间转换可以使用汇编指令 BSWAP<br />\n<br />\n测试函数<br />\nint IsMyMachineBigEndian()<br />\n{<br />\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; unsigned short test = 0x1122;<br />\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; unsigned char&nbsp; *cp = &amp;test;<br />\n<br />\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return (*cp == 0x11);<br />\n}<br />\n<br />\n若返回真值，则说明是big endian <br />', 1345281782, 1342499981, 8, 0, 0, 2),
	(10066, 0, 0, 'Modules 学习笔记', '<p>\r\n	require(\'test.js\');\r\n</p>\r\n<p>\r\n	for(var i in require.cache){<br />\r\n&nbsp;&nbsp;&nbsp; console.log(i);<br />\r\n}\r\n</p>', 1342500000, 1342500000, 3, 0, 0, 2),
	(10067, 0, 0, 'module.exports 学习笔记', '<p>\r\n	test.js<br />\r\n-----------------<br />\r\nvar EventEmitter = require(\'events\').EventEmitter;<br />\r\nmodule.exports = new EventEmitter();\r\n</p>\r\n<p>\r\n	setTimeout(function(){<br />\r\n&nbsp; module.exports.emit(\'ready\');<br />\r\n},2000);\r\n</p>\r\n<p>\r\n	<br />\r\ndemo.js<br />\r\n----------------<br />\r\nvar test = require(\'./test.js\');\r\n</p>\r\n<p>\r\n	test.on(\'ready\',function(){<br />\r\n&nbsp;&nbsp;&nbsp; console.log(\'module test is ready for use.\');<br />\r\n});\r\n</p>', 1342500339, 1342500036, 10, 0, 0, 2),
	(10069, 0, 0, 'require.main === module小例子', '<p>\r\n	test.js<br />\r\n------------------<br />\r\nconsole.log(__filename);<br />\r\nconsole.log(require.main === module);//false\r\n</p>\r\n<p>\r\n	demo.js<br />\r\n------------------<br />\r\nrequire(\'./test.js\');\r\n</p>\r\n<p>\r\n	console.log(__filename);<br />\r\nconsole.log(require.main === module);//true\r\n</p>', 1342500952, 1342500419, 14, 0, 0, 2),
	(10068, 0, 0, 'Modules 学习笔记', '<p>\r\n	test.js<br />\r\n--------------------------<br />\r\nvar a = require(\'./a.js\');<br />\r\nvar a = require(\'./b.js\');\r\n</p>\r\n<p>\r\n	exports._self = module;//自身引用\r\n</p>\r\n<p>\r\n	exports.getId = function(){<br />\r\n&nbsp; return module.id;<br />\r\n};\r\n</p>\r\n<p>\r\n	exports.getFileName = function(){<br />\r\n&nbsp; return module.filename;<br />\r\n};\r\n</p>\r\n<p>\r\n	exports.getState = function(){<br />\r\n&nbsp; return module.loaded;&nbsp; <br />\r\n};\r\n</p>\r\n<p>\r\n	exports.getParent = function(){<br />\r\n&nbsp; return module.parent;<br />\r\n};\r\n</p>\r\n<p>\r\n	exports.getChildren = function(){<br />\r\n&nbsp; return module.children;<br />\r\n};\r\n</p>\r\n<p>\r\n	demo.js<br />\r\n--------------------------<br />\r\nvar m = require(\'./test.js\');\r\n</p>\r\n<p>\r\n	console.log(m._self);\r\n</p>\r\n<p>\r\n	a.js、b.js 内容为空即可\r\n</p>', 1345289796, 1342500177, 13, 0, 0, 2),
	(10072, 0, 0, 'Stream 学习笔记', '<p>\r\n	var stream = require(\'stream\');<br />\r\nvar EventEmitter = require(\'events\').EventEmitter;<br />\r\nvar util = require(\'util\');\r\n</p>\r\n<p>\r\n	/* 代码1 <br />\r\nconsole.log(new stream() instanceof EventEmitter);//true<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码2<br />\r\nprocess.stdin.resume();<br />\r\nprocess.stdin.pipe(process.stdout);<br />\r\n*/\r\n</p>\r\n<p>\r\n	/* 代码3<br />\r\nconsole.log(process.stdin instanceof stream);//true<br />\r\nconsole.log(process.stdout instanceof stream);//true<br />\r\n*/\r\n</p>\r\n<p>\r\n	/*<br />\r\nprocess.stdin.resume();<br />\r\nprocess.stdin.pipe(process.stdout,{<br />\r\n&nbsp; \'end\':false<br />\r\n});\r\n</p>\r\n<p>\r\n	process.stdin.on(\'data\',function(data){<br />\r\n&nbsp; console.log(data);<br />\r\n});\r\n</p>\r\n<p>\r\n	process.stdin.on(\'end\',function(data){<br />\r\n&nbsp; console.log(\'process.stdin end.\');<br />\r\n&nbsp; console.log(process.stdout.writable);<br />\r\n});\r\n</p>\r\n<p>\r\n	process.stdin.on(\'error\',function(data){<br />\r\n&nbsp; console.log(arguments);<br />\r\n});\r\n</p>\r\n<p>\r\n	process.stdin.on(\'close\',function(data){<br />\r\n&nbsp; console.log(arguments);<br />\r\n});\r\n</p>\r\n<p>\r\n	process.stdout.on(\'end\',function(data){<br />\r\n&nbsp; console.log(\'process.stdout end.\');<br />\r\n});\r\n</p>\r\n<p>\r\n	<br />\r\nprocess.stdin.resume();<br />\r\nprocess.stdin.pipe(process.stdout);\r\n</p>\r\n<p>\r\n	<br />\r\n//process.stdin可读不可写<br />\r\nconsole.log(process.stdin.readable);//true<br />\r\nconsole.log(process.stdin.writable);//false\r\n</p>\r\n<p>\r\n	//process.stdout可写不可读<br />\r\nconsole.log(process.stdout.readable);//false<br />\r\nconsole.log(process.stdout.writable);//true\r\n</p>\r\n<p>\r\n	process.stdin.emit(\'end\');<br />\r\n*/\r\n</p>\r\n<p>\r\n	<br />\r\n//console.log(util.inspect(process.stdin));<br />\r\n/*<br />\r\n{ _handle:<br />\r\n&nbsp;&nbsp; { writeQueueSize: 0,<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp; owner: [Circular],<br />\r\n&nbsp;&nbsp;&nbsp;&nbsp; onread: [Function: onread] },<br />\r\n&nbsp; _pendingWriteReqs: 0,<br />\r\n&nbsp; _flags: 0,<br />\r\n&nbsp; _connectQueueSize: 0,<br />\r\n&nbsp; destroyed: false,<br />\r\n&nbsp; errorEmitted: false,<br />\r\n&nbsp; bytesRead: 0,<br />\r\n&nbsp; _bytesDispatched: 0,<br />\r\n&nbsp; allowHalfOpen: undefined,<br />\r\n&nbsp; readable: true,<br />\r\n&nbsp; writable: false,<br />\r\n&nbsp; isRaw: false,<br />\r\n&nbsp; fd: 0,<br />\r\n&nbsp; _paused: false,<br />\r\n&nbsp; pipe: [Function] }<br />\r\n*/\r\n</p>\r\n<p>\r\n	/*<br />\r\nprocess.stdin.resume();\r\n</p>\r\n<p>\r\n	process.stdin.on(\'pipe\',function(){<br />\r\n&nbsp; process.stdout.write(\'piped!\');<br />\r\n});\r\n</p>\r\n<p>\r\n	process.stdin.pipe(process.stdout,{<br />\r\n&nbsp; \'end\':false<br />\r\n});\r\n</p>\r\n<p>\r\n	process.stdin.on(\'end\',function(){<br />\r\n&nbsp; process.stdout.write(\'Goodbye!\');<br />\r\n});\r\n</p>\r\n<p>\r\n	process.stdout.write(new Buffer([0x11,0x22,0x33]));<br />\r\n*/\r\n</p>', 1342500859, 1342500859, 29, 1, 0, 2),
	(10071, 0, 0, 'File System 学习笔记', '<p>\r\n	var fs = require(\'fs\');\r\n</p>\r\n<p>\r\n	//删除文件 异步方式<br />\r\n/*fs.unlink(\'test.txt\',function(err){<br />\r\n&nbsp; if(err) throw err;<br />\r\n&nbsp; console.log(\'删除成功!\');<br />\r\n});<br />\r\n*/\r\n</p>\r\n<p>\r\n	//删除文件同步方式<br />\r\n/*<br />\r\nfs.unlinkSync(\'test.txt\');<br />\r\nconsole.log(\'删除成功\');<br />\r\n*/<br />\r\n/*<br />\r\nfs.rename(\'test.txt\',\'demo.txt\',function(err){<br />\r\n&nbsp; console.log(\'重命名成功!\');<br />\r\n});<br />\r\n*/<br />\r\n/*<br />\r\nfs.stat(\'test.txt\',function(err,stat){<br />\r\n&nbsp; console.log(JSON.stringify(stat));<br />\r\n});<br />\r\n*/<br />\r\n/*<br />\r\nvar filename = \'test.txt\';\r\n</p>\r\n<p>\r\n	<br />\r\nfs.open(filename,\'w\',0666,function(err,fd){<br />\r\n&nbsp; console.log(fd);&nbsp; <br />\r\n});\r\n</p>\r\n<p>\r\n	process.stdin.resume();<br />\r\nprocess.stdin.pipe(fs.createWriteStream(\'test.txt\'));<br />\r\n*/\r\n</p>\r\n<p>\r\n	/*<br />\r\nfs.exists(\'test.txt\',function(exists){<br />\r\n&nbsp; console.log(exists);<br />\r\n});<br />\r\n*/\r\n</p>\r\n<p>\r\n	//console.log(fs.createReadStream(\'test.txt\') instanceof fs.ReadStream);//true<br />\r\n/*<br />\r\nvar rs = fs.createReadStream(\'test.txt\');<br />\r\nrs.on(\'open\',function(fd){<br />\r\n&nbsp; console.log(fd);<br />\r\n});<br />\r\n*/<br />\r\n/*<br />\r\nvar fw = fs.watch(\'demo\',function(event,filename){<br />\r\n&nbsp; console.log(event);<br />\r\n&nbsp; console.log(filename);<br />\r\n});<br />\r\n*/<br />\r\n/*<br />\r\nfs.mkdir(\'test\',0777,function(err){<br />\r\n&nbsp; console.log(err);<br />\r\n});<br />\r\n*/<br />\r\n/*<br />\r\nfs.readdir(\'demo\',function(err,files){<br />\r\n&nbsp; console.log(files);<br />\r\n});<br />\r\n*/<br />\r\n/*<br />\r\nvar rs = fs.createWriteStream(\'test.txt\');<br />\r\nrs.on(\'open\',function(fd){<br />\r\n&nbsp; var buffer = new Buffer([97,98,99]);<br />\r\n&nbsp; fs.write(fd,buffer,0,2,0,function(err,writen,buffer){<br />\r\n&nbsp;&nbsp;&nbsp; console.log(arguments);<br />\r\n&nbsp; });<br />\r\n});<br />\r\n*/\r\n</p>\r\n<p>\r\n	/*<br />\r\nsetInterval(function(){\r\n</p>\r\n<p>\r\n	fs.appendFile(\'test.txt\',\'www.w3hacker.com\\r\\n\',function(err){<br />\r\n&nbsp; console.log(\'写入成功\');<br />\r\n});\r\n</p>\r\n<p>\r\n	},2000);<br />\r\n*/\r\n</p>\r\n<p>\r\n	&nbsp;\r\n</p>\r\n<p>\r\n	&nbsp;\r\n</p>', 1342500874, 1342500546, 13, 0, 0, 6);


-- 分类
create table if not exists blog_tag
(
		tid mediumint unsigned not null auto_increment comment '分类ID', 
		name varchar(128) not null comment '分类名', 
		
		primary key(tid)
) charset=utf8 engine=MyISAM auto_increment=1;

-- 密码
create table if not exists blog_post_pwd
(
		pwid mediumint unsigned not null auto_increment comment '密码ID', 
		pid mediumint unsigned not null comment '文章ID', 
		password varchar(32) not null comment '密码', 
		
		unique key(pid), 
		primary key(pwid)
) charset=utf8 engine=MyISAM auto_increment=10000;

insert into blog_post_pwd values
	(10000, 10071, '123');


-- 附件
create table if not exists blog_attachment
(
		aid smallint unsigned not null auto_increment comment '附件ID', 
		pid mediumint unsigned not null comment '文章ID', 
		name varchar(128) not null comment '附件名', 
		path text not null comment '附件路径', 
		size int unsigned not null comment '附件大小', 
		time timestamp not null comment '上传日期', 
		
		key id (pid), 
		primary key(aid)
) charset=utf8 engine=MyISAM auto_increment=10000;


-- 评论
create table if not exists blog_comment
(
		cid mediumint unsigned not null auto_increment comment '评论ID', 
		pid mediumint unsigned not null comment '文章ID', 
		mid mediumint unsigned not null comment '评论主ID', 
		user varchar(16) not null comment '用户', 
		email varchar(128) not null comment '电子邮件', 
		content text not null comment '评论内容', 
		ip int not null comment '用户IP', 
		time int unsigned not null comment '日期', 
		# 2 不显示
		status tinyint unsigned not null comment '状态', 
		
		key id (pid), 
		primary key(cid)
) charset=utf8 engine=MyISAM auto_increment=10000;

insert blog_comment values
	(10000, 10072, 0, 'emee', '', '一个很不错的进程流通信操作，使用了 stream 模块 和 events 模块', 2130706433, 1345281127, 0);


create table if not exists blog_users
(
		uid smallint unsigned not null auto_increment comment '用户ID', 
		username varchar(32) not null comment '用户名', 
		password varchar(32) not null comment '用户密码', 
		power int unsigned not null comment '权限', 
		position tinytext not null comment '最后操作位置', 
		lasttime int unsigned not null comment '最后登陆时间', 
		lastip int not null comment '最后登陆 IP',
		status tinyint unsigned not null comment '状态', 
		
		primary key(uid)
) charset=utf8 engine=MyISAM auto_increment=1;

insert blog_users values
	(1, 'admin', '0192023a7bbd73250516f069df18b500', 0, '', 1341909732, 2130706433, 0);
-- --------------------------------------------------------

