/**
 *
 * @author          liuzhaohui
 * @contact         Email: hi.liuzhaoxin@gmail.com, QQ: 50081449, QQqun: 30715306
 *
 * -----------------------------
 * Happy Coding
 *
**/

;(function () {
var dewlog = window.dewlog;

dewlog.postWrite = postWrite;

function postWrite ()
{
		var	dom = sweet.dom, hook = sweet.hook, 
				edit = new sweet.html(this._editTpl), 
				toolbar = new sweet.html(this._toolbarTpl);
		
		this._toolbarNode = toolbar.path('/');
		dom.addEvent(this._toolbarNode, 'click', events.toolbarClick.bind(this));
		dom.addEvent(this._toolbarNode, 'mousedown', events.toolbarMousedown.bind(this));
		dom.addEvent(this._toolbarNode, 'mouseup', events.toolbarMouseup.bind(this));
		dom.addEvent(this._toolbarNode, 'mouseover', events.toolbarMouseover.bind(this));
		
		this._toolbarReleaseNode = toolbar.path('/div[0]');
		
		this._toolbarPassNode = toolbar.path('/div[1]');
		
		this._editWrapNode = edit.path('/');
		
		this._editFormNode = edit.path('/form');
		
		this._editTitleLabelNode = edit.path('/form/div[1]/label');
		this._editTitleInputNode = edit.path('/form/div[1]/input');
		
		this._hideEditTitleLabe = new Function ('this._editTitleLabelNode.style.display="none"').bind(this);
		this._showEditTitleLabe = new Function ('if(this._editTitleInputNode.value=="")this._editTitleLabelNode.style.display="block"').bind(this);
		
		dom.addEvent(this._editTitleInputNode, 'focus', this._hideEditTitleLabe);
		dom.addEvent(this._editTitleInputNode, 'blur', this._showEditTitleLabe);
		
		this._editLogTextWrapNode = edit.path('/form/div[2]');
		
		this._editLogTextareaNode = edit.path('/form/div[2]/textarea');
		
		this._editItemPassNode = edit.path('/form/div[3]/input');
		
		this._toolbarMode = 'edit';
		
		hook.on('resize', this._editWrapHeight.bind(this));
		
		setTimeout(this._setEditor.bind(this), 133);
}

sweet.util.inherits(postWrite, sweet.events);

postWrite.prototype._toolbarTpl = '\
<div class="postView">\
	<div class="toolbar-button-wrap clearfix">\
		<div class="toolbar-release toolbar-text toolbar-button">\
			<span class="release-text">发布</span>\
		</div>\
	</div>\
	<div class="toolbar-button-wrap clearfix">\
		<div class="toolbar-pass toolbar-button">\
			<span class="toolbar-icon pass-icon"></span>\
		</div>\
	</div>\
	<div class="toolbar-button-wrap clearfix"></div>\
</div>';

postWrite.prototype._editTpl = '\
<div class="log-write">\
	<form method="post" action="">\
		<div class="log-title">标题</div>\
		<div class="log-title-wrap log-write-title-wrap">\
			<label for="log-edit-title-write">输入日志标题</label>\
			<input id="log-edit-title-write" type="text" name="title" />\
		</div>\
		<div class="log-text"><textarea name="content" id="log-edit-text"></textarea></div>\
		<div class="log-pass"><input type="hidden" name="pass" /></div>\
	</form>\
</div>';

postWrite.prototype._cmd = 'post-write';

postWrite.prototype.getCmd = function ()
{
		return this._cmd;
};

postWrite.prototype.setMenu = function (menu)
{
		menu.addItem(this._cmd, '写日志');
		this._menu = menu;
};

postWrite.prototype.handler = function (query)
{
		this._menu.setFocus(this._cmd);
		this._toolbarNode.style.display = 'block';
		this._editWrapNode.style.display = 'block';
		
		// 12 分一次 ping, 以免编辑过程出现会话过期!
		this._timerID = setInterval(this.ping.bind(this), 1000 * 60 * 12);
		
		setTimeout(this._editWrapHeight.bind(this), 133);
};

postWrite.prototype._setEditor = function ()
{
		this._editorTool = KindEditor.create(this._editLogTextareaNode, 
		{
				width: '100%', 
				resizeMode: 0, 
				// allowFileManager: true, 
				items : 
				[
						'undo', 'redo', '|', 
						'forecolor', 'hilitecolor', 'formatblock', 'fontname', 'fontsize', '|', 
						'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', '|', 
						'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', '|', 
						'lineheight', 'indent', 'outdent', 'insertorderedlist', 'insertunorderedlist', '|', 
						'fullscreen', '/', 
						'removeformat', '|', 
						'emoticons', 'table', 'hr', '|', 
						'code', 'plainpaste', 'wordpaste', '|', 
						'link', 'unlink', 'anchor', '|', 
						// 'insertfile', 'image', 'multiimage', 'flash', 'media', '|', 
						'source', 'clearhtml'
				]
		});
		
		this._editorTool._handlers.clickToolbarfullscreen
			.push(new Function('this._toolbarMode=this._toolbarMode=="edit"?"fullscreen":"edit";this._editWrapHeight()').bind(this));
};

postWrite.prototype._editWrapHeight = function ()
{
		var dom = sweet.dom, hook = sweet.hook;
		
		if (this._editWrapNode.style.display == 'none' || 'edit' != this._toolbarMode)
		{
				return;
		}
		
		var	top = dom.getElementPosition(this._editLogTextWrapNode).top, 
				height = dom.getViewHeight() - top - 35;
		
		this._editorTool && this._editorTool.resize(null, height + 'px');
};

postWrite.prototype.setToolbar = function (node)
{
		node.appendChild(this._toolbarNode);
};

postWrite.prototype.setContent = function (node)
{
		node.appendChild(this._editWrapNode);
		this._contentNode = node;
};

postWrite.prototype.destroy = function ()
{
		this._toolbarNode.style.display = 'none';
		this._editWrapNode.style.display = 'none';
		
		this._timerID && clearInterval(this._timerID);
};

postWrite.prototype.ping = function ()
{
		var url = dewlog.requestUrl['ping'], ajax = new sweet.ajax;
		ajax.open('GET', url);
		ajax.on('error', callback.error.bind(this));
		ajax.send();
};

var callback = {};

callback.writeLogComplete = function (text)
{
		this._stateFrame.destroy();
		delete this._stateFrame;
		
		var _alert = new sweet.ui.dialog.alert;
		_alert.setTitle('完成');
		_alert.setType('right');
		_alert.setText('日志发布完成...');
		_alert.display();
		
		this._editTitleInputNode.focus();
		this._editorTool && this._editorTool.html('');
		
		this._editFormNode.reset();
};

callback.error = function ()
{
		var _alert = new sweet.ui.dialog.alert;
		_alert.setTitle('错误');
		_alert.setType('error');
		_alert.setText('当前网络可能不稳定!!!');
		_alert.display();
};

var events = {};

events.toolbarClick = function (e)
{
		var	node = e.srcElement || e.target, 
				dom = sweet.dom, className = node.className;
		
		// 发布
		if (dom.hasClass(node, 'toolbar-text') || dom.hasClass(node, 'release-text'))
		{
				var	url = dewlog.requestUrl['post-add'], 
						state = new sweet.ui.dialog.state, 
						ajax = new sweet.ajax;
				
				state.setText('梢等片刻...');
				state.setType('wait');
				state.display();
				
				this._editorTool.sync();
				ajax.setFormElementData(this._editFormNode);
				
				ajax.open('POST', url);
				ajax.on('complete', callback.writeLogComplete.bind(this));
				ajax.on('error', callback.error.bind(this));
				ajax.send();
				
				this._stateFrame = state;
		}
		// 密码
		else if (dom.hasClass(node, 'toolbar-pass') || dom.hasClass(node, 'pass-icon'))
		{
				var _prompt = new sweet.ui.dialog.prompt;
				_prompt.setTitle('设置密码');
				_prompt.on('ok', new Function('pwd', 'this._editItemPassNode.value=pwd').bind(this));
				_prompt.display();
		}
};

events.toolbarMousedown = function (e)
{
		var dom = sweet.dom, hook = sweet.hook;
		dom.stopEvent(e);
		
		this._currToolbarMouseupEvent = events.toolbarMouseup.bind(this);
		
		if (this._toolbarNode.setCapture)
		{
				this._toolbarNode.setCapture();
		}
		
		hook.once('mouseup', this._currToolbarMouseupEvent);
};

events.toolbarMouseup = function (e)
{
		if (this._toolbarNode.releaseCapture)
		{
				this._toolbarNode.releaseCapture();
		}
		
		delete this._currToolbarMouseupEvent;
};

events.toolbarMouseover = function (e)
{
		var	node = e.srcElement || e.target, 
				dom = sweet.dom, hook = sweet.hook, 
				className = node.className;
		
		dom.stopEvent(e);
		
		if (this._currToolbarMouseoutEvent || 
				className.indexOf('toolbar-disable') > -1 || 
				!dom.hasClass(node, 'toolbar-button'))
		{
				return;
		}
		
		dom.addClass(node, 'toolbar-button-focus');
		this._currToolbarMouseoutEvent = events.toolbarMouseout.bind(this, node, node.parentNode, 'toolbar-button-focus');
		hook.on('mouseout', this._currToolbarMouseoutEvent);
};

events.toolbarMouseout = function (child, parent, className, e)
{
		var	node = e.relatedTarget || e.toElement, 
				dom = sweet.dom, hook = sweet.hook;
		
		// opera 在 手动触发事件时，relatedTarget 无值
		if (node === undefined)
		{
				node = e.currentTarget;
		}
		
		if (!dom.contains(node, parent))
		{
				dom.removeClass(child, className);
				hook.removeListener('mouseout', this._currToolbarMouseoutEvent);
				delete this._currToolbarMouseoutEvent;
		}
};


})();