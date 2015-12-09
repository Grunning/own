navType = 1;
pageFlag = 1;

var url = location.search;
strs = url.split("=");

var currentPage;

$(document).ready(function() {
	if(url == "")
		currentPage = 1;
	else
		currentPage = strs[1].trim();
	
	var initArray = new Array();

	navShow();
	doSearch();
});

function doSearch() {
	$.ajax({
		type : "get",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		url : "../list",
		async : false,
		data : {
			currentPage : currentPage
		},
		dataType : 'json',
		success : function(result) {
			var html = "";
			initArray = result.list;
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
							+ initArray[i].content.substring(0, 94) + "..."
							+ "</p></li>";
			}
			$("#list").html(html);
		}
	});
}