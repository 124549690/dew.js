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
var _m_build=function(page)
{
		var arr=page.split(/[:._-]/);
		var loadingID=Elib.loading();
		var url = location.href + "?isajax=1&" + arr[0] + '=' + arr[1];
		
		Eajax.send(url,'GET', undefined, function (xmlhttp)
		{
				if(xmlhttp.readyState==4)
				{
						if(xmlhttp.status!=200)
						{
								Ebox.outError('网络错误！！！');
								return false;
						}
						var data=Elib.json_decode(xmlhttp.responseText),i,j,k;
						var m_subpage=Elib.$('m_subpage');
						Elib.delNodes(m_subpage,false);
						m_subpage.innerHTML=data[1];
						
						var timer=Elib.$('timer');
						timer.innerHTML=data[2];
						
						Elib.delNodes('m_box',false);
						
						for(i=0;i<data[0].length;i++)
						{
                // 昵称，日期，内容，操作ID号
								_m_add_message(data[0][i][0].muser,data[0][i][0].mdate,data[0][i][0].mcontent,'mid_'+data[0][i][0].mid);
								k=data[0][i][0].mid;
								for(j=1;j<data[0][i].length;j++)
								{
                    // 昵称，日期，内容，操作ID号，回复对象ID号，逆序或正序
										_m_add_reply(data[0][i][j].ruser,data[0][i][j].mdate,data[0][i][j].rcontent,'rid_'+data[0][i][j].rid,'mid_'+k,false);
								}
						}
						Elib.delNodes(loadingID);
				}
		});
}

var _clearValue=function()
{
    var argv=arguments;
    var argc=argv.length;
    for(var i=0;i<argc;i++)
    {
				Elib.$(argv[i]).value='';
		}
}


function login()
{
		var login_main=document.createElement('div');
		login_main.className='login_main';
		
    var div1=document.createElement('div');
    div1.className='input5';
    var label1=document.createElement('label');
    label1.innerHTML='用户名';
    var input1=document.createElement('input');
    input1.id='box_user';
    input1.type='text';
    input1.title='请输入用户名';
    input1.maxLength='16';
		div1.appendChild(label1);
		div1.appendChild(input1);
		
    var div2=document.createElement('div');
    div2.className='input5';
    var label2=document.createElement('label');
    label2.innerHTML='密　码';
    var input2=document.createElement('input');
    input2.id='box_password';
    input2.type='password';
    input2.title='请输入密码';
    input2.maxLength='32';
		div2.appendChild(label2);
		div2.appendChild(input2);
    
    var div3=document.createElement('div');
    div3.className='input6';
    var label3=document.createElement('label');
    label3.innerHTML='验证码';
    var input3=document.createElement('input');
    input3.id='box_code';
    input3.type='text';
    input3.title='请输入验证码';
    input3.maxLength='4';
    
    var code=document.createElement('p');
    code.id = "valid_code";
    code.setAttribute("src", location.href + 'valid/validCode');
    
    Elib.addEvent(code,'click',function(){Elib.code(code)});
    code.alt='看不清楚？点击换一张';
    code.title='看不清楚？点击换一张';
    
		div3.appendChild(label3);
		div3.appendChild(input3);
		div3.appendChild(code);
    
		var login_button=document.createElement('div');
		login_button.className='login_button';
		
		var button1_div=document.createElement('div');
		button1_div.className='button5';
		Elib.addEvent(button1_div,'mousedown',function(){Elib.button(button1);})
		var button1=document.createElement('button');
		button1.innerHTML='登录';
		button1_div.appendChild(button1);
		
		login_button.appendChild(button1_div);
		
		login_main.appendChild(div1);
		login_main.appendChild(div2);
		login_main.appendChild(div3);
		login_main.appendChild(login_button);
		
    var ID=Ebox.create('登录',login_main,'height:180px;width:260px;');
		var boxID=ID[0];
		var coverID=ID[1];
    Elib.addEvent(login_button,'click',
		function()
		{
				if(_checkValue('box_user:4.16-用户名过短...|0;box_password:6.32-密码过短...|0;'))
				{
            var url = location.href + "user/login";
            Eajax.send(url,'POST','box_user:userName,box_password:userPassword,box_code:userCode', 
            function(xmlhttp)
						{
								if(xmlhttp.readyState==4&&xmlhttp.status==200)
								{
										var arr=xmlhttp.responseText.split('|');
										if(arr[1]==1)
										{
												Elib.delNodes(coverID);
												Elib.delNodes(boxID);
												_m_login_style();
										}
										Ebox.outError(arr[0],arr[1]);
								}
						});
				}
		});
		Elib.code(code);
}

