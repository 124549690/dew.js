<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="utf-8">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta name="author" content="LiuZhaoHui <hi.liuzhaoxin@gmail.com>" />
<meta name="Copyright" content="Copyright (c) 2013 wwww.eatbean.com" />
<meta name="generator" content="dewlog for node.js" />
<link type="image/x-icon" rel="shortcut icon" href="/favicon.ico" />
<title>管理中心</title>
<script type="text/javascript" src="/blog/admin/js/sweet/sweet.js"></script>
<link type="text/css" rel="stylesheet" href="/blog/admin/js/sweet/sweet.css" />
<script type="text/javascript" src="/blog/admin/js/sweet/ui/dialog/dialog.js"></script>
<link type="text/css" rel="stylesheet" href="/blog/admin/js/sweet/ui/dialog/dialog.css" />
<script type="text/javascript" src="/blog/admin/js/sweet/ui/form/form.js"></script>
<link type="text/css" rel="stylesheet" href="/blog/admin/js/sweet/ui/form/form.css" />
<script type="text/javascript">
sweet.ready(function () {

var callback = {};
var baseUrl = "/blog/admin/";

callback.loadStart = function ()
{
		var state = this._state = new sweet.ui.dialog.state;
		state.setText('0%');
		state.setType('wait');
		state.display();
};

callback.loadProgress = function (name, current, total)
{
		this._state.setText((current / total * 100 | 0) + '%');
};

callback.loadEnd = function ()
{
		this._state.destroy();
		delete this._state;
};

sweet.load
	.add('scrollbar-js', sweet.root + '/ui/scrollbar/scrollbar.js')
	.add('scrollbar-css', sweet.root + '/ui/scrollbar/scrollbar.css')
	
	.add('kindeditor-js', baseUrl + 'js/kindeditor/kindeditor-min.js')
	.add('kindLang-js', baseUrl + 'js/kindeditor/lang/zh_CN.js')
	
	.add('dewlog-js', baseUrl + 'js/dewlog.js')
	.add('main-css', baseUrl + 'css/main.css')
	.add('table-css', baseUrl + 'css/table.css')
	.add('toolbar-css', baseUrl + 'css/toolbar.css')
	.add('log-css', baseUrl + 'css/log.css')
	
	.add('menu-js', baseUrl + 'js/menu.js')
	.add('menu-css', baseUrl + 'css/menu.css')
	
	.add('container-js', baseUrl + 'js/container.js')
	.add('container-css', baseUrl + 'css/container.css')
	
	.add('postView-js', baseUrl + 'js/postView.js')
	
	.add('postWrite-js', baseUrl + 'js/postWrite.js')
	
	.add('postComment-js', baseUrl + 'js/postComment.js')
	.add('postComment-css', baseUrl + 'css/comment.css')
	
	.add('dewlogConfig-js', baseUrl + 'js/dewlogConfig.js')
	.add('dewlogConfig-css', baseUrl + 'css/dewlogConfig.css')
	
	
	.on('start', callback.loadStart)
	.on('progress', callback.loadProgress)
	.on('end', callback.loadEnd)
	
	
	.exec
	(
			'kindeditor-js', 'kindLang-js', 
			
			'scrollbar-js', 'scrollbar-css', 'table-css', 'toolbar-css', 'log-css', 
			
			'dewlog-js', 'main-css', 
			'menu-js', 'menu-css', 
			
			'container-js', 'container-css', 
			
			'postView-js', 
			
			'postWrite-js', 
			
			'postComment-js', 'postComment-css', 
			
			'dewlogConfig-js', 'dewlogConfig-css', 
			
			new Function ('next', 'dewlog.initialize(); next();')
	);

var dewlog = window.dewlog = {};

dewlog.requestUrl = 
{
		'ping': '{tpl:echo pingUrl}', 
		'post-view': '{tpl:echo postViewUrl}', 
		'post-eidt': '{tpl:echo postEditUrl}', 
		'post-save': '{tpl:echo postSaveUrl}', 
		'post-del': '{tpl:echo postDelUrl}', 
		'post-add': '{tpl:echo postAddUrl}', 
		'comment-view': '{tpl:echo commentViewUrl}', 
		'comment-del': '{tpl:echo commentDelUrl}', 
		'comment-read': '{tpl:echo commentReadUrl}', 
		'dew-config-set': '{tpl:echo dewConfigSetUrl}', 
		'dew-config-get': '{tpl:echo dewConfigGetUrl}'
};

});
</script>
</head>
<body>
</body>
{tpl:include file="html_footer.tpl"}