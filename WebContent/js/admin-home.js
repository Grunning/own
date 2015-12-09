var initArray = new Array();

$(document).ready(function() {
	doSearch();
});

function doSearch() {
	$.ajax({
		type : "post",
		content : "application/x-www-form-urlencoded;charset=UTF-8",
		url : "../adminFindAllNote",
		async : false,
		data : {},
		dataType : 'json',
		success : function(result) {
			var html = "";
			initArray = result.findAllNote;
			for (var i = 0; i < initArray.length; i++) {
				if (initArray[i].title.length > 25)
					html += "<li><span class='left'><a href='#'>"
							+ initArray[i].title.substring(0, 23) + "..."
							+ "</a></span><span class='right'>"
							+ initArray[i].time + "</span></li>";
				else
					html += "<li><span class='left'><a href='#'>"
							+ initArray[i].title
							+ "</a></span><span class='right'>"
							+ initArray[i].time + "</span></li>";
			}
			$("#admin_list").html(html);
		}

	});
}