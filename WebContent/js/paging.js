var total;
var pageNum = 3;// 表示每页的数据条数
var array = new Array();
var pageFlag;// 用来标记分页调用的函数

var url = location.search;
strs = url.split("=");

$(document).ready(function() {
//	alert(currentPage);
//	alert(strs[1].trim());
	if (pageFlag == 1)
		doSearchIndexPages();
	else if (pageFlag == 2)
		doSearchNoteListPages();
});

function doSearchIndexPages() {
	$.ajax({
		type : "get",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		url : "../listCount",
		async : false,
		data : {},
		dataType : 'json',
		success : function(result) {
			html = "";
			array = result.listCount;
			total = array[0].total;
			if (total % pageNum == 0)
				total = total / pageNum;
			else
				total = (Math.floor(total / pageNum)) + 1;
			if (total <= 5) {// 这为按钮个数的限制
				html += "<a href='index.html' class='page'>first</a>";
				for (var i = 1; i <= total; i++) {
					if (i == currentPage/*这个变量定义在index.js中*/) {
						html += "<span class='page active'>" + currentPage + "</span>";
					} else
						html += "<a href='index.html?page=" + i
								+ "' class='page'>" + i + "</a>";
				}
				html += "<a href='index.html?page=" + total + "'"
						+ " class='page'>last</a>";
				$("#paging").html(html);
			}
		}
	});
}

function doSearchNoteListPages() {
	
	/** 获得请求参数值 */
	if (url.indexOf('&') > -1) {
		/*strs = url.split("&");
		typeId = strs[0].trim().split("=")[1];
		subTypeId = strs[1].trim().split("=")[1];*/
		strs = url.split("&");
		if(strs.length == 2) {
			if(strs[1].trim().split("=")[0] == "subTypeId") {
				typeId = strs[0].trim().split("=")[1];
				subTypeId = strs[1].trim().split("=")[1];
			}else if(strs[1].trim().split("=")[0] == "page") {
				typeId = strs[0].trim().split("=")[1];
//				noteListCurrentPage = strs[1].trim().split("=")[1]; //统计所有条数，不需要当前页此条件
				subTypeId = -1;
			}
		}
	} else if (url.indexOf('&') == -1) {
		strs = url.split("=");
		typeId = strs[1].trim();
		subTypeId = -1;// -1，代表全部，1，2，3、、、代表不同的类别
	}

	$
			.ajax({
				type : "get",
				content : "application/x-www-form-urlencoded;charset=UTF-8",
				url : "../noteListCount",
				async : false,
				data : {
					tid : typeId,
					subType : subTypeId
				},
				dataType : 'json',
				success : function(result) {
					html = "";
					array = result.noteListCount;
					total = array[0].total;
					if (total % pageNum == 0)
						total = total / pageNum;
					else
						total = (Math.floor(total / pageNum)) + 1;
					if (total <= 5) {// 这为按钮个数的限制
						if(navType == 2) {//分页按钮加载到笔记栏
							html += "<a href='note-list.html?typeId=1' class='page'>first</a>";
							for (var i = 1; i <= total; i++) {
								if (i == noteListCurrentPage) {
									html += "<span class='page active'>" + noteListCurrentPage +"</span>";
								} else
									html += "<a href='note-list.html?typeId=1&page=" + i
									+ "' class='page'>" + i + "</a>";
							}
							html += "<a href='note-list.html?typeId=1&page=" + total + "'"
							+ " class='page'>last</a>";
							$("#paging").html(html);
						}else if(navType == 3) {//分页按钮加载到课外阅读栏
							html += "<a href='note-list.html?typeId=2' class='page'>first</a>";
							for (var i = 1; i <= total; i++) {
								if (i == noteListCurrentPage) {
									html += "<span class='page active'>" + noteListCurrentPage +"</span>";
								} else
									html += "<a href='note-list.html?typeId=2&page=" + i
									+ "' class='page'>" + i + "</a>";
							}
							html += "<a href='note-list.html?typeId=2&page=" + total + "'"
							+ " class='page'>last</a>";
							$("#paging").html(html);
						}
					}
				}
			});
}