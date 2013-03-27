/**
 * @author     LiuZhaoHui <hi.liuzhaoxin@gmail.com>
 * @link       http://www.eatbean.com/nodejs
**/

"use strict";

var dewjs = require("dewjs");
var options = __dirname + "/cache.json";

dewjs.getInstance(options).run();