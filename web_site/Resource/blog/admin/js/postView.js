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

dewlog.postView = postView;

function postView ()
{
		var	dom = sweet.dom, hook = sweet.hook, 
				table = new sweet.html(this._tableTpl), 
				edit = new sweet.html(this._editTpl), 
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
		
		this._toolbarSaveNode = toolbar.path('/div[4]');
		this._toolbarSaveNode.style.display = 'none';
		
		//this._toolbarTagsNode = toolbar.path('/div[5]');
		//this._toolbarTagsNode.style.display = 'none';
		
		this._toolbarPassNode = toolbar.path('/div[5]');
		this._toolbarPassNode.style.display = 'none';
		
		this._toolbarPagesNode = toolbar.path('/div[6]');
		this._toolbarPagesInfoNode = toolbar.path('/div[6]/div/b');
		
		this._toolbarPagesPrevNode = toolbar.path('/div[6]/div[1]/div');
		this._toolbarPagesNextNode = toolbar.path('/div[6]/div[2]/div');
		
		this._tableWrapNode = table.path('/');
		dom.addEvent(this._tableWrapNode, 'click', events.contentClick.bind(this));
		
		this._editWrapNode = edit.path('/');
		
		this._editFormNode = edit.path('/form');
		
		this._editLogTextWrapNode = edit.path('/form/div[2]');
		
		this._editLogTextareaNode = edit.path('/form/div[2]/textarea');
		
		// this._editTitleLabelNode = edit.path('/form/div[1]/label');
		this._editTitleInputNode = edit.path('/form/div[1]/input');
		
		/*
		this._hideEditTitleLabe = new Function ('this._editTitleLabelNode.style.display="none"').bind(this);
		this._showEditTitleLabe = new Function ('if(this._editTitleInputNode.value=="")this._editTitleLabelNode.style.display="block"').bind(this);
		
		dom.addEvent(this._editTitleInputNode, 'focus', this._hideEditTitleLabe);
		dom.addEvent(this._editTitleInputNode, 'blur', this._showEditTitleLabe);
		*/
		
		// this._editItemTagsNode = edit.path('/form/div[3]/input');
		// this._editItemPassNode = edit.path('/form/div[4]/input');
		
		this._editItemPassNode = edit.path('/form/div[3]/input');
		
		this._toolbarMode = 'list';
		
		this._isSelect = false;
		this._tableSelectNodes = [];
		
		this._editItemPid = 0;
		// this._editItemTid = 0;
		
		this._isUpdateTable = true;
		
		this._currTableScrollTop = 0;
		
		this.on('select', callback.tableSelect.bind(this));
		
		hook.on('resize', this._editWrapHeight.bind(this));
		
		setTimeout(this._setEditor.bind(this), 133);
}

sweet.util.inherits(postView, sweet.events);

postView.prototype._toolbarTpl = '\
<div class="postWrite">\
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
	<div class="toolbar-button-wrap clearfix">\
		<div class="toolbar-save toolbar-text toolbar-button">\
			<span class="save-text">保存</span>\
		</div>\
	</div>\
	<!--<div class="toolbar-button-wrap clearfix">\
		<div class="toolbar-tags toolbar-button">\
			<span class="toolbar-icon tags-icon"></span>\
		</div>\
	</div>-->\
	<div class="toolbar-button-wrap clearfix">\
		<div class="toolbar-pass toolbar-button">\
			<span class="toolbar-icon pass-icon"></span>\
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

postView.prototype._tableTpl = '<div class="log-table"></div>';

postView.prototype._tableItemTpl = '\
<div class="__item<?=this.pid?>__ clearfix log-table-item">\
	<p class="log-item-select">\
		<span class="log-item-select-block">\
			<span class="log-item-select-border"></span>\
		</span>\
	</p>\
	<p class="log-item-title"><?=this.title?></p>\
	<p class="log-item-content"><?=this.content?></p>\
	<p class="log-item-date"><?=this.date?></p>\
</div>';

