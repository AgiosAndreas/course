function paragraphSort () {
	var p = $("p");

	p.sort(function(p1, p2) {
		return $(p1).text().length - $(p2).text().length;
	});

	$("body").append(p);
}

$(document).ready(function () {
	$(".sortButton").click(paragraphSort);
});