function _m_login_style()
{
    var user_login=Elib.$('user_login');
    user_login.innerHTML='注销';
    user_login.href='javascript:logout();';
    var nodes=Elib.$$('m_message_operation,m_message_reply_operation',Elib.$('m_box')),i,j,c,a,bool=false;
    for(i in nodes)
    {
				if(nodes[i].hasChildNodes())
				{
						c=(nodes[i]).getElementsByTagName('a');
            for(j=0;j<c.length;j++)
            {
								if(c[j].innerHTML=='删除')
								{
										bool=true;
										break;
								}
            }
				}
				if(bool)
				{
						continue;
				}
        a=document.createElement('a');
        a.innerHTML='删除';
        a.href='javascript:_deleteBox(\''+nodes[i].id+'\');';
				(nodes[i]).appendChild(a);
		}
}

function logout()
{
		Eajax.send(location.href + 'user/logout','POST',undefined, function (xmlhttp)
		{
				if(xmlhttp.readyState==4&&xmlhttp.status==200)
				{
						var arr=xmlhttp.responseText.split('|');
						if(arr[1]==1)
						{
								try
								{
										var p=Elib.$('top').nextSibling;
										for(var i=0;i<3;i++)
										{
												if(p.nodeType==1)
												{
														break;
												}
												else
												{
														p=p.nextSibling;
												}
										}
										switch(p.id)
										{
												case 'm_box': _m_logout_style(); break;
										}
								}
								catch(e){}
						}
						Ebox.outError(arr[0],arr[1]);
				}
		});
}

var _m_logout_style=function()
{
    var user_login=Elib.$('user_login');
    user_login.innerHTML='管理';
    user_login.href='javascript:login()';
    var p=Elib.$('m_box').getElementsByTagName('span');
    for(var i in p)
    {
        if(typeof(p[i].className)=='undefined')
        {
						continue;
				}
        if(p[i].className=='m_message_operation'||p[i].className=='m_message_reply_operation')
        {
            if(p[i].hasChildNodes())
            {
                var c=(p[i]).getElementsByTagName('a');
                for(var j=0;j<c.length;j++)
                {
										if(c[j].innerHTML=='删除')
										{
												p[i].removeChild(c[j]);
										}
								}
            }
        }
    }
}

/**
 * _checkValue('id:14.140-提示内容|[1|0];...')
**/
var _checkValue=function()
{
    var arr=arguments[0].split(';');
    for(var i in arr)
    {
        arr[i]=arr[i].split('-');
        arr[i][0]=arr[i][0].split(':');
        if(arr[i][0].length!=2)
        {
						break;
				}
        arr[i][1]=arr[i][1].split('|');
        arr[i][0][1]=arr[i][0][1].split('.');
        if(arr[i][0][1].length==2)
        {
            var s=Elib.trim(Elib.$(arr[i][0][0]).value);
            var p=(arr[i][1][1]==1)?Elib.strlen(s,'GBK'):s.length;
            if(p>arr[i][0][1][1]||p<arr[i][0][1][0])
            {
								Ebox.outError(arr[i][1][0],2);
								return false;
						}
        }
    }
    return true;
}


