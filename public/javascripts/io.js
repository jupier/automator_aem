$(document).ready(function() {
	var socket = io();

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
});