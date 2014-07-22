/*
var cmd = {
	id:null,
	args:null,
};
*/

$(document).ready(function() {
	var socket = io();

	$("body").delegate(".btn-cmd", "click", function() {
		socket.emit('cmd', {id : $(this).attr('id')});
		socket.on('cmd_data', function(data){
			var textarea = $("#terminal").find('textarea').first();
			$(textarea).val($(textarea).val() + data.data);
		});
	});
});

//socket.emit('cmd', {id : '123344', args : ['4', '5']});