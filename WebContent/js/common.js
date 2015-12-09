var navType;

$(document).ready(function() {
	var initArray = new Array();

	pageAttributeShow();
	subTypeSearch();
});

function subTypeSearch() {
	$.ajax({
		type : "get",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		url : "../subTypeList",
		async : false,
		data : {},
		dataType : 'json',
		success : function(result) {
			var html = "";
			initArray = result.subTypeList;
			for (var i = 0; i < initArray.length; i++) {
				html += "<li><a href='note-list.html?typeId=1&subTypeId=" + initArray[i].id
						+ "'" + " style='text-decoration: none;'>"
						+ initArray[i].name + "（" + initArray[i].blogNum + "）"
						+ "</a></li>";
			}
			$("#class_list").html(html);
		}
	});
}

function pageAttributeShow() {
	// 页面头
	$("#header")
			.append(
					"<header>"
							+ "<div class='logo'>"
							+ "<a href='http://www.cnblogs.com/ForeverLover/' style='text-decoration: none;'>"
							+ "<h2>OWN</h2></a>"
							+ "</div>"
							+ "<h6><a href='http://www.cnblogs.com/ForeverLover/'>I AM YOUR SKY.</a></h6>"
							+ "<section id='search'>"
							+ "<form action='#' onSubmit='return false;' method='get'>"
							+ "<input type='text'"
							+ "onFocus=\"if (this.value =='Search..' ) this.value=''\" "
							+ "onBlur=\"if (this.value=='') this.value='Search..'\" "
							+ "value='Search..' name='q'> <input type='submit' value=''>"
							+ "</form>" + "</section>" + "</header>");

	// 右侧栏目
	$("#right")
			.append(
					"<div class='block'>"
							+ "<h4>Note Classification</h4>"
							+ "<ul id='class_list' class='archives'>"
							+ "</ul>"
							+ "</div>"
							+

							"<div class='block'>"
							+ "<h4>Hot Notes</h4>"
							+ "<ul class='recent'>"
							+ "<li>"
							+ "<a href='#'>这是第一条热点note哈哈哈哈哈哈哈</a>"
							+ "</li>"
							+ "</ul>"
							+ "</div>"
							+

							"<div class='block'>"
							+ "<h4>Technical Sites</h4>"
							+ "<ul class='sites'>"
							+ "<li>"
							+ "<a href='http://www.csdn.net' style='text-decoration: none;'>&#9798;&nbsp;&#10143;&nbsp;CSDN</a>"
							+ "</li>" + "</ul>" + "</div>");

	// 页脚
	$("#footer")
			.append(
					"<footer>"
							+ "<ul id='social'>"
							+ "<li><a href='#' title='facebook'><img alt='' src='images/facebook.png' /></a></li>"
							+ "<li><a href='#' title='twitter'><img alt='' src='images/twitter.png' /></a></li>"
							+ "<li><a href='#' title='linkedin'><img alt='' src='images/linkedin.png' /></a></li>"
							+ "<li><a href='#' title='rss'><img alt='' src='images/rss.png' /></a></li>"
							+ "</ul>"
							+ "<div id='privacy'>"
							+ "Copyright &copy; 2015.<a href='index.html'>own blog</a>."
							+ "</div>" + "</footer>");
}

//响应操作显示不同效果的导航栏
function navShow() {
	if(navType == 1) {
		$("#nav").append(
				"<nav>" + "<ul>"
						+ "<li class='active'><a href='index.html'>首页</a></li>"
						+ "<li><a href='note-list.html?typeId=1'>笔记</a></li>"
						+ "<li><a href='note-list.html?typeId=2'>课外阅读</a></li>"
						+ "<li><a href='#'>面试经验</a></li>"
						+ "<li><a href='resume.html'>个人简历</a></li>"
						+ "<li><a href='#'>留言板</a></li>" + "</ul>" + "</nav>");
	} else if(navType == 2) {
		$("#nav").append(
				"<nav>" + "<ul>"
						+ "<li><a href='index.html'>首页</a></li>"
						+ "<li class='active'><a href='note-list.html?typeId=1'>笔记</a></li>"
						+ "<li><a href='note-list.html?typeId=2'>课外阅读</a></li>"
						+ "<li><a href='#'>面试经验</a></li>"
						+ "<li><a href='resume.html'>个人简历</a></li>"
						+ "<li><a href='#'>留言板</a></li>" + "</ul>" + "</nav>");
	} else if(navType == 3) {
		$("#nav").append(
				"<nav>" + "<ul>"
						+ "<li><a href='index.html'>首页</a></li>"
						+ "<li><a href='note-list.html?typeId=1'>笔记</a></li>"
						+ "<li class='active'><a href='note-list.html?typeId=2'>课外阅读</a></li>"
						+ "<li><a href='#'>面试经验</a></li>"
						+ "<li><a href='resume.html'>个人简历</a></li>"
						+ "<li><a href='#'>留言板</a></li>" + "</ul>" + "</nav>");
	}
}