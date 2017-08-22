$(document).ready(function () {

	$('#ex1').slider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}
	});

	$("#slider").slider(
	{
	            value:20,
	            min: 20,
	            max: 80,
	            step: 5,
	            slide: function( event, ui ) {
	                $( "#slider-value" ).html( ui.value );
	            }
	}
	);

	$( "#slider-value" ).html(  $('#slider').slider('value') );
});
