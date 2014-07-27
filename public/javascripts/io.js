$(document).ready(function() {
	var socket = io();

	/* DEPLOIEMENT */

	socket.on('cmd_data', function(data){
		var textarea = $("#terminal").find('textarea').first();
		$(textarea).val($(textarea).val() + data.data);
	});

	socket.on('cmd_stop', function(data){
		$(".btn-cmd").removeAttr('disabled');
		$("#" + data.id).parent().parent().removeClass('info');
	});

	socket.on('cmd_ran', function(data){
		$("#" + data.id).parent().parent().addClass('info');
	});

	socket.on('cmd_error', function(data){
		var textarea = $("#terminal").find('textarea').first();
		$(textarea).val($(textarea).val() + data.data);
	});

	$("body").delegate(".btn-cmd", "click", function() {
		$(".btn-cmd").attr('disabled', 'true');
		socket.emit('cmd', {id : $(this).attr('id')});
	});

	/* CONFIGURATION */

	socket.on('check_error', function(data){
		var cmd = data.cmd;
		var id = "check_" + cmd;
		var label = $("#" + id + "_label");
		var loading = $("#" + id + "_loading");
		var error = "#" + id + "_error";

		$(loading).addClass('hide');
		$(label).removeClass('label-default').addClass('label-danger');
		$(error).html(data.data);
	});

	socket.on('check_success', function(data){
		var cmd = data.cmd;
		var id = "check_" + cmd;
		var label = $("#" + id + "_label");
		var loading = $("#" + id + "_loading");

		$(loading).addClass('hide');
		$(label).removeClass('label-default').addClass('label-success');
	});

	$("div[id^='check_']").each(function(){
		var id = $(this).attr('id');
		var cmd = id.replace("check_", "");
		var label = $("#" + id + "_label");
		var loading = $("#" + id + "_loading");

		$(loading).removeClass('hide');
		socket.emit('check', {cmd : cmd});
	});
});