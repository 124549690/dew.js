/**
 *
 * @author          liuzhaohui
 * @contact         Email: hi.liuzhaoxin@gmail.com, QQ: 50081449, QQqun: 30715306
 *
 * -----------------------------
 * Happy Coding
 *
**/

window.sweet = window.sweet || {};
sweet.release = +new Date(2012, 1, 1);
sweet.root = (function () {
var	nodes = document.getElementsByTagName('script'), 
		src = nodes[nodes.length - 1].src;
return src.slice(0, src.lastIndexOf('/'));
})();

// extend begin
;(function (){

// Non-standard
;(function (){
var table = {Y: 89, y: 121, n: 110, m: 109, j: 106, d: 100, 
g: 103, h: 104, G: 71, H: 72, i: 105, s: 115, N: 78};
Date.prototype.format = function (expr)
{
		var	T = table, t = this, i = 0, j = expr.length, s = '', c;
		for (; i < j; i++)
		{
				switch (expr.charCodeAt(i))
				{
						case T.Y : // 1989 year
							s += t.getFullYear();
							break;
						case T.y : // 89 year
							s += t.getFullYear().toString().slice(2);
							break;
						case T.n : // 1-12 month
							s += t.getMonth() + 1;
							break;
						case T.m : // 01-12 month
							s += ('0' + (t.getMonth() + 1)).slice(-2);
							break;
						case T.j : // 1-31 date
							s += t.getDate();
							break;
						case T.d : // 01-31 date
							s += ('0' + t.getDate()).slice(-2);
							break;
						case T.g : // 1-12 hours
							c = t.getHours();
							s += c > 13 ? c - 12 : c;
							break;
						case T.h : // 01-12 hours
							c = t.getHours();
							s += ('0' + (c > 13 ? c - 12 : c)).slice(-2);
							break;
						case T.G : // 0-23 hours
							s += t.getHours();
							break;
						case T.H : // 00-23 hours
							s += ('0' + t.getHours()).slice(-2);
							break;
						case T.i : // 00-59 minutes
							s += ('0' + t.getMinutes()).slice(-2);
							break;
						case T.s : // 00-59 seconds
							s += ('0' + t.getSeconds()).slice(-2);
							break;
						case T.N : // 1-7
							c = t.getDay();
							s += c === 0 ? 7 : c;
							break;
						default : 
							s += expr.charAt(i);
				}
		}
		return s;
};
})();

// Non-standard
Math.rand = function (min, max)
{
		if (isNaN(min)) min = 0;
		if (isNaN(max)) max = 0xFFFFFFFF;
		return Math.floor(Math.random() * ((max -= min) + 1)) + min;
};

// Non-standard
Array.toArray = function (data, start)
{
		var i = start || 0, t, ret = [];
		while (t = data[i++]) ret.push(t);
		return ret;
};

// Non-standard
Array.unique = function (data)
{
		var i = 0, j = data.length, k, ret = [], exist = false;
		NEXT:
		for (; i < j; i++)
		{
				for (k = i + 1; k < j; k++)
				{
						if (data[i] === data[k])
						{
								continue NEXT;
						}
				}
				ret.push(data[i]);
		}
		return ret;
};

// Non-standard
String.prototype.quote = function ()
{
		var buf = '', str = this, i = 0, j = str.length, ord, chr;
		for (; i < j; i++)
		{
				chr = str.charAt(i);
				ord = chr.charCodeAt();
				if (ord === 0x22) buf += '\\"';
				else if (ord === 0x2F) buf += '\\/';
				else if (ord === 0x5C) buf += '\\\\';
				else if (ord === 0x08) buf += '\\b';
				else if (ord === 0x0C) buf += '\\f';
				else if (ord === 0x0a) buf += '\\n';
				else if (ord === 0x0d) buf += '\\r';
				else if (ord === 0x09) buf += '\\t';
				else if (ord > 0x7F)
						if (ord > 0x1000) buf += '\\u' + ord.toString(16);
						else buf += '\\u0' + ord.toString(16);
				else buf += chr;
		}
		return '"' + buf + '"';
};

if (!''.trim)
(function (){
var whitespace = '\n\r\t\f\x0b\xa0\x20\u2000\u2001\u2002\u2003\
\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
String.prototype.trim = function ()
{
		var	str = this, filter = whitespace, 
				i = 0, j = str.length - 1, k, l = filter.length, 
				left = false, right = false, c1, c2, c3;
		while (j > i)
		{
				c1 = str.charCodeAt(i);
				c2 = str.charCodeAt(j);
				for (k = 0; k < l; k++)
				{
						c3 = filter.charCodeAt(k);
						if (left === false && c1 === c3) left = true;
						if (right === false && c2 === c3) right = true;
				}
				if (left === false && right === false) break;
				if (left) {i++; left = false;}
				if (right) {j--; right = false;}
		}
		return i === j ? '' : str.slice(i, ++j);
};
})();

if (!(function (){}).bind)
Function.prototype.bind = function (env)
{
		var args = [].slice.call(arguments, 1), self = this;
		return function () {return self.apply(env, args.concat([].slice.call(arguments)))};
};

if (!Object.create)
Object.create = function (obj)
{
		obj = obj || {};
		var fn = new Function;
		fn.prototype = obj;
		return new fn;
};

if (!Object.keys)
Object.keys = function (o)
{
		if (o !== Object(o)) return {};
		var k, ret = [];
		for (k in o)
		{
				if (o.hasOwnProperty(k))
				{
						ret.push(o[k]);
				}
		}
		return ret;
};

if (!Array.isArray)
Array.isArray = function (v)
{
		return '[object Array]' == {}.toString.call(v);
};

if (![].indexOf)
Array.prototype.indexOf = function (data, pos)
{
		var a = this, i = (pos || 0) | 0, j = a.length, c;
		if (i >= j) return -1;
		if (i < 0) i += j;
		for (; i < j; i++)
		{
				if (a.hasOwnProperty(i) && a[i] === data)
				{
						return i;
				}
		}
		return -1;
};

if (![].lastIndexOf)
Array.prototype.lastIndexOf = function (data, pos)
{
		var a = this, i = (pos || 0) | 0, j = a.length, c;
		if (i >= j) return -1;
		if (i < 0) i += j;
		else i = j - i;
		for (; i > -1; i--)
		{
				if (a.hasOwnProperty(i) && a[i] === data)
				{
						return i;
				}
		}
		return -1;
};

if (![].every)
Array.prototype.every = function (cb, env)
{
		var arr = this, i = 0, j = arr.length;
		for (; i < j; i++)
		{
				if (arr.hasOwnProperty(i) && !cb.call(env, arr[i], i, arr))
				{
						return false;
				}
		}
		return true;
};

if (![].some)
Array.prototype.some = function ()
{
		var arr = this, i = 0, j = arr.length;
		for (; i < j; i++)
		{
				if (arr.hasOwnProperty(i) && !cb.call(env, arr[i], i, arr))
				{
						return true;
				}
		}
		return false;
};

if (![].forEach)
Array.prototype.forEach = function (cb, env)
{
		var arr = this, i = 0, j = arr.length;
		for (; i < j; i++)
		{
				if (arr.hasOwnProperty(i))
				{
						cb.call(env, arr[i], i, arr);
				}
		}
};

if (![].map)
Array.prototype.map = function (cb, env)
{
		var arr = this, i = 0, j = arr.length, result = new Array(j);
		for (; i < j; i++)
		{
				if (arr.hasOwnProperty(i))
				{
						result[i] = cb.call(env, arr[i], i, arr);
				}
		}
		return result;
};

if (![].filter)
Array.prototype.filter = function (cb, env)
{
		var arr = this, i = 0, j = arr.length, ret = [];
		for (; i < j; i++)
		{
				if (arr.hasOwnProperty(i) && cb.call(env, arr[i], i, arr))
				{
						ret.push(arr[i]);
				}
		}
		return ret;
};

if (![].reduce)
Array.prototype.reduce = function (cb, initVal)
{
		var arr = this, i = 0, j = arr.length, curr = initVal || arr[i++];
		for (; i < j; i++)
		{
				if (arr.hasOwnProperty(i))
				{
						curr = cb(curr, arr[i], i, arr);
				}
		}
		return curr;
};

if (![].reduceRight)
Array.prototype.reduceRight = function (cb, initVal)
{
		var arr = this, i = arr.length - 1, curr = initVal || arr[i--];
		for (; i > -1; i--)
		{
				if (arr.hasOwnProperty(i))
				{
						curr = cb(curr, arr[i], i, arr);
				}
		}
		return curr;
};

if (!window.JSON)
(function (){
window.JSON = JSON = {};

JSON.parse = function (str)
{
		return check(str) ? (Function('return (' + str + ')')()) : {};
};

JSON.stringify = function (v)
{
		var i, j, ret, type = typeof v;
		if ('string' == type) return escape(v);
		else if ('number' == type) return isFinite(v) ? v + '' : 'null';
		else if ('boolean' == type) return v + '';
		else if (Array.isArray(v))
		{
				ret = [];
				for (i = 0, j = v.length; i < j; i++)
				{
						ret.push(arguments.callee(v[i]));
				}
				return '[' + ret.join(',') + ']';
		}
		else if ('object' == type)
		{
				ret = [];
				for (i in v)
				{
						if (v.hasOwnProperty(i))
						{
								ret.push('"' + i + '":' + arguments.callee(v[i]));
						}
				}
				return '{' + ret.join(',') + '}';
		}
		else
		{
				return 'null';
		}
};

function escape (str)
{
		var buf = '', i = 0, j = str.length, ord, chr;
		for (; i < j; i++)
		{
				chr = str.charAt(i);
				ord = chr.charCodeAt();
				if (ord === 0x08) buf += '\\b';
				else if (ord === 0x09) buf += '\\t';
				else if (ord === 0x0a) buf += '\\n';
				else if (ord === 0x0C) buf += '\\f';
				else if (ord === 0x0d) buf += '\\r';
				else if (ord === 0x22) buf += '\\"';
				else if (ord === 0x5C) buf += '\\\\';
				else buf += chr;
		}
		return '"' + buf + '"';
}

function check (str)
{
		return /^[\],:{}\s]*$/.test
		(
			str
				.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
				.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
				.replace(/(?:^|:|,)(?:\s*\[)+/g, '')
		);
}
})();

})();
// extend end

