{tpl:include file="html_head.tpl"}
<style type="text/css">
body
{
		background-color: #F7F7F7;
		font-family: Arial;
		font-size: 12px;
		line-height: 150%;
}

.main
{
		background-color: #FFFFFF;
		border: 1px solid #DFDFDF;
		border-radius: 10px 10px 10px 10px;
		color: #666666;
		font-size: 12px;
		list-style: none outside none;
		margin: 60px auto 0;
		padding: 30px 10px;
		width: 650px;
}

.main p
{
		line-height: 18px;
		margin: 5px 20px;
}
</style>
</head>
<body>
<div class="main">
<p>抱歉，你所请求的页面不存在！</p>
<p><a href="{tpl:echo homeUrl}">«返回首页</a></p>
</div>
</body>
{tpl:include file="html_footer.tpl"}