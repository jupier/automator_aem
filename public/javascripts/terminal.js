$(document).ready(function(){

	$("#terminal_up").on("click", function(){
		var textarea = $("#terminal").find("textarea").first();
		$(textarea).removeClass("hide");
		$("#terminal_up").addClass("hide");
		$("#terminal_down").removeClass("hide");
		$("#terminal_toolbar").removeClass("hide");
	});

	$("#terminal_down").on("click", function(){
		var textarea = $("#terminal").find("textarea").first();
		$(textarea).addClass("hide");
		$("#terminal_up").removeClass("hide");
		$("#terminal_down").addClass("hide");
		$("#terminal_toolbar").addClass("hide");
	});

	$("#terminal_clean").on("click", function(){
		var textarea = $("#terminal").find("textarea").first();
		$(textarea).val("");
	});

});