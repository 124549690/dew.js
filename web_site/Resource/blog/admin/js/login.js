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

nodes.validCode = dom.ID('vaild-code');

events.codeClick = function ()
{
		var ajax = new sweet.ajax;
		
		ajax.on('complete', callback.codeComplete.bind(null, nodes.validCode));
		ajax.on('error', callback.error.bind(null));
		
		ajax.open('GET', nodes.validCode.getAttribute('src'));
		ajax.send();
};

dom.addEvent(nodes.validCode, 'click', events.codeClick);

new sweet.ui.form.button(sweet.dom.CLASS('uiButton'));

nodes.form = dom.ID('login-form');

var verify = {};

verify.enumState = (function ()
{
		var Enum = 
		[
				'validCodeError', 
				'validCodeExpire', 
				'maxNameError', 
				'minNameError', 
				'nameError', 
				'maxPasswordError', 
				'minPasswordError', 
				'nameOrPassError', 
				'done', 
        "failure"
		], ret = {};
		
		Enum.forEach(function (v, i) {ret[v] = i});
		return ret;
})();

verify.enumStateText = 
[
		'验证码错误', 
		'验证码过期', 
		'用户名过长', 
		'用户名过短', 
		'用户错误', 
		'密码过长', 
		'密码过短', 
		'用户名或密码错误', 
		'登录成功', 
    "登录失败"
];

verify._max_name_len = 16;
verify._min_name_len = 4;
		
verify._max_pwd_len = 32;
verify._min_pwd_len = 6;
		
verify._checkUserName = /[^a-zA-Z0-9]/;

events.formSubmit = function (e)
{
		dom.stopEvent(e);
		
		var	ajax = new sweet.ajax, 
				e = verify.enumState, 
				eText = verify.enumStateText, 
				_alert = new sweet.ui.dialog.alert;
		
		ajax.setFormElementData(nodes.form);
		
		_alert.setTitle('错误');
		_alert.setType('warning');
		
		var user = ajax.getData('user') || '', userLen = user.length;
		
		if (verify._checkUserName.test(user))
		{
				_alert.setText(eText[e.nameError]);
				_alert.display();
				return;
		}
		
		if (verify._max_name_len < userLen)
		{
				_alert.setText(eText[e.maxNameError]);
				_alert.display();
				return;
		}
		
		if (verify._min_name_len > userLen)
		{
				_alert.setText(eText[e.minNameError]);
				_alert.display();
				return;
		}
		
		var passLen = (ajax.getData('pwd') || '').length;
		
		if (verify._max_pwd_len < passLen)
		{
				_alert.setText(eText[e.maxPasswordError]);
				_alert.display();
				return;
		}
		
		if (verify._min_pwd_len > passLen)
		{
				_alert.setText(eText[e.minPasswordError]);
				_alert.display();
				return;
		}
		
		_alert.destroy();
		
		ajax.on('complete', callback.formComplete);
		ajax.on('error', callback.error);
		ajax.send();
};

dom.addEvent(nodes.form, 'submit', events.formSubmit);


callback.formComplete = function (text)
{
		var	_alert = new sweet.ui.dialog.alert, 
				e = verify.enumState, 
				eText = verify.enumStateText, 
				data = JSON.parse(text);
		
		_alert.setType('warning');
		
		switch (data.state)
		{
				case e.validCodeError: 
					_alert.setText(eText[e.validCodeError]);
					break;
				
				case e.validCodeExpire: 
					_alert.setText(eText[e.validCodeExpire]);
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
					
				case e.maxPasswordError: 
					_alert.setText(eText[e.maxPasswordError]);
					break;
					
				case e.minPasswordError: 
					_alert.setText(eText[e.minPasswordError]);
					break;
				
				case e.nameOrPassError: 
					_alert.setText(eText[e.nameOrPassError]);
					break;
				
				case e.done: 
					location.href = nodes.form.getAttribute('src');
					return;
          
        case e.failure: 
					_alert.setText(eText[e.failure]);
					break;
		}
		
		events.codeClick();
		
		_alert.display();
};

callback.codeComplete = function (node, text)
{
		node.innerHTML = text;
};

callback.error = function ()
{
		var _alert = new sweet.ui.dialog.alert;
		_alert.setTitle('错误');
		_alert.setType('error');
		_alert.setText('当前网络可能不稳定!!!');
		_alert.display();
};

// 手动加载一次验证码
events.codeClick();

})();