// check browser versions begin
;(function (){
if (!window.sweet) return;

var	browser = {}, agent = navigator.userAgent.toLowerCase(), 
regex = new RegExp('(?:msie\\s+|opera\\/|chrome\\/|safari\\/|firefox\\/)([\\d.]+)');

sweet.browser = browser;

browser.isStrict = document.compatMode == 'CSS1Compat';
browser.isGecko = agent.indexOf('gecko') > -1 && agent.indexOf('like gecko') === -1;
browser.isWebkit = agent.indexOf('webkit') > -1;
browser.isIE = agent.indexOf('msie') > -1;

browser.ie = agent.indexOf('msie') > -1 && regex.test(agent);
browser.opera = agent.indexOf('opera') > -1 && regex.test(agent);
browser.chrome = agent.indexOf('chrome') > -1 && regex.test(agent);
browser.safari = agent.indexOf('chrome') === -1 && agent.indexOf('safari') > -1 && regex.test(agent);
browser.firefox = agent.indexOf('firefox') > -1 && regex.test(agent);
browser.version = parseFloat(RegExp['\x241']);

})();
// check browser versions end

// ...
;(function (){
if (!window.sweet) return;

var namespace = {}, ready = [];

sweet.namespace = function (position)
{
		if (position.length === 1 && '.' == position.charAt())
		{
				return namespace;
		}
		
		var	struct = position.replace(/\s/g, '').split('.'), 
				i = 0, j = struct.length, curr = namespace;
		
		for (; i < j; i++)
		{
				if (!struct[i])
				{
						throw new Error('sweet.namespace: ' + position + ' format error');
				}
				
				if (!curr[struct[i]])
				{
						curr[struct[i]] = {};
				}
				
				curr = curr[struct[i]];
		}
		
		return curr;
};

sweet.ready = function (callback)
{
		ready.push(callback);
};

;(function (){
if (sweet.browser.isIE && sweet.browser.version < 9)
{
		poll();
}
else
{
		document.addEventListener('DOMContentLoaded', done, false);
}

function poll ()
{
		try
		{
				document.documentElement.doScroll('left');
				ready.forEach(new Function ('v', 'v()'));
				ready = [];
		}
		catch (e)
		{
				setTimeout(poll, 33);
		}
}

function done ()
{
		ready.forEach(new Function ('v', 'v()'));
		ready = [];
		document.removeEventListener('DOMContentLoaded', done, false);
}

})();

})();
// ...

// cookie module begin
;(function (){
if (!window.sweet) return;
var cookie = {};

sweet.cookie = cookie;

cookie.setcookie = function (key, value, second, path, domain, secure)
{
		var args = [].slice.call(arguments);
		args[1] = encodeURIComponent(args[1]);
		this.setrawcookie.apply(this, args);
};

cookie.getcookie = function (key)
{
		return decodeURIComponent(this.getrawcookie(key));
};

cookie.setrawcookie = function (key, value, second, path, domain, secure)
{
		if (typeof key != 'string' || typeof value != 'string') return;
		
		var time = new Date, cookie = key + '=' + value;
		
		if (!!second)
		{
				time.setTime(+time + second * 1000);
				cookie += '; expires=' + time.toGMTString();
		}
		
		if (!!path) cookie += '; path=' + path;
		if (!!domain) cookie += '; domain=' + domain;
		if (secure === true) cookie += '; secure';
		
		document.cookie = cookie;
};

cookie.getrawcookie = function (key)
{
		if (typeof key != 'string') return '';
		var	cookie = ' ' + document.cookie + '; ',
				search = ' ' + key + '=',
				pos = cookie.indexOf(search);
		if (pos === -1) return '';
		var start = pos + search.length, end = cookie.indexOf('; ', start);
		return cookie.slice(start, end);
};

})();
// cookie module end

