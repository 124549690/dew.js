{tpl:include file="html_head.tpl"}
<link type="text/css" rel="stylesheet" href="/blog/default/css/valid_pass.css" />
</head>
<body>

<div class="main">
	<form method="post" action="{tpl:echo vaildpwdUrl}">
		<p>请输入该日志的访问密码</p>
		<p><input type="password" name="pwd"><input type="submit" value="进入..." /></p>
		<p><a href="{tpl:echo homeUrl}">«返回首页</a></p>
	</form>
</div>

</body>
{tpl:include file="html_footer.tpl"}