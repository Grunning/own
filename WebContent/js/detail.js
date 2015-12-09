var initArray = new Array();
navType = 1;

var url = location.search;
strs = url.split("=");

var id = strs[1].trim();

$(document).ready(function() {
	navShow();
	doSearch();
});

function doSearch() {
	$.ajax({
		type : "post",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		url : "../noteDetail",
		async : false,
		data : {
			id : id
		},
		dataType : 'json',
		success : function(result) {
			var html = "";
			initArray = result.noteDetail;
			html += "<h3 align='center'>" + initArray[0].title + "</h3>"
					+ "<p><span style='font-size:16px;line-height:24px;color:black;'>" + initArray[0].content + "</span></p>";
			$("#list").html(html);
		}
	});
}