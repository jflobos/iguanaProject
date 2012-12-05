var totWidth=0;
var leftMarg = 0;
var positions = new Array();
$(document).ready(function(){
	/* This code is executed after the DOM has been completely loaded */
	$('#slides .slide').each(function(i){
		/* Loop through all the slides and store their accumulative widths in totWidth */
		positions[i]= totWidth;
		totWidth += $(this).width();		
	});
	
	/*
	$('.slide').click(function(){		
		var pos = $(this).width();		
		leftMarg += pos;
		if(totWidth <= leftMarg)
			leftMarg = 0;
		$('#slides').stop().animate({marginLeft:-leftMarg+'px'},450);
	});
	*/
	
	$('.left').click(function(){
		shiftLeft($(this).parent().parent().parent().parent().width());		
	});
	
	$('.right').click(function(){
		shiftRight($(this).parent().parent().parent().parent().width());		
	});
	
	$('.slide_img_box').hover(function(){
		$(this).children('.slide_shift').fadeIn(0);		
	});
	$('.slide_img_box').mouseleave(function(){
		$(this).children('.slide_shift').fadeOut(0);		
	});
	
	/*
	var timerId = setInterval(function() {
		var pos = $(".slide").width();	
		leftMarg += pos;
		if(totWidth <= leftMarg + pos)
			leftMarg = 0;
		$('#slides').stop().animate({marginLeft:-leftMarg+'px'},450);
	}, 3000);
	*/

	$('#slides').width(totWidth + $('.slide').width());

	/* Change the container div's width to the exact width of all the slides combined */
});
function shiftLeft(pos){			
	leftMarg -= pos;
	if(0 >= leftMarg)
		leftMarg = 0;
	$('#slides').stop().animate({marginLeft:-leftMarg+'px'},450);
}

function shiftRight(pos){			
	leftMarg += pos;
	if(totWidth <= leftMarg)
		leftMarg = 0;
	$('#slides').stop().animate({marginLeft:-leftMarg+'px'},450);
}