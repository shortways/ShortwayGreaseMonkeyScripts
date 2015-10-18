// ==UserScript==
// @name        Shortway-新浪微盘自动批量另存
// @namespace   vdisk.weibo.com
// @description Shortway-新浪微盘搜索海量共享资料后，自动批量另存、自动翻页
// @include     http://vdisk.weibo.com/search/*
// @icon        http://vdisk.weibo.com/favicon.ico
// @version     2015.10.19
// @grant       none
// @author      Shortway
// ==/UserScript==

(function() {
//	$("#weibo_top_public").hide();	// 隐藏页面头部浮动工具栏
//	$(".vdisk_header_main").hide();	// 隐藏页面头部导航
	$("#weibo_top_public,.vdisk_header_main").hide();	// 隐藏页面头部浮动工具栏、导航栏
//	$(".my_vdisk_main").hide();		// 隐藏搜索结果提示
//	$(".v_sort_head").hide();		// 隐藏表头

	(function ($) {	//通用方法：从URL中获取参数
		$.getUrlParam = function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		}
	})(jQuery);

	var page = $.getUrlParam('page');	// 从URL中得到页码
	if (page == null) page=1;
	$(".my_disk span").after("<span>：第</span><span style='color:red'>"+page+"</span><span>页</span>");
	$(".folder_path_main").hide();	// 隐藏提示

	//var keyword = $.getUrlParam("keyword");	//当前搜索的关键词。自动新建文件夹功能待后续开发。

	$(".sort_name_detail").each(function(i,e){	// 添加项目序号
		$(this).html( (i-(-1)) + "&nbsp;&nbsp;" + $(this).html())
	});

	window.setInterval(function(){
		$(".search_table_action").show();	// 显示另存加号按钮
		$(".vd_dload").hide();				// 隐藏下载按钮
	},500);

	var perItemTime = 3000;		//每个项目间隔时间

	window.setTimeout(function(){			// 自动点击“下一页”
		//$(".vd_page_btn").eq(1).click();	// 不知道为什么执行不了
		//$(".vd_page_btn")[$(".vd_page_btn").length-1].click(function(){return true});
		$(".vd_page_btn span:contains('下一页')")[0].click(function(){return true});
	}, perItemTime * 21 + Math.random()*500);

	$(".vd_add").each(function(i,e){	// 遍历，逐个添加另存
		window.setTimeout(function(){
			$(e).click();				// 点击添加
			$("#ft" + i + "-1nm").click();		// 点选第一个目录
			$(".W_btn_b").click();		// 点击确认（保存在默认的云盘根目录）
			$(".vuiDialogMask").hide();	// 隐藏对话框遮罩
			$(".vuiDialog").hide();		// 隐藏对话框
			//$(e).remove();			// 移除另存按钮，或者使用下方的对勾
			$(e).css("background","rgba(0,0,0,0) url('http://lib.cdn.weipan.cn/web/1002/images/common/ico_warn.png') no-repeat scroll -100px -100px");
			$("#search_table tr").eq(i).css("background-color","#FDFFFF");		// 已添加的变个色
		},i * perItemTime + Math.random()*500)
	});

	//void(0);
})();
