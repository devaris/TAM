// GLOBALS
var slide4_correctAns = [1,1,1,1,1];
var slide4_corrToFind = 0;
var slide4_totalCorr = 0;
var slide4_totalWrong = 0;

// COOKIES
var slide4_cookieJSON;
var slide4_myCookieName ='ccTAMex0_4';
var slide4_cookieLifetime = 365;

var slide4_myBrowser = get_browser();
if ((slide4_myBrowser=='Chrome')||(isiPad==true)) {
	if (localStorage.getItem(slide4_myCookieName)===null){	
		localStorage.setObject(slide4_myCookieName,{'selections':[]})
		slide4_cookieJSON = localStorage.getObject(slide4_myCookieName)
	}
	else{
		slide4_cookieJSON = localStorage.getObject(slide4_myCookieName)
	}
}
else{
	$.cookie.json = true;
	if ($.cookie(slide4_myCookieName)===null){		
		$.cookie(slide4_myCookieName, {'selections':[]}, slide4_cookieLifetime);
		slide4_cookieJSON = $.cookie(slide4_myCookieName)
	}
	else{
		slide4_cookieJSON = $.cookie(slide4_myCookieName)
	}
}

// FUNCTIONS
function audioCorrect() {

	// Create Audio Element
	var audio = document.createElement("audio");
	
	audio.src = "audio/correct.mp3";		
	
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
		audio.currentTime = 0;
	}
}
function audioWrong() {

	// Create Audio Element
	var audio = document.createElement("audio");

	audio.src = "audio/warning.mp3";	
	
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
		audio.currentTime = 0;
	}
}

function slide4_checkWrong(){
	var wrongIs = false;					
	jQuery.each(slide4_correctAns, function(index, value) {					
		if(value==0 && $('#slide4_T'+(index+1)).css('visibility') == 'visible'){
			wrongIs = true;
		}						
	});
	return wrongIs;
}

function slide4_checkCLICKCompletion(){
	//alert("slide4_totalCorr: "+slide4_totalCorr+" slide4_corrToFind: "+slide4_corrToFind+" slide4_checkWrong():"+slide4_checkWrong());
	/* ALL CORRECT COMPLETED */
	if(slide4_totalCorr==slide4_corrToFind && !slide4_checkWrong()){
		
		chaptersCompleted[0][3] = 1;
		handleIntro();	
		
		//alert("ALL Correct");
	
	}// END if slide4_totalCorr	
}

function slide4_clickItems(){
	
	if($('#slide4_T'+($(this).index()+1)).css('visibility') == 'visible'){
		$('#slide4_T'+($(this).index()+1)).css('visibility','hidden');
		slide4_cookieJSON.selections[$(this).index()]=0;
			
		if (slide4_correctAns[$(this).index()]==1){
			slide4_totalCorr--;
		} else {
			slide4_totalWrong--;
		}
	} else {
		// INITIAL CLICK
		$('#slide4_T'+($(this).index()+1)).css('visibility','visible');
		slide4_cookieJSON.selections[$(this).index()]=1;
		
		if (slide4_correctAns[$(this).index()]==1){
			slide4_totalCorr++;
			audioCorrect();
		} else {
			slide4_totalWrong++;
			audioWrong();
		} // END if of Correct
		
	} // END if Option is VISIBLE
	
	slide4_checkCLICKCompletion();
	
	// SAVE CHANGES IN COOKIE
	var slide4_myBrowser = get_browser();
	if ((slide4_myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(slide4_myCookieName,null);
		localStorage.setObject(slide4_myCookieName,slide4_cookieJSON)
	}
	else{
		$.removeCookie(slide4_myCookieName)
		$.cookie(slide4_myCookieName, slide4_cookieJSON, slide4_cookieLifetime);
	}	
	
} // END function slide4_clickItems 
	

function runSlide4DocumentReady(){
	// Add Interactivity
	$(".slide4b img").click(slide4_clickItems);	
}
function removeAnimationSlide4(){
	/* Remove animation*/
	$('.slide4a img').removeClass('animated bounceInDown');
	$('.slide4b img').removeClass('animated zoomIn');
	$('.slide4c img').removeClass('animated zoomIn');
}						   
function runSlide4Init(){
	/* DELETE LOCAL STORAGE
	localStorage.setObject(myCookieName,null);
	*/
	// INIT ANIMATION
	document.querySelector(".slide4a img").offsetWidth = document.querySelector(".slide4a img").offsetWidth;
	document.querySelector(".slide4b img").offsetWidth = document.querySelector(".slide4b img").offsetWidth;
	document.querySelector(".slide4c img").offsetWidth = document.querySelector(".slide4c img").offsetWidth;

	/* Add animation */
	$('.slide4a img').addClass('animated bounceInDown');
	$('.slide4b img').addClass('animated zoomIn');

	/* INIT ACTIVITY */
	jQuery.each(slide4_correctAns, function(index, value) {
		//if(slide4_correctAns[index]==1){
		if(value==1){
			slide4_corrToFind++;
		}
		
		// INIT COOKIES
		if(slide4_cookieJSON.selections[index]===1){
			$('#slide4_T'+(index+1)).addClass('animated zoomIn');
			$('#slide4_T'+(index+1)).css('visibility','visible');
			
			if (slide4_correctAns[index]==1){
				slide4_totalCorr++;
			} else {
				slide4_totalWrong++;
			} // END if of Correct
		}
		
		// return (this != "three"); //will stop running after "three"
		return slide4_corrToFind;
	});
	
	
	// End of Animation	IF COMPLETED!!!	
	if(chaptersCompleted[0][3] == 1){
		$("#slide4_T5").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", handleIntro);	
	}
	// End of Animation	IF COOKIES COMPLETED!!!	
	else if(slide4_totalCorr==slide4_corrToFind && !slide4_checkWrong()){
		$("#slide4_T5").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", handleIntro);	
	}
}
				
		  
	
	
