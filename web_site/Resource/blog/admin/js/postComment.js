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

dewlog.postComment = postComment;

function postComment ()
{
		var	dom = sweet.dom, hook = sweet.hook, 
				table = new sweet.html(this._tableTpl), 
				read = new sweet.html(this._readTpl), 
				toolbar = new sweet.html(this._toolbarTpl);
		
		this._toolbarNode = toolbar.path('/');
		dom.addEvent(this._toolbarNode, 'click', events.toolbarClick.bind(this));
		dom.addEvent(this._toolbarNode, 'mousedown', events.toolbarMousedown.bind(this));
		dom.addEvent(this._toolbarNode, 'mouseup', events.toolbarMouseup.bind(this));
		dom.addEvent(this._toolbarNode, 'mouseover', events.toolbarMouseover.bind(this));
		
		this._toolbarSelectNode = toolbar.path('/div[0]');
		this._toolbarSelectIconNode = toolbar.path('/div[0]/div/span/span');
		
		this._toolbarBacktrackNode = toolbar.path('/div[1]');
		this._toolbarBacktrackNode.style.display = 'none';
		
		this._toolbarDeleteNode = toolbar.path('/div[2]');
		this._toolbarDeleteNode.style.display = 'none';
		
		this._toolbarRefreshNode = toolbar.path('/div[3]');
		
		this._toolbarPagesNode = toolbar.path('/div[4]');
		this._toolbarPagesInfoNode = toolbar.path('/div[4]/div/b');
		
		this._toolbarPagesPrevNode = toolbar.path('/div[4]/div[1]/div');
		this._toolbarPagesNextNode = toolbar.path('/div[4]/div[2]/div');
		
		this._tableWrapNode = table.path('/');
		dom.addEvent(this._tableWrapNode, 'click', events.contentClick.bind(this));
		
		this._readWrapNode = read.path('/');
		
		this._readDateNode = read.path('/div[0]');
		this._readDataNode = read.path('/div[1]');
		
		this._toolbarMode = 'list';
		
		this._isSelect = false;
		this._tableSelectNodes = [];
		
		this._readItemCid = 0;
		
		this._isUpdateTable = true;
		
		this._currTableScrollTop = 0;
		
		this.on('select', callback.tableSelect.bind(this));
}

sweet.util.inherits(postComment, sweet.events);

postComment.prototype._toolbarTpl = '\
<div class="postComment">\
	<div class="toolbar-button-wrap clearfix">\
		<div class="toolbar-select toolbar-button">\
			<span class="toolbar-select-border">\
				<span class="toolbar-select-background"></span>\
			</span>\
		</div>\
	</div>\
	<div class="toolbar-button-wrap clearfix">\
		<div class="toolbar-backtrack toolbar-button">\
			<span class="toolbar-icon backtrack-icon"></span>\
		</div>\
	</div>\
	<div class="toolbar-button-wrap clearfix">\
		<div class="toolbar-delete toolbar-button">\
			<span class="toolbar-icon delete-icon"></span>\
		</div>\
	</div>\
	<div class="toolbar-button-wrap clearfix">\
		<div class="toolbar-refresh toolbar-button">\
			<span class="toolbar-icon refresh-icon"></span>\
		</div>\
	</div>\
	<div class="toolbar-pages">\
		<div class="toolbar-pages-info clearfix">第<b></b>-<b></b>条，共<b></b>条</div>\
		<div class="toolbar-button-wrap clearfix">\
			<div class="toolbar-button toolbar-pages-prev">\
				<span class="toolbar-icon pages-prev-icon"></span>\
			</div>\
		</div>\
		<div class="toolbar-button-wrap clearfix">\
			<div class="toolbar-button toolbar-pages-next">\
				<span class="toolbar-icon pages-next-icon"></span>\
			</div>\
		</div>\
	</div>\
	<div class="toolbar-button-wrap clearfix"></div>\
</div>';

postComment.prototype._tableTpl = '<div class="log-comment"></div>';

