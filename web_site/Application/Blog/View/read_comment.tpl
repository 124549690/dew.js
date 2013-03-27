	<div class="detail-comment">
		<a name="comment"></a>
		<div class="comment-title">评论</div>
		<form id="comment-submit" class="comment-input-box clearfix" method="post" action="{tpl:echo commentWriteUrl}">
			<div class="comment-input-textarea-box"><textarea id="comment-input-textarea" name="text"></textarea></div>
			<div class="comment-submit-box clearfix">
				<div class="comment-input-nicknama">
					<label>昵称</label>
					<input type="text" maxlength="16" name="nickname" />
				</div>
				<div class="comment-input-code">
					<label>验证码</label>
					<input type="text" maxlength="4" name="code" />
					<p id="comment-code" src="{tpl:echo validCodeUrl}" title="计算有难度？点击换一个"></p>
				</div>
				<a class="comment-submit-button" href="#">
					<span class="comment-submit-button-left"></span>
					<span class="comment-submit-button-text">发表评论</span>
					<span class="comment-submit-button-right"></span>
				</a>
			</div>
		</form>
		<div class="comment-container">
			<div class="comment-content" id="comment-content-container"></div>
			<div class="comment-pages pagerbar-wrap" id="comment-pages-container" src="{tpl:echo commentReadUrl}"></div>
		</div>
	</div>