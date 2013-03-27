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

dewlog.initialize = function ()
{
		var	menu = new dewlog.menu;
		menu.append(document.body);
		
		var container = new dewlog.container;
		container.append(document.body);
		
		var postView = new dewlog.postView;
		postView.setMenu(menu);
		postView.setToolbar(container.getToolbarNode());
		postView.setContent(container.getContentNode());
		postView.setScrollbar(container.getScrollbar());
		manage.addModule(postView);
		
		var postWrite = new dewlog.postWrite;
		postWrite.setMenu(menu);
		postWrite.setToolbar(container.getToolbarNode());
		postWrite.setContent(container.getContentNode());
		manage.addModule(postWrite);
		
		var postComment = new dewlog.postComment;
		postComment.setMenu(menu);
		postComment.setToolbar(container.getToolbarNode());
		postComment.setContent(container.getContentNode());
		postComment.setScrollbar(container.getScrollbar());
		manage.addModule(postComment);
		
		var dewlogConfig = new dewlog.dewlogConfig;
		dewlogConfig.setMenu(menu);
		dewlogConfig.setToolbar(container.getToolbarNode());
		dewlogConfig.setContent(container.getContentNode());
		dewlogConfig.setContentWrapNode(container.getContentWrapNode());
		dewlogConfig.setScrollbar(container.getScrollbar());
		manage.addModule(dewlogConfig);
    
		sweet.hook.emit('resize');
		manage.initialize();
		manage.fire(location.href);
};

var manage = {};

sweet.util.mix(manage, sweet.events);

manage._module = {};

manage._nowCmd = null;

manage.addModule = function (obj)
{
		this._module[obj.getCmd()] = obj;
};

manage.initialize = function ()
{
		for (var key in this._module)
		{
				this.on(key, this.handler.bind(this, key));
		}
};

manage.handler = function (cmd, query)
{
		var module = this._module, key;
		
		for (key in module)
		{
				if (key !== cmd)
				{
						module[key].destroy();
				}
		}
		
		module[cmd].handler(query);
		
		this._nowCmd = cmd;
};

manage.fire = function (url, e)
{
		var	sharp = url.indexOf('#') + 1, mark = url.indexOf('?', sharp), 
				cmd = mark === -1 ? url.slice(sharp) : url.slice(sharp, mark);
		
		if (cmd === this._nowCmd)
		{
				e && sweet.dom.stopEvent(e);
				return;
		}
		
		var i = 0, j = url.length, query = {}, key, val, index;
		
		if (url.indexOf('#') === -1 || j - url.indexOf('#') === 1)
		{
				for (key in this._module)
				{
						this.emit(key, query);
						break;
				}
				
				return;
		}
		
		if (mark > -1)
		{
				for (i = mark + 1; i < j; i++)
				{
						index = url.indexOf('=', i);
						
						if (index > 0)
						{
								key = url.slice(i, index);
						}
						else
						{
								break;
						}
						
						i = index + 1;
						
						index = url.indexOf('&', i);
						
						if (index > 0)
						{
								val = url.slice(i, index);
								i = index;
						}
						else
						{
								val = url.slice(i);
								i = j;
						}
						
						query[key] = val;
				}
		}
		
		this._nowCmd = cmd;
		
		this.emit(cmd, query);
};

function bodyClick (e)
{
		var node = e.srcElement || e.target;
		
		if ('A' !== node.nodeName || node.href === location.href)
		{
				return;
		}
		
		manage.fire(node.href, e);
};

sweet.hook.on('click', bodyClick);

})();
