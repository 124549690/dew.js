<div id="container">
	<div id="post-content">
		<div class="content-head clearfix">
			<div class="content-other-info"><span>{tpl:echo data.now.ptime}</span></div>
			<h2 class="content-title">{tpl:echo data.now.title}</h2>
		</div>
		<div class="content-text clearfix">{tpl:echo data.now.content}</div>
		<div class="content-info">
			<div class="opt-box">
				<span class="opt-box-view">浏览({tpl:echo data.now.view})</span>
				<span class="opt-box-comment">评论({tpl:echo data.now.reply})</span>
			</div>
		</div>
	</div>
	{tpl:if data.isPrev || data.isNext}
	<div class="detail-pager clearfix">
    {tpl:if data.isPrev}
		<a class="detail-nav-pre" hidefocus href="{tpl:echo data.prevUrl}"></a>
		{tpl:endif}
		{tpl:if data.isNext}
		<a class="detail-nav-next" hidefocus href="{tpl:echo data.nextUrl}"></a>
		{tpl:endif}
	</div>
	{tpl:endif}
	{tpl:include file="read_comment.tpl"}
</div>