postComment.prototype._tableItemTpl = '\
<div class="__item<?=this.cid?>__ clearfix log-table-item">\
	<p class="log-item-select">\
		<span class="log-item-select-block">\
			<span class="log-item-select-border"></span>\
		</span>\
	</p>\
	<p class="log-item-title"><?=this.user?></p>\
	<p class="log-item-content"><?=this.content?></p>\
	<p class="log-item-date"><?=this.date?></p>\
</div>';

postComment.prototype._readTpl = '\
<div class="comment-read">\
	<div class="comment-date"></div>\
	<div class="comment-data"></div>\
</div>';

postComment.prototype._cmd = 'post-comment';

postComment.prototype.getCmd = function ()
{
		return this._cmd;
};

postComment.prototype.setMenu = function (menu)
{
		menu.addItem(this._cmd, '评论');
		this._menu = menu;
};

postComment.prototype.setToolbar = function (node)
{
		node.appendChild(this._toolbarNode);
};

postComment.prototype.setContent = function (node)
{
		node.appendChild(this._tableWrapNode);
		node.appendChild(this._readWrapNode);
		this._contentNode = node;
};

postComment.prototype.setScrollbar = function (scroll)
{
		this._scrollbar = scroll;
};

postComment.prototype.handler = function (query)
{
		this._menu.setFocus(this._cmd);
		
		this._nowPage = query['page'] || 1;
		
		this._toolbarNode.style.display = 'block';
		
		if (query['cid'] === undefined)
		{
				this._getTableData();
		}
		else
		{
				this._readSelectItem(query['cid']);
		}
};

postComment.prototype.destroy = function ()
{
		if ('read' == this._toolbarMode)
		{
				var nodes = this._toolbarBacktrackNode.childNodes, i = 0, j = nodes.length;
				
				for (; i < j; i++)
				{
						if (nodes[i].nodeType == 1)
						{
								sweet.dom.fireEvent(nodes[i], 'click');
								break;
						}
				}
		}
		
		this._contentNode.scrollTop = 0;
		
		this._toolbarNode.style.display = 'none';
		this._tableWrapNode.style.display = 'none';
		this._readWrapNode.style.display = 'none';
		this._scrollbar.setHidden();
};

postComment.prototype._getTableData = function ()
{
		var url = dewlog.requestUrl['comment-view'].replace("#page#", this._nowPage), ajax = new sweet.ajax;
		ajax.open('GET', url);
		ajax.on('complete', callback.tableDataComplete.bind(this));
		ajax.on('error', callback.error.bind(this));
		ajax.send();
};

postComment.prototype._addTableItem = function (cid, user, content, date)
{
		var tpl = new sweet.template;
		tpl.assign('cid', cid);
		tpl.assign('user', user);
		tpl.assign('content', content);
		tpl.assign('date', date);
		
		return tpl.fetch(this._tableItemTpl);
};

postComment.prototype._getTableItemID = function (className)
{
		var index = className.indexOf('__item') + 6;
		return className.slice(index, className.indexOf('__', index));
};

postComment.prototype._tableSelectRow = function (node)
{
		var dom = sweet.dom, nodes = this._tableSelectNodes, index = nodes.indexOf(node);
		
		if (index === -1)
		{
				dom.addClass(node, 'log-table-item-focus');
				nodes.push(node);
		}
		else
		{
				dom.removeClass(node, 'log-table-item-focus');
				nodes.splice(index, 1);
		}
		
		this.emit('select');
};

postComment.prototype._readSelectItem = function (cid)
{
		this._toolbarMode = 'read';
		
		this._toolbarSelectNode.style.display = 'none';
		this._toolbarRefreshNode.style.display = 'none';
		this._toolbarPagesNode.style.display = 'none';
		
		this._toolbarBacktrackNode.style.display = 'block';
		this._toolbarDeleteNode.style.display = 'block';
		
		this._readWrapNode.style.display = 'block';
		this._tableWrapNode.style.display = 'none';
		
		this._readItemCid = cid;
		
		this._scrollbar.setHidden();
		
		setTimeout(this._getItemData.bind(this), 133);
};