postView.prototype._editTpl = '\
<div class="log-edit">\
	<form method="post" action="">\
		<div class="log-title">标题</div>\
		<div class="log-title-wrap">\
			<!--<label for="log-edit-title">输入日志标题</label>-->\
			<input id="log-edit-title" type="text" name="title" />\
		</div>\
		<div class="log-text"><textarea name="content" id="log-edit-text"></textarea></div>\
		<!--<div class="log-tags"><input type="hidden" name="tags" /></div>-->\
		<div class="log-pass"><input type="hidden" name="pass" /></div>\
	</form>\
</div>';

postView.prototype._setEditor = function ()
{
		this._editorTool = KindEditor.create(this._editLogTextareaNode, 
		{
				width: '100%', 
				resizeMode: 0, 
				// allowFileManager: true, 
				items: 
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

postView.prototype._cmd = 'post-view';

postView.prototype.getCmd = function ()
{
		return this._cmd;
};

postView.prototype.setMenu = function (menu)
{
		menu.addItem(this._cmd, '日志');
		this._menu = menu;
};

postView.prototype.setToolbar = function (node)
{
		node.appendChild(this._toolbarNode);
};

postView.prototype.setContent = function (node)
{
		node.appendChild(this._tableWrapNode);
		node.appendChild(this._editWrapNode);
		this._contentNode = node;
};

postView.prototype.setScrollbar = function (scroll)
{
		this._scrollbar = scroll;
};

postView.prototype._addTableItem = function (pid, title, content, date)
{
		var tpl = new sweet.template;
		tpl.assign('pid', pid);
		tpl.assign('title', title);
		tpl.assign('content', content);
		tpl.assign('date', date);
		
		return tpl.fetch(this._tableItemTpl);
};

postView.prototype._getTableItemID = function (className)
{
		var index = className.indexOf('__item') + 6;
		return className.slice(index, className.indexOf('__', index));
};

postView.prototype.handler = function (query)
{
		this._menu.setFocus(this._cmd);
		
		this._nowPage = query['page'] || 1;
		
		this._toolbarNode.style.display = 'block';
		
		if (query['pid'] === undefined)
		{
				this._getTableData();
		}
		else
		{
				this._editSelectItem(query['pid']);
		}
};

postView.prototype._getTableData = function ()
{
		var url = dewlog.requestUrl['post-view'].replace("#page#", this._nowPage), ajax = new sweet.ajax;
		ajax.open('GET', url);
		ajax.on('complete', callback.tableDataComplete.bind(this));
		ajax.on('error', callback.error.bind(this));
		ajax.send();
};

postView.prototype._tableSelectRow = function (node)
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

postView.prototype._editSelectItem = function (pid)
{
		this._toolbarMode = 'edit';
		
		this._toolbarSelectNode.style.display = 'none';
		this._toolbarRefreshNode.style.display = 'none';
		this._toolbarPagesNode.style.display = 'none';
		
		this._toolbarBacktrackNode.style.display = 'block';
		this._toolbarDeleteNode.style.display = 'block';
		
		this._editWrapNode.style.display = 'block';
		this._tableWrapNode.style.display = 'none';
		
		this._toolbarSaveNode.style.display = 'block';
		//this._toolbarTagsNode.style.display = 'block';
		this._toolbarPassNode.style.display = 'block';
		
		this._editItemPid = pid;
		
		this._scrollbar.setHidden();
		
		setTimeout(this._editWrapHeight.bind(this), 133);
		setTimeout(this._getItemData.bind(this), 133);
};

postView.prototype._getItemData = function ()
{
		var url = dewlog.requestUrl['post-eidt'].replace("#id#", this._editItemPid), ajax = new sweet.ajax;
		ajax.open('GET', url);
		ajax.on('complete', callback.itemDataComplete.bind(this));
		ajax.on('error', callback.error.bind(this));
		ajax.send();
};

postView.prototype._editWrapHeight = function ()
{
		var dom = sweet.dom, hook = sweet.hook;
		
		if (this._editWrapNode.style.display == 'none' || 'edit' != this._toolbarMode)
		{
				return;
		}
		
		if ('list' === this._toolbarMode)
		{
				this._scrollbar.setHeight();
		}
		else
		{
				this._scrollbar.setHidden();
		}
		
		var	top = dom.getElementPosition(this._editLogTextWrapNode).top, 
				height = dom.getViewHeight() - top - 35;
		
		this._editorTool && this._editorTool.resize(null, height + 'px');
};

postView.prototype.destroy = function ()
{
		if ('edit' == this._toolbarMode)
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
		this._editWrapNode.style.display = 'none';
		this._scrollbar.setHidden();
};

postView.prototype.ping = function ()
{
		var url = dewlog.requestUrl['ping'], ajax = new sweet.ajax;
		ajax.open('GET', url);
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
		
		var	item = data.data, 
				pwd = data.pwd.password, 
				tags = data.tags;
		
		this._editTitleInputNode.value = item.title;
		this._editorTool.html(item.content);
		
		// this._editItemTid = item.tid;
		this._editFormNode.action = dewlog.requestUrl['post-save'].replace("#id#", item.pid);
		
		// this._editItemTagsNode.value = item.tid;
		this._editItemPassNode.value = pwd || '';
		
		// 12 分一次 ping, 以免编辑过程出现会话过期!
		this._timerID = setInterval(this.ping.bind(this), 1000 * 60 * 12);
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
		
		var pages = data.pages, 
				table = data.table, 
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
				time = item.ptime * 1000;
				
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
				
				html += this._addTableItem(item.pid, item.title, item.content, date);
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

callback.delLogComplete = function (text)
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
		else if ('edit' == this._toolbarMode)
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

callback.saveLogComplete = function (text)
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
		
		this._isUpdateTable = true;
		
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
				
				var pid = this._getTableItemID(node.className);
				location.hash = '#' + this._cmd + '?page=' + this._pages.nowPage + '&pid=' + pid;
				this.handler({page: this._pages.nowPage, pid: pid});
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
				var	url = dewlog.requestUrl['post-del'], 
						state = new sweet.ui.dialog.state, ajax = new sweet.ajax, 
						nodes = this._tableSelectNodes, i = 0, j = nodes.length - 1;
				
				state.setText('梢等片刻...');
				state.setType('wait');
				state.display();
				
				this._stateFrame = state;
				
        var pid = "";
        
				if ('list' == this._toolbarMode)
				{
						for (; i < j; i++)
						{
								pid += this._getTableItemID(nodes[i].className) + '-';
						}
						
						pid += this._getTableItemID(nodes[i].className);
				}
				else if ('edit' == this._toolbarMode)
				{
						pid += this._editItemPid;
				}
        
        url = url.replace("#id#", pid);
				
				ajax.open('GET', url);
				ajax.on('complete', callback.delLogComplete.bind(this));
				ajax.on('error', callback.error.bind(this));
				ajax.send();
		}
		// 返回
		else if (dom.hasClass(node, 'toolbar-backtrack') || dom.hasClass(node, 'backtrack-icon'))
		{
				this._toolbarMode = 'list';
				
				this._editTitleInputNode.focus();
				
				this._editFormNode.reset();
				
				this._editorTool && this._editorTool.html('');
				
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
				
				this._editWrapNode.style.display = 'none';
				
				this._tableWrapNode.style.display = 'block';
				
				this._toolbarSaveNode.style.display = 'none';
				// this._toolbarTagsNode.style.display = 'none';
				this._toolbarPassNode.style.display = 'none';
				
				location.hash = '#' + this._cmd + '?page=' + this._nowPage;
				
				this._timerID && clearInterval(this._timerID);
				
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
		// 保存
		else if (dom.hasClass(node, 'toolbar-save') || dom.hasClass(node, 'save-text'))
		{
				var	url = dewlog.requestUrl['post-save'].replace("#id#", this._editItemPid), 
						state = new sweet.ui.dialog.state, ajax = new sweet.ajax;
				
				state.setText('梢等片刻...');
				state.setType('wait');
				state.display();
				
				this._editorTool.sync();
				ajax.setFormElementData(this._editFormNode);
				
				ajax.open('POST', url);
				ajax.on('complete', callback.saveLogComplete.bind(this));
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