var _deleteBox=function(str)
{
		var arr=str.split(/[:._-]/);
		var operation=location.href + 'message/remove?'+arr[0]+'='+arr[1];
		
		var delete_main=document.createElement('div');
		delete_main.className='delete_box_main';
    
    var delete_content=document.createElement('div');
    
    var delete_img=document.createElement('span');
    delete_img.className='delete_box_img';
    
    var delete_span=document.createElement('span');
    delete_span.className='delete_box_span';
    delete_span.innerHTML='确定要删除这条留言？';
    
    delete_content.appendChild(delete_img);
    delete_content.appendChild(delete_span);
    delete_main.appendChild(delete_content)
    
    var button=document.createElement('div');
    Elib.changeStyle(button,'height:24px;width:105px;margin:0px 0px 0px auto;');
    
    var buttonDiv1=document.createElement('div');
    buttonDiv1.className='button6';
    Elib.addEvent(buttonDiv1,'mousedown',function(){Elib.button(buttonDiv1);})
    var button1=document.createElement('button');
    button1.innerHTML='确定';
    buttonDiv1.appendChild(button1);
    
    var buttonDiv2=document.createElement('div');
    buttonDiv2.className='button6';
    Elib.changeStyle(buttonDiv2,'margin-left:6px;');
    Elib.addEvent(buttonDiv2,'mousedown',function(){Elib.button(buttonDiv2);});
    var button2=document.createElement('button');
    button2.innerHTML='取消';
    buttonDiv2.appendChild(button2);
    
    button.appendChild(buttonDiv1);
    button.appendChild(buttonDiv2);
    
    delete_main.appendChild(button);
    
    var ID=Ebox.create('删除',delete_main,'width:320px;height:118px;');
		var boxID=ID[0];
		var coverID=ID[1];
		
    Elib.addEvent(buttonDiv1,'click',
    function()
    {
				var loadingID=Elib.loading();
				Eajax.send(operation,'GET',undefined, 
				function(xmlhttp)
				{
						if(xmlhttp.readyState==4&&xmlhttp.status==200)
						{
								var arr=xmlhttp.responseText.split('|');
								if(arr[1]==1)
								{
										Elib.$(str).parentNode.parentNode.parentNode.removeChild(Elib.$(str).parentNode.parentNode);
										Elib.delNodes(coverID);
										Elib.delNodes(boxID);
								}
								Ebox.outError(arr[0],arr[1]);
								Elib.delNodes(loadingID);
						}
				});
		});
    Elib.addEvent(buttonDiv2,'click',
    function()
    {
				Elib.delNodes(coverID);
				Elib.delNodes(boxID);
    });
}

var _m_send_message=function()
{
		if(_checkValue('message:14.140-留言少于14字或大于140字...|0;nicknama:4.16-昵称过长或过短...|1;'))
		{
				var url = location.href + "message/add?from=message";
				Eajax.send(url,'POST','message,nicknama,userCode', function(xmlhttp)
				{
						if(xmlhttp.readyState==4&&xmlhttp.status==200)
						{
								var arr=xmlhttp.responseText.split('|');
								if(arr[1]==1)
								{
										arr[2]=arr[2].split(',');
										var i;
										for(i in arr[2])
										{
												arr[2][i]=Elib.utf8to16(Elib.hexdec(arr[2][i]));
										}
										_m_add_message(arr[2][0],arr[2][1],arr[2][2],arr[2][3]);
										_clearValue('message','nicknama','userCode');
										var code=Elib.$('userCode'),i;
										for(i=0;i<3;i++)
										{
												code=code.nextSibling;
												if(code && code.nodeType==1&&code.nodeName=='IMG')
												{
														Elib.code(code);
														break;
												}
										}
								}
								Ebox.outError(arr[0],arr[1]);
						}
				});
		}
}

