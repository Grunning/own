var total;
var pageNum = 5;// 表示每页的数据条数
var array = new Array();
var pageFlag;// 用来标记分页调用的函数

$(document).ready(function() {
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
					if (i == 1) {
						html += "<span class='page active'>1</span>";
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
		strs = url.split("&");
		typeId = strs[0].trim().split("=")[1];
		subTypeId = strs[1].trim().split("=")[1];
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
						html += "<a href='note_list.html?typeId=1' class='page'>first</a>";
						for (var i = 1; i <= total; i++) {
							if (i == 1) {
								html += "<span class='page active'>1</span>";
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