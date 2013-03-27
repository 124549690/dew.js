/*----------------------------------------------------------------------------*/
/*                                                                            */
/* 作者: 刘昭辉(liuzhaohui)                                                   */
/* QQ号: 50081449                                                             */
/* QQ群: 30715306                                                             */
/* 邮件: hi.liuzhaoxin@gmail.com                                              */
/*                                                                            */
/* 警告: 请尊重原作者的劳动成果，改版或再次发行请保留原作者名和联系方式       */
/*                                                                            */
/*----------------------------------------------------------------------------*/
var Elib={
///////////////////////////////////////////////////////////////
browserType:'unknown',
charSet:'',
///////////////////////////////////////////////////////////////
// element begin
///////////////////////////////////////////////////////////////
// $(id)
$:function(str)
{
		return (typeof(str)=='string')?document.getElementById(str):(typeof(str)=='object')?str:false;
},
// $$('class name1,class name2,...','id OR object')
$$:function(str,obj)
{
		if(typeof(str)!='string')
		{
				alert('$$: 参数错误...');
				return false;
		}
		if(typeof(obj)=='undefined'||obj==null)
		{
				obj=document.body;
		}
		else if(typeof(obj)=='string')
		{
				obj=this.$(obj);
		}
		else if(typeof(obj)=='object')
		{
				obj=obj;
		}
		else
		{
				alert('$$: 参数错误...');
				return false;
		}
		var objectList,i,j,array=[],result=[];
		array=this.replace(str,' ','').split(',');
		objectList=obj.getElementsByTagName('*');
		for(i in objectList)
		{
				for(j in array)
				{
						if(objectList[i].className==array[j])
						{
								result.push(objectList[i]);
						}
				}
		}
		return result;
},
// $$$('li','id OR object')
$$$:function(str,obj)
{
		if(typeof(str)!='string')
		{
				alert('$$$: 参数错误...');
				return false;
		}
		if(typeof(obj)=='undefined'||obj==null)
		{
				obj=document.body;
		}
		else if(typeof(obj)=='string')
		{
				obj=this.$(obj);
		}
		else if(typeof(obj)=='object')
		{
				obj=obj;
		}
		else
		{
				alert('$$$: 参数错误...');
				return false;
		}
		return obj.getElementsByTagName(str);
},
// getElement(eve)
getElement:function(eve)
{
		eve=window.event||eve;
		return (this.browserType=='MSIE')?eve.srcElement:evt.currentTarget;
},
// getTargetElement(eve)
getTargetElement:function(eve)
{
		eve=window.event||eve;
		return (this.browserType=='MSIE')?eve.srcElement:evt.target;
},
// delNodes(obj)
delNodes:function(obj,bool)
{
		obj=this.$(obj);
		bool=(typeof(bool)=='undefined')?true:false;
		var objList=obj.getElementsByTagName('*');
		var objListLen=objList.length-1;
		while(objListLen-->0)
		{
				(objList[objListLen]).parentNode.removeChild(objList[objListLen]);
		}
		if(bool)
		{
				obj.parentNode.removeChild(obj);
		}
},
// addEvent(obj,'mousedown',function(){fun(obj)})
addEvent:function(obj,eve,func)
{
		obj=this.$(obj);
		this.browserType=='MSIE'?obj.attachEvent('on'+eve,func):obj.addEventListener(eve,func,false);
},
// delEvent(obj,'mousedown',function(){fun(obj)})
delEvent:function(obj,eve,func)
{
		obj=this.$(obj);
		this.browserType=='MSIE'?obj.detachEvent('on'+eve,func):obj.removeEventListener(eve,func,false);
},
// stopBubble(eve)
stopBubble:function(eve)
{
		eve=window.event||eve;
		(this.browserType=='MSIE')?eve.cancelBubble=true:eve.stopPropagation();
},
// stopDefault(eve)
stopDefault:function(eve)
{
		eve=window.event||eve;
		(this.browserType=='MSIE')?eve.returnValue=false:eve.preventDefault();
},
// loadJS('url',function)
loadJS:function(href,func)
{
		var script=document.createElement('script'),self=this;
		script.setAttribute('type','text/javascript');
		script.setAttribute('charset',this.charSet);
		script.setAttribute('src',href);
		this.addEvent(script,'load',status);
		this.addEvent(script,'readystatechange',status);
		function status()
		{
				if(!script.readyState||script.readyState=='loaded'||script.readyState=='complete')
				{
						if(func!=null&&func.constructor==Function)
						{
								func();
						}
						self.delEvent(script,'load',status);
						self.delEvent(script,'readystatechange',status);
						script.parentNode.removeChild(script);
				}
		}
		document.body.appendChild(script);
},
// addJS('alert('test')');
addJS:function(str)
{
		var script=document.createElement('script');
		script.setAttribute('type','text/javascript');
		script.setAttribute('charset',this.charSet);
		script.text=str;
		document.body.appendChild(script);
},
// addCSS('div{font-size:28px;color:pink;}')
addCSS:function(str)
{
		if(typeof(str)!='string')
		{
				alert('addStyle: 参数错误...');
				return false;
		}
		var i,elem,doc=document.documentElement.firstChild,child=doc.childNodes;
		for(i in child)
		{
				if(child[i].nodeType==1)
				{
						if(child[i].nodeName=='STYLE')
						{
								elem=child[i];
								break;
						}
				}
		}
		if(typeof(elem)=='undefined')
		{
				var style=document.createElement('style');
				style.setAttribute('type','text/css');
				style.setAttribute('charset',this.charSet);
				if(this.browserType=='MSIE')
				{
						style.styleSheet.cssText=str;
				}
				else
				{
						style.appendChild(document.createTextNode(str));
				}
				doc.appendChild(style);
		}
		else
		{
				if(this.browserType=='MSIE')
				{
						elem.styleSheet.cssText+=str;
				}
				else
				{
						elem.innerHTML+=str;
				}
		}
},
// where: 插入位置。包括 beforeBegin, beforeEnd, afterBegin, afterEnd。
// el: 用于参照插入位置的 html 元素对象。
// html: 要插入的 html 代码。
insertHtml:function(where,el,html)
{
		where = where.toLowerCase();
		if(el.insertAdjacentHTML)
		{
		    switch(where)
		    {
						case 'beforebegin':
						{
								el.insertAdjacentHTML('BeforeBegin', html);
								return el.previousSibling;
						}
						case 'afterbegin':
						{
								el.insertAdjacentHTML('AfterBegin', html);
								return el.firstChild;
						}
						case 'beforeend':
						{
								el.insertAdjacentHTML('BeforeEnd', html);
								return el.lastChild;
						}
						case 'afterend':
						{
								el.insertAdjacentHTML('AfterEnd', html);
								return el.nextSibling;
						}
		    }
		    throw 'Illegal insertion point -> "' + where + '"';
		}
		var range = el.ownerDocument.createRange();
		var frag;
		switch(where)
		{
		    case 'beforebegin':
		    {
						range.setStartBefore(el);
						frag = range.createContextualFragment(html);
						el.parentNode.insertBefore(frag, el);
						return el.previousSibling;
				}
		    case 'afterbegin':
		    {
						if(el.firstChild)
						{
								range.setStartBefore(el.firstChild);
								frag = range.createContextualFragment(html);
								el.insertBefore(frag, el.firstChild);
								return el.firstChild;
						}
						else
						{
								el.innerHTML = html;
								return el.firstChild;
						}
		    }
				case 'beforeend':
				{
						if(el.lastChild)
						{
								range.setStartAfter(el.lastChild);
								frag = range.createContextualFragment(html);
								el.appendChild(frag);
								return el.lastChild;
						}
						else
						{
								el.innerHTML = html;
								return el.lastChild;
						}
				}
				case 'afterend':
				{
						range.setStartAfter(el);
						frag = range.createContextualFragment(html);
						el.parentNode.insertBefore(frag, el.nextSibling);
						return el.nextSibling;
				}
		}
		throw 'Illegal insertion point -> "' + where + '"';
},
///////////////////////////////////////////////////////////////
// element end
///////////////////////////////////////////////////////////////
// style begin
///////////////////////////////////////////////////////////////
// currentStyle('test','font-size')
currentStyle:function(obj,name)
{
		if(typeof(obj)=='undefined'||obj==null||typeof(name)!='string')
		{
				alert('currentStyle: 参数错误...');
				return false;
		}
		obj=this.$(obj);
		var tmpStr='';
		if(this.browserType=='MSIE')
		{
				for(var i=0;i<name.length;i++)
				{
						if(name.charAt(i)=='-')
						{
								tmpStr+=String.fromCharCode(name.charCodeAt(++i)-32);
								continue;
						}
						tmpStr+=name.charAt(i);
				}
				return obj.currentStyle[tmpStr];
		}
		else
		{
				return document.defaultView.getComputedStyle(obj,null).getPropertyValue(name);
		}
},
// changeStyle('test','font-size:26px;color:pink;')
changeStyle:function(id,style)
{
		if(typeof(id)=='undefined'||id==null||typeof(style)!='string')
		{
				alert('changeStyle: 参数错误...');
				return false;
		}
		id=this.$(id);
		var i,j,array=[],key='',tmpStr='';
		if(this.browserType=='MSIE')
		{
				key='styleFloat';
		}
		else
		{
				key='cssFloat';
		}
		array=style.split(';');
    for(i in array)
    {
				if(array[i]=='')
				{
						continue;
				}
				tmpStr='';
				array[i]=array[i].split(':');
				for(j=0;j<array[i][0].length;j++)
				{
						if(array[i][0].charAt(j)==' ')
						{
								continue;
						}
						else if(array[i][0].charAt(j)=='-')
						{
								tmpStr+=String.fromCharCode(array[i][0].charCodeAt(++j)-32);
								continue;
						}
		    tmpStr+=array[i][0].charAt(j);
				}
				if(tmpStr=='float')
				{
						id.style[key]=array[i][1];
				}
				else
				{
						id.style[tmpStr]=array[i][1];
				}
		}
},
// addClass(obj,'name1 name2')
addClass:function(obj,classname)
{
		obj=this.$(obj);
		obj.className=this.space(obj.className+' '+classname);
},
// delClass(obj,'name1 name2')
delClass:function(obj,classname)
{
		obj=this.$(obj);
		var i,str=obj.className,arr=classname.split(' ');
		for(i in arr)
		{
				if(arr[i]=='')
				{
						continue;
				}
				else
				{
						str=str.replace(arr[i],'');
				}
		}
		obj.className=this.space(str);
},
// opacity(obj,80)
opacity:function(obj,deg)
{
		if(this.browserType=='MSIE')
		{
				this.$(obj).style.filter='alpha(opacity:'+(deg>1?deg:deg*100)+')';
		}
		else
		{
				this.$(obj).style.opacity=(deg>1?deg/100:deg);
		}
},
// fadeIn(elem, speed, opacity)
fadeIn:function(elem,speed,opacity)
{
		var count=0,self=this;
		elem=this.$(elem);
		speed=(typeof(speed)=='undefined')?20:speed;
		opacity=(typeof(opacity)=='undefined')?100:opacity;
		if(this.browserType!='MSIE')
		{
				speed+=30;
		}
		if(this.browserType=='MSIE')
		{
				count=30;
		}
		(function()
		{
				self.opacity(elem,count);
				count+=20;
				if(count<=opacity)
				{
						setTimeout(arguments.callee,speed);
				}
		})();
},
// fadeOut(elem, speed, opacity)
fadeOut:function(elem,speed,opacity)
{
		var count=100,self=this;
		elem=this.$(elem);
		speed=speed||20;
		opacity=opacity||0;
		(function()
		{
				self.opacity(elem,count);
				count-=10;
				if(count>=opacity)
				{
						setTimeout(arguments.callee,speed);
				}
		})();
},
// center(obj)
center:function(obj)
{
		obj=this.$(obj);
		var height=((document.documentElement.clientHeight-obj.clientHeight)>>1)+
				(this.browserType=='MSIE'?document.documentElement.scrollTop:window.scrollY);
		var width=((document.documentElement.clientWidth-obj.clientWidth+(this.browserType=='MSIE'?-23:0))>>1)+
				(this.browserType=='MSIE'?document.documentElement.scrollLeft:window.scrollX);
		this.changeStyle(obj,'left:'+parseInt(width<0?0:width)+'px');
		this.changeStyle(obj,'top:'+parseInt(height<0?0:height)+'px');
},
// cover(ID,opacity)
cover:function(opacity,ID)
{
		var cover=document.createElement('div');
		cover.className='ezx_cover';
		ID=(typeof(ID)=='undefined')?('ezx'+this.rand('a-z,A-Z',7)):ID;
		cover.id=ID;
		this.changeStyle(cover,'height:'+((document.body.clientHeight<document.documentElement.clientHeight)?
		document.documentElement.clientHeight:document.body.clientHeight)+'px;width:'+((document.body.clientWidth<document.documentElement.clientWidth)?
		document.documentElement.clientWidth:document.body.clientWidth)+'px;z-index:'+this.zindex('DIV','ezx_cover',99)+';background:none gray;overflow:hidden;position:absolute;top:0px;left:0px;');
		this.opacity(cover,((typeof(opacity)=='undefined')?10:opacity));
		document.body.appendChild(cover);
		return ID;
},
///////////////////////////////////////////////////////////////
// style end
///////////////////////////////////////////////////////////////
// function begin
///////////////////////////////////////////////////////////////
// print('liuzhaoxin')
print:function(str)
{
		document.writeln(str+'<br />');
},
// var obj={a:1,b:'lzx',c:/ezx/g,d:function(){},e:{},f:[1,'a'],g:null,h:true,i:new Date()}
// print_r(obj,'obj')
print_r:function(obj,markName,bool)
{
		obj=(obj==null)?false:this.$(obj);
		markName=(typeof(markName)=='undefined')?'':markName+'.';
		bool=(typeof(bool)=='undefined')?false:true;
		if(!obj)
		{
				alert('print_r: 参数错误...');
				return false;
		}
		this.addCSS('.js_bug{font-family:宋体,gulim,Arial;font-size:12px;line-height:16px;margin-bottom:12px;margin-top:12px;}'+
		'.js_key{color:#4A0039;}.js_number{color:#FF0000;}.js_string{color:#33FF00;}.js_boolean{color:#FF7900;}'+
		'.js_object{color:#9999FF;}.js_function{color:#0000CC;}.js_undefined{color:#FF00FF;}.js_length{color:#FF4C4C;}'+
		'.js_array{color:#33CCFF;}.js_date{color:#674D2E;}.js_regexp{color:#FF33CC;}.js_null{color:#7D4610;}.js_unknown{color:#4A4600;}');
		var i,str='';
		for(i in obj)
		{
				str+='<div class="js_bug">'+markName+i;
				try
				{
						if(obj[i]==null)
						{
								str+='<span class="js_key"> => </span><span class="js_null">null</span>';
						}
						else if(typeof(obj[i])=='undefined')
						{
								str+='<span class="js_key"> => </span><span class="js_undefined">undefined</span>';
						}
						else if(obj[i].constructor==Number)
						{
								str+='<span class="js_key"> => </span><span class="js_number">'+obj[i]+'</span> Number';
						}
						else if(obj[i].constructor==String)
						{
								str+='<span class="js_key"> => </span><span class="js_string">'+obj[i]+'</span><span> String </span><em class="js_length">(length='
								+obj[i].length+')</em>';
						}
						else if(obj[i].constructor==Boolean)
						{
								str+='<span class="js_key"> => </span><span class="js_boolean">'+obj[i]+'</span> Boolean';
						}
						else if(obj[i].constructor==Function)
						{
								str+='<span class="js_key"> => </span><span class="js_function">Function</span>';
						}
						else if(obj[i].constructor==Array)
						{
								str+='<span class="js_key"> => </span><span class="js_array">'+obj[i]+'</span><span> Array </span><em class="js_length">(length='
								+obj[i].length+')</em>';
						}
						else if(obj[i].constructor==Date)
						{
								str+='<span class="js_key"> => </span><span class="js_date">Date</span>';
						}
						else if(obj[i].constructor==RegExp)
						{
								str+='<span class="js_key"> => </span><span class="js_regexp">RegExp</span>';
						}
						else if(obj[i].constructor==Object||typeof(obj[i])=='object')
						{
								str+='<span class="js_key"> => </span><span class="js_object">Object</span>';
						}
						else
						{
								str+='<span class="js_key"> => </span><span class="js_unknown">Unknown</span>';
						}
				}catch(e){}
				str+='</div>';
		}
		if(bool)
		{
				return str;
		}
		else
		{
				this.print(str);
		}
},
// f.replace('liuzhaoxin','zhaoxin','xin',1)
replace:function(str,find,replace,count)
{
		if(typeof(str)=='undefined'||typeof(find)=='undefined'||typeof(replace)=='undefined')
		{
				alert('replace: 参数错误...');
				return false;
		}
		count=(typeof(count)=='undefined')?str.length:count;
		var i,j,tmpStr='';
		for(i=0;i<str.length;i++)
		{
				if(str.charAt(i)==find.charAt(0)&&count>0)
				{
						if(str.length-i>=find.length)
						{
								for(j=0;j<find.length;j++)
								{
										if(str.charAt(i+j)!=find.charAt(j))
										{
												break;
										}
								}
								if(j--==find.length)
								{
										tmpStr+=replace;
										i+=j;
										count--;
										continue;
								}
						}
				}
				tmpStr+=str.charAt(i);
		}
		return tmpStr;
},
// rand('a-z,A-Z,0-9',5)
// rand(8,68)
rand:function(var1,var2)
{
		if(typeof(var1)=='number'&&typeof(var2)=='number')
		{
				return Math.floor(Math.random()*((var2-=var1)+1))+var1;
		}
		else if(typeof(var1)=='string'&&typeof(var2)=='number')
		{
				var i,j,k,tmpStr1='',tmpStr2='',array=[];
				array=var1.split(',');
				for(i=0;i<array.length;i++)
				{
						array[i]=array[i].split('-');
				}
				for(i in array)
				{
						j=array[i][0].charCodeAt();
						k=array[i][1].charCodeAt()+1;
						while(j<k)
						{
								tmpStr1+=String.fromCharCode(j++);
						}
				}
				while(var2--)
				{
						tmpStr2+=tmpStr1.charAt(Math.floor(Math.random()*tmpStr1.length));
				}
				return tmpStr2;
		}
		else
		{
				alert('rand: 参数错误...');
				return false;
		}
},
// trim('  abc  ')
trim:function(str)
{
		if(str==null||str.constructor!=String)
		{
				alert('trim: 参数错误...');
				return false;
		}
		var i=0,j=str.length-1,k=0,tmpNum1=0,tmpNum2=0,left=false,right=false,filter=[0,9,10,11,13,32,12288];
		while(j>i)
		{
				tmpNum1=str.charCodeAt(i);
				tmpNum2=str.charCodeAt(j);
				for(k=0;k<filter.length;k++)
				{
						if(left==false&&tmpNum1==filter[k])
						{
								left=true;
						}
						if(right==false&&tmpNum2==filter[k])
						{
								right=true;
						}
				}
				if(left==false&&right==false)
				{
						break;
				}
				if(left)
				{
						i++;
						left=false;	
				}
				if(right)
				{
						j--;
						right=false;
				}
		}
		return str.slice(i,++j);
},
// strlen('测试abc','UTF8|GBK')
strlen:function(str,type)
{
		var len=(type=='UTF8')?3:(type=='GBK')?2:1;
		var i=0,j=str.length,k=0;
		while(i<j)
		{
				if(str.charCodeAt(i++)>0xFF)
				{
						k+=len;
				}
				else
				{
						k++;
				}
		}
		return k;
},
// json_encode(obj)
json_encode:function(obj)
{
		var i,j;
		if (!obj)
		{
				return 'null';
		}
		switch (obj.constructor)
		{
			case String:
			{
					return '"'+obj+'"';
			}
			case Number:
			{
					return obj.toString();
			}
			case Boolean:
			{
					return obj.toString();
			}
			case Array:
			{
					var arr=[];
					for(i in obj)	
					{
							arr.push(this.json_encode(obj[i]));
					}
					return '['+arr.join(',')+']';
			}
			case Object:
			{
					var arr=[];
					for(j in obj)
					{
							arr.push('"'+j+'"'+':'+this.json_encode(obj[j]));
					}
					return '{'+arr.join(',')+'}';
			}
			default:	return 'null';
		}
},
// json_decode(obj)
json_decode:function(obj)
{
		return eval('('+obj+')');
},
// hexdec(str)
hexdec:function(str)
{
		var x1,x2,x3,tmpStr='';
		for(var i=0;i<str.length;i+=2)
		{
				x1=str.charCodeAt(i);
				x1=(x1>47&&x1<58)?x1-48:x1-97+10;
				x1=x1<<4&0xf0;
				x2=str.charCodeAt(i+1);
				x2=(x2>47&&x2<58)?x2-48:x2-97+10;
				x2&=0x0f;
				x3=x1|x2;
				tmpStr+=String.fromCharCode(x3);
		}
		return tmpStr;
},
// dechex(str)
dechex:function(str)
{
		var i,hex='0123456789ABCDEF',string='';
		for(i=0;i<str.length;i++)
		{
				string+=hex.charAt(str.charCodeAt(i)>>4)+hex.charAt(str.charCodeAt(i)&15);
		}
		return string;
},
// utf16to8(str)
utf16to8:function(str)
{
		var i,c1,c2,tmpStr='';
		for(i=0;i<str.length;i++)
		{
				c1=str.charCodeAt(i);
				if(c1<0x80)
				{
						tmpStr+=str.charAt(i);
				}
				else if(c1<0x800)
				{
						tmpStr+=String.fromCharCode(0xc0|c1>>>6,0x80|c1&0x3f);
				}
				else if(c1<0xd800||c1>0xdfff)
				{
						tmpStr+=String.fromCharCode(0xe0|c1>>>12,0x80|c1>>>6&0x3f,0x80|c1&0x3f);
				}
				else
				{
						if(++i<str.length)
						{
								c2=str.charCodeAt(i);
								if(c1<0xDC00&&0xDC00<=c2&&c2<0xE000)
								{
										c1=((c1&0x03ff)<<10|(c2&0x03ff))+0x010000;
										if(0x010000<=c1&&c1<0x110000)
										{
												tmpStr+=String.fromCharCode(0xf0|c1>>>18&0x3f,0x80|c1>>>12&0x3f,0x80|c1>>>6&0x3f,0x80|c1&0x3f);
										}
										else
										{
												tmpStr+='?';
										}
								}
								else{i--;tmpStr+='?';}
						}
						else{i--;tmpStr+='?';}
				}
		}
		return tmpStr;
},
// utf8to16(str)
utf8to16:function(str)
{
		var i,c1,c2,c3,c4,c5,tmpStr='';
		for(i=0;i<str.length;i++)
		{
				c1=str.charCodeAt(i);
				switch(c1>>4)
				{
						// 0xxx xxxx
						case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
						{
								tmpStr+=str.charAt(i);
								break;
						}
						// 110x xxxx 10xx xxxx
						case 12:case 13:
						{
								c2=str.charCodeAt(++i);
								tmpStr+=String.fromCharCode((c1&0x1f)<<6|c2&0x3f);
								break;
						}
						// 1110 xxxx 10xx xxxx 10xx xxxx
						case 14:
						{
								c2=str.charCodeAt(++i);
								c3=str.charCodeAt(++i);
								tmpStr+=String.fromCharCode((c1&0x0f)<<12|(c2&0x3f)<<6|c3&0x3f);
								break;
						}
						case 15:
						{
								switch(c1&0xf)
								{
										// 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx
										case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
										{
												c2=tmpStr.charCodeAt(++i);
												c3=tmpStr.charCodeAt(++i);
												c4=tmpStr.charCodeAt(++i);
												c5=(c1&0x07)<<18|(c2&0x3f)<<12|(c3&0x3f)<<6|(c4&0x3f)-0x10000;
												if(0<=c5&&c5<0x100000)
												{
														tmpStr+=String.fromCharCode((c5>>>10)&0x03ff|0xd800,c5&0x03ff|0xdc00);
												}
												else
												{
														tmpStr+='?';
												}
												break;
										}
										// 1111 10xx 10xx xxxx 10xx xxxx 10xx xxxx 10xx xxxx
										case 8: case 9: case 10: case 11:
										{
												i+=5;
												tmpStr+='?';
												break;
										}
										// 1111 110x 10xx xxxx 10xx xxxx 10xx xxxx 10xx xxxx 10xx xxxx
										case 12: case 13:
										{
												i+=6;
												tmpStr+='?';
												break;
										}
								}
						}
				}
		}
		return tmpStr;
},
// getCookie('lzx');
getCookie:function(name)
{
		var i,cookie=[];
		cookie=this.replace(document.cookie,' ','').split(';');
		for(i in cookie)
		{
				cookie[i]=cookie[i].split('=');
				if(cookie[i][0]==name)
				{
						return decodeURIComponent(cookie[i][1]);
				}
		}
		return false;
},
// delCookie('lzx');
delCookie:function(name)
{
		var expire=new Date();
		expire.setTime(expire.getTime()-1);
		if(this.getCookie(name)==false)
		{
				return false;
		}
		else
		{
				document.cookie=name+'=;expires='+expire.toUTCString();
				return true;
		}
},
// setCookie(名称,值,过期时间(秒),有效目录,指定网站,加密(false|true));
// setCookie('lzx','liuzhaoxin',3600,'/','127.0.0.1');
setCookie:function(name,value)
{
		var argv=arguments;
		var argc=arguments.length;
		if(typeof(name)!='string'||typeof(value)!='string')
		{
				alert('setCookie: 参数错误...');
				return false;
		}
		var expires	=	argc>2?argv[2]:false;
		var path		=	argc>3?argv[3]:false;
		var domain	=	argc>4?argv[4]:false;
		var secure	=	argc>5?true:false;
		if(expires!=false)
		{
				if(typeof(argv[2])=='number')
				{
						var expire=new Date();
						expire.setTime(expire.getTime()+argv[2]*1000);
				}
				else
				{
						alert('setCookie: 参数错误...');
						return false;
				}
		}
		document.cookie=
			name+'='+encodeURIComponent(value)+
			(expires==false?'':';expires='+expire.toUTCString())+
			(path		==false?'':';path='+path)+
			(domain	==false?'':';domain='+domain)+
			(secure	==false?'':';secure');
},
// pad(123, 6,'0') => 000123
pad:function(input,length,pad)
{
		pad=(typeof(pad)=='undefined')?'0':pad;
		var str=input.toString(),strLen=str.length;
		while(length>strLen++)
		{
				str=pad+str;
		}
		return str;

},
// pad2(123.123, 6,'0') => 000123.123
pad2:function(input,length,pad)
{
		pad=(typeof(pad)=='undefined')?'0':pad;
		var i=input,j=0,str=input.toString();
		while(i>0)
		{
				i=Math.floor(i/10),j++;
		}
		while(length>j++)
		{
				str=pad+str;
		}
		return str;
},
// var arr1=[6,5,1],arr2=[2,8,4],arr3=[9,7,3];
// max(arr1,arr2,arr3) => 9、max(arr1,arr2,arr3,12) => 12
max:function()
{
		var argv=arguments;
		var argc=arguments.length;
		var i,j,max=0;
		for(i=0;i<argc;i++)
		{
				if(argv[i].constructor==Array)
				{
						for(j=0;j<argv[i].length;j++)
						{
								if(argv[i][j]>max)
								{
										max=argv[i][j];
								}
						}
				}
				else
				{
						if(argv[i]>max)
						{
								max=argv[i];
						}
				}
		}
		return max;
},
// space(str)
space:function(str)
{
		var tmpStr='',i=0,j=0;
		while(i<str.length)
		{
				if(str.charCodeAt(i)==32)
				{
						j=0;
						while(j<str.length)
						{
								if(str.charCodeAt(i+j)==32)
								{
										j++;
										continue;
								}
								else
								{
										i+=j;
										tmpStr+=' ';
										break;
								}
						}
				}
				else
				{
						tmpStr+=str.charAt(i++);
				}
		}
		return this.trim(tmpStr);
},
// addslashes(str)
addslashes:function(str)
{
		var filter=[],replace=[],tmpStr='',i=0,j=0,bool=false;
		filter=[0,7,8,9,10,11,12,13,27,34,39,92];
		replace=['\\0','\\a','\\b','\\t','\\n','\\v','\\f','\\r','\\e','\\\"','\\\'','\\\\'];
		for(i=0;i<str.length;i++)
		{
				for(j=0;j<filter.length;j++)
				{
						if(str.charCodeAt(i)==filter[j])
						{
								tmpStr+=replace[j];
								bool=true;
								break;
						}
				}
				if(bool)
				{
						bool=false;
						continue;
				}
				else
				{
						tmpStr+=str.charAt(i);
				}
		}
		return tmpStr;
},
// bind()
bind:function()
{
		var argv=arguments;
		return function(){return (argv[1]).apply(argv[0]);}
},
// callback(oLi,function(o){Elib.addEvent(o,'mouseout',function(){li_onmouseout(o);});});
callback:function()
{
		var argv=arguments,i;
		for(i=0;i<argv[0].length;i++)
		{
				argv[1].call(this,argv[0][i]);
		}
},
// callbacks('参数','函数')
callbacks:function()
{
		var argv=arguments,i;
		var bak1='argv[1].apply(this,[argv[0][0][';
		var bak2=']';
		for(i=1;i<argv[1].length;i++)
		{
				bak2+=',argv[0]['+i+']';
		}
		bak2+='])';
		for(i=0;i<argv[0][0].length;i++)
		{
				eval(bak1+i+bak2);
		}
},
// cloneJSON(JSON)
cloneJSON:function(obj)
{
		var o={},i;
		for(i in obj)
		{
				o[i]=obj[i];
		}
		return o;
},
// strip_tags(str)
strip_tags:function(str)
{
		var i,j,tmpStr='';
		for(i=0;i<str.length;i++)
		{
				if(str.charAt(i)=='<')
				{
						for(j=0;j<str.length;j++)
						{
								if(str.charAt(i+j)=='>')
								{
										i+=j;
										break;
								}
						}
				}
				else
				{
						tmpStr+=str.charAt(i);
				}
		}
		return tmpStr;
},
///////////////////////////////////////////////////////////////
// function end
///////////////////////////////////////////////////////////////
// ... begin
///////////////////////////////////////////////////////////////
// imageWH(img)
imageWH:function(img)
{
		img=this.$(img);
		var image=new Image();
		image.src=img.src;
		return [image.width,image.height];
},
// zindex(tagName,className)
zindex:function(tagname,classname,def,deg)
{
		tagname=tagname.toUpperCase();
		deg=(typeof(deg)=='undefined')?2:deg;
		def=(typeof(def)=='undefined')?99:def;
		var nodes=document.body.childNodes,arr=[];
		for(i in nodes)
		{
				if(nodes[i]!=null&&nodes[i].nodeType==1)
				{
						if(nodes[i].nodeName==tagname&&nodes[i].className==classname)
						{
								arr.push(parseInt(this.currentStyle(nodes[i],'z-index')));
						}
				}
		}
		var zindex=this.max(arr);
    return zindex==0?def:zindex+deg;
},
// button(obj)
button:function(obj)
{
    obj=this.$(obj);
    var save=obj.getAttribute('style'),self=this;
    this.addEvent(obj,'mouseout',style);
    this.addEvent(obj,'mouseup',style);
    function style()
    {
        obj.removeAttribute('style');
        obj.setAttribute('style',save);
        self.delEvent(obj,'mouseout',style);
        self.delEvent(obj,'mouseup',style);
    }
		obj.style.backgroundImage='none';
		obj.style.backgroundColor='#D2D2D2';
},
// wordLimit(obj,countObj,showObj,'留个脚印...')
wordLimit:function(obj,countObj,showObj,text)
{
		var self=this;
		obj=this.$(obj);
		countObj=this.$(countObj);
		showObj=this.$(showObj);
		text=(typeof(text)=='string')?text:'';
		this.addEvent(obj,'focus',focus);
		this.addEvent(obj,'blur',blur);
		this.addEvent(obj,'keyup',limit);
		this.addEvent(obj,'keypress',limit);
		function focus()
		{
				if(obj.value==text)
				{
						obj.value='';
				}
		}
		function blur()
		{
				if(obj.value=='')
				{
						obj.value=text;
				}
				self.delEvent(obj,'focus',focus);
				self.delEvent(obj,'blur',blur);
				self.delEvent(obj,'keyup',limit);
				self.delEvent(obj,'keypress',limit);
		}
		function limit()
		{
				var wordLen=140-self.trim(obj.value).length;
				if(wordLen<0&&countObj.className.indexOf('Error')==-1)
				{
						showObj.innerHTML='已经超出<span id="'+countObj.id+'" class="countNumberError">'+Math.abs(wordLen)+'</span>字';
						return true;
				}
				else if(wordLen>0&&countObj.className.indexOf('Error')>-1)
				{
						showObj.innerHTML='还能输入<span id="'+countObj.id+'" class="countNumber">'+wordLen+'</span>字';
						return true;
				}
				if(wordLen>0)
				{
						countObj.innerHTML=wordLen;
				}
				else
				{
						countObj.innerHTML=Math.abs(wordLen);
				}
		}
},
// code(obj)
code:function(obj)
{
		obj=this.$(obj);
		
		var url = obj.getAttribute("src") + '?time='+new Date().getTime();
		
		Eajax.send(url, "GET", undefined, function (xmlhttp)
    {
				if(xmlhttp.readyState==4)
				{
            obj.innerHTML=xmlhttp.responseText;
				}
    });
},
// loading:function(obj)
loading:function(obj)
{
		obj=obj||document.body;
		var loadingID='ezx'+this.rand('a-z,A-Z',7);
		var loading=document.createElement('div');
		loading.className='loading';
		loading.id=loadingID;
		var loading_image=document.createElement('span');
		loading_image.className='loading_image';
		var loading_text=document.createElement('span');
		loading_text.className='loading_text';
		loading_text.innerHTML='loading...';
		loading.appendChild(loading_image);
		loading.appendChild(loading_text);
		obj.appendChild(loading);
		this.center(loading);
		return loadingID;
}
///////////////////////////////////////////////////////////////
// ... end
///////////////////////////////////////////////////////////////
}


