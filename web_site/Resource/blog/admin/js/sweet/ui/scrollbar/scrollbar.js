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
sweet.ui.scrollbar = scrollbar;

function scrollbar ()
{
		var	dom = sweet.dom, hook = sweet.hook, 
				html = new sweet.html(this._tpl);
		
		this._rootNode = html.path('/');
		
		this._backgroundBodyNode = html.path('/div[1]/div/div/div[1]');
		this._backgroundCoverNode = html.path('/div[1]/div/div[1]');
		
		this._handlerNode = html.path('/div[1]/div[1]');
		this._handlerBody = html.path('/div[1]/div[1]/div/div[1]');
		this._handlerCover = html.path('/div[1]/div[1]/div[1]');
		
		//////////////////////////////////////////////////////////////////////////////////////////////
		var handlerWrapNodes = 
		[
				{node: html.path('/div[1]/div[1]/div/div[0]'), name: 'uiScrollbarHandlerTop'}, 
				{node: html.path('/div[1]/div[1]/div/div[1]'), name: 'uiScrollbarHandlerCenter'}, 
				{node: html.path('/div[1]/div[1]/div/div[2]'), name: 'uiScrollbarHandlerBottom'}
		];
		
		this._currentHandlerMouseoverEvent = 
			new Function ('n', 'n.forEach(function (v) {sweet.dom.addClass(v.node, v.name + "Hover")})')
			.bind(this, handlerWrapNodes);
		
		this._currentHandlerMouseoutEvent = 
			new Function ('n', 'n.forEach(function (v) {sweet.dom.removeClass(v.node, v.name + "Hover")})')
			.bind(this, handlerWrapNodes);
		
		this._currentHandlerMousedownEvent = 
			new Function ('n', 'n.forEach(function (v) {sweet.dom.addClass(v.node, v.name + "Active")})')
			.bind(this, handlerWrapNodes);
			
		this._currentHandlerMouseupEvent = 
			new Function ('n', 'n.forEach(function (v) {sweet.dom.removeClass(v.node, v.name + "Active")})')
			.bind(this, handlerWrapNodes);
		//////////////////////////////////////////////////////////////////////////////////////////////
		
		var arrowUp = html.path('/div[0]'), arrowDown = html.path('/div[2]');
		
		this._currentArrowUpMouseoverEvent = dom.addClass.bind(null, arrowUp, 'uiScrollbarArrowUpHover');
		this._currentArrowUpMouseoutEvent = dom.removeClass.bind(null, arrowUp, 'uiScrollbarArrowUpHover');
		this._currentArrowUpMousedownEvent = dom.addClass.bind(null, arrowUp, 'uiScrollbarArrowUpActive');
		this._currentArrowUpMouseupEvent = dom.removeClass.bind(null, arrowUp, 'uiScrollbarArrowUpActive');
		
		
		this._currentArrowDownMouseoverEvent = dom.addClass.bind(null, arrowDown, 'uiScrollbarArrowDownHover');
		this._currentArrowDownMouseoutEvent = dom.removeClass.bind(null, arrowDown, 'uiScrollbarArrowDownHover');
		this._currentArrowDownMousedownEvent = dom.addClass.bind(null, arrowDown, 'uiScrollbarArrowDownActive');
		this._currentArrowDownMouseupEvent = dom.removeClass.bind(null, arrowDown, 'uiScrollbarArrowDownActive');
		
		
		this._currentScrollbarMousedownEvent = events.mousedown.bind(this);
		dom.addEvent(this._rootNode, 'mousedown', this._currentScrollbarMousedownEvent);
		
		this._currentScrollbarMouseoverEvent = events.mouseover.bind(this);
		dom.addEvent(this._rootNode, 'mouseover', this._currentScrollbarMouseoverEvent);
		
		
		this._currentContentMousewheelEvent = events.mousewheel.bind(this);
}

sweet.util.inherits(scrollbar, sweet.events);

scrollbar.prototype._tpl = '\
<div class="uiScrollbar">\
	<div class="uiScrollbarArrowUp"></div>\
	<div class="uiScrollbarContainer">\
		<div class="uiScrollbarBackground">\
			<div class="uiScrollbarBackgroundWrap">\
				<div class="uiScrollbarBackgroundTop"></div>\
				<div class="uiScrollbarBackgroundCenter"></div>\
				<div class="uiScrollbarBackgroundBottom"></div>\
			</div>\
			<div class="uiScrollbarBackgroundCover"></div>\
		</div>\
		<div class="uiScrollbarHandler">\
			<div class="uiScrollbarHandlerWrap">\
				<div class="uiScrollbarHandlerTop"></div>\
				<div class="uiScrollbarHandlerCenter"></div>\
				<div class="uiScrollbarHandlerBottom"></div>\
			</div>\
			<div class="uiScrollbarHandlerCover"></div>\
		</div>\
	</div>\
	<div class="uiScrollbarArrowDown"></div>\
</div>';

