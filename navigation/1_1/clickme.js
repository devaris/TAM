// GLOBALS
var correctAns = [0,1,1,1,0,0,1,1,1];
var corrToFind = 0;
var totalCorr = 0;
var totalWrong = 0;

// COOKIES
var cookieJSON;
var myCookieName ='ccTAMex1_1';
var cookieLifetime = 365;

var myBrowser = get_browser();
if ((myBrowser=='Chrome')||(isiPad==true)) {
	if (localStorage.getItem(myCookieName)===null){	
		localStorage.setObject(myCookieName,{'selections':[]})
		cookieJSON = localStorage.getObject(myCookieName)
	}
	else{
		cookieJSON = localStorage.getObject(myCookieName)
	}
}
else{
	$.cookie.json = true;
	if ($.cookie(myCookieName)===null){		
		$.cookie(myCookieName, {'selections':[]}, cookieLifetime);
		cookieJSON = $.cookie(myCookieName)
	}
	else{
		cookieJSON = $.cookie(myCookieName)
	}
}

// FUNCTIONS
function checkWrong(){
	var wrongIs = false;					
	jQuery.each(correctAns, function(index, value) {					
		if(value==0 && $('#slide11_T'+(index+1)).css('visibility') == 'visible'){
			wrongIs = true;
		}						
	});					
	return wrongIs;
}

function checkCompletion(){
	//alert("totalCorr: "+totalCorr+" corrToFind: "+corrToFind+" checkWrong():"+checkWrong());
	// ALL CORRECT COMPLETED
	//if(totalCorr==corrToFind && !checkWrong()){
	if(totalCorr==corrToFind){
		//alert("ALL Correct");
		if(window.top){
			window.top.activateFor();
		} else {
			window.parent.activateFor();
		}
		
		$(".slide11b img").unbind("click", clickItems);
		$(".slide11b img").css('cursor','default');
		
	}// END if totalCorr	
}

function clickItems(){
	
	if($('#slide11_T'+($(this).index()+1)).css('visibility') == 'visible'){
		$('#slide11_T'+($(this).index()+1)).css('visibility','hidden');
		cookieJSON.selections[$(this).index()]=0;
			
		if (correctAns[$(this).index()]==1){
			totalCorr--;
		} else {
			totalWrong--;
		}
	} else {
		// INITIAL CLICK
		$('#slide11_T'+($(this).index()+1)).css('visibility','visible');
		cookieJSON.selections[$(this).index()]=1;
		
		if (correctAns[$(this).index()]==1){
			totalCorr++;
			audioCorrect();
		} else {
			totalWrong++;
			audioWrong();
		} // END if of Correct
		
	} // END if Option is VISIBLE
	
	
	checkCompletion();
	
	// SAVE CHANGES IN COOKIE
	var myBrowser = get_browser();
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(myCookieName,null);
		localStorage.setObject(myCookieName,cookieJSON)
	}
	else{
		$.removeCookie(myCookieName)
		$.cookie(myCookieName, cookieJSON, cookieLifetime);
	}	
	
} // END function clickItems 
	
	
$(document).ready(function(){
				
	// Add animation
	$('.slide11a img').addClass('animated bounceInDown');
	$('.slide11b img').addClass('animated zoomIn');
	$('#slide11_pad').addClass('animated zoomIn');
						   
	
	// INIT ACTIVITY
	jQuery.each(correctAns, function(index, value) {
		//if(correctAns[index]==1){
		if(value==1){
			corrToFind++;
		}
		
		// INIT COOKIES
		if(cookieJSON.selections[index]===1){
			$('#slide11_T'+(index+1)).addClass('animated zoomIn');
			$('#slide11_T'+(index+1)).css('visibility','visible');
			
			if (correctAns[index]==1){
				totalCorr++;
			} else {
				totalWrong++;
			} // END if of Correct
		}
		
		// return (this != "three"); //will stop running after "three"
		return corrToFind;
	});

	// Add Interactivity
	$(".slide11b img").click(clickItems);
	
	checkCompletion();	
	
}); // End of $(document).ready