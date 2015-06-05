var countIntro = 0;
			
function nextVideo(nextVideoToPlay){
   document.querySelector("video").src = nextVideoToPlay;
   document.querySelector("video").play();
}

function goPrevNext(prevOrNext){
	// Move Screens
	if(prevOrNext==true){
		countIntro--;					
	} else {
		countIntro++;
	}
	console.log("prevOrNext: "+prevOrNext+" New countIntro: "+countIntro);
	
	switch (countIntro) {
		case 0:
			// Show Intro Graphics
			$(".introLogos").css('display','block');
			// Add Animate Classes
			$('#intro3').addClass('animated bounceInLeft');
			$('#intro1').addClass('animated rotateIn');
			$('#intro2').addClass('animated lightSpeedIn');
			// 1st End of Animation			
			$("#intro3").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", goPrevNext);
			
			// Hide Videos
			$("video").css('display','none');
			// Remove End of Video
			$("video").unbind("ended", goPrevNext);
			break;
		case 1:
			// Remove Animate Classes
			$('#intro3').removeClass('animated bounceInLeft');
			$('#intro1').removeClass('animated rotateIn');
			$('#intro2').removeClass('animated lightSpeedIn');
			// Hide Intro Graphics
			$(".introLogos").css('display','none');
			$("#intro3").unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", goPrevNext);
			
			// Show Videos
			$("video").css('display','block');
			nextVideo("videos/intro.mp4");
			document.querySelector("video").play();						
			// On End of Video
			$("video").bind("ended", goPrevNext);
			break;
		case 2:
			// Hide 2nd Animation Screen
			$(".slide4").css('display','none');
			// Remove Animate Classes
			$('.slide4 img').removeClass('animated zoomIn');
			// Remove Animation End
			$("#slide4t9").unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", goPrevNext);
			
			$("video").css('display','block');
			nextVideo("videos/intro2.mp4");
			document.querySelector("video").play();	
			// On End of Video
			$("video").bind("ended", goPrevNext);
			break;
		case 3:
			// Hide Videos
			$("video").css('display','none');
			// Remove End of Video
			$("video").unbind("ended", goPrevNext);
			
			// Show 2nd Animation Screen
			$(".slide4").css('display','block');
			$('.slide4 img').addClass('animated zoomIn');
			// 2nd End of Animation	
			$("#slide4t9").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", goPrevNext);
			break;
		case 4:
			// Hide 2nd Animation Screen
			$(".slide4").css('display','none');
			// Remove Animate Classes
			$('.slide4 img').removeClass('animated zoomIn');
			// Remove Animation End
			$("#slide4t9").unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", goPrevNext);
			
			// Show Videos
			nextVideo("videos/intro3.mp4");	
			$("video").css('display','block');									  
			document.querySelector("video").play();
			// On End of Video
			$("video").bind("ended", goPrevNext);
			break;
		case 5:
			// Last Slide
			//$("video").parent().css('display','none');
			$("video").css('display','none');
			// Remove End of Video
			$("video").unbind("ended", goPrevNext);
			break;
		default: 
			break;
	} 
}