scrollbar.prototype._canScroll = false;

scrollbar.prototype._minScrollHandlerHeight = 20;

scrollbar.prototype._offsetTop = 0;
scrollbar.prototype._offsetRight = 0;

scrollbar.prototype.append = function (node)
{
		this._parentNode = node;
		node.appendChild(this._rootNode);
};

// 设置容器
scrollbar.prototype.setContainer = function (node)
{
		this._contentNode = node;
		this._offsetTop = node.offsetTop;
};

// 设置滚动条位置
scrollbar.prototype.setPosition = function (right, top)
{
		this._offsetTop += top;
		this._offsetRight += right;
		this.setHeight();
};

// 设置滚动条高度
scrollbar.prototype.setHeight = function ()
{
		var	root = this._rootNode, content = this._contentNode, 
				// 内容容器高度
				contentHeight = content.offsetHeight, 
				// 内容滚动高度
				contentScrollHeight = content.scrollHeight, 
				// 内容隐藏高度
				contentHiddenHeight = contentScrollHeight - contentHeight, 
				// 滚动条高度
				scrollHeight = contentHeight - 14 * 2, 
				// 滚动手柄高度
				handlerHeight = Math.max(Math.ceil(scrollHeight * (scrollHeight / contentScrollHeight)), this._minScrollHandlerHeight);
		
		if (contentHiddenHeight <= 0 || contentHeight === 0)
		{
				this.setHidden();
				return;
		}
		
		this.display();
		
		root.style.top = this._offsetTop + 'px';
		root.style.right = this._offsetRight + 'px';
		root.style.height = contentHeight + 'px';
		
		// 6 + 14 * 2
		this._backgroundBodyNode.style.height = scrollHeight - 6 + 'px';
		this._backgroundCoverNode.style.height = scrollHeight + 'px';
		
		this._handlerBody.style.height = handlerHeight - 6 + 'px';
		this._handlerCover.style.height = handlerHeight + 'px';
		
		this._currentScrollHeight = scrollHeight;
		this._currentHandlerHeight = handlerHeight;
		
		this._currentContentHiddenHeight = contentHiddenHeight;
		
		this.setScrollHandlerTop();
};

// 设置内容滚动 top 距离
scrollbar.prototype.setContentScrollTop = function (step)
{
		if (!this._canScroll)
		{
				return;
		}
		
		this._contentNode.scrollTop += step;
		this.setScrollHandlerTop();
};

// 设置滚动手柄样式 top 距离
scrollbar.prototype.setScrollHandlerTop = function ()
{
		var	handler = this._handlerNode, content = this._contentNode, 
				// 滚动手柄高度
				handlerHeight = this._currentHandlerHeight, 
				// 滚动条高度
				scrollHeight = this._currentScrollHeight, 
				// 当前滚动 top 距离
				contentScrollTop = content.scrollTop, 
				// 内容隐藏高度
				contentHiddenHeight = this._currentContentHiddenHeight;
		
		handler.style.top = 
			Math.max
			(
				Math.min
				(
					Math.round(contentScrollTop / contentHiddenHeight * (scrollHeight - handlerHeight)), 
					scrollHeight - handlerHeight
				), 
				0
			) + 'px';
};

// 设置滚动条隐藏
scrollbar.prototype.setHidden = function ()
{
		this.emit('hidden');
		
		this._canScroll = false;
		this._rootNode.style.visibility = 'hidden';
		
		var node = this._parentNode;
		sweet.dom.removeEvent(node, node.onmousewheel === null ? 'mousewheel' : 'DOMMouseScroll', this._currentContentMousewheelEvent);
};

// 显示滚动条
scrollbar.prototype.display = function ()
{
		this.emit('display');
		
		this._canScroll = true;
		this._rootNode.style.visibility = 'visible';
		
		var node = this._parentNode;
		sweet.dom.addEvent(node, node.onmousewheel === null ? 'mousewheel' : 'DOMMouseScroll', this._currentContentMousewheelEvent);
};

// 销毁滚动条
scrollbar.prototype.destroy = function ()
{
		// ...
};


var events = {};

