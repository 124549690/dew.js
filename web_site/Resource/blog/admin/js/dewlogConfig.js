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

dewlog.dewlogConfig = dewlogConfig;

function dewlogConfig ()
{
		var	dom = sweet.dom, hook = sweet.hook, 
				config = new sweet.html(this._configTpl);
		
		this._configNode = config.path('/');
		
		this._configFormNode = config.path('form');
		dom.addEvent(this._configFormNode, 'submit', events.formSubmit.bind(this));
		
		this._configNodes = Array.toArray(dom.TAG('input', this._configFormNode));
		
		this._configFormNode.setAttribute('action', dewlog.requestUrl['dew-config-set']);
		
		new sweet.ui.form.button(dom.CLASS('uiButton', this._configNode));
}

sweet.util.inherits(dewlogConfig, sweet.events);

dewlogConfig.prototype._configTpl = '\
<div class="dewlog-config">\
	<form action="" method="post">\
		<div class="config-item">\
			<div class="config-item-title">标题</div>\
			<div class="config-item-wrap">\
				<input type="text" name="title" />\
			</div>\
		</div>\
		<div class="config-item">\
			<div class="config-item-title">名称</div>\
			<div class="config-item-wrap">\
				<input type="text" name="name" />\
			</div>\
		</div>\
		<div class="config-item">\
			<div class="config-item-title">介绍</div>\
			<div class="config-item-wrap">\
				<input type="text" name="description" />\
			</div>\
		</div>\
		<div class="config-item">\
			<div class="config-item-title">关键字</div>\
			<div class="config-item-wrap">\
				<input type="text" name="keyword" />\
			</div>\
		</div>\
		<div class="config-item">\
			<div class="config-item-title">评论</div>\
			<div class="config-item-select clearfix">\
				<div class="item-select-radio">\
					<input type="radio" id="allowComment-1" value="1" name="allowComment">\
					<label for="allowComment-1">打开</label>\
				</div>\
				<div class="item-select-radio">\
					<input type="radio" id="allowComment-0" value="0" name="allowComment">\
					<label for="allowComment-0">关闭</label>\
				</div>\
			</div>\
		</div>\
		<div class="config-item">\
			<div class="uiButton formButton"><button value="保存" type="submit">保存</button></div>\
		</div>\
	</form>\
</div>';

dewlogConfig.prototype._cmd = 'dewlog-config';

dewlogConfig.prototype.getCmd = function ()
{
		return this._cmd;
};

dewlogConfig.prototype.setMenu = function (menu)
{
		menu.addItem(this._cmd, '设置');
		this._menu = menu;
};

dewlogConfig.prototype.setToolbar = function (node)
{
		//node.appendChild(this._toolbarNode);
		this._toolbarNode = node;
};

dewlogConfig.prototype.setContent = function (node)
{
		node.appendChild(this._configNode);
		this._contentNode = node;
};

dewlogConfig.prototype.setScrollbar = function (scroll)
{
		this._scrollbar = scroll;
};

dewlogConfig.prototype.setContentWrapNode = function (node)
{
		this._contentWrapNode = node;
		this._currContentWrapBorderWidth = sweet.dom.getStyle(node, 'border-bottom-width')
};

dewlogConfig.prototype.handler = function (query)
{
		this._menu.setFocus(this._cmd);
		
		this._contentWrapNode.style.borderBottomWidth = 0;
		
		this._toolbarNode.style.display = 'none';
		this._configNode.style.display = 'block';
		
		this._getConfigData();
		
		sweet.hook.emit('resize');
};

dewlogConfig.prototype.destroy = function ()
{
		this._contentWrapNode.style.borderBottomWidth = this._currContentWrapBorderWidth;
		
		this._configFormNode.reset();
		
		this._toolbarNode.style.display = 'block';
		this._configNode.style.display = 'none';
};

dewlogConfig.prototype._getConfigData = function ()
{
		var url = dewlog.requestUrl['dew-config-get'], ajax = new sweet.ajax;
		ajax.open('GET', url);
		ajax.on('complete', callback.getConfigComplete.bind(this));
		ajax.on('error', callback.error.bind(this));
		ajax.send();
};

var callback = {};

callback.getConfigComplete = function (text)
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
		
		this._configNodes[0].value = data.title;
		this._configNodes[1].value = data.name;
		this._configNodes[2].value = data.description;
		this._configNodes[3].value = data.keyword;
		
		if (data.allowComment == 1)
		{
				this._configNodes[4].checked = true;
		}
		else
		{
				this._configNodes[5].checked = true;
		}
};

callback.setConfigComplete = function (text)
{
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

events.formSubmit = function (e)
{
		sweet.dom.stopEvent(e);
		var ajax = new sweet.ajax, state = new sweet.ui.dialog.state;
		
		state.setText('梢等片刻...');
		state.setType('wait');
		state.display();
		
		this._stateFrame = state;
		
		ajax.on('complete', callback.setConfigComplete.bind(this));
		ajax.on('error', callback.error.bind(this));
		ajax.setFormElementData(this._configFormNode);
		ajax.send();
};


})();