// JavaScript Document
var currTar = "";
var objPositions = {};
var dndCookie = 'ccTAMex5_28';
var cookieLifetime = 365;
var thenext = 1;
var allObjs = 0;
var totalQs = 4;
var myScore;

// Return Total Score
if(window.top){myScore = window.top.getchapter5Score();} else {myScore = window.parent.getchapter5Score();}

	
$(document).ready(function() {
	 //positionText(myText);
	 if (myScore >= 90){
		 $(".scoreLow").css("display", "none");
	 }
	 else{
		 $(".scoreHigh").css("display", "none");
	 }
	 // THE MENU OF FAILURE
	  $(".scoreLow .choice0").on("click", function(){
		  //window.location.href = "1/exercise.html";
		  if(window.top){window.top.resetChapter5Array();} else {window.parent.resetChapter5Array();}
		  if(window.top){window.top.gotoChapter6Activity(2);} else {window.parent.gotoChapter6Activity(2);}	
	 });
	  
	 // THE MENU OF SUCCESS
	 $(".scoreHigh .choice0").on("click", function(){
		  //window.location.href = "1/exercise.html";
		  // COMPLETED MAIN ACTIVITY 
		  if(window.top){window.top.activateFor();} else {window.parent.activateFor();}
		  
		  //GOTO
		  if(window.top){window.top.gotoChapter6Activity(0);} else {window.parent.gotoChapter6Activity(0);}	
	 });
	 
	 // THE END OF SUCCESS
	 $(".scoreHigh .choice1").on("click", function(){
		  //window.location.href = "../5_38/exercise.html";
		  if(window.top){window.top.theEnd();} else {window.parent.theEnd();}
	 });
});