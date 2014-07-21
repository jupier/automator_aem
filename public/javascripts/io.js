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
			console.log(data);
		});
	});
});

//socket.emit('cmd', {id : '123344', args : ['4', '5']});