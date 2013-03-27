/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://framework.eatbean.com/nodejs
 * @license    http://www.eatbean.com/about/license
 **/

"use strict";

module.exports = Pager;

function Pager(cp, sp)
{
    this.currentPage = cp;
    this.sumPage = sp;
    this.subCalc_();
}

Pager.prototype =
{
    constructor : Pager,
    __name__ : "Pager",

    subCalc_ : function ()
    {
        var sp = this.sumPage;
        var cp = this.currentPage;
        var i, j;
        
        if (sp < 6)
        {
            i = 1;
            j = sp;
        }
        else
        {
            if (cp < 3)
            {
                i = 1;
                j = 5;
            }
            else if (cp + 2 < sp)
            {
                i = cp - 2;
                j = cp + 2;
            }
            else if (cp > sp - 3)
            {
                i = sp - 4;
                j = sp;
            }
        }

        this.begin = i;
        this.end = j;
    },

    ajaxSubPage : function (url)
    {
        var cp = this.currentPage;
        var sp = this.sumPage;
        var bg = this.begin;
        var ed = this.end;

        var string = "";
        string += "<li><span>共 " + sp + " 页</span></li>";

        if (cp == 1)
        {
            string += "<li><span class=\"current\">首页</span></li><li><span>上一页</span></li>";
        }
        else
        {
            string += "<li><a href=\"javascript:" + url
             + "1');\">首页</a></li><li><a href=\"javascript:" + url
             + (cp - 1) + "');\">上一页</a></li>";
        }
        
        while (bg <= ed)
        {
            if (cp === bg)
            {
                string += "<li><span>" + (bg++) + "</span></li>";
            }
            else
            {
                string += "<li><a href=\"javascript:" + url + bg + "');\">" + (bg++) + "</a></li>";
            }
        }

        if (bg === sp || cp === sp)
        {
            string += "<li><span>下一页</span></li><li><span class=\"current\">尾页</span></li>";
        }
        else
        {
            string += "<li><a href=\"javascript:" + url + (cp + 1)
             + "');\">下一页</a></li><li><a href=\"javascript:" + url + sp + "');\">尾页</a></li>";
        }

        return string;
    }
};