// events module begin
;(function (){
if (!window.sweet) return;

sweet.events = events;

function events () {}

events.prototype.emit = function (type)
{
		if (!this._events || !this._events[type])
		{
				return;
		}
		
		var	args = [].slice.call(arguments, 1), list = this._events[type], 
				i = 0, j = list.length, curr;
		
		for (; i < j; i++)
		{
				if (!list.hasOwnProperty(i))
				{
						continue;
				}
				
				curr = list[i];
				curr.apply(this, args);
				
				if (curr.__once__)
				{
						delete curr.__once__;
						list.splice(i, 1);
						i--;
						j--;
				}
		}
};

events.prototype.addListener = events.prototype.on = function (type, cb)
{
		if (!this._events)
		{
				this._events = {};
		}
		
		if (!this._events[type])
		{
				this._events[type] = [];
		}
		
		this._events[type].push(cb);
		this.emit('newListener', type, cb);
		return this;
};

events.prototype.once = function (type, cb) 
{
		cb.__once__ = true;
		this.on.call(this, type, cb);
};

events.prototype.removeListener = function (type, cb)
{
		if (!this._events || !this._events[type])
		{
				return this;
		}
		
		var list = this._events[type], len = list.length;
		
		while (--len > -1)
		{
				if (list[len] === cb)
				{
						list.splice(len--, 1);
				}
		}
		
		return this;
};

events.prototype.removeAllListeners = function (type)
{
		if ('string' == typeof type)
		{
				delete this._events[type];
		}
		else
		{
				this._events = {};
		}
};

events.prototype.listeners = function (type)
{
		if (!this._events || !type)
		{
				return this;
		}
		
		var events = this._events;
		
		if (!events[type])
		{
				return [];
		}
		else if (events[type].length === 1)
		{
				return events[type][0];
		}
		else
		{
				return events[type];
		}
};

})();
// events module end

// queue module begin
;(function (){
if (!window.sweet) return;

sweet.queue = queue;

function queue ()
{
		this.empty();
		this.length = 0;
}

queue.prototype.push = function ()
{
		var argv = arguments, i = 0, j = argv.length, head, tail;
		
		if (j === 0) return this.length;
		
		if (this._head === null)
		{
				head = {data: argv[i++]};
				head.next = head;
				head.prev = head;
				this._head = this._tail = head;
		}
		
		for (; i < j; i++)
		{
				tail = this._tail;
				this._tail = {data: argv[i], prev: tail};
				tail.next = this._tail;
		}
		
		this.length += j;
		return j;
};

queue.prototype.pop = function ()
{
		if (this._tail === null)
		{
				return;
		}
		
		var data = this._tail.data;
		
		this._tail = this._tail.prev;
		
		this.length--;
		
		if (this.length === 0)
		{
				this._tail = this._head = null;
		}
		
		return data;
};

queue.prototype.unshift = function ()
{
		var argv = arguments, argc = argv.length, head, tail;
		
		if (argc === 0) return this.length;
		
		this.length += argc;
		
		if (this._head === null)
		{
				head = {data: argv[--argc]};
				head.next = head;
				head.prev = head;
				this._head = this._tail = head;
		}
		
		while (--argc > -1)
		{
				head = this._head;
				this._head = {data: argv[argc], next: head};
				head.prev = this._head;
		}
		
		return this.length;
};

queue.prototype.shift = function ()
{
		if (this._head === null)
		{
				return;
		}
		
		var data = this._head.data;
		
		this._head = this._head.next;
		
		this.length--;
		
		if (this.length === 0)
		{
				this._head = this._tail = null;
		}
		
		return data;
};

queue.prototype.empty = function ()
{
		this._head = this._tail = null;
		this.length = 0;
};

})();
// queue module end

// pools module begin
;(function (){
if (!window.sweet) return;

sweet.pools = pools;

function pools ()
{
		this._pools = [];
		this._index = [];
}

pools.prototype.addObject = function ()
{
		var argv = arguments, argc = argv.length;
		
		if (argc === 0) return;
		
		this._pools.push.apply(this._pools, arguments);
		
		while (--argc > -1)
		{
				this._index.push(false);
		}
};

pools.prototype.borrowObject = function ()
{
		var index = this._index, i = 0, j = index.length;
		for (; i < j; i++)
		{
				if (index[i] === false)
				{
						index[i] = true;
						return this._pools[i];
				}
		}
		return null;
};

pools.prototype.returnObject = function (obj)
{
		var pools = this._pools, i = 0, j = pools.length;
		for (; i < j; i++)
		{
				if (pools[i] === obj)
				{
						this._index[i] = false;
						return true;
				}
		}
		
		return false;
};

})();
// pools module end

// cache module begin
;(function (){
if (!window.sweet) return;

sweet.cache = cache;

function cache ()
{
		this._store = {};
		this._time = +new Date;
}

cache.prototype.remove = function (key)
{
		delete this._store[key];
		return this;
};

cache.prototype.removeAll = function ()
{
		this._store = {};
};

cache.prototype.add = function (key, val)
{
		if (!this._store[key])
		{
				this._store[key] = val;
		}
		return this;
};

cache.prototype.set = function (key, val)
{
		this._store[key] = val;
		return this;
};

cache.prototype.get = function (key)
{
		return this._store[key];
};

cache.prototype.has = function (key)
{
		return this._store.hasOwnProperty(key);
};
})();
// cache module end

// util module begin
;(function (){
if (!window.sweet) return;

var util = sweet.util = {};

util.inherits = function (ctor, superCtor)
{
		var proto = Object.create(superCtor.prototype);
		proto.constructor = ctor;
		ctor.prototype = proto;
		ctor.super_ = superCtor;
};

util.mix = function (c, t)
{
		if ('function' == typeof t)
		{
				t = t.prototype;
		}
		for (var k in t)
		{
				c[k] = t[k];
		}
};

util.gettype = function (v)
{
		var vType = typeof v, oType = {}.toString.call(v).slice(8, -1);
		if ('number' == vType && (v | 0) !== v) return 'float';
		else if ('number' == vType && (v | 0) === v) return 'integer';
		else if ('boolean' == vType) return 'boolean';
		else if ('string' == vType && v !== '' && !isNaN(v)) return 'numeric';
		else if ('string' == vType) return 'string';
		else if (Array.isArray(v)) return 'array';
		else if ('Object' == oType) return 'object';
		else if ('Function' == oType) return 'function';
		else if ('RegExp' == oType) return 'regexp';
		else if ('Date' == oType) return 'date';
		else if (v === null) return 'null';
		else if (v === undefined) return 'undefined';
		else if ('Error' == oType) return 'error';
		else return '???';
};

})();
// util module end