///////////////////////////////////////////////////////////////
// DIV 模拟层 开始
///////////////////////////////////////////////////////////////
var Ebox={
// drag('box','title')
drag:function(box,title)
{
		box=Elib.$(box);
		title=Elib.$(title);
		Elib.center(box);
		if(window.resize)
		{
				var m=box.id;
				resize.method[m]=function(){Elib.center(box)};
		}
		else
		{
				window.onresize=function(){Elib.center(box)};
		}
		Elib.addEvent(title,'mousedown',mousedown);
		Elib.addEvent(title,'click',click);
		var mouseX,mouseY,winLeft,winTop,argv=arguments;
		function mousedown(eve)
		{
				var event=eve||window.event;
				winLeft=parseInt(Elib.currentStyle(box,'left'));
				winTop=parseInt(Elib.currentStyle(box,'top'));
				mouseX=event.clientX;
				mouseY=event.clientY;
				Elib.addEvent(document,'mousemove',mousemove);
				Elib.addEvent(document,'mouseup',mouseup);
				if(Elib.browserType=='MSIE')
				{
						//title.setCapture();
						Elib.addEvent(title,'selectstart',select);
				}
		}
		function mousemove(eve)
		{
				var event=eve||window.event;
				Elib.changeStyle(box,'left:'+(winLeft+event.clientX-mouseX)+'px;');
				Elib.changeStyle(box,'top:'+(winTop+event.clientY-mouseY)+'px;');
		}
		function mouseup()
		{
				Elib.delEvent(document,'mousemove',mousemove);
				Elib.delEvent(document,'mouseup',mousemove);
				if(Elib.browserType=='MSIE')
				{
						//title.releaseCapture();
						Elib.delEvent(title,'mousedown',select);
				}
		}
		function click(eve)
		{
				var src=eve.target||window.event.srcElement;
				if(src.className.indexOf('close')>-1)
				{
						Elib.delEvent(title,'click',click);
						Elib.delEvent(title,'mousedown',mousedown);
						if(typeof(argv[2])=='function')
						{
								argv[2]();
						}
						try
						{
								if(window.resize)
								{
										window.resize.remove(m);
								}
						}catch(e){}
						Elib.delNodes(box);
				}
		}
		function select()
		{
				return false;
		}
},
// confirm() 确认框
confirm:function()
{
		
},
// outError(错误内容,错误类型,样式)
outError:function(content,type)
{
		var status=(type==1)?'消息':(type==2)?'错误':'警告';
		
		var box_outerror=document.createElement('div');
		box_outerror.className='outerror';
		
		var box_content=document.createElement('div');
		
		var box_image=document.createElement('span');
		box_image.className=(type==1)?'outError_image1':(type==2)?'outError_image2':'outError_image3';
		
		var box_message=document.createElement('span');
		box_message.innerHTML=content;
		
		var box_buttonDiv=document.createElement('div');
		box_buttonDiv.className='button6';
		Elib.addEvent(box_buttonDiv,'mousedown',function(){Elib.button(box_buttonDiv);});
		
		var box_button=document.createElement('button');
		box_button.innerHTML='确定';
    
		box_buttonDiv.appendChild(box_button);
		
		box_content.appendChild(box_image);
		box_content.appendChild(box_message);
		
		box_outerror.appendChild(box_content);
		box_outerror.appendChild(box_buttonDiv);
		
		var ID=this.create(status,box_outerror);
		var boxID=ID[0];
		var coverID=ID[1];
		Elib.changeStyle(boxID,'width:320px;height:100px;');
		Elib.changeStyle(box_buttonDiv,'position:absolute;right:6px;bottom:6px;');
		Elib.addEvent(box_button,'click',function(){Elib.delNodes(coverID);Elib.delNodes(boxID);});
},
// _create('标题','插入内容','样式')
create:function (title,content,style)
{
		var boxID='ezx'+Elib.rand('a-z,A-Z',7);
		var titleID='ezx'+Elib.rand('a-z,A-Z',7);
		
		title=(typeof(title)=='undefined')?'信息':title;
		content=(typeof(content)=='undefined')?'':content;
		style=(typeof(style)=='undefined')?'':style;
		
		var box_main=document.createElement('div');
		box_main.id=boxID;
		box_main.className='box_main';
		Elib.changeStyle(box_main,'z-index:'+Elib.zindex('DIV','box_main',100));
		
		var box_title=document.createElement('div');
		box_title.className='box_title';
		box_title.id=titleID;
		
		var box_title_span=document.createElement('span');
		box_title_span.innerHTML=title;
		
		var box_title_a=document.createElement('a');
		box_title_a.className='box_close';
		box_title_a.href='javascript:void(0);';
		
		var box_content=document.createElement('div');
		box_content.className='box_content';
		if(typeof(content)=='string')
		{
				box_content.innerHTML=content;
		}
		else if(typeof(content)=='object')
		{
				box_content.appendChild(content);
		}
		
		box_title.appendChild(box_title_span);
		box_title.appendChild(box_title_a);
		
		box_main.appendChild(box_title);
		box_main.appendChild(box_content);
		
		document.body.appendChild(box_main);
		
		var coverID=Elib.cover();
		this.drag(boxID,titleID,function(){Elib.delNodes(coverID);});
		Elib.changeStyle(boxID,style);
		Elib.center(boxID);
		return [boxID,coverID];
}
}
///////////////////////////////////////////////////////////////
// DIV 模拟层 结束
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
// AJAX 开始
///////////////////////////////////////////////////////////////
var Eajax={
// send(URL,'GET|POST',VALUE(别名:name,..|rid=24))
send:function(url, method, data, callback)
{
		var xmlhttp=Elib.browserType=='MSIE'?new ActiveXObject('Microsoft.XMLHTTP'):new XMLHttpRequest();
		var argv=arguments;
		var i,str='';
		var arr=typeof(argv[2])=='undefined'?'':argv[2].split('|');
		if(typeof(argv[0])=='undefined'||typeof(argv[1])=='undefined')
		{
				alert('send: 参数错误1...');
				return false;
		}
		if(typeof(arr[0])!='undefined')
		{
				arr[0]=arr[0].split(',');
				for(i in arr[0])
				{
						arr[0][i]=arr[0][i].split(':');
						try
						{
								if(arr[0][i].length==2)
								{
										str+='&'+arr[0][i][1]+'='+encodeURIComponent(Elib.$(arr[0][i][0].toString()).value);
								}
								else
								{
										str+='&'+arr[0][i]+'='+encodeURIComponent(Elib.$(arr[0][i].toString()).value);
								}
						}
						catch(e)
						{
								alert('send: 参数错误2...');
								return false;
						}
				}
		}
		
		if(typeof(arr[1])!='undefined')
		{
				arr[1]=arr[1].split(',');
				for(i in arr[1])
				{
						arr[1][i]=arr[1][i].split('=');
						if(arr[1][i].length==2)
						{
								str+='&'+arr[1][i][0]+'='+encodeURIComponent(arr[1][i][1]);
						}
				}
		}
		
		xmlhttp.onreadystatechange=callback.bind(null, xmlhttp);
		
		if(argv[1]=='GET')
		{
        if (~url.indexOf("?"))
        {
            str += "&time=" + +new Date();
        }
        else
        {
            str += "?time=" + +new Date();
        }
				xmlhttp.open('GET',argv[0]+str);
				xmlhttp.send();
		}
		else if(argv[1]=='POST')
		{
				xmlhttp.open('POST',argv[0]);
				xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				xmlhttp.send(str);
		}
		else
		{
				return alert('send: 参数错误3...');
		}
		return xmlhttp;
		/*
		xmlhttp.onreadystatechange=function()
		{
				if(xmlhttp.readyState==4&&xmlhttp.status==200)
				{
						alert(xmlhttp.responseText);
				}
		}
		*/
},
// 检查当前响应状态
checkReadyState:function()
{
		var argv=arguments;
		// 1=loading、2=loaded、3=interactive、4=complete
		// 1=初始化、2=发送数据、3=数据传送中、4=完成
		switch(argv[0].readyState)
		{
				case 1:case 2:case 3:
				{
						// ...
				}
				case 4:
				{
						// ...
				}
				default: return false;
		}
},
// 返回响应
getResponse:function(request)
{
		if(request.getResponseHeader('Content-Type').indexOf('xml')!=-1)
		{
				return request.responseXML.documentElement;
		}
		else if(request.getResponseHeader('Content-Type').indexOf('html')!=-1)
		{
				return request.responseText;
		}
		else return false;
},
//
abort:function(request)
{
		request.abort();
		// 中断当前请求后的操作
}
}
///////////////////////////////////////////////////////////////
// AJAX 结束
///////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////
function Class()
{
		var argv=arguments[0];
		var con=function()
		{
				return (argv!=null&&this.construct)?this.construct.apply(this,arguments):this;
		}
		con.prototype=argv;
		return con;
}
function Extend()
{
		var i,argv=arguments;
		if(argv.length==1)
		{
				return argv[0];
		}
		for(i in argv[1])
		{
				if(typeof(argv[0][i])=='undefined')
				{
						argv[0][i]=argv[1][i];
				}
				else
				{
						try
						{
								argv[0]['parent'][i]=argv[1][i];
						}
						catch(e)
						{
								argv[0]['parent']={};
								argv[0]['parent'][i]=argv[1][i];
						}
				}
		}
		return argv[0];
}
function Delete()
{
		var i,argv=arguments;
		try
		{
				if(typeof(argv[1])=='undefined')
				{
						for(i in argv[0])
						{
								delete argv[0][i];
						}
				}
				else
				{
						delete argv[0][argv[1]];
				}
		}catch(e){}
}
if(window.onresize||window.onscroll)
{
		alert('onresize 或 onscroll 事件已被绑定，脚本可能无法正常运行');
}
window.resize=
{
		method:{},
		execute:function()
		{
				var i;
				for(i in this.method)
				{
						if(typeof(this.method[i])=='function')
						{
								this.method[i]();
						}
				}
		},
		remove:function()
		{
				delete window.resize.method[arguments[0]];
		}
}
function fresize()
{
		window.resize.execute();
}
window.onscroll=fresize;
window.onresize=fresize;
(function(author)
{
		var i,browser=['MSIE','Firefox','Opera','Chrome','Safari'];
		for(i in browser)
		{
				if(navigator.userAgent.indexOf(browser[i])>-1)
				{
						Elib.browserType=browser[i];
						break;
				}
		}
		Elib.charSet=((Elib.browserType=='MSIE')?document.charset:document.characterSet).toUpperCase();
		
		// String 添加方法
		String.prototype.trim=function(){return Elib.trim(this);};
		String.prototype.addslashes=function(){return Elib.addslashes(this);};
		String.prototype.strlen=function(type){return Elib.strlen(this,type);};
		
		// ...
		Elib.author=author;
}
)('刘昭辉','1989','zhongzhuan');
///////////////////////////////////////////////////////////////

if (!("bind" in Function.prototype))
Function.prototype.bind = function (_this)
{
    var fn = this, args = Array.prototype.slice.call(arguments, 1);
    
    return function ()
    {
        return fn.apply(_this, args.concat(Array.prototype.slice.call(arguments)));
    };
};