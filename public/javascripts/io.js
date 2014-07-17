/*
var cmd = {
	id:null,
	args:null,
};
*/

var socket = io();
socket.emit('cmd', {id : '123344', args : ['4', '5']});