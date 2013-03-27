/**
 *
 * @author          liuzhaohui
 * @contact         Email: hi.liuzhaoxin@gmail.com, QQ: 50081449, QQqun: 30715306
 *
 * -----------------------------
 * Happy Coding
 *
**/

;(function (){
if (!window.sweet) return;

sweet.ui = sweet.ui || {};
var dialog = sweet.ui.dialog = {};

// window module begin
;(function () {

dialog.window = win;

function win ()
{
		var	dom = sweet.dom, hook = sweet.hook, 
				html = new sweet.html(this._tpl);
		
		html.append(document.body);
		
		this._root = html.path('/');
		
		this._titleIcon = html.path('/div/div/div/img');
		this._titleText = html.path('/div/div/div/p');
		this._titleBar = html.path('/div/div[0]');
		
		this._minimizeButton = html.path('/div/div/div[2]/a[0]');
		this._maximizeButton = html.path('/div/div/div[2]/a[1]');
		this._closeButton =  html.path('/div/div/div[2]/a[2]');
		
		if (sweet.browser.isIE && sweet.browser.version < 9)
		{
				this._minimizeButton.hideFocus = true;
				this._maximizeButton.hideFocus = true;
				this._closeButton.hideFocus = true;
		}
		
		this._uiFrameNode = html.path('/div/div[1]');
		
		this._resize = html.path('/div').slice(1);
		
		// 标题栏菜单事件
		// this._currentTitleBarContextmenuEvent = winTitleBarContextmenuEvent.contextmenu.bind(this);
		// dom.addEvent(this._titleBar, 'contextmenu', this._currentTitleBarContextmenuEvent);
		
		// 标题栏点击事件
		this._currentTitleBarClickEvent = winTitleBarContextmenuEvent.click.bind(this);
		dom.addEvent(this._titleBar, 'click', this._currentTitleBarClickEvent);
		
		// 标题栏双击事件
		this._currentTitleBarDblclickEvent = winTitleBarContextmenuEvent.dblclick.bind(this);
		dom.addEvent(this._titleBar, 'dblclick', this._currentTitleBarDblclickEvent);
		
		// 标题栏鼠标按下事件
		this._currentTitleBarMousedownEvent = winTitleBarContextmenuEvent.mousedown.bind(this);
		dom.addEvent(this._titleBar, 'mousedown', this._currentTitleBarMousedownEvent);
		
		// 标题栏鼠标移动事件
		this._currentTitleBarMousemoveEvent = winTitleBarContextmenuEvent.mousemove.bind(this);
		
		// 标题栏鼠标松开事件
		this._currentTitleBarMouseupEvent = winTitleBarContextmenuEvent.mouseup.bind(this);
		
		// 窗口鼠标按下事件
		this._currentRootMousedownEvent = winEvent.mousedown.bind(this);
		dom.addEvent(this._root, 'mousedown', this._currentRootMousedownEvent);
		
		// 窗口鼠标松开事件
		this._currentRootResizeMouseupEvent = winEvent.mouseup.bind(this);
		
		this.on('minimize', this.hidden.bind(this));
		this.on('maximize', this.setState.bind(this, 32));
		this.on('restore', this.setState.bind(this, 1));
		this.on('close', this.destroy.bind(this));
		
		this.on('display', this.display.bind(this));
		
		this.on('dragStart', this.setState.bind(this, 128));
		this.on('dragDrop', this.setState.bind(this, 64));
}

sweet.util.inherits(win, sweet.events);

// -1 默认, 0 还原, 1 最大化, 2 最小化
win.prototype._stateCode = -1;

win.prototype._buttonCode = 0;

win.prototype._minWidth = 320;

win.prototype._minHeight = 23;

win.prototype._keepBottom = 23;

win.prototype._tpl = '\
<div class="uiDialogWindow">\
	<div class="uiWindowContainer">\
		<div class="uiWindowTitleBar">\
			<div class="uiWindowTitleBarContainer">\
				<img class="uiWindowTitleIcon" />\
				<p class="uiWindowTitleText"></p>\
			</div>\
			<div class="uiWindowTitleBarCover"></div>\
			<div class="uiWindowTitleButtonContainer">\
				<a href="#" title="最小化"></a>\
				<a href="#" title="最大化"></a>\
				<a href="#" title="关闭"></a>\
			</div>\
		</div>\
		<div class="uiWindowFrame"></div>\
	</div>\
	<div class="uiWindowResizeLeftUp"></div>\
	<div class="uiWindowResizeUp"></div>\
	<div class="uiWindowResizeRightUp"></div>\
	<div class="uiWindowResizeRight"></div>\
	<div class="uiWindowResizeRightDown"></div>\
	<div class="uiWindowResizeDown"></div>\
	<div class="uiWindowResizeLeftDown"></div>\
	<div class="uiWindowResizeLeft"></div>\
</div>';

win.prototype.getContainer = function ()
{
		return this._root;
};

win.prototype.setzIndex = function (index)
{
		this._root.style.zIndex = index | 0;
};

win.prototype.setIcon = function (src)
{
		this._titleIcon.style.visibility = 'visible';
		this._titleIcon.src = src;
};

win.prototype.setTitle = function (title)
{
		this._titleText.innerHTML = title;
};

win.prototype.setPosition = function (x, y)
{
		this._root.style.left = x + 'px';
		this._root.style.top = y + 'px';
};

win.prototype.setSize = function (width, height)
{
		this._root.style.width = width + 'px';
		this._root.style.height = height + 'px';
		this._uiFrameNode.style.width = this._root.clientWidth + 'px';
		this._uiFrameNode.style.height = this._root.clientHeight - this._minHeight + 'px';
};

win.prototype.setMinSize = function (width, height)
{
		this._minWidth = width;
		this._minHeight = height;
};

win.prototype.setKeepBottom = function (bottom)
{
		this._keepBottom += bottom;
};

win.prototype.setContent = function (html)
{
		if ('string' == typeof html)
		{
				this._uiFrameNode.innerHTML = html;
		}
		else
		{
				this._uiFrameNode.appendChild(html);
		}
};

/*
 1 00 01, 2 00 10, 4 01 00, 8 10 00
 1 关闭, 2 最小化, 4 最大化, 8 还原
*/
win.prototype.setButton = function (code)
{
		code = parseInt(code) || 7;
		
		if (!this._buttonCode)
		{
				this._buttonCode = code;
		}
		
		if (!(code & 2 ^ 2)) // 最小化
		{
				this._minimizeButton.className = 'uiWindowMinimize';
				this._minimizeButton.setAttribute('title', '最小化');
		}
		
		if (!(code & 4 ^ 4)) // 最大化
		{
				this.setState(64);
				this._stateCode = 0;
				this._maximizeButton.className = 'uiWindowMaximize';
				this._maximizeButton.setAttribute('title', '最大化');
		}
		else if (!(code & 8 ^ 8)) // 还原
		{
				this.setState(128);
				this._stateCode = 1;
				this._maximizeButton.className = 'uiWindowRestore';
				this._maximizeButton.setAttribute('title', '还原');
		}
		
		if (!(code & 1 ^ 1)) // 关闭
		{
				this._closeButton.className = 'uiWindowClose';
				this._closeButton.setAttribute('title', '关闭');
		}
};

win.prototype.getButton = function ()
{
		return this._buttonCode;
};

win.prototype.setState = function (code)
{
		if (code === 1) // 还原
		{
				this.setButton(4);
				this._buttonCode ^= 8 | 4;
		}
		else if (code === 32) // 最大化
		{
				this.setButton(8);
				this._buttonCode ^= 4 | 8;
		}
		else if (code === 16) // 最小化
		{
				this._stateCode |= 2;
				this._buttonCode ^= 2 & 2;
		}
		else if (code === 64) // 允许调整
		{
				this._resize.forEach(new Function ('v', 'sweet.dom.removeClass(v, "uiWindowResizeOn")'));
		}
		else if (code === 128) // 不允许调整
		{
				this._resize.forEach(new Function ('v', 'sweet.dom.addClass(v, "uiWindowResizeOn")'));
		}
};

win.prototype.getState = function ()
{
		return this._stateCode;
};

win.prototype.destroy = function ()
{
		var dom = sweet.dom, hook = sweet.hook;
		
		if (this._currentTitleBarContextmenu)
		{
				this._currentTitleBarContextmenu.destroy();
				delete this._currentTitleBarContextmenu;
		}
		
		delete this._events;
		
		// 清理固定注册事件
		/////////////////////////////////////////////////////////
		dom.removeEvent(this._root, 'mousedown', this._currentRootMousedownEvent);
		delete this._currentRootMousedownEvent;
		
		// dom.removeEvent(this._titleBar, 'contextmenu', this._currentTitleBarContextmenuEvent);
		// delete this._currentTitleBarContextmenuEvent;
		
		dom.removeEvent(this._titleBar, 'click', this._currentTitleBarClickEvent);
		delete this._currentTitleBarClickEvent;
		
		dom.removeEvent(this._titleBar, 'dblclick', this._currentTitleBarDblclickEvent);
		delete this._currentTitleBarDblclickEvent;
		
		dom.removeEvent(this._titleBar, 'mousedown', this._currentTitleBarMousedownEvent);
		delete this._currentTitleBarMousedownEvent;
		/////////////////////////////////////////////////////////
		
		// 清除全局事件
		/////////////////////////////////////////////////////////
		if (this._currentTitleBarMousemoveEvent)
		{
				hook.removeListener('mousemove', this._currentTitleBarMousemoveEvent);
				delete this._currentTitleBarMousemoveEvent;
		}
		
		if (this._currentTitleBarMouseupEvent)
		{
				hook.removeListener('mouseup', this._currentTitleBarMouseupEvent);
				delete this._currentTitleBarMouseupEvent;
		}
		
		if (this._currentRootResizeMousemoveEvent)
		{
				hook.removeListener('mousemove', this._currentRootResizeMousemoveEvent);
				delete this._currentRootResizeMousemoveEvent
		}
		
		if (this._currentRootResizeMouseupEvent)
		{
				hook.removeListener('mouseup', this._currentRootResizeMouseupEvent);
				delete this._currentRootResizeMouseupEvent;
		}
		/////////////////////////////////////////////////////////
		
		// 删除 DOM 引用
		/////////////////////////////////////////////////////////
		delete this._titleIcon;
		delete this._titleText;
		delete this._titleBar;
		delete this._minimizeButton;
		delete this._maximizeButton;
		delete this._closeButton;
		
		delete this._resize;
		delete this._uiFrameNode;
		
		dom.removeNode(this._root);
		delete this._root;
		/////////////////////////////////////////////////////////
};

win.prototype.display = function ()
{
		if (this._titleIcon.src.length !== 0)
		{
				this._titleIcon.style.visibility = 'visible';
		}
		
		if (this._stateCode > 1)
		{
				this._stateCode ^= 2;
				this._buttonCode |= 2;
		}
		
		this._root.style.visibility = 'visible';
};

win.prototype.hidden = function ()
{
		if (this._titleIcon.src.length !== 0)
		{
				this._titleIcon.style.visibility = 'hidden';
		}
		
		if (this._stateCode < 2)
		{
				this.setState(16);
		}
		
		this._root.style.visibility = 'hidden';
};

var winEvent = {};

winEvent.mousedown = function (e)
{
		var	node = e.target || e.srcElement, className = node.className, 
				button = e.button - (sweet.browser.isIE ? 1 : 0), code;
		
		this.emit('click');
		
		// !还原 || !鼠标左键 || !窗口调整
		if (this._stateCode !== 0 || button !== 0 || 
					className.indexOf('uiWindowResize') === -1 || 
					className.indexOf('uiWindowResizeOn') > -1)
		{
				return;
		}
		
		this.emit('resizeStart', this._root.offsetWidth, this._root.offsetHeight);
		
		// 西北: -left, -width, -top, -height; 8 + 32 + 2 + 128 = 170
		if ('uiWindowResizeLeftUp' == className) code = 170;
		// 北: -top, -height; 2 + 128 = 130
		else if ('uiWindowResizeUp' == className) code = 130;
		// 东北: -top, -height, +width; 2 + 128 + 16 = 146
		else if ('uiWindowResizeRightUp' == className) code = 146;
		// 东: +width; 16
		else if ('uiWindowResizeRight' == className) code = 16;
		// 东南 +height, +width; 16 + 64 = 80
		else if ('uiWindowResizeRightDown' == className) code = 80;
		// 南: +height; 64
		else if ('uiWindowResizeDown' == className) code = 64;
		// 西南: +height, -width, -left; 64 + 32 + 8 = 104
		else if ('uiWindowResizeLeftDown' == className) code = 104;
		// 西: -left, -width; 8 + 32 = 40
		else if ('uiWindowResizeLeft' == className) code = 40;
		
		this._currentRootLeft = this._root.offsetLeft;
		this._currentRootWidth = this._root.offsetWidth;
		
		this._currentRootTop = this._root.offsetTop;
		this._currentRootHeight = this._root.offsetHeight;
		
		this._currentRootResizeX = this._currentRootWidth + this._currentRootLeft;
		this._currentRootResizeY = this._currentRootHeight + this._currentRootTop;
		
		this._currentRootResizeMousemoveEvent = winEvent.mousemove.bind(this, code);
		
		sweet.hook.on('mousemove', this._currentRootResizeMousemoveEvent);
		sweet.hook.once('mouseup', this._currentRootResizeMouseupEvent);
		
		sweet.dom.stopEvent(e);
		
		if (this._root.setCapture)
		{
				this._root.setCapture();
		}
};

/*
 1: 00 00 00 01,  2: 00 00 00 10,  4: 00 00 01 00,   8: 00 00 10 00, 
16: 00 01 00 00, 32: 00 10 00 00, 64: 01 00 00 00, 128: 10 00 00 00
1 +top, 2 -top, 4 +left, 8 -left, 16 +width, 32 -width, 64 +height, 128 -height
*/
winEvent.mousemove = function (code, e)
{
		var width, height, root = this._root;
		
		if (e.clientY < 0 || e.clientX < 0)
		{
				return;
		}
		
		if (!(code & 16 ^ 16)) width = e.clientX - this._currentRootLeft;
		else if (!(code & 32 ^ 32)) width = this._currentRootResizeX - e.clientX;
		
		if (!(code & 64 ^ 64)) height = e.clientY - this._currentRootTop;
		else if (!(code & 128 ^ 128)) height = this._currentRootResizeY - e.clientY;
		
		if (!(code & 2 ^ 2)) root.style.top = Math.min(e.clientY, this._currentRootResizeY - this._minHeight) + 'px';
		if (!(code & 8 ^ 8)) root.style.left = Math.min(e.clientX, this._currentRootResizeX - this._minWidth) + 'px';
		
		if (width) root.style.width = Math.max(width, this._minWidth) + 'px';
		if (height) root.style.height = Math.max(height, this._minHeight) + 'px';
		
		this._uiFrameNode.style.width = this._root.clientWidth + 'px';
		this._uiFrameNode.style.height = this._root.clientHeight - this._minHeight + 'px';
};

winEvent.mouseup = function ()
{
		sweet.hook.removeListener('mousemove', this._currentRootResizeMousemoveEvent);
		delete this._currentRootResizeMousemoveEvent;
		
		if (this._root.setCapture)
		{
				this._root.releaseCapture();
		}
		
		this.emit('resizeEnd', this._root.offsetWidth, this._root.offsetHeight);
		
		if (this._currentRootLeft !== this._root.offsetLeft || 
				this._currentRootTop !== this._root.offsetTop)
		{
				this.emit('move', this._root.offsetLeft, this._root.offsetTop);
		}
};

var winTitleBarContextmenuEvent = {};

winTitleBarContextmenuEvent.mousedown = function (e)
{
		var	node = e.target || e.srcElement, hook = sweet.hook, 
				button = e.button - (sweet.browser.isIE ? 1 : 0), code;
		
		// 可能存在 debug ...
		// sweet.dom.stopEvent(e);
		
		if (this._currentTitleBarContextmenu)
		{
				this._currentTitleBarContextmenu.destroy();
				delete this._currentTitleBarContextmenu;
		}
		
		// !还原 && !默认 || !标题栏 || !鼠标左键
		if (this._stateCode !== 0 && this._stateCode !== -1 || 'uiWindowTitleBarCover' != node.className || button !== 0)
		{
				return;
		}
		
		if (this._root.setCapture)
		{
				this._root.setCapture();
		}
		
		this._currentRootTop = this._root.offsetTop;
		this._currentRootLeft = this._root.offsetLeft;
		
		this._currentMouseX = this._currentRootLeft - e.clientX;
		this._currentMouseY = this._currentRootTop - e.clientY;
		
		this._isDragStart = false;
		
		hook.on('mousemove', this._currentTitleBarMousemoveEvent);
		hook.once('mouseup', this._currentTitleBarMouseupEvent);
}

winTitleBarContextmenuEvent.mousemove = function (e)
{
		var	x = e.clientX, y = e.clientY, 
				left = sweet.dom.getViewWidth(), 
				top = sweet.dom.getViewHeight() - this._keepBottom;
		
		if (this._isDragStart === false)
		{
				this.emit('dragStart');
				this._isDragStart = true;
		}
		
		if (x > 0 && x < left)
		{
				x = this._currentMouseX + x;
		}
		else
		{
				x = this._root.offsetLeft;
		}
		
		if (y > top)
		{
				y = this._root.offsetTop;
		}
		else if (y > 0)
		{
				y = this._currentMouseY + y;
		}
		else
		{
				y = 0;
		}
		
		this._root.style.left = x + 'px';
		this._root.style.top = y + 'px';
};

winTitleBarContextmenuEvent.mouseup = function (e)
{
		sweet.hook.removeListener('mousemove', this._currentTitleBarMousemoveEvent);
		
		if (this._root.releaseCapture)
		{
				this._root.releaseCapture();
		}
		
		this.emit('dragDrop');
		
		if (this._currentRootLeft !== this._root.offsetLeft || 
				this._currentRootTop !== this._root.offsetTop)
		{
				this.emit('move', this._root.offsetLeft, this._root.offsetTop);
		}
};

winTitleBarContextmenuEvent.click = function (e)
{
		var node = e.target || e.srcElement, className = node.className;
		
		this.emit('click');
		
		if ('uiWindowMinimize' == className)
		{
				this.emit('minimize');
		}
		else if ('uiWindowMaximize' == className)
		{
				this.emit('maximize');
		}
		else if ('uiWindowRestore' == className)
		{
				this.emit('restore');
		}
		else if ('uiWindowClose' == className)
		{
				sweet.dom.stopEvent(e);
				this.emit('close');
		}
};

winTitleBarContextmenuEvent.dblclick = function (e)
{
		var node = e.target || e.srcElement;
		
		if ('uiWindowTitleBarCover' != node.className || this._stateCode === -1)
		{
				return;
		}
		
		if (this._stateCode === 0)
		{
				this.emit('maximize');
		}
		else if (this._stateCode === 1)
		{
				this.emit('restore');
		}
};

winTitleBarContextmenuEvent.contextmenu = function (e)
{
		var node = e.target || e.srcElement;
		
		if (this._currentTitleBarContextmenu)
		{
				this._currentTitleBarContextmenu.destroy();
				delete this._currentTitleBarContextmenu;
		}
		
		sweet.dom.stopEvent(e);
		
		if ('uiWindowTitleBarCover' != node.className)
		{
				return;
		}
		
		this.emit('resizeStart');
		
		var menu = new sweet.ui.contextmenu, code = this._buttonCode;
		
		if (!(code & 2 ^ 2)) // 最小化
		{
				menu.addItem('最小化', 'minimize', {iconClass: 'uiWindowTitleBarContextmenuMinimize'});
				menu.on('minimize', this.emit.bind(this, 'minimize'));
		}
		
		if (!(code & 4 ^ 4)) // 最大化
		{
				menu.addItem('最大化', 'maximize', {iconClass: 'uiWindowTitleBarContextmenuMaximize'});
				menu.on('maximize', this.emit.bind(this, 'maximize'));
		}
		else if (!(code & 8 ^ 8)) // 还原
		{
				menu.addItem('还原', 'restore', {iconClass: 'uiWindowTitleBarContextmenuRestore'});
				menu.on('restore', this.emit.bind(this, 'restore'));
		}
		
		if (!(code & 1 ^ 1)) // 关闭
		{
				if (this._buttonCode !== 1)
				{
						menu.addItem('');
				}
				menu.addItem('关闭', 'close', {iconClass: 'uiWindowTitleBarContextmenuClose'});
				menu.on('close', this.emit.bind(this, 'close'));
		}
		
		// 菜单事件提供的坐标本身不太准确
		menu.setPosition(e.clientX, e.clientY);
		menu.setWidth(100);
		menu.display();
		
		this._currentTitleBarContextmenu = menu;
};
})();
// window module end

// alert module begin
;(function () {

dialog.alert = _alert;

function _alert ()
{
		this.setCover();
		
		var	dom = sweet.dom, hook = sweet.hook, 
				html = new sweet.html(this._tpl), 
				win = new dialog.window;
		
		win.setContent(html.path('/'));
		
		this._alertIconNode = html.path('/div/div[0]');
		this._alertTextNode = html.path('/div/div[1]');
		
		win.setTitle('提示');
		win.setButton(1);
		win.setState(128);
		win.setzIndex(65533);
		win.on('close', this.destroy.bind(this));
		
		this._okButtonNode = html.path('/div[1]/div');
		
		var button = new sweet.ui.form.button(this._okButtonNode);
		win.on('close', button.destroy.bind(button));
		
		this._currentOkEvent = win.emit.bind(win, 'close');
		dom.addEvent(this._okButtonNode, 'click', this._currentOkEvent);
		
		this._win = win;
		this._maxContentHeight = html.path('/div[0]').offsetHeight;
		
		this._currentCenterEvent = this.setCenter.bind(this, win._root);
		hook.on('resize', this._currentCenterEvent);
		
		this._currentCoverEvent = this.changeCover.bind(this);
		hook.on('resize', this._currentCoverEvent);
}

sweet.util.mix(_alert.prototype, sweet.common);

_alert.prototype._tpl = '\
<div class="uiDialogAlert">\
	<div class="uiDialogAlertContent">\
		<div class="uiDialogIcon"></div>\
		<div class="uiDialogAlertText"></div>\
	</div>\
	<div class="uiDialogButton">\
		<div class="uiButton"><button value="确定" type="button">确定</button></div>\
	</div>\
</div>';

_alert.prototype._width = 320;
_alert.prototype._height = 120;

_alert.prototype.setType = function (type)
{
		var name = this._alertIconNode.className, index = name.indexOf('uiDialogAlert');
		
		if (index > -1)
		{
				name = name.slice(0, index);
		}
		
		this._alertIconNode.className = name + ' uiDialogAlert' + type;
};

_alert.prototype.setText = function (text)
{
		var node = this._alertTextNode;
		node.innerHTML = text;
		node.style.paddingTop = Math.max((this._maxContentHeight - node.offsetHeight) / 2, 0) + 'px';
};

_alert.prototype.setTitle = function (title)
{
		this._win.setTitle(title);
};

_alert.prototype.setWidth = function (width)
{
		this._width = width;
};

_alert.prototype.destroy = function ()
{
		var hook = sweet.hook, dom = sweet.dom;
		
		hook.removeListener('resize', this._currentCenterEvent);
		delete this._currentCenterEvent;
		
		hook.removeListener('resize', this._currentCoverEvent);
		delete this._currentCoverEvent;
		
		dom.removeEvent(this._okButtonNode, 'click', this._currentOkEvent);
		delete this._currentOkEvent;
		
		delete this._okButtonNode;
		delete this._alertIconNode;
		delete this._alertTextNode;
		
		delete this._win;
		
		this.removeCover();
		
		if (this._isHidden)
		{
				this.removeHidden();
		}
};

_alert.prototype.display = function ()
{
		this._win.setSize(this._width, this._height);
		
		this._isHidden = this.setHidden();
		this._currentCenterEvent();
		
		this._win.display();
};

})();
// alert module end

// confirm module begin
;(function () {
dialog.confirm = _confirm;

function _confirm ()
{
		this.setCover();
		
		var	dom = sweet.dom, hook = sweet.hook, 
				html = new sweet.html(this._tpl), 
				win = new dialog.window;
		
		win.setContent(html.path('/'));
		
		this._confirmTextNode = html.path('/div/div[1]');
		
		win.setTitle('确认');
		win.setButton(1);
		win.setState(128);
		win.setzIndex(65533);
		win.on('close', this.destroy.bind(this));
		
		this._okButtonNode = html.path('/div[1]/div[1]');
		this._cancelButtonNode = html.path('/div[1]/div[0]');
		
		var button = new sweet.ui.form.button([this._okButtonNode, this._cancelButtonNode]);
		win.on('close', button.destroy.bind(button));
		
		this._currentOkEvent = win.emit.bind(win, 'close', 'ok');
		dom.addEvent(this._okButtonNode, 'click', this._currentOkEvent);
		
		this._currentCancelEvent = win.emit.bind(win, 'close', 'cancel');
		dom.addEvent(this._cancelButtonNode, 'click', this._currentCancelEvent);
		
		this._win = win;
		this._maxContentHeight = html.path('/div[0]').offsetHeight;
		
		this._currentCenterEvent = this.setCenter.bind(this, win._root);
		hook.on('resize', this._currentCenterEvent);
		
		this._currentCoverEvent = this.changeCover.bind(this);
		hook.on('resize', this._currentCoverEvent);
}

sweet.util.inherits(_confirm, sweet.events);

sweet.util.mix(_confirm.prototype, sweet.common);

_confirm.prototype._tpl = '\
<div class="uiDialogConfirm">\
	<div class="uiDialogConfirmContent">\
		<div class="uiDialogIcon uiDialogConfirmIcon"></div>\
		<div class="uiDialogConfirmText"></div>\
	</div>\
	<div class="uiDialogButton">\
		<div class="uiButton"><button value="取消" type="button">取消</button></div>\
		<div class="uiButton"><button value="确定" type="button">确定</button></div>\
	</div>\
</div>';


_confirm.prototype._width = 320;
_confirm.prototype._height = 120;

_confirm.prototype.setText = function (text)
{
		var node = this._confirmTextNode;
		node.innerHTML = text;
		node.style.paddingTop = Math.max((this._maxContentHeight - node.offsetHeight) / 2, 0) + 'px';
};

_confirm.prototype.setTitle = function (title)
{
		this._win.setTitle(title);
};

_confirm.prototype.setWidth = function (width)
{
		this._width = width;
};

_confirm.prototype.destroy = function (type)
{
		if ('ok' == type)
		{
				this.emit('ok');
		}
		else
		{
				this.emit('cancel');
		}
		
		delete this._events;
		
		var hook = sweet.hook, dom = sweet.dom;
		
		hook.removeListener('resize', this._currentCenterEvent);
		delete this._currentCenterEvent;
		
		hook.removeListener('resize', this._currentCoverEvent);
		delete this._currentCoverEvent;
		
		dom.removeEvent(this._okButtonNode, 'click', this._currentOkEvent);
		delete this._currentOkEvent;
		
		dom.removeEvent(this._cancelButtonNode, 'click', this._currentCancelEvent);
		delete this._currentCancelEvent;
		
		delete this._okButtonNode;
		delete this._cancelButtonNode;
		delete this._confirmTextNode;
		
		delete this._win;
		
		this.removeCover();
		
		if (this._isHidden)
		{
				this.removeHidden();
		}
};

_confirm.prototype.display = function ()
{
		this._win.setSize(this._width, this._height);
		
		this._isHidden = this.setHidden();
		this._currentCenterEvent();
		
		this._win.display();
};


})();
// confirm module end

// prompt module begin
;(function () {

dialog.prompt = _prompt;

function _prompt ()
{
		this.setCover();
		
		var	dom = sweet.dom, hook = sweet.hook, 
				html = new sweet.html(this._tpl), 
				win = new dialog.window;
		
		win.setContent(html.path('/'));
		
		win.setTitle('输入');
		win.setButton(1);
		win.setState(128);
		win.setzIndex(65533);
		win.on('close', this.destroy.bind(this));
		
		this._inputNode = html.path('/div/div[1]/input');
		
		this._okButtonNode = html.path('/div[1]/div[1]');
		this._cancelButtonNode = html.path('/div[1]/div[0]');
		
		var button = new sweet.ui.form.button([this._okButtonNode, this._cancelButtonNode]);
		win.on('close', button.destroy.bind(button));
		
		this._currentOkEvent = win.emit.bind(win, 'close', 'ok');
		dom.addEvent(this._okButtonNode, 'click', this._currentOkEvent);
		
		this._currentCancelEvent = win.emit.bind(win, 'close', 'cancel');
		dom.addEvent(this._cancelButtonNode, 'click', this._currentCancelEvent);
		
		this._win = win;
		this._maxContentHeight = html.path('/div[0]').offsetHeight;
		
		this._currentCenterEvent = this.setCenter.bind(this, win._root);
		hook.on('resize', this._currentCenterEvent);
		
		this._currentCoverEvent = this.changeCover.bind(this);
		hook.on('resize', this._currentCoverEvent);
}

sweet.util.inherits(_prompt, sweet.events);

sweet.util.mix(_prompt.prototype, sweet.common);

_prompt.prototype._tpl = '\
<div class="uiDialogPrompt">\
	<div class="uiDialogPromptContent">\
		<div class="uiDialogIcon uiDialogPromptIcon"></div>\
		<div class="uiDialogPromptInput"><input type="text" /></div>\
	</div>\
	<div class="uiDialogButton">\
		<div class="uiButton"><button value="取消" type="button">取消</button></div>\
		<div class="uiButton"><button value="确定" type="button">确定</button></div>\
	</div>\
</div>';

_prompt.prototype._width = 320;
_prompt.prototype._height = 120;

_prompt.prototype.setTitle = function (title)
{
		this._win.setTitle(title);
};

_prompt.prototype.setWidth = function (width)
{
		this._width = width;
};

_prompt.prototype.destroy = function (type)
{
		if ('ok' == type)
		{
				this.emit('ok', this._inputNode.value);
		}
		else
		{
				this.emit('cancel');
		}
		
		delete this._events;
		
		var hook = sweet.hook, dom = sweet.dom;
		
		hook.removeListener('resize', this._currentCenterEvent);
		delete this._currentCenterEvent;
		
		hook.removeListener('resize', this._currentCoverEvent);
		delete this._currentCoverEvent;
		
		dom.removeEvent(this._okButtonNode, 'click', this._currentOkEvent);
		delete this._currentOkEvent;
		
		dom.removeEvent(this._cancelButtonNode, 'click', this._currentCancelEvent);
		delete this._currentCancelEvent;
		
		delete this._okButtonNode;
		delete this._cancelButtonNode;
		delete this._inputNode;
		
		delete this._win;
		
		this.removeCover();
		
		if (this._isHidden)
		{
				this.removeHidden();
		}
};

_prompt.prototype.display = function ()
{
		this._win.setSize(this._width, this._height);
		
		this._isHidden = this.setHidden();
		this._currentCenterEvent();
		
		this._win.display();
};

})();
// prompt module end

// state module begin
;(function () {

dialog.state = state;

function state ()
{
		this.setCover();
		
		var hook = sweet.hook, html = new sweet.html(this._tpl);
		
		this._stateNode = html.path('/');
		this._stateIconNode = html.path('/span/span[1]');
		this._stateTextNode = html.path('/span/span[2]');
		
		document.body.appendChild(this._stateNode);
		
		this._currentCoverEvent = this.changeCover.bind(this);
		hook.on('resize', this._currentCoverEvent);
}

sweet.util.mix(state.prototype, sweet.common);

state.prototype._tpl = '\
<div class="uiDialogState">\
	<span class="uiDialogStateWrap">\
		<span class="uiDialogStateBgLeft"></span>\
		<span class="uiDialogStateIcon"></span>\
		<span></span>\
		<span class="uiDialogStateBgRight"></span>\
	</span>\
</div>';

// 'error', 'warning', 'right', 'wait'
state.prototype.setType = function (type)
{
		this._stateIconNode.className += ' uiDialogStateIcon' + type;
};

state.prototype.setText = function (text)
{
		this._stateTextNode.innerHTML = text;
};

state.prototype.destroy = function ()
{
		delete this._stateIconNode;
		delete this._stateTextNode;
		sweet.dom.removeNode(this._stateNode);
		delete this._stateNode;
		
		sweet.hook.removeListener('resize', this._currentCoverEvent);
		delete this._currentCoverEvent;
		
		this.removeCover();
		
		if (this._isHidden)
		{
				this.removeHidden();
		}
};

state.prototype.display = function ()
{
		this._isHidden = this.setHidden();
		this._stateNode.style.visibility = 'visible';
};

})();
// state module end

})();