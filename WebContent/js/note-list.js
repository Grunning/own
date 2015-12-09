var initArray = new Array();
//navType = 2;
pageFlag = 2;

var url = location.search;
var typeId;
var subTypeId;
var strs = new Array();

$(document).ready(function() {

	/**获得请求参数值*/
	if(url.indexOf('&')>-1) {
		strs = url.split("&");
		typeId = strs[0].trim().split("=")[1];
		subTypeId = strs[1].trim().split("=")[1];
	}else if(url.indexOf('&') == -1) {
		strs = url.split("=");
		typeId = strs[1].trim();
		subTypeId = -1;//-1，代表全部，1，2，3、、、代表不同的类别
	}
	
	if(typeId == 1)
		navType = 2;
	else if(typeId == 2)
		navType = 3;
	
	navShow();
	doSearch();
});

function doSearch() {
	$.ajax({
		type : "post",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		url : "../noteList",
		async : false,
		data : {
			tid : typeId,
			subType : subTypeId
		},
		dataType : 'json',
		success : function(result) {
			var html = "";
			initArray = result.noteList;
			for (var i = 0; i < initArray.length; i++) {
				if (initArray[i].content.length < 94) {
					html += "<li><a href='detail.html?id="
							+ initArray[i].id + "'"
							+ " style='text-decoration: none;'><h3>"
							+ initArray[i].title + "</h3><p>" + "摘要："
							+ initArray[i].content + "</p></li>";
				} else
					html += "<li><a href='detail.html?id="
							+ initArray[i].id + "'"
							+ " style='text-decoration: none;'><h3>"
							+ initArray[i].title + "</h3><p>" + "摘要："
							+ initArray[i].content.substring(0, 94)
							+ "..." + "</p></li>";
			}
			if (html == "") {
				html += "<h2 align='center' style='color:red;'>对不起，您要查看的数据不存在</h2>";
				$("#list").html(html);
			} else
				$("#list").html(html);
		}
	});
			
}