postComment.prototype._getItemData = function ()
{
		var url = dewlog.requestUrl['comment-read'].replace("#id#", this._readItemCid), ajax = new sweet.ajax;
		ajax.open('GET', url);
		ajax.on('complete', callback.itemDataComplete.bind(this));
		ajax.on('error', callback.error.bind(this));
		ajax.send();
};

var callback = {};

callback.tableSelect = function ()
{
		var dom = sweet.dom, nodes = this._tableSelectNodes, len = nodes.length, pages = this._pages;
		
		if (len == pages.perPageRow || 
				len == pages.totalRows - (pages.nowPage - 1) * pages.perPageRow)
		{
				dom.removeClass(this._toolbarSelectIconNode, 'toolbar-select-background-minus');
				dom.addClass(this._toolbarSelectIconNode, 'toolbar-select-background-click');
				
				this._toolbarDeleteNode.style.display = 'block';
				this._toolbarRefreshNode.style.display = 'none';
				
				this._isSelect = true;
		}
		else if (len > 0)
		{
				dom.addClass(this._toolbarSelectIconNode, 'toolbar-select-background-minus');
				dom.removeClass(this._toolbarSelectIconNode, 'toolbar-select-background-click');
				
				this._toolbarDeleteNode.style.display = 'block';
				this._toolbarRefreshNode.style.display = 'none';
				
				this._isSelect = true;
		}
		else
		{
				dom.removeClass(this._toolbarSelectIconNode, 'toolbar-select-background-minus');
				dom.removeClass(this._toolbarSelectIconNode, 'toolbar-select-background-click');
				
				this._toolbarDeleteNode.style.display = 'none';
				this._toolbarRefreshNode.style.display = 'block';
				
				this._isSelect = false;
		}
};

callback.itemDataComplete = function (text)
{
		var data = JSON.parse(text);
		
		if (data.state)
		{
				switch (data.state)
				{
						case 301: 
							location.href = data.url;
				}
		}
		
		this._readDateNode.innerHTML = new Date(data.time * 1000).format('Y-m-d H:i:s');
		this._readDataNode.innerHTML = '<span class="comment-nickname">' + data.user + ':</span>' + data.content;
};

callback.tableDataComplete = function (text)
{
		var data = JSON.parse(text);
		
		if (data.state)
		{
				switch (data.state)
				{
						case 301: 
							location.href = data.url;
				}
		}
		
		var	pages = data.pages, 
				table = data.comment, 
				i = 0, j = table.length, 
				day = new Date, year = new Date, 
				info = this._toolbarPagesInfoNode, 
				dom = sweet.dom, html = '', item, time, date;
		
		day.setHours(0, 0, 0, 0);
		
		year.setMonth(0, 0);
		year.setHours(0, 0, 0, 0);
		
		for (; i < j; i++)
		{
				item = table[i];
				time = item.time * 1000;
				
				if (time >= day)
				{
						date = new Date(time).format('G:i');
				}
				else if (time <= year)
				{
						date = new Date(time).format('Y年n月');
				}
				else
				{
						date = new Date(time).format('n月j日');
				}
				
				html += this._addTableItem(item.cid, item.user, item.content, date);
		}
		
		this._tableWrapNode.innerHTML = html;
		
		if (pages.totalPages > 1)
		{
				info[0].innerHTML = Math.max((pages.nowPage - 1) * pages.perPageRow, 1);
				info[1].innerHTML = Math.min(pages.nowPage * pages.perPageRow, pages.totalRows);
				info[2].innerHTML = pages.totalRows;
				
				if (pages.nowPage == 1)
				{
						dom.addClass(this._toolbarPagesPrevNode, 'toolbar-disable');
				}
				else
				{
						dom.removeClass(this._toolbarPagesPrevNode, 'toolbar-disable');
				}
				
				if (pages.nowPage == pages.totalPages)
				{
						dom.addClass(this._toolbarPagesNextNode, 'toolbar-disable');
				}
				else
				{
						dom.removeClass(this._toolbarPagesNextNode, 'toolbar-disable');
				}
				
				this._toolbarPagesNode.style.display = 'block';
		}
		
		this._pages = pages;
		
		this._tableWrapNode.style.display = 'block';
		
		this._contentNode.scrollTop = 0;
		
		this._toolbarDeleteNode.style.display = 'none';
		this._toolbarRefreshNode.style.display = 'block';
		
		this._tableSelectNodes = [];
		this._isUpdateTable = true;
		this._isSelect = false;
		this._currTableScrollTop = 0;
		
		dom.removeClass(this._toolbarSelectIconNode, 'toolbar-select-background-minus');
		dom.removeClass(this._toolbarSelectIconNode, 'toolbar-select-background-click');
		
		sweet.hook.emit('resize');
};

