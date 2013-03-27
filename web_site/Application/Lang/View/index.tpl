{tpl:lang assign=lang name=languageName type=languageType list=languageList file="welcome.json"}
<!DOCTYPE html>
<html>
<head>
{tpl:include file="header.tpl"}
<title>{tpl:echo lang.support}</title>
</head>
<body>

<div class="result">{tpl:echo lang.welcome}</div>
<p id="switch">{tpl:echo lang.switch}: 
{tpl:loop input=languageList key=key value=val}
  <a href="javascript:void 0" title="{tpl:echo key}">{tpl:echo val}</a>
{tpl:endloop}
</p>
<p>{tpl:echo lang.name, ": ", languageName}</p>
<p>{tpl:echo lang.type, ": ", languageType}</p>

</body>
<script type="text/javascript">
;(function () {
var Cookie = 
{
    __name__ : "Cookie", 
    
    setCookie: function (name, value, second, path, domain, secure)
    {
        this.setRawCookie(name, encodeURIComponent(value), second, path, domain, secure);
    }, 
    
    getCookie: function (name)
    {
        return decodeURIComponent(this.getRawCookie(name));
    }, 
    
    setRawCookie: function (name, value, second, path, domain, secure)
    {
        if (typeof name !== "string" || !name)
        {
            throw new Error("Cookie must have a name");
        }
        
        var cookie = name + "=" + value;
        
        if (undefined !== second)
        {
            var time = new Date();
            time.setTime(+time + second * 1000);
            cookie += "; expires=" + time.toGMTString();
        }
        
        if (undefined !== path) cookie += "; path=" + path;
        if (undefined !== domain) cookie += "; domain=" + domain;
        if (undefined !== secure) cookie += "; secure";
        
        document.cookie = cookie;
    }, 
    
    getRawCookie: function (name)
    {
        var cookies = " " + document.cookie + "; ";
        var search = " " + name + "=";
        var offset = cookies.indexOf(search);
        if (!~offset) return "";
        
        offset = offset + search.length;
        return cookies.slice(offset, cookies.indexOf("; ", offset));
    }
};
var switchLang = document.getElementById("switch");
switchLang.onclick = function (e)
{
    var node = undefined === e ? event.srcElement : e.target;
    if ("A" === node.nodeName)
    {
        Cookie.setCookie("language", node.title, undefined, "/Lang/");
        location.reload();
    }
};
})();
</script>
{tpl:include file="footer.tpl"}
</html>