// 昵称，日期，内容，操作ID号
var _m_add_message=function()
{
    var argv=arguments;
    var main=document.createElement('div');
    main.className='m_message';
    
    var title=document.createElement('div');
    title.className='m_message_title';
    
    var nicknama=document.createElement('span');
    nicknama.className='m_message_nicknama';
    nicknama.innerHTML=argv[0];
    
    var date=document.createElement('span');
    date.className='m_message_date';
    date.innerHTML=argv[1];
    
    var operation=document.createElement('span');
    operation.className='m_message_operation';
    operation.id=argv[3];
    var reply=document.createElement('a');
    reply.href='javascript:_replyBox(\''+argv[3]+'\');';
    reply.innerHTML='回复';
    operation.appendChild(reply);
    
    if(Elib.$('user_login').innerHTML=='注销')
    {
        var del=document.createElement('a');
        del.href='javascript:_deleteBox(\''+argv[3]+'\');';
        del.innerHTML='删除';
        operation.appendChild(del);
    }
    title.appendChild(nicknama);
    title.appendChild(date);
    title.appendChild(operation);
    main.appendChild(title);
    
    var content=document.createElement('div');
    content.className='m_message_content';
    content.innerHTML=argv[2];
    
    main.appendChild(content);
    Elib.$('m_box').appendChild(main);
}

var _replyBox=function(str)
{
    var replyBox=document.createElement('div');
    ////////////////////////////////////////////////////////////////////////////////////////////
    var textareaDiv=document.createElement('div');
    textareaDiv.className='input_box_border';
    Elib.changeStyle(textareaDiv,'width:560px;margin:8px auto 0px auto;border:1px #D6D6D6 solid;');
    
    var textareaContent=document.createElement('textarea');
    textareaContent.id="replyBox_textarea";
    textareaContent.innerHTML='说几句？';
    Elib.addEvent(textareaContent,'mousedown',function(){Elib.wordLimit(textareaContent,'replyBox_count','replyBox_input_box_limit','说几句？')});
    Elib.changeStyle(textareaContent,'width:530px;height:64px;overflow:auto;');
    
    textareaDiv.appendChild(textareaContent);
    ////////////////////////////////////////////////////////////////////////////////////////////
    var nicknama=document.createElement('div');
    nicknama.className='input_box_nicknama';
    Elib.changeStyle(nicknama,'position:relative;top:0px;left:10px;');
    
    var nicknamaLabel=document.createElement('label');
    Elib.changeStyle(nicknamaLabel,'padding:6px;');
    nicknamaLabel.innerHTML='昵称';
    
    var nicknamaInput=document.createElement('input');
    nicknamaInput.maxLength=16;
    nicknamaInput.id='replyBox_nicknama';
    
    nicknama.appendChild(nicknamaLabel);
    nicknama.appendChild(nicknamaInput);
    ////////////////////////////////////////////////////////////////////////////////////////////
    var codeDiv=document.createElement('div');
    codeDiv.className='input_box_code';
    Elib.changeStyle(codeDiv,'padding-left:14px;');
    
    var codeLabel=document.createElement('label');
    Elib.changeStyle(codeLabel,'padding:6px;');
    codeLabel.innerHTML='验证码';
    
    var codeInput=document.createElement('input');
    codeInput.maxLength=4;
    codeInput.id="replyBox_code";
    
    var codeImage=document.createElement('p');
    codeImage.id = "valid_code";
    codeImage.setAttribute("src", location.href + 'valid/validCode');
    
    Elib.addEvent(codeImage,'click',function(){Elib.code(codeImage)});
    codeImage.alt='看不清楚？点击换一张';
    codeImage.title='看不清楚？点击换一张';
    
    codeDiv.appendChild(codeLabel);
    codeDiv.appendChild(codeInput);
    codeDiv.appendChild(codeImage);
    ////////////////////////////////////////////////////////////////////////////////////////////
    var inputDiv=document.createElement('div');
    Elib.changeStyle(inputDiv,'padding-right:10px;font-size:12px;');
    inputDiv.className='input_box_button';
    
    var limitDiv=document.createElement('div');
    Elib.changeStyle(limitDiv,'padding-right:6px;');
    limitDiv.id='replyBox_input_box_limit';
    limitDiv.innerHTML='还能输入<span class="countNumber" id="replyBox_count">140</span>字';
    if(Elib.browserType=='MSIE')
    {
				limitDiv.style.styleFloat='left';
    }
    else
    {
				limitDiv.style.cssFloat='left';
    }
    var buttonDiv=document.createElement('div');
    buttonDiv.className='button6';
    Elib.addEvent(buttonDiv,'mousedown',function(){Elib.button(buttonDiv)});
    
    var button=document.createElement('button');
    button.innerHTML='回复';
    
    buttonDiv.appendChild(button);
    inputDiv.appendChild(limitDiv);
    inputDiv.appendChild(buttonDiv);
    ////////////////////////////////////////////////////////////////////////////////////////////
    replyBox.appendChild(textareaDiv);
    replyBox.appendChild(nicknama);
    replyBox.appendChild(codeDiv);
    replyBox.appendChild(inputDiv);
    
    var ID=Ebox.create('回复',replyBox,'height:170px;width:580px;background-color:#F5F5F5;');
		var boxID=ID[0];
		var coverID=ID[1];
    Elib.addEvent(button,'click',
    function()
    {
				if(_checkValue('replyBox_textarea:14.140-回复少于14字或大于140字...|0;replyBox_nicknama:4.16-昵称过长或过短...|1;'))
				{
						var arr=str.split(/[:._-]/);
            var url = location.href + "message/add?from=reply&" + arr[0] + '=' + arr[1];
						var xmlhttp=Eajax.send(url,'POST', 
						'replyBox_textarea:message,replyBox_nicknama:nicknama,replyBox_code:userCode', 
						function (xmlhttp)
						{
								if(xmlhttp.readyState==4&&xmlhttp.status==200)
								{
										var arr=xmlhttp.responseText.split('|');
										if(arr[1]==1)
										{
												Elib.delNodes(coverID);
												Elib.delNodes(boxID);
												arr[2]=arr[2].split(',');
												var i;
												for(i in arr[2])
												{
														arr[2][i]=Elib.utf8to16(Elib.hexdec(arr[2][i]));
												}
												_m_add_reply(arr[2][0],arr[2][1],arr[2][2],arr[2][3],str);
										}
										Ebox.outError(arr[0],arr[1]);
								}
						});
				}
		});
		Elib.code(codeImage);
}

