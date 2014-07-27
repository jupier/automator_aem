$(document).ready(function(){
	if ($('#nav_configuration').length > 0)
	{
		$.ajax({
			url: "/configuration/check",
			success: function(data){
				console.log(data);
				$('#nav_configuration').attr('src', (data.isOk) ? 'images/success.png' : 'images/error.png');
			},
		});
	}
});