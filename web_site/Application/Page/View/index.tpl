<!DOCTYPE html>
<html>
<head>
{tpl:include file="header.tpl"}
<title>分页支持 - 第 {tpl:echo startIndex} 页</title>
</head>
<body>
<div class="pagerBar">
  <div class="pagerbar-wrap">

{tpl:function assign=url call=link(
  {controller : "IndexController", action : "indexAction", module : "Page"}, 
  {page : "#page#"})}

{tpl:function call=page({
    url : url, 
    rowTotal : rowTotal, 
    pageSize : pageSize, 
    startIndex : startIndex, 
    prevText : "上一页", 
    nextText : "下一页", 
    pageStep : pageStep, 
    paramKey : "#page#"
})}

  </div>
</div>
</body>
{tpl:include file="footer.tpl"}
</html>