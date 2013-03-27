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

dewlog.container = container;

function container ()
{
		var html = new sweet.html(this._tpl), scroll = new sweet.ui.scrollbar;;
		
		this._nodes = {items: {}, current: null};
		
		this._containerNode = html.path('/');
		this._toolbarNode = html.path('/div[0]');
		this._contentWrapNode = html.path('/div[1]]');
		this._contentNode = html.path('/div[1]/div');
		
		scroll.append(this._contentWrapNode);
		scroll.setContainer(this._contentNode);
		
		this.on('resize', scroll.setHeight.bind(scroll));
		sweet.hook.on('resize', this._setContentWrapHeight.bind(this));
		
		this._scrollbar = scroll;
}

sweet.util.inherits(container, sweet.events);

container.prototype._tpl = '\
<div id="container">\
	<div class="toolbar"></div>\
	<div class="content-wrap">\
		<div class="content">\
		</div>\
	</div>\
</div>';

container.prototype._minHeight = 480;
container.prototype._keepHeight = 32;

container.prototype._setContentWrapHeight = function ()
{
		var	dom = sweet.dom, 
				node = this._contentWrapNode, 
				height = Math.max(dom.getViewHeight(), this._minHeight), 
				top = dom.getElementPosition(node).top;
		
		height = height - top - this._keepHeight;
		
		document.documentElement.style.overflowY = dom.getViewHeight() < this._minHeight ? 'auto' : 'hidden';
		
		node.style.height = height + 'px';
		
		this.emit('resize', height);
};

container.prototype.append = function (node)
{
		node.appendChild(this._containerNode);
};

container.prototype.getToolbarNode = function ()
{
		return this._toolbarNode;
};

container.prototype.getContentNode = function ()
{
		return this._contentNode;
};

container.prototype.getScrollbar = function ()
{
		return this._scrollbar;
};

container.prototype.getContentWrapNode = function ()
{
		return this._contentWrapNode;
};

})();