events.mouseover = function (e)
{
		var	hook = sweet.hook, 
				node = e.target || e.srcElement, 
				className = node.className;
		
		if ('uiScrollbarHandlerCover' == className)
		{
				this._currentHandlerMouseoverEvent();
				hook.once('mouseout', this._currentHandlerMouseoutEvent);
		}
		else if ('uiScrollbarArrowUp' == className)
		{
				this._currentArrowUpMouseoverEvent();
				hook.once('mouseout', this._currentArrowUpMouseoutEvent);
		}
		else if ('uiScrollbarArrowDown' == className)
		{
				this._currentArrowDownMouseoverEvent();
				hook.once('mouseout', this._currentArrowDownMouseoutEvent);
		}
};

events.mousedown = function (e)
{
		var	dom = sweet.dom, hook = sweet.hook, 
				root = this._rootNode, 
				node = e.target || e.srcElement, 
				button = e.button - (sweet.browser.isIE ? 1 : 0), 
				className = node.className;
		
		hook.emit('contextmenu');
		
		dom.stopEvent(e);
		
		if (root.setCapture)
		{
				root.setCapture();
		}
		
		if (button !== 0)
		{
				return;
		}
		
		if ('uiScrollbarHandlerCover' == className)
		{
				this._currentHandlerMouseY = e.clientY;
				this._currentHandlerTop = this._handlerNode.offsetTop;
				
				this._currentHandlerMousedownEvent();
				hook.removeListener('mouseout', this._currentHandlerMouseoutEvent);
				
				this._currentScrollMousemoveEvent = events.mousemove.bind(this);
				hook.on('mousemove', this._currentScrollMousemoveEvent);
		}
		else if (className.indexOf('uiScrollbarArrowUp') > -1)
		{
				this._currentArrowUpMousedownEvent();
				
				hook.removeListener('mouseout', this._currentArrowUpMouseoutEvent);
				this._currentContentMoveTimer = setInterval(this.setContentScrollTop.bind(this, -18), 33);
		}
		else if (className.indexOf('uiScrollbarArrowDown') > -1)
		{
				this._currentArrowDownMousedownEvent();
				
				hook.removeListener('mouseout', this._currentArrowDownMouseoutEvent);
				this._currentContentMoveTimer = setInterval(this.setContentScrollTop.bind(this, 18), 33);
		}
		else if ('uiScrollbarBackgroundCover' == className)
		{
				this._currentContentMoveTimer = 
					setInterval(this.setContentScrollTop.bind(this, e.clientY < this._handlerNode.offsetTop + 32 ? -88 : 88), 33);
		}
		
		this._currentScrollMouseupEvent = events.mouseup.bind(this);
		hook.once('mouseup', this._currentScrollMouseupEvent);
};

events.mousemove = function (e)
{
		var content = this._contentNode, handler = this._handlerNode;
		
		handler.style.top = 
			Math.max
			(
				Math.min
				(
					this._currentHandlerTop + (e.clientY - this._currentHandlerMouseY), 
					this._currentScrollHeight - this._currentHandlerHeight
				), 
				0
			) + 'px';
		
		content.scrollTop = this._currentContentHiddenHeight * 
			(handler.offsetTop / (this._currentScrollHeight - this._currentHandlerHeight));
};

events.mouseup = function (e)
{
		var	dom = sweet.dom, hook = sweet.hook, 
				root = this._rootNode, 
				node = e.target || e.srcElement, 
				className = node.className;
		
		if (this._currentContentMoveTimer)
		{
				clearInterval(this._currentContentMoveTimer);
		}
		
		if (root.releaseCapture)
		{
				root.releaseCapture();
		}
		
		delete this._currentScrollMouseupEvent;
		
		if (this._currentScrollMousemoveEvent)
		{
				hook.removeListener('mousemove', this._currentScrollMousemoveEvent);
				delete this._currentScrollMousemoveEvent;
		}
		
		this._currentHandlerMouseupEvent();
		this._currentArrowUpMouseupEvent();
		this._currentArrowDownMouseupEvent();
		
		if (className.indexOf('uiScrollbarHandler') > -1)
		{
				hook.once('mouseout', this._currentHandlerMouseoutEvent);
		}
		else if (className.indexOf('uiScrollbarArrowUp') > -1)
		{
				hook.once('mouseout', this._currentArrowUpMouseoutEvent);
		}
		else if (className.indexOf('uiScrollbarArrowDown') > -1)
		{
				hook.once('mouseout', this._currentArrowDownMouseoutEvent);
		}
		else
		{
				this._currentHandlerMouseoutEvent();
				this._currentArrowUpMouseoutEvent();
				this._currentArrowDownMouseoutEvent();
		}
};

events.mousewheel = function (e)
{
		sweet.dom.stopEvent(e);
		this.setContentScrollTop((e.detail || e.wheelDelta / -40) > 0 ? 50 : -50);
};

})();