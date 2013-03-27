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

var dom = sweet.dom, nodes = {}, events = {}, callback = {};

nodes.inputTextarea = dom.ID('comment-input-textarea');

events.textareaFocus = function (e)
{
		dom.addClass(nodes.inputTextarea.parentNode, 'comment-input-textarea-box-focus');
		if ('focus' == e.type)
		{
				dom.removeEvent(nodes.inputTextarea, 'mouseout', events.textareaBlur);
		}
};

events.textareaBlur = function (e)
{
		dom.removeClass(nodes.inputTextarea.parentNode, 'comment-input-textarea-box-focus');
		if ('blur' == e.type)
		{
				dom.addEvent(nodes.inputTextarea, 'mouseout', events.textareaBlur);
		}
};

events.textareaResize = function ()
{
		var	_self = arguments.callee, 
				tmpTextareaNode = _self._tmpTextareaNode, 
				textareaNode = nodes.inputTextarea;
		
		if (!_self._height)
		{
				tmpTextareaNode = document.createElement('textarea');
				document.body.appendChild(tmpTextareaNode);
				_self._tmpTextareaNode = tmpTextareaNode;
				_self._height = parseInt(dom.getStyle(textareaNode, 'height'));
		}
		
		tmpTextareaNode.value = textareaNode.value;
		
		dom.setStyles(tmpTextareaNode,
		{
				height: '0', 
				overflow: 'hidden', 
				lineHeight: dom.getStyle(textareaNode, 'line-height'), 
				borderWidth: 0, 
				width: dom.getStyle(textareaNode, 'width')
		});
		
		textareaNode.style.height = Math.max(_self._height, tmpTextareaNode.scrollHeight - tmpTextareaNode.clientHeight) + 'px';
};

dom.addEvent(nodes.inputTextarea, 'mouseover', events.textareaFocus);
dom.addEvent(nodes.inputTextarea, 'mouseout', events.textareaBlur);
dom.addEvent(nodes.inputTextarea, 'focus', events.textareaFocus);
dom.addEvent(nodes.inputTextarea, 'blur', events.textareaBlur);

if (nodes.inputTextarea.onpropertychange === null)
{
		dom.addEvent(nodes.inputTextarea, 'propertychange', events.textareaResize);
}
else
{
		dom.addEvent(nodes.inputTextarea, 'input', events.textareaResize);
		dom.addEvent(nodes.inputTextarea, 'paste', events.textareaResize);
}

// dom.addEvent(nodes.inputTextarea, 'keyup', events.textareaResize);


nodes.validCode = dom.ID('comment-code');

events.codeClick = function ()
{
		var ajax = new sweet.ajax;
		
		ajax.on('complete', callback.codeComplete.bind(null, nodes.validCode));
		ajax.on('error', callback.commentError.bind(null));
		
		ajax.open('GET', nodes.validCode.getAttribute('src'));
		ajax.send();
};

dom.addEvent(nodes.validCode, 'click', events.codeClick);


nodes.commentSubmit = dom.ID('comment-submit');

events.commentClick = function (e)
{
		var node = e.srcElement || e.target;
		
		if ('SPAN' !== node.nodeName)
		{
				return;
		}
		
		var c = new comment;
		c.setMode('write');
		c.setFormElement(nodes.commentSubmit);
		c.query();
};

dom.addEvent(nodes.commentSubmit, 'click', events.commentClick);

nodes.commentContent = dom.ID('comment-content-container');
nodes.commentPages = dom.ID('comment-pages-container');

function comment ()
{
		var ajax = new sweet.ajax;
		
		this.on = ajax.on.bind(ajax);
		this.emit = ajax.emit.bind(ajax);
		
		this._ajax = ajax;
}

sweet.util.inherits(comment, sweet.events);

comment.prototype._tpl = '\
<div class="comment-content-box clearfix">\
	<div class="comment-content-detail"><span class="comment-user-name"><?=this.nickname?>:</span><?=this.text?></div>\
	<div class="comment-content-time"><?=this.time?></div>\
</div>';

comment.prototype._max_name_len = 16;
comment.prototype._min_name_len = 4;

comment.prototype._max_text_len = 280;
comment.prototype._min_text_len = 14;

comment.prototype._enumState = (function ()
{
		var Enum = 
		[
				'validCodeError', 
				'validCodeExpire', 
				'maxTextError', 
				'minTextError', 
				'maxNameError', 
				'minNameError', 
				'nameError', 
				'notAllowComment', 
				'done', 
        "failure"
		], ret = {};
		
		Enum.forEach(function (v, i) {ret[v] = i});
		return ret;
})();

comment.prototype._enumStateText = 
[
		'验证码错误', 
		'验证码过期', 
		'评论过长', 
		'评论过短', 
		'昵称过长', 
		'昵称过短', 
		'用户名错误', 
		'不允许评论', 
		'回复成功', 
    "回复失败"
];

comment.prototype.setMode = function (mode)
{
		this._mode = mode;
};

comment.prototype.setFormElement = function (form)
{
		this._form = form;
		this._ajax.setFormElementData(form);
};

