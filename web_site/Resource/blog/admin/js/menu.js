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

dewlog.menu = menu;

function menu ()
{
		var html = new sweet.html(this._structTpl);
		
		this._menuNode = html.path('/');
		this._itemNode = html.path('/ul');
		
		this._nodes = {items: {}, current: null};
}

/*
<div id="menu" class="clearfix">
	<ul class="main-menu">
		<li class="current"><a href="#post-view">日志</a></li>
		<li><a href="#post-write">写日志</a></li>
		<li><a href="#post-draft">草稿</a></li>
		<li><a href="#post-recycle">回收站</a></li>
		<li><a href="#post-comment">评论</a></li>
		<li><a href="#dewlog-config">设置</a></li>
	</ul>
</div>
*/

menu.prototype._structTpl = '\
<div id="menu" class="clearfix">\
	<ul class="main-menu"></ul>\
</div>';

menu.prototype._itemTpl = '<li><a hidefocus href="#<?=this.cmd?>"><?=this.title?></a></li>';

menu.prototype.append = function (node)
{
		node.appendChild(this._menuNode);
};

menu.prototype.addItem = function (cmd, title)
{
		var tpl = new sweet.template;
		
		tpl.assign('cmd', cmd);
		tpl.assign('title', title);
		
		var html = new sweet.html(tpl.fetch(this._itemTpl));
		
		html.append(this._itemNode);
		
		this._nodes.items[cmd] = html.path('/');
};

menu.prototype.setFocus = function (cmd)
{
		var dom = sweet.dom, nodes = this._nodes;
		
		if (nodes.current !== null)
		{
				dom.removeClass(nodes.current, 'current');
		}
		
		nodes.current = nodes.items[cmd];
		
		dom.addClass(nodes.current, 'current');
};

})();