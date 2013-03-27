<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="utf-8">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta name="author" content="LiuZhaoHui <hi.liuzhaoxin@gmail.com>" />
<meta name="Copyright" content="Copyright (c) 2013 wwww.eatbean.com" />
<meta name="generator" content="dewlog for node.js" />
<link type="image/x-icon" rel="shortcut icon" href="/favicon.ico" />
<title>登录</title>
<link type="text/css" rel="stylesheet" href="/blog/admin/css/login.css" />

<script type="text/javascript" src="/blog/admin/js/sweet/sweet.js"></script>
<link type="text/css" rel="stylesheet" href="/blog/admin/js/sweet/sweet.css" />

<script type="text/javascript" src="/blog/admin/js/sweet/ui/dialog/dialog.js"></script>
<link type="text/css" rel="stylesheet" href="/blog/admin/js/sweet/ui/dialog/dialog.css" />

<script type="text/javascript" src="/blog/admin/js/sweet/ui/form/form.js"></script>
<link type="text/css" rel="stylesheet" href="/blog/admin/js/sweet/ui/form/form.css" />
</head>
<body>
<div class="login">
	<form id="login-form" method="post" action="{tpl:echo loginUrl}" src="{tpl:echo centerUrl}">
		<div class="item">
			<label>用户名</label>
			<div class="username">
				<span title="用户名"></span>
				<input type="text" name="user" title="请输入用户名" maxlength="16" />
			</div>
		</div>
		<div class="item">
			<label>密　码</label>
			<div class="password">
				<span title="密码"></span>
				<input type="password" name="pwd" title="请输入密码" maxlength="32" />
			</div>
		</div>
		<div class="item">
			<label>验证码</label>
			<div class="vaild-code">
				<span title="验证码"></span>
				<input type="text" name="code" title="请输入验证码" maxlength="4" />
				<p id="vaild-code" src="{tpl:echo validCodeUrl}" title="计算有难度？点击换一个"></p>
			</div>
		</div>
		<div class="uiButton formButton"><button type="submit" value="登录">登录</button></div>
	</form>
</div>
</body>
<script type="text/javascript" src="/blog/admin/js/login.js"></script>
{tpl:include file="html_footer.tpl"}