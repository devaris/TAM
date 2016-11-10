// JavaScript Document
var currTar = "";
var objPositions = {};
var dndCookie = 'ccTAMex5_24';
var cookieLifetime = 365;
var thenext = 1;
var allObjs = 0;
var totalQs = 4;
var myScore;

// Return Total Score
myScore = window.parent.getchapter5Score();

	
$(document).ready(function() {
	 //positionText(myText);
	 if (myScore >= 90){
		 $(".scoreLow").css("display", "none");
		 
		//Scorm
		window.parent.setComplete();
	 }
	 else{
		 $(".scoreHigh").css("display", "none");
	 }
	 
	 
	 // THE MENU OF FAILURE
	  $(".scoreLow .choice0").on("click", function(){
		  //window.location.href = "1/exercise.html";
		  window.parent.resetChapter5Array();
		  window.parent.gotoChapter6Activity(1);	
	 });
	  
	 // THE MENU OF SUCCESS
	 $(".scoreHigh .choice0").on("click", function(){
		  //window.location.href = "1/exercise.html";
		  
		  // COMPLETED MAIN ACTIVITY 
		  window.parent.activateFor();
		  
		  // GOTO
		  window.parent.gotoChapter6Activity(0);	});
	 
	 // THE END OF SUCCESS
	 $(".scoreHigh .choice1").on("click", function(){
		  //window.location.href = "../5_38/exercise.html";
		  window.parent.theEnd();
	 });
});

	 


	 