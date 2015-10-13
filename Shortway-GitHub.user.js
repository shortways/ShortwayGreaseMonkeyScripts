// ==UserScript==
// @name        Shortway-GitHub
// @namespace   GitHub
// @description GitHub中文版，实施翻译得到的中文界面
// @include     https://github.com/*
// 编辑页面（*/new/*）就不要翻译了，否则也会翻译正在编辑的代码文本，会导致文本错误
// @exclude     https://github.com/*/new/*
// @exclude     https://github.com/*/edit/*
// @version     2.0.2015.10.14
// @grant       none
// @author      Shortway
// ==/UserScript==


(function () {

	function findAndReplace(searchText, replacement, searchNode) {
		if (!searchText || typeof replacement === 'undefined') {
			// Throw error here if you want...
			return;
		}
		var regex = typeof searchText === 'string' ? new RegExp(searchText, 'g') : searchText,
			childNodes = (searchNode || document.body).childNodes,
			cnLength = childNodes.length;
		excludes = 'html,head,style,title,link,meta,script,object,iframe';
		while (cnLength--) {
			var currentNode = childNodes[cnLength];
			if (currentNode.nodeType === 1 && (',' + excludes + ',').indexOf(',' + currentNode.nodeName.toLowerCase() + ',') === -1) {
				arguments.callee(searchText, replacement, currentNode);
			}
			if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
				continue;
			}
			var parent = currentNode.parentNode,
				frag = (function(){
					var html = currentNode.data.replace(regex, replacement),
						wrap = document.createElement('div'),
						frag = document.createDocumentFragment();
					wrap.innerHTML = html;
					while (wrap.firstChild) {
						frag.appendChild(wrap.firstChild);
					}
					return frag;
				})();
			parent.insertBefore(frag, currentNode);
			parent.removeChild(currentNode);
		}
	}

	function translate() {
		var ts = {
			"00111|updating your profile with your name, location, and a profile picture helps other GitHub users get to know you.":"更新你的资料，关于你的名字、地区和头像，帮助其他GitHub用户了解你。",
			"00056|You can also drag and drop a picture from your computer.":"你也可以直接从你的电脑把照片拖拽进来。",
			"00032|You have no unread notifications":"您没有未读通知。",
			"00020|Popular repositories":"受欢迎的仓库",
			"00018|Upload new picture":"上传新图片",
			"00015|This repository":"当前仓库内：",
			"00015|Public activity":"公共活动",
			"00015|Profile picture":"资料图片",
			"00014|Public profile":"公共形象",
			"00014|Explore GitHub":"探索 GitHub",
			"00013|Search GitHub":"搜索 GitHub",
			"00013|Pull requests":"申请归并",
			"00013|latest commit":"最新提交",
			"00013|Contributions":"贡献",
			"00012|your profile":"您的个人信息",
			"00012|Signed in as":"欢迎您的到来，",
			"00012|Repositories":"仓库",
			"00012|Edit profile":"编辑个人信息",
			"00012|contributors":"贡献者",
			"00011|contributor":"贡献者",
			"00010|no message":"没有消息",
			"00010|months ago":"个月之前",
			"00009|Showcases":"陈列柜",
			"00009|Joined on":"加入于",
			"00008|Trending":"风向标",
			"00008|Sign out":"退出",
			"00008|Settings":"设置",
			"00008|releases":"版本",
			"00008|Pro tip:":"友情提醒：",
			"00008|days ago":"天之前",
			"00008|branches":"分支",
			"00008|authored":"撰写于",
			"00007|Unwatch":"取消关注",
			"00007|profile":"个人信息",
			"00007|Explore":"探索",
			"00007|commits":"提交",
			"00007|Branch:":"分支：",
			"00006|Unstar":"取消加星",
			"00006|Switch":"切换",
			"00006|Search":"搜索",
			"00006|Issues":"记录",
			"00006|Graphs":"图表",
			"00006|branch":"分支",
			"00005|Watch":"添加关注",
			"00005|Stars":"星级",
			"00005|Stars":"加星好评",
			"00005|Stard":"已加星",
			"00005|Pulse":"状态",
			"00004|Wiki":"维基",
			"00004|tags":"标签",
			"00004|Star":"加星好评",
			"00004|Gist":"片段",
			"00004|Fork":"复制克隆",
			"00004|Edit":"编辑",
			"00004|Code":"代码",

		};
		for(var t in ts) {
			findAndReplace(t.substring(6, 999), ts[t]);
		};
		setTimeout(translate, 1000);
	};

	setTimeout(translate, 1000);

})();


/******

// EmEditor 宏脚本

if(1==1){//github中文版。需要翻译的词句整理，按字符个数从多到少排序

	document.selection.Replace("^\\s*([^\\t]+?)\\s*\\t+\\s*([^\\t]+?)\\s*$","\\t\\t\\t\x22\\1\x22:\x22\\2\x22,",eeFindNext | eeFindSaveHistory | eeReplaceAll | eeFindReplaceRegExp);

	document.selection.Replace("^(\\t*\x22)\\d+\\|","\\1",eeFindNext | eeFindSaveHistory | eeReplaceAll | eeFindReplaceRegExp);		// 去除已有的前置字数，重新来
	document.selection.StartOfDocument(false);																						// 从最前开始
	var intFindCount=document.selection.Find("^\\t*\x22[^\\d][^\x22]*?\x22:", eeFindCount | eeFindNext | eeFindReplaceEscSeq | eeFindReplaceRegExp); // 统计总数
//	alert(intFindCount);
	while(intFindCount > 0){
		document.selection.StartOfDocument(false);																			// 从最前开始
		document.selection.StartOfLine(false, eeLineLogical);																// 到每行逻辑行首
		document.selection.Find("^\\t*\x22[^\\d][^\x22]*?\x22:", eeFindNext | eeFindReplaceEscSeq | eeFindReplaceRegExp);	// 找到每个句子
		selectText = document.selection.Text;
		len = selectText.length - 6;
		len2 = "00000" + len;
		len2 = len2.substr(len2.length-5, 5);
		document.selection.StartOfLine(false, eeLineLogical);																// 到每行逻辑行首
		document.selection.Replace("^(^\\t*\x22)","\\1"+len2+"|", eeFindNext | eeFindSaveHistory | eeFindReplaceRegExp);	// 插入统计的字数
		document.selection.StartOfDocument(false);																			// 从最前开始
		intFindCount=document.selection.Find("^\\t*\x22[^\\d][^\x22]*?\x22:", eeFindCount | eeFindNext | eeFindReplaceEscSeq | eeFindReplaceRegExp);
	}

	document.selection.Replace("^\\n","",eeFindNext | eeFindSaveHistory | eeFindReplaceRegExp);								// 去除多余换行
	document.selection.SelectAll();
	editor.ExecuteCommandByID(5652);	// 从多到少数字排序
	document.selection.Copy(eeCopyUnicode);

}

****/



/*****
	参考资料：
	YunPan 360 in Deutsch	http://userscripts-mirror.org/scripts/show/412853
****/
