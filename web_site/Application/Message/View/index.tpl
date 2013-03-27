<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="utf-8">
<head>
{tpl:include file="header.tpl"}
<title>留言板</title>
</head>
<body>
<div id="container">
	<div id="content">
		<div id="top">
				<h3>留言板</h3>
				<a id="user_login" href="javascript:{tpl:if isLogin}logout();">注销{tpl:else}login();">管理{tpl:endif}</a>
		</div>
		<div id="m_box">
{tpl:each input=message value=item}{tpl:assign name=msg value=item[0]}
			<div class="m_message">
				<div class="m_message_title">
					<span class="m_message_nicknama">{tpl:echo msg.muser}</span>
					<span class="m_message_date">{tpl:echo msg.mdate}</span>
					<span class="m_message_operation" id="mid_{tpl:echo msg.mid}">
						<a href="javascript:_replyBox('mid_{tpl:echo msg.mid}');">回复</a>
{tpl:if isLogin}
						<a href="javascript:_deleteBox('mid_{tpl:echo msg.mid}');">删除</a>
{tpl:endif}
					</span>
				</div>
				<div class="m_message_content">{tpl:echo msg.mcontent}</div>
{tpl:each input=item value=reply start=1}
				<div class="m_message_reply">
					<div class="m_message_title">
						<span class="m_message_nicknama">{tpl:echo reply.ruser}</span>
						<span class="m_message_date">{tpl:echo reply.mdate}</span>
						<span class="m_message_reply_operation" id="rid_{tpl:echo reply.rid}">
{tpl:if isLogin}
							<a href="javascript:_deleteBox('rid_{tpl:echo reply.rid}');">删除</a>
{tpl:endif}
						</span>
					</div>
					<div class="m_message_content">{tpl:echo reply.rcontent}</div>
				</div>
{tpl:endeach}
			</div>
{tpl:endeach}
		</div>
		<div class="page">
			<ul id="m_subpage">{tpl:echo subpage}</ul>
		</div>
		<div class="input_box">
			<div class="input_box_border"><textarea id="message" onmousedown="Elib.wordLimit(this,'count','input_box_limit','留个脚印...')" rows="1" cols="1">留个脚印...</textarea></div>
			<div class="input_box_nicknama">
				<label>昵称</label>
				<input id="nicknama" type="text" maxlength="16" />
			</div>
			<div class="input_box_code">
				<label>验证码</label>
				<input id="userCode" type="text" maxlength="4" />
        <p id="valid_code" onclick="Elib.code(this);" src="valid/validCode" title="计算有难度？点击换一个"></p>
			</div>
			<div class="input_box_button">
				<div id="input_box_limit">还能输入<span id="count" class="countNumber">140</span>字</div>
				<div class="button6" onmousedown="Elib.button(this);" onclick="_m_send_message();"><button>发表</button></div>
			</div>
		</div>
	</div>
	<div id="footer">
		<div id="timerMark">Page Executioned in <span id="timer">{tpl:echo timer}<span></div>
	</div>
</div>
</body>
<script type="text/javascript">
Elib.code(document.getElementById("valid_code"));
</script>
{tpl:include file="footer.tpl"}
</html>