// ajax module begin
;(function (){
if (!window.sweet) return;

sweet.ajax = ajax;

var task = {};

task._setMaxPools = 4;
task._queue = new sweet.queue;
task._pools = new sweet.pools;

task.init = function ()
{
		var i = 0, j = this._setMaxPools, pools = this._pools;
		for (; i < j; i++)
		{
				pools.addObject(window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest());
		}
};

task.ready = function (item)
{
		this._queue.push(item);
};

task.exec = function ()
{
		var obj = this._pools.borrowObject();
		if (obj === null) return;
		
		var item = this._queue.shift();
		if (item === undefined)
		{
				this._pools.returnObject(obj);
				return;
		}
		
		var headers = item.headers, key;
		
		obj.open(item.method, item.url);
		
		for (key in headers)
		{
				if (headers.hasOwnProperty(key))
				{
						obj.setRequestHeader(key, headers[key]);
				}
		}
		
		obj.onreadystatechange = this.callback.bind(this, item.events, obj);
		obj.send('GET' == item.method ? null : item.data);
};

task.callback = function (events, xhr)
{
		var readyState = xhr.readyState;
		
		if (readyState === 1)
		{
				events.emit('loading');
		}
		else if (readyState === 2)
		{
				events.emit('loaded');
		}
		else if (readyState === 3)
		{
				events.emit('interactive');
		}
		else if (readyState === 4)
		{
				var status = xhr.status;
				
				if (status >= 200 && status < 300 || status === 304 || status === 1223)
				{
						events.emit('complete', xhr.responseText, xhr.getResponseHeader('Content-Type'), status);
				}
				else
				{
						events.emit('error', status);
				}
				
				events.removeAllListeners();
				
				xhr.onreadystatechange = new Function;
				this._pools.returnObject(xhr);
				
				setTimeout(this.exec.bind(this), 1);
		}
};

task.init();

function ajax ()
{
		this._data = [];
		this._headers = {};
		this.setHeader('X-Requested-With', 'XMLHttpRequest');
		this.setData('time', +new Date);
}

sweet.util.inherits(ajax, sweet.events);

ajax.prototype.setData = function (key, val)
{
		this._data.push(key + '=' + encodeURIComponent(val));
};

ajax.prototype.getData = function (key)
{
		if (undefined === key)
		{
				return this._data;
		}
		
		var data = this._data, i = 0, j = data.length, l = key.length;
		
		for (; i < j; i++)
		{
				if (data[i].slice(0, l) == key)
				{
						return data[i].slice(l + 1);
				}
		}
};

ajax.prototype.setHeader = function (key, val)
{
		this._headers[key] = val;
};

ajax.prototype.open = function (method, url)
{
		this._method = method;
		this._url = url;
};

ajax.prototype.send = function ()
{
		if (!this._url)
		{
				throw new Error('ajax send address is not set');
		}
		
		var	url = this._url, item = {}, data = this._data.join('&'), 
				method = (this._method || 'POST').toUpperCase();
		
		if ('POST' == method)
		{
				this.setHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		else if ('GET' == method && data.length > 0)
		{
				var index = url.indexOf('?');
				if (index === -1)
				{
						url += '?';
				}
				else if (index !== url.length - 1)
				{
						url += '&';
				}
				url += data;
		}
		
		item.url = url;
		item.method = method;
		item.data = data;
		item.headers = this._headers;
		item.events = this;
		
		task.ready(item);
		task.exec();
};

ajax.prototype.setFormElementData = function (form)
{
		if ('object' != typeof form || !form.elements)
		{
				throw new Error(form + ' not a html form element');
		}
		
		var	nodes = form.elements, i = 0, j= nodes.length, k, l, item, name, type, select;
		
		if (!this._url)
		{
				this._url = form.getAttribute('action');
		}
		
		if (!this._method)
		{
				this._method = form.getAttribute('method');
		}
		
		for (; i < j; i++)
		{
				item = nodes[i];
				name = item.name;
				
				if (!name || item.disabled)
				{
						continue;
				}
				
				type = item.type;
				
				if (('radio' == type || 'checkbox' == type) && !item.checked)
				{
						continue;
				}
				
				if ('radio' == type || 
						'checkbox' == type || 
						'select-one' == type || 
						'textarea' == type || 
						'text' == type || 
						'password' == type || 
						'hidden' == type)
				{
						this.setData(name, item.value);
				}
				else if ('select-multiple' == type)
				{
						select = item.options;
						for (k = 0, l = select.length; k < l; k++)
						{
								if (select[k].selected)
								{
										this.setData(name, select[k].value);
								}
						}
				}
		}
};

})();
// ajax module end

// jsonp module begin
;(function (){
if (!window.sweet) return;

sweet.jsonp = jsonp;

var task = {}, aid = 1, store = {}, callback = {};

task._head = document.documentElement.firstChild;

task.exec = function (item)
{
		var node = document.createElement('script');
		node.setAttribute('type', 'text/javascript');
		node.setAttribute('src', item.url);
		
		if (!!item.charset)
		{
				node.setAttribute('charset', item.charset);
		}
		
		var cb = item.events._complete = callback.complete.bind(this, node, item.id, item.events);
		
		// 如果 JSONP 在 15 秒内未返回数据，证明 JSONP 数据调用失败
		item.events._timer = setTimeout(callback.error.bind(this, node, item.events), 15 * 1000);
		
		if (node.onload === null)
		{
				node.addEventListener('load', cb, false);
		}
		else if (node.onreadystatechange === null)
		{
				node.attachEvent('onreadystatechange', cb);
		}
		
		this._head.appendChild(node);
};

callback.complete = function (node, id, events)
{
		// node.readyState 非 IE 得到 false
		if (node.readyState && node.readyState != 'loaded' && node.readyState != 'complete')
		{
				return;
		}
		
		if (node.onload === null)
		{
				node.removeEventListener('load', events._complete, false);
		}
		else if (node.onreadystatechange === null)
		{
				node.detachEvent('onreadystatechange', events._complete);
		}
		
		node.removeAttribute('src');
		node.removeAttribute('type');
		node.removeAttribute('charset');
		this._head.removeChild(node);
		
		clearTimeout(events._timer);
		delete events._complete;
		
		events.emit('complete', jsonp.getData(id));
		events.removeAllListeners();
};

callback.error = function (node, events)
{
		if (node.onload === null)
		{
				node.removeEventListener('load', events._complete, false);
		}
		else if (node.onreadystatechange === null)
		{
				node.detachEvent('onreadystatechange', events._complete);
		}
		
		node.removeAttribute('src');
		node.removeAttribute('type');
		node.removeAttribute('charset');
		this._head.removeChild(node);
		
		delete events._complete;
		
		events.emit('error');
		events.removeAllListeners();
};


jsonp.setData = function (data, id)
{
		store[id] = data;
};

jsonp.getData = function (id)
{
		var data = store[id];
		delete store[id];
		return data;
};

// http://127.0.0.1/jsonp?callback=sweet.jsonp.setData$,1&X-Requested-With=JSONP&time=1334113208
function jsonp ()
{
		this._data = {};
		this._time = +new Date;
		this._id = aid++;
		this.setQuery('callback', 'sweet.jsonp.setData$,' + this._id);
		this.setQuery('X-Requested-With', 'JSONP');
		this.setQuery('time', (new Date / 1000) | 0);
}

sweet.util.inherits(jsonp, sweet.events);

jsonp.prototype.setQuery = function (key, val)
{
		this._data[key] = encodeURI(val);
};

jsonp.prototype.send = function ()
{
		if (!this.url)
		{
				throw new Error('jsonp send address is not set');
		}
		
		var	url = this.url, index = url.indexOf('?'), data = this._data, key, item = {};
		
		if (index === -1)
		{
				url += '?';
		}
		else if (index !== url.length - 1)
		{
				url += '&';
		}
		
		for (key in data)
		{
				if (data.hasOwnProperty(key))
				{
						url += key + '=' + data[key] + '&';
				}
		}
		
		item.id = this._id;
		item.url = url.slice(0, -1);
		item.charset = this.charset;
		item.events = this;
		
		task.exec(item);
};


})();
// jsonp module end

// module load begin
;(function (){
if (!window.sweet) return;

var load = sweet.load = {}, task = {}, node = {}, scriptCallback = {}, linkCallback = {};

sweet.util.mix(load, sweet.events);

task._current = 0;
task._total = 0;
task._queue = new sweet.queue;

task.push = function (item)
{
		this._total++;
		this._queue.push(item);
};

task.unshift = function (item)
{
		this._total++;
		this._queue.unshift(item);
};

task.exec = function ()
{
		var item = this._queue.shift();
		
		if (item === undefined)
		{
				this._current = 0;
				this._total = 0;
				load.emit('end');
				load.removeAllListeners();
				return;
		}
		
		load.emit('progress', item.name, ++this._current, this._total);
		
		if ('function' == typeof item)
		{
				item(task.exec.bind(task));
		}
		else if ('object' == typeof item)
		{
				var suffix = item.url.slice(-4);
				
				if (suffix.indexOf('.js') > -1)
				{
						node.script(item);
				}
				else if (suffix.indexOf('.css') > -1)
				{
						node.link(item);
				}
		}
};

node._head = document.documentElement.firstChild;

node.script = function (item)
{
		var node = document.createElement('script');
		node.setAttribute('type', 'text/javascript');
		node.setAttribute('src', item.url);
		
		if (!!item.charset)
		{
				node.setAttribute('charset', item.charset);
		}
		
		var timer = setTimeout(scriptCallback.error.bind(this, node), 15 * 1000);
		
		load._complete = scriptCallback.complete.bind(this, node, item.name, timer);
		
		if (node.onload === null)
		{
				node.addEventListener('load', load._complete, false);
		}
		else if (node.onreadystatechange === null)
		{
				node.attachEvent('onreadystatechange', load._complete);
		}
		
		this._head.appendChild(node);
};

node.link = function (item)
{
		var node = document.createElement('link');
		node.setAttribute('rel', 'stylesheet');
		node.setAttribute('type', 'text/css');
		node.setAttribute('href', item.url);
		
		if (!!item.charset)
		{
				node.setAttribute('charset', item.charset);
		}
		
		this._head.appendChild(node);
		
		load._loaded[item.name] = true;
		setTimeout(task.exec.bind(task), 1);
};

linkCallback.complete = function () {};

linkCallback.error = function () {};

scriptCallback.complete = function (node, name, timer)
{
		// node.readyState 非 IE 得到 false
		if (node.readyState && node.readyState != 'loaded' && node.readyState != 'complete')
		{
				return;
		}
		
		if (node.onload === null)
		{
				node.removeEventListener('load', load._complete, false);
		}
		else if (node.onreadystatechange === null)
		{
				node.detachEvent('onreadystatechange', load._complete);
		}
		
		load._loaded[name] = true;
		
		delete load._complete;
		clearTimeout(timer);
		
		setTimeout(task.exec.bind(task), 1);
};

scriptCallback.error = function (node)
{
		if (node.onload === null)
		{
				node.removeEventListener('load', load._complete, false);
		}
		else if (node.onreadystatechange === null)
		{
				node.detachEvent('onreadystatechange', load._complete);
		}
		
		delete load._complete;
		
		load.emit('error');
		load.removeAllListeners();
};

load._loading = {};
load._loaded = {};

load.add = function (name, url, charset)
{
		if ('string' != typeof name || 'string' != typeof url)
		{
				throw new Error('Please check your parameter');
		}
		else if (!this._loading[name])
		{
				this._loading[name] = {name: name, url: url, charset: charset};
		}
		return this;
};

load._insert = function (method)
{
		var	loaded = this._loaded, loading = this._loading, 
				args = arguments, i = 1, j = args.length, item;
		
		for (; i < j; i++)
		{
				item = args[i];
				
				if ('string' == typeof item)
				{
						if (loaded[item])
						{
								continue;
						}
						else if (!loading[item])
						{
								throw new Error('Please check your module name: ' + item);
						}
						else
						{
								task[method](loading[item]);
						}
				}
				else if ('function' == typeof item)
				{
						task[method](item);
				}
		}
		return this;
};

load.exec = function ()
{
		var args = Array.toArray(arguments);
		args.unshift('push');
		load._insert.apply(load, args);
		load.emit('start');
		task.exec();
};

load.before = load._insert.bind(load, 'unshift');

load.after = load._insert.bind(load, 'push');

})();
// module load end

// animate module begin
;(function (){
if (!window.sweet) return;

sweet.animate = animate;

function animate ()
{
		this._total = 0;
		this.on('progress', this.progress.bind(this));
}

sweet.util.inherits(animate, sweet.events);

animate.prototype._duration = 400;

animate.prototype.addElement = function (node)
{
		var	args = [].slice.call(arguments, 1), i = 0, j = args.length, k, l, 
				mng = new manage(this), item, ret;
		
		for (; i < j; i++)
		{
				item = args[i];
				
				if (Array.isArray(item))
				{
						ret = [];
						for (k = 0, l = item.length; k < l; k++)
						{
								ret.push(new task(mng, node, item[k].from, item[k].to, item[k].duration || this._duration, item[k].callback));
						}
						mng.addItem(ret);
				}
				else if ('[object Object]' == {}.toString.call(item))
				{
						mng.addItem(new task(mng, node, item.from, item.to, item.duration || this._duration, item.callback));
				}
		}
		
		this._total++;
		this.once('start', mng.emit.bind(mng, 'progress'));
};

animate.prototype.start = function ()
{
		this.emit('start');
};

animate.prototype.progress = function ()
{
		if (--this._total === 0)
		{
				this.emit('end');
		}
};

function manage (event)
{
		this._total = 0;
		this._event = event;
		this._queue = new sweet.queue;
		
		this.on('end', this.end.bind(this));
		this.on('progress', this.progress.bind(this));
}

sweet.util.inherits(manage, sweet.events);

manage.prototype.addItem = function (item)
{
		this._queue.push(item);
};

manage.prototype.progress = function ()
{
		var item = this._queue.shift();
		if (item === undefined)
		{
				this._event.emit('progress');
				this.removeAllListeners();
				return;
		}
		
		if (Array.isArray(item))
		{
				this._total = item.length;
				item.forEach(new Function ('v', 'v.start()'));
		}
		else
		{
				this._total = 1;
				item.start();
		}
};

manage.prototype.end = function ()
{
		if (--this._total === 0)
		{
				this.emit('progress');
		}
};

function task (event, node, from, to, duration, cb)
{
		this._event = event;
		this._node = node;
		
		this._from = from;
		this._to = to;
		
		this._duration = duration;
		this._callback = 'string' == typeof cb ? new Function('node', 'now', cb) : cb;
}

task.prototype.start = function ()
{
		this._startTime = +new Date;
		this._endTime = this._startTime + this._duration;
		this._timer = setInterval(this.step.bind(this), 13);
};

task.prototype.step = function ()
{
		var time = +new Date, now;
		
		if (time >= this._endTime)
		{
				clearInterval(this._timer);
				now = this._to;
				this._event.emit('end');
				delete this._event;
		}
		else
		{
				now = ((-Math.cos(((time - this._startTime) / this._duration) * Math.PI) / 2) + 0.5) * 
					(this._to - this._from) + this._from;
		}
		
		this._callback(this._node, now);
};

})();
// animate module end

// template module begin
;(function (){
if (!window.sweet) return;

sweet.template = template;

function template ()
{
		this._data = {};
}

template.prototype._A = 
{
		LF : 0x0A,			// 换行
		CR : 0x0D,			// 回车
		
		LT : 0x3C,			// 小于
		GT : 0x3E,			// 大于
		
		SPACE : 0x20,		// 空格
		TAB : 0x09,			// 制表符
		
		EQUAL : 0x3D,		// 等于
		AT : 0x40,			// @
		
		LBRACKET : 0x5B, // [
		RBRACKET : 0x5D, // ]
		
		SQUOTE : 0x22,	// 双引号
		DQUOTE : 0x27,	// 单引号
		
		BACKSLASH : 0x5C,			/* 反斜线 \ */
		FORWARDSLASH : 0x2F,	// 正斜线 /
		
		COMMA : 0x2C,		// 逗号
		SEMI : 0x3B			// 分号
};

template.prototype._tags_start = '<?'.split('').map(function(v){return v.charCodeAt()});
template.prototype._tags_end = '?>'.split('').map(function(v){return v.charCodeAt()});

template.prototype._S = (function ()
{
		var Enum = 
		[
				'START', 
				'TAGS_LEFT_START', 
				'TAGS_LEFT', 
				'TAGS_RIGHT_START', 
				'TAGS_RIGHT', 
				'PRINT_START', 
				'PRINT'
		], result = {};
		Enum.forEach(function (v, i) {result[v]=i+1});
		return result;
})();

template.prototype.assign = function (key, val)
{
		if ('string' == typeof key)
		{
				this._data[key] = val;
		}
		else if ('object' == typeof key)
		{
				sweet.util.mix(this._data, key);
		}
};

template.prototype.fetch = function (tpl)
{
		return new Function('var _T_="";' + this._handler(tpl) + 'return _T_').call(this._data);
};

template.prototype._handler = function (data)
{
		var	A = this._A, S = this._S, state = S.START, 
				tagsStart = this._tags_start, tagsStartLength = tagsStart.length, 
				tagsEnd = this._tags_end, tagsEndLength = tagsEnd.length, 
				i = 0, j = data.length, ret = '', index, flags, ord, start, end;
		
		for (; i < j; i++)
		{
				ord = data.charCodeAt(i);
				switch (state)
				{
						case S.START : 
							index = 0;
							start = i;
							state = S.TAGS_LEFT_START;
						
						case S.TAGS_LEFT_START : 
							if (ord === tagsStart[index])
							{
									end = i;
									state = S.TAGS_LEFT;
							}
							else
							{
									break;
							}
							
						case S.TAGS_LEFT : 
							if (index < tagsStartLength && ord === tagsStart[index])
							{
									++index;
							}
							else
							{
									index = 0;
									state = S.TAGS_LEFT_START;
							}
							
							if (index === tagsStartLength)
							{
									if (start !== end)
									{
											ret += '_T_+="' + quote(data.slice(start, end)) + '";';
									}
									state = S.TAGS_RIGHT_START;
							}
							break;
							
						case S.TAGS_RIGHT_START: 
							start = i;
							index = 0;
							flags = 0;
							state = S.TAGS_RIGHT;
							
						case S.TAGS_RIGHT: 
							if (flags === 0)
							{
									if (index < tagsEndLength && ord === tagsEnd[index])
									{
											++index;
									}
									else
									{
											index = 0;
									}
									
									if (index === tagsEndLength)
									{
											if (start !== i - 1)
											{
													ret += this._analyzePrintPart(data.slice(start, i - 1));
											}
											state = S.START;
									}
									else if (ord === A.SQUOTE || ord === A.DQUOTE)
									{
											flags = ord;
									}
							}
							else if (ord === A.BACKSLASH)
							{
									index = flags;
									flags |= ~flags;
							}
							else if (ord === flags)
							{
									index = 0;
									flags = 0;
							}
							else if (flags === -1)
							{
									flags = index;
							}
							break;
				}
		}
		
		if (state === S.TAGS_LEFT_START && start !== j)
		{
				ret += '_T_+="' + quote(data.slice(start, j)) + '";';
		}
		else if (state !== S.START)
		{
				throw new Error('Please check your template');
		}
		
		return ret;
};

template.prototype._analyzePrintPart = function (data)
{
		var	A = this._A, S = this._S, state = S.START, ret = '_T_+=', 
				i = 0, j = data.length, index = 0, flags = 0, mark, ord;
		
		for (; i < j; i++)
		{
				ord = data.charCodeAt(i);
				switch (state)
				{
						case S.START : 
							if (ord !== A.EQUAL)
							{
									return data;
							}
							state = S.PRINT_START;
							break;
							
						case S.PRINT_START : 
							mark = i;
							state = S.PRINT;
							
						case S.PRINT : 
							if (flags === 0)
							{
									if (ord === A.COMMA)
									{
											if (mark !== i)
											{
													ret += data.slice(mark, i) + '+';
											}
											state = S.PRINT_START;
									}
									else if (ord === A.SEMI)
									{
											if (mark !== i)
											{
													ret += data.slice(mark, i) + ';';
											}
											state = S.PRINT_START;
									}
									else if (ord === A.SQUOTE || ord === A.DQUOTE || ord === A.FORWARDSLASH)
									{
											flags |= ord;
									}
									else if (ord === A.LBRACKET)
									{
											flags |= A.RBRACKET;
									}
							}
							else if (ord === A.BACKSLASH)
							{
									index = flags;
									flags |= ~flags;
							}
							else if (ord === flags)
							{
									index = 0;
									flags = 0;
							}
							else if (flags === -1)
							{
									flags = index;
							}
				}
		}
		
		if (state === S.PRINT)
		{
				ret += data.slice(mark, j) + ';';
		}
		
		return ret;
};

function quote (str)
{
		var buf = '', i = 0, j = str.length, ord;
		for (; i < j; i++)
		{
				ord = str.charCodeAt(i);
				if (ord === 0x22) buf += '\\"';
				else if (ord === 0x2F) buf += '\\/';
				else if (ord === 0x5C) buf += '\\\\';
				else if (ord === 0x08) buf += '\\b';
				else if (ord === 0x0C) buf += '\\f';
				else if (ord === 0x0a) buf += '\\n';
				else if (ord === 0x0d) buf += '\\r';
				else if (ord === 0x09) buf += '\\t';
				else buf += str.charAt(i);
		}
		return buf;
};

})();
// template module end

// html module begin
;(function (){
if (!window.sweet) return;

sweet.html = html;

function html (data)
{
		var root = document.createElement('div');
		root.innerHTML = data;
		
		var nodes = root.childNodes;
		if (nodes.length === 1)
		{
				root = nodes[0];
		}
		
		this._root = root;
		
		return this;
}

html.prototype._matchNameRegex = /^([A-Z]+)/;
html.prototype._matchIndexRegex = /\[(\d+)\]/;
html.prototype._filterExprChar = /^\/|\/$|\s+|\/{2,}/g;

// html.path('/div/p[1]');
html.prototype.path = function (expr)
{
		var	step = expr.replace(this._filterExprChar, '').toUpperCase().split('/'), 
				matchNameRegex = this._matchNameRegex, matchIndexRegex = this._matchIndexRegex, 
				i = 0, j = step.length, k, l, root = this._root, nodes, name, index, ret, curr;
		
		if (expr.length === 1 && '/' == expr.charAt())
		{
				return this._root;
		}
		
		for (; i < j; i++)
		{
				curr = step[i];
				
				name = (curr.match(matchNameRegex) || ['', ''])[1];
				index = (curr.match(matchIndexRegex) || [-1, -1])[1];
				
				ret = [];
				nodes = root.childNodes;
				
				for (k = 0, l = nodes.length; k < l; k++)
				{
						curr = nodes[k];
						if (curr.nodeType === 1 && curr.nodeName == name)
						{
								ret.push(curr);
						}
				}
				
				root = index === -1 ? ret[0] : ret[index];
				if (root === undefined)
				{
						return null;
				}
		}
		
		return index === -1 ? ret.length === 1 ? ret[0] : ret : ret[index] || null;
};

html.prototype.setAttribute = function (key, val)
{
		this._root.setAttribute(key, val);
};

html.prototype.removeAttribute = function (key)
{
		this._root.removeAttribute(key);
};

html.prototype.append = function (node)
{
		node.appendChild(this._root);
};

html.prototype.before = function (node)
{
		node.insertBefore(this._root, node.firstChild);
};

})();
// html module end

// dom module begin
;(function (){
if (!window.sweet) return;

var dom = sweet.dom = {};

// 获得指定 id 元素
dom.ID = function (name)
{
		return 'string' == typeof name ? document.getElementById(name) : null;
};

// 获得指定 tag 元素
dom.TAG = function (name, root)
{
		root = root || document;
		return 'string' == typeof name ? root.getElementsByTagName(name) : null;
};

// 获得包含 className 元素
dom.CLASS = function (name, root)
{
		root = root || document;
		
		var	nodes = root.getElementsByTagName('*'), ret = [], 
				i = 0, j = nodes.length, c;
		
		for (; i < j; i++)
		{
				c = nodes[i];
				if (name == c.className || dom.hasClass(c, name))
				{
						ret.push(c);
				}
		}
		
		return ret;
};

// 判断指定 className 是否存在
dom.hasClass = function (node, name)
{
		return (' ' + node.className + ' ').indexOf(' ' + name + ' ') !== -1;
};

// 添加 className 名
dom.addClass = function (node, name)
{
		if (dom.hasClass(node, name))
		{
				return;
		}
		node.className += (node.className.length === 0 ? '' : ' ') + name;
};

// 移除指定 className 名
dom.removeClass = function (node, name)
{
		var	className = ' ' + node.className + ' ', 
				name = ' ' + name + ' ', 
				index = className.indexOf(name);
		
		if (index === -1)
		{
				return;
		}
		
		node.className = className.slice(1, index) + 
			(className.length - name.length === index ? '' : ' ') + 
			className.slice(index + name.length, -1);
};

// 判断父节是否包含指定子节点
if (document.documentElement.contains)
{
		dom.contains = function (child, parent)
		{
				return parent.contains(child) && parent !== child;
		}
}
else
{
		dom.contains = function (child, parent)
		{
				return child.compareDocumentPosition(parent) & 8 === 8;
		}
}

// 绑定事件
if (document.documentElement.attachEvent)
{
		dom.addEvent = function (node, type, cb)
		{
				node.attachEvent('on' + type, cb);
		}
}
else
{
		dom.addEvent = function (node, type, cb)
		{
				node.addEventListener(type, cb, false);
		}
}

// 移除事件
if (document.documentElement.detachEvent)
{
		dom.removeEvent = function (node, type, cb)
		{
				node.detachEvent('on' + type, cb);
		}
}
else
{
		dom.removeEvent = function (node, type, cb)
		{
				node.removeEventListener(type, cb, false)
		}
}

// 触发事件
if (document.createEvent)
{
		dom.fireEvent = function (node, type)
		{
				var evt = document.createEvent('HTMLEvents');
				evt.initEvent(type, true, true);
				return !node.dispatchEvent(evt);
		}
}
else
{
		dom.fireEvent = function (node, type)
		{
				var evt = document.createEventObject();
				return node.fireEvent('on' + type, evt)
		}
}

// 阻止默认事件
if (sweet.browser.isIE && sweet.browser.version < 9)
{
		dom.preventDefault = function (event)
		{
				event.returnValue = false;
		}
}
else
{
		dom.preventDefault = function (event)
		{
				event.preventDefault();
		}
}

// 阻止事件传播
if (sweet.browser.isIE && sweet.browser.version < 9)
{
		dom.stopPropagation = function (event)
		{
				event.cancelBubble = true;
		}
}
else
{
		dom.stopPropagation = function (event)
		{
				event.stopPropagation();
		}
}

// 停止事件
dom.stopEvent = function (event)
{
		dom.stopPropagation(event);
		dom.preventDefault(event);
};

// 设置叠层样式
if (sweet.browser.isIE && sweet.browser.version < 9)
{
		dom.setStyle = function (node, key, val)
		{
				if ('float' == key)
				{
						key = 'styleFloat';
				}
				else if ('opacity' == key)
				{
						key = 'filter';
						val = 'alpha(opacity=' + (val * 100) + ')';
				}
				else if (key.indexOf('-') > -1)
				{
						key = key.replace(/-(.)/g, function ($1, $2){return $2.toUpperCase()});
				}
				node.style[key] = val;
		}
}
else
{
		dom.setStyle = function (node, key, val)
		{
				if ('float' == key)
				{
						key = 'cssFloat';
				}
				node.style[key] = val;
		}
}

// 批量设置层叠样式
dom.setStyles = function (node, opt)
{
		for (var key in opt)
		{
				if (opt.hasOwnProperty(key))
				{
						dom.setStyle(node, key, opt[key]);
				}
		}
};

// 获得最终效果层叠样式值
if (document.defaultView)
{
		dom.getStyle = function (node, key)
		{
				return document.defaultView.getComputedStyle(node, null).getPropertyValue(key);
		}
}
else
{
		dom.getStyle = function (node, key)
		{
				if ('float' == key)
				{
						key = 'styleFloat';
				}
				else if ('opacity' == key)
				{
						key = 'filter';
				}
				else if (key.indexOf('-') > -1)
				{
						key = key.replace(/-(.)/g, function ($1, $2){return $2.toUpperCase()});
				}
				
				var val = node.currentStyle[key] || '';
				return 'number' == typeof val || val.indexOf('opacity') === -1 ? val : node.filters.alpha.opacity / 100;
		}
}

dom.getPageHeight = function ()
{
    var	body = document.body, html = document.documentElement;
    return Math.max(html.scrollHeight, body.scrollHeight, (document.compatMode == 'BackCompat' ? body : html).clientHeight);
};

dom.getPageWidth = function ()
{
    var body = document.body, html = document.documentElement;
    return Math.max(html.scrollWidth, body.scrollWidth, (document.compatMode == 'BackCompat' ? body : html).clientWidth);
};

dom.getScrollTop = function ()
{
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
};

dom.getScrollLeft = function ()
{
    return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
};

dom.getViewHeight = function ()
{
    return (document.compatMode == 'BackCompat' ? document.body : document.documentElement).clientHeight;
};

dom.getViewWidth = function ()
{
    return (document.compatMode == 'BackCompat' ? document.body : document.documentElement).clientWidth;
};

// 获得元素位置
dom.getElementPosition = function (node)
{
		var x = 0, y = 0;
		do {
				y += node.offsetTop || 0;
				x += node.offsetLeft || 0;
				node = node.offsetParent;
		} while (node);
		return {left: x, top: y};
};

// 获得图片尺寸
dom.getImageSize = function (node)
{
		var image = new Image;
		image.setAttribute('src', node.getAttribute('src'));
		return {width: image.width, height: image.height};
};

// 动态添加 style 节点
dom.insertCss = function (text)
{
		var	node = document.createElement('style');
		node.setAttribute('type','text/css');
		node.setAttribute('rel','stylesheet');
		
		if (node.styleSheet)
		{
				node.styleSheet.cssText = text;
		}
		else
		{
				node.appendChild(document.createTextNode(text));
		}
		
		document.documentElement.firstChild.appendChild(node);
};

// 动态添加 script 节点
dom.insertJs = function (text)
{
		var	node = document.createElement('script');
		node.setAttribute('type', 'text/javascript');
		node.text = text;
		document.documentElement.firstChild.appendChild(node);
};

if (sweet.browser.isIE < sweet.browser.version < 9)
{
		dom.removeNode = function (node)
		{
				var root = sweet.dom.removeNode.keepNode;
				root.appendChild(node);
				root.innerHTML = '';
		}
		
		dom.removeNode.keepNode = document.createElement('div');
}
else
{
		dom.removeNode = function (node)
		{
				var paren = node.parentNode;
				node.innerHTML = '';
				paren.removeChild(node);
		}
}

})();
// dom module end

// hook module begin
;(function (){
if (!window.sweet) return;

function hook ()
{
		var	dom = sweet.dom;
		
		dom.addEvent(document.documentElement, 'click', this.emit.bind(this, 'click'));
		dom.addEvent(document, 'dblclick', this.emit.bind(this, 'dblclick'));
		
		dom.addEvent(document, 'mouseover', this.emit.bind(this, 'mouseover'));
		dom.addEvent(document, 'mouseout', this.emit.bind(this, 'mouseout'));
		dom.addEvent(document, 'mousedown', this.emit.bind(this, 'mousedown'));
		dom.addEvent(document, 'mouseup', this.emit.bind(this, 'mouseup'));
		dom.addEvent(document, 'mousemove', this.emit.bind(this, 'mousemove'));
		
		dom.addEvent(document, 'contextmenu', this.emit.bind(this, 'contextmenu'));
		
		dom.addEvent(document, 'keydown', this.emit.bind(this, 'keydown'));
		
		dom.addEvent(window, 'resize', windowResize());
		// dom.addEvent(window, 'resize', delay.bind({}, this, 'resize'));
}

sweet.util.inherits(hook, sweet.events);

/*
function delay (hook, type)
{
		var self = this;
		if (self.timer) return;
		self.timer = setTimeout(function ()
		{
				hook.emit(type);
				clearTimeout(self.timer);
				delete self.timer;
		}, 33);
}
*/

sweet.hook = new hook;

function windowResize ()
{
		var count = 0, mark = 0, times = 0, timer = null;
		
		function execute ()
		{
				// 假设 mark 等于 count 的话
				if (mark === count)
				{
						// 次数 +1
						times++;
				}
				// 假设 count 不断变化，那么将 mark 不断调整，并把次数设置为 0
				else
				{
						times = 0;
						mark = count;
				}
				
				// 假设 次数 等于 3 的时候，也就是 300 毫秒内没有调整窗口
				// 那么证明窗口调整结束了
				if (times === 3)
				{
						clearInterval(timer);
						sweet.hook.emit('resize');
						mark = 0;
						count = 0;
						times = 0;
						timer = null;
				}
		}
		
		return function ()
		{
				count++;
				
				if (timer === null)
				{
						// 每 100 毫秒执行一次
						timer = setInterval(execute, 100);
				}
		}
}

sweet.hook.on('click', new Function('e', '\
var n = e.target || e.srcElement;\
if (n.parentNode.nodeName === "A")\
{\
		n = n.parentNode;\
}\
if (n.nodeType === 1 && n.nodeName === "A")\
{\
		var href = n.href, index = href.indexOf("#");\
		if (index > 0 && href.length - index == 1)\
		{\
				sweet.dom.preventDefault(e);\
		}\
}'));

})();
// hook module end

// common module begin
;(function () {
if (!window.sweet) return;

var common = sweet.common = {};

common.setCenter = function (node)
{
		if (this._currentAnimateStart)
		{
				return;
		}
		
		this._currentAnimateStart = 1;
		
		var	dom = sweet.dom, animate = new sweet.animate;
		animate.addElement(node, 
		[
			{from: parseInt(node.style.top) | 0, to: dom.getScrollTop() + (dom.getViewHeight() - node.offsetHeight) / 2, callback: 'node.style.top=now+"px"'}, 
			{from: parseInt(node.style.left) | 0, to: dom.getScrollLeft() + (dom.getViewWidth() - node.offsetWidth) / 2, callback: 'node.style.left=now+"px"'}
		]);
		animate.on('end', new Function ('delete this._currentAnimateStart').bind(this));
		animate.start();
};

common.setHidden = function ()
{
		var	style = document.documentElement.style, 
				overflowX = style.overflowX != 'hidden', 
				overflowY = style.overflowY != 'hidden', 
				isHidden = overflowX && overflowY;
		
		if (isHidden)
		{
				document.documentElement.style.overflow = 'hidden';
		}
		
		return isHidden;
};

common.removeHidden = function ()
{
		document.documentElement.style.overflow = 'auto';
};

common.setCover = function ()
{
		this._coverNode = document.createElement('div');
		document.body.appendChild(this._coverNode);
		this._coverNode.className = 'sweetGlobalCover';
		this.changeCover();
};

common.changeCover = function ()
{
		var dom = sweet.dom;
		
		dom.setStyles(this._coverNode, 
		{
				width: dom.getPageWidth() + 'px', 
				height: dom.getPageHeight() + 'px'
		});
};

common.removeCover = function ()
{
		sweet.dom.removeNode(this._coverNode);
		delete this._coverNode;
};

common.clearFormValue = function (form)
{
		if ('object' != typeof form || !form.elements)
		{
				throw new Error(form + ' not a html form element');
		}
		
		var nodes = form.elements, i = 0, j= nodes.length, item, type;
		
		for (; i < j; i++)
		{
				item = nodes[i];
				type = item.type;
				
				if ('textarea' == type || 'text' == type || 'password' == type || 'hidden' == type)
				{
						item.value = '';
				}
		}
};

})();
// common module end

// function module begin
;(function () {
if (!window.sweet) return;

var func = sweet.func = {};

func.strlen = function (text, charset)
{
		charset = charset.toUpperCase();
		
		var	step = ('UTF-8' === charset || 'UTF8' === charset) ? 3 : 'GBK' === charset ? 2 : 1, 
				i = 0, j = text.length, n = 0;
		
		while (i < j)
		{
				if (text.charCodeAt(i++) > 0xFF)
				{
						n += step;
				}
				else
				{
						n++;
				}
		}
		
		return n;
};

})();
// function module end