comment.prototype.setNowPage = function (page)
{
		this._page = page;
};

comment.prototype.setUrl = function (url)
{
		this._url = url;
};

comment.prototype.query = function ()
{
		var mode = this._mode;
		
		if ('write' === mode)
		{
				this._writeData();
		}
		else if ('read' === mode)
		{
				this._readData();
		}
};

comment.prototype._writeData = function ()
{
		var	ajax = this._ajax, 
				_alert = new sweet.ui.dialog.alert, 
				e = this._enumState, 
				eText = this._enumStateText;
		
		_alert.setTitle('错误');
		_alert.setType('warning');
		
		var nicknameLen = sweet.func.strlen(decodeURI(ajax.getData('nickname')) || '', 'gbk');
		
		if (this._max_name_len < nicknameLen)
		{
				_alert.setText(eText[e.maxNameError]);
				_alert.display();
				return;
		}
		
		if (this._min_name_len > nicknameLen)
		{
				_alert.setText(eText[e.minNameError]);
				_alert.display();
				return;
		}
		
		var textLen = (decodeURI(ajax.getData('text')) || '').length;
		
		if (this._max_text_len < textLen)
		{
				_alert.setText(eText[e.maxTextError]);
				_alert.display();
				return;
		}
		
		if (this._min_text_len > textLen)
		{
				_alert.setText(eText[e.minTextError]);
				_alert.display();
				return;
		}
		
		_alert.destroy();
		
		this.on('complete', callback.commentWriteComplete.bind(this));
		this.on('error', callback.commentError.bind(this));
		ajax.send();
};

comment.prototype._readData = function ()
{
		var ajax = this._ajax;
		
		this.on('complete', callback.commentReadComplete.bind(this));
		this.on('error', callback.commentError.bind(this));
		
		ajax.open('GET', this._url);
		ajax.send();
};

comment.prototype._addItem = function (data)
{
		var tpl = new sweet.template, time = new Date;
		time.setTime(data.time + '000');
		
		tpl.assign('nickname', data.user);
		tpl.assign('text', data.content);
		tpl.assign('time', time.format('Y-m-d H:i:s'));
		
		return tpl.fetch(this._tpl);
};

callback.commentWriteComplete = function (text)
{
		var	_alert = new sweet.ui.dialog.alert, 
				e = this._enumState, 
				eText = this._enumStateText, 
				data = JSON.parse(text);
		
		_alert.setType('warning');
		
		switch (data.state)
		{
				case e.validCodeError: 
					_alert.setText(eText[e.validCodeError]);
					events.codeClick();
					break;
				
				case e.validCodeExpire: 
					_alert.setText(eText[e.validCodeExpire]);
					break;
				
				case e.maxTextError: 
					_alert.setText(eText[e.maxTextError]);
					break;
				
				case e.minTextError: 
					_alert.setText(eText[e.minTextError]);
					break;
				
				case e.maxNameError: 
					_alert.setText(eText[e.maxNameError]);
					break;
				
				case e.minNameError: 
					_alert.setText(eText[e.minNameError]);
					break;
				
				case e.nameError: 
					_alert.setText(eText[e.nameError]);
					break;
				
				case e.notAllowComment: 
					_alert.setText(eText[e.notAllowComment]);
					break;
				
				case e.done: 
					this._form.reset();
					new sweet.html(this._addItem(data)).before(nodes.commentContent);
					_alert.setTitle('完成');
					_alert.setType('right');
					_alert.setText(eText[e.done]);
          break;
          
        case e.failure: 
					_alert.setText(eText[e.failure]);
					break;
		}
		
		_alert.display();
};

callback.commentReadComplete = function (text)
{
		var data = JSON.parse(text), msg = '', i = 0, j = data.data.length, item;
		
		for (; i < j; i++)
		{
				msg += this._addItem(data.data[i]);
		}
		
		nodes.commentContent.innerHTML = msg;
		
		if (i)
		{
        nodes.commentPages.innerHTML = data.pagers;
		}
    else
    {
        nodes.commentPages.style.display = 'none';
    }
		
		this.emit('anchor');
};

callback.codeComplete = function (node, text)
{
		node.innerHTML = text;
};

callback.commentError = function ()
{
		var _alert = new sweet.ui.dialog.alert;
		_alert.setTitle('错误');
		_alert.setType('error');
		_alert.setText('当前网络可能不稳定!!!');
		_alert.display();
};

events.pagesClick = function (e)
{
		var node = e.srcElement || e.target;
		
		if ('A' !== node.nodeName)
		{
				return;
		}
		
		sweet.dom.stopEvent(e);
		
		var c = new comment;
		c.setMode('read');
		c.setUrl(node.getAttribute('href'));
		c.on('anchor', new Function('setTimeout("location.hash=\\"#comment\\"", 38)'));
		c.query();
		
		location.hash = '';
};

dom.addEvent(nodes.commentPages, 'click', events.pagesClick);

// 进行第一次预先加载留言
;(function () {
var c = new comment;
c.setMode('read');
c.setUrl(nodes.commentPages.getAttribute('src').replace("#page#", 1));
c.query();

events.codeClick();
})();

})();