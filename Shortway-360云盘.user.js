// ==UserScript==
// @name        Shortway-360云盘
// @namespace   yunpan.360.cn
// @description 360云盘添加【离线下载】、【每日抽奖】
// @include     http://yunpan.360.cn/*
// @include     http://*.yunpan.360.cn/*
// @include     http://yunpan.cn/*
// @include     http://*.yunpan.cn/*
// @icon        http://www.360.cn/favicon.ico
// @version     1.2
// @grant       none
// @author      Shortway
// ==/UserScript==




(function() {

	if($("#tbOffline").length==0){
		$("#tbNew").after('<span id="tbOffline" class="y-btn y-btn-gray offline show" data-cn="offline"><i class="icon icon-offline"></i><span class="label">离线下载</span></span>');
		//$("#topPanel ul").after('<div style="padding-top:13px"><a style="float:left;color:#0ff;font-size: 18px;" href="/my?p=signin">每日抽奖</a></div>');
		$("#topPanel ul").append('<li><a href="/my?p=signin" id="lottery">每日抽奖</a></li>');	// 每日抽奖是个png图片，所以用下面的base64
		$("#lottery").css({'background':' rgba(0, 0, 0, 0)  url("data:image/png;base64,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") no-repeat scroll 50% 50% ','width':'54px'});
	}

})();


/****

参考资料：

jQuery - css() 方法
http://www.w3school.com.cn/jquery/jquery_css.asp

图标base64转码及替换火狐扩展、CSS样式、UC脚本图标教程 _ 火狐范
http://www.firefoxfan.com/firefox-tutorial/convert-base64-encoding.html

图片在线转换Base64,图片编码base64
http://tool.css-js.com/base64.html


***/