// 昵称，日期，内容，操作ID号，回复对象ID号，逆序或正序
var _m_add_reply=function()
{
    var argv=arguments;
    argv[5]=(typeof(argv[5])=='undefined'||argv[5]==true)?true:false;
    
    var main=document.createElement('div');
    main.className='m_message_reply';
    
    var title=document.createElement('div');
    title.className='m_message_title';
    
    var nicknama=document.createElement('span');
    nicknama.className='m_message_nicknama';
    nicknama.innerHTML=argv[0];
    
    var date=document.createElement('span');
    date.className='m_message_date';
    date.innerHTML=argv[1];
    
    var operation=document.createElement('span');
    operation.className='m_message_reply_operation';
    operation.id=argv[3];
    
    if(Elib.$('user_login').innerHTML=='注销')
    {
        var del=document.createElement('a');
        del.href='javascript:_deleteBox(\''+argv[3]+'\');';
        del.innerHTML='删除';
        operation.appendChild(del);
    }
    
    title.appendChild(nicknama);
    title.appendChild(date);
    title.appendChild(operation);
    main.appendChild(title);
    
    var content=document.createElement('div');
    content.className='m_message_content';
    content.innerHTML=argv[2];
    main.appendChild(content);
    var i=Elib.$(argv[4]).parentNode.parentNode;
    var j=i.childNodes;
    var b=true;
    for(var k in j)
    {
        if(typeof(j[k])!='undefined'&&j[k].className=='m_message_reply')
        {
						if(argv[5]==true)
						{
								i.insertBefore(main,j[k]);
						}
						else
						{
								i.appendChild(main);
						}
            b=false;
            break;
        }
    }
    if(b)
    {
				i.appendChild(main);
		}
}