callback.delCommentComplete = function (text)
{
		var data = JSON.parse(text || '{}');
		
		if (data.state)
		{
				switch (data.state)
				{
						case 301: 
							location.href = data.url;
				}
		}
		
		var dom = sweet.dom;
		if ('list' == this._toolbarMode)
		{
				dom.removeClass(this._toolbarSelectIconNode, 'toolbar-select-background-click');
				dom.removeClass(this._toolbarSelectIconNode, 'toolbar-select-background-minus');
				this._getTableData();
		}
		else if ('read' == this._toolbarMode)
		{
				var nodes = this._toolbarBacktrackNode.childNodes, i = 0, j = nodes.length;
				this._isUpdateTable = true;
				
				for (; i < j; i++)
				{
						if (nodes[i].nodeType == 1)
						{
								dom.fireEvent(nodes[i], 'click');
								break;
						}
				}
		}
		
		this._stateFrame.destroy();
		delete this._stateFrame;
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

events.contentClick = function (e)
{
		var node = e.srcElement || e.target, dom = sweet.dom;
		
		if (dom.hasClass(node, 'log-item-select-block') || 
				dom.hasClass(node, 'log-item-select') || 
				dom.hasClass(node, 'log-item-select-border'))
		{
				while (!dom.hasClass(node, 'log-table-item'))
				{
						node = node.parentNode;
				}
				
				this._tableSelectRow(node);
		}
		else
		{
				while (!dom.hasClass(node, 'log-table-item'))
				{
						node = node.parentNode;
				}
				
				this._isUpdateTable = false;
				this._currTableScrollTop = this._contentNode.scrollTop;
				
				var cid = this._getTableItemID(node.className);
				location.hash = '#' + this._cmd + '?page=' + this._pages.nowPage + '&cid=' + cid;
				this.handler({page: this._pages.nowPage, cid: cid});
		}
};

events.toolbarClick = function (e)
{
		var	node = e.srcElement || e.target, 
				dom = sweet.dom, className = node.className;
		
		if (className.indexOf('toolbar-disable') > -1 ||
				className.indexOf('toolbar-icon') > -1 && 
					node.parentNode.className.indexOf('toolbar-disable') > -1)
		{
				return;
		}
		
		// 刷新
		if (dom.hasClass(node, 'toolbar-refresh') || dom.hasClass(node, 'refresh-icon'))
		{
				this._getTableData();
		}
		// 上一页
		else if (dom.hasClass(node, 'toolbar-pages-prev') || dom.hasClass(node, 'pages-prev-icon'))
		{
				location.hash = '#' + this._cmd + '?page=' + (this._pages.nowPage - 1);
				this.handler({page: this._pages.nowPage - 1});
				
				if (this._pages.nowPage - 1 == 1)
				{
						dom.fireEvent(this._toolbarNode, 'mouseout');
				}
		}
		// 下一页
		else if (dom.hasClass(node, 'toolbar-pages-next') || dom.hasClass(node, 'pages-next-icon'))
		{
				location.hash = '#' + this._cmd + '?page=' + (this._pages.nowPage + 1);
				this.handler({page: this._pages.nowPage + 1});
				
				if (this._pages.nowPage + 1 == this._pages.totalPages)
				{
						dom.fireEvent(this._toolbarNode, 'mouseout');
				}
		}
		// 全选
		else if (dom.hasClass(node, 'toolbar-select') || dom.hasClass(node, 'toolbar-select-background'))
		{
				if (dom.hasClass(this._toolbarSelectIconNode, 'toolbar-select-background-click'))
				{
						dom.removeClass(this._toolbarSelectIconNode, 'toolbar-select-background-click');
						
						dom.addClass(node, 'log-table-item-focus');
						
						this._toolbarDeleteNode.style.display = 'none';
						this._toolbarRefreshNode.style.display = 'block';
						
						this._tableSelectNodes.forEach(new Function('v', 'sweet.dom.removeClass(v,"log-table-item-focus")'));
						this._tableSelectNodes = [];
						
						this._isSelect = false;
				}
				else
				{
						dom.addClass(this._toolbarSelectIconNode, 'toolbar-select-background-click');
						
						this._toolbarDeleteNode.style.display = 'block';
						this._toolbarRefreshNode.style.display = 'none';
						
						this._tableSelectNodes = Array.toArray(this._tableWrapNode.childNodes);
						this._tableSelectNodes.forEach(new Function('v', 'sweet.dom.addClass(v,"log-table-item-focus")'));
						
						this._isSelect = true;
				}
				
				dom.removeClass(this._toolbarSelectIconNode, 'toolbar-select-background-minus');
		}
		// 删除
		else if (dom.hasClass(node, 'toolbar-delete') || dom.hasClass(node, 'delete-icon'))
		{
				var	url = dewlog.requestUrl['comment-del'], 
						state = new sweet.ui.dialog.state, ajax = new sweet.ajax, 
						nodes = this._tableSelectNodes, i = 0, j = nodes.length - 1;
				
				state.setText('梢等片刻...');
				state.setType('wait');
				state.display();
				
				this._stateFrame = state;
				
        var cid = "";
        
				if ('list' == this._toolbarMode)
				{
						for (; i < j; i++)
						{
								cid += this._getTableItemID(nodes[i].className) + '-';
						}
						
						cid += this._getTableItemID(nodes[i].className);
				}
				else if ('read' == this._toolbarMode)
				{
						cid += this._readItemCid;
				}
				
        url = url.replace("#id#", cid);
        
				ajax.open('GET', url);
				ajax.on('complete', callback.delCommentComplete.bind(this));
				ajax.on('error', callback.error.bind(this));
				ajax.send();
		}
		// 返回
		else if (dom.hasClass(node, 'toolbar-backtrack') || dom.hasClass(node, 'backtrack-icon'))
		{
				this._toolbarMode = 'list';
				
				this._readDataNode.innerHTML = '';
				
				this._toolbarSelectNode.style.display = 'block';
				
				if (this._isSelect === true)
				{
						this._toolbarRefreshNode.style.display = 'none';
				}
				else
				{
						this._toolbarDeleteNode.style.display = 'none';
						this._toolbarRefreshNode.style.display = 'block';
				}
				
				if (this._pages && this._pages.totalPages > 1)
				{
						this._toolbarPagesNode.style.display = 'block';
				}
				
				this._toolbarBacktrackNode.style.display = 'none';
				
				this._readWrapNode.style.display = 'none';
				
				this._tableWrapNode.style.display = 'block';
				
				location.hash = '#' + this._cmd + '?page=' + this._nowPage;
				
				if (this._isUpdateTable === true)
				{
						this.handler({page: this._nowPage});
				}
				else
				{
						this._isUpdateTable = false;
						this._contentNode.scrollTop = this._currTableScrollTop;
						this._scrollbar.setHeight();
				}
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