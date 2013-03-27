{tpl:each input=posts value=item}
		<div class="post-item">
			<div class="post-date">
				<div class="post-day">{tpl:echo item.day}</div>
				<div class="post-month-year">{tpl:echo item.monthYear}</div>
			</div>
			<div class="post-text">
				<h3 class="post-title"><a target="_blank" href="{tpl:echo item.url}">{tpl:echo item.title}</a></h3>
				<div class="post-content">
{tpl:if item.isPwd}
<p>[该日志已设置加密，请点击标题输入密码访问]</p>
{tpl:else}
{tpl:echo item.content}
{tpl:endif}
				</div>
				<div class="post-meta clearfix">
					<ul>
						<li class="post-comment"><a target="_blank" href="{tpl:echo item.url}#comment">发表评论</a></li>
					</ul>
				</div>
			</div>
		</div>
{tpl:endeach}