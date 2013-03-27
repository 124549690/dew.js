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
var form = sweet.ui.form = {};

// button module begin
;(function () {

form.button = button;

function button (nodes)
{
		var dom = sweet.dom, i, j;
		
		this._nodes = nodes;
		this._currentMousedownEvent = buttonEvent.mousedown.bind(this);
		
		if (Array.isArray(nodes))
		{
				for (i = 0, j = nodes.length; i < j; i++)
				{
						dom.addEvent(nodes[i], 'mousedown', this._currentMousedownEvent);
				}
		}
		else
		{
				dom.addEvent(nodes, 'mousedown', this._currentMousedownEvent);
		}
}

// 销毁
button.prototype.destroy = function ()
{
		if (!this._currentMousedownEvent)
		{
				return;
		}
		
		var dom = sweet.dom, nodes = this._nodes, i, j;
		
		if (Array.isArray(nodes))
		{
				for (i = 0, j = nodes.length; i < j; i++)
				{
						dom.removeEvent(nodes[i], 'mousedown', this._currentMousedownEvent);
				}
		}
		else
		{
				dom.removeEvent(nodes, 'mousedown', this._currentMousedownEvent);
		}
		
		delete this._nodes;
		delete this._currentMousedownEvent;
};

var buttonEvent = {};
buttonEvent.mousedown = function (e)
{
		var dom = sweet.dom, node = (e.target || event.srcElement).parentNode;
		dom.addClass(node, 'uiButtonDown');
		
		this._currentMouseupEvent = buttonEvent.mouseup.bind(this);
		
		dom.addEvent(node, 'mouseout', this._currentMouseupEvent);
		dom.addEvent(node, 'mouseup', this._currentMouseupEvent);
};

buttonEvent.mouseup = function (e)
{
		var dom = sweet.dom, node = (e.target || event.srcElement).parentNode;
		dom.removeClass(node, 'uiButtonDown');
		dom.removeEvent(node, 'mouseout', this._currentMouseupEvent);
		dom.removeEvent(node, 'mouseup', this._currentMouseupEvent);
		
		delete this._currentMouseupEvent;
};

})();
// button module end



})();