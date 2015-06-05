// JavaScript Document
var currTar = "";
var objPositions = {};
var dndCookie = 'ccTAMex5_13';
var cookieLifetime = 365;
var thenext = 1;
var allObjs = 0;
var totalQs = 4;

var myScore;

// Return Total Score
if(window.top){myScore = window.top.getchapter5Score();} else {myScore = window.parent.getchapter5Score();}

// COMPLETED MAIN ACTIVITY 
if(window.top){window.top.activateFor();} else {window.parent.activateFor();}


$(document).ready(function() {
	

	 if (myScore >= 90){
		 $(".scoreLow").css("display", "none");
		 if(window.top){window.top.changeHome();} else {window.parent.changeHome();}
	 }
	 else{
		 $(".scoreHigh").css("display", "none");
	 }

	  $(".scoreLow .choice0").on("click", function(){
		  //window.location.href = "1/exercise.html";
		  if(window.top){window.top.resetChapter5Array();} else {window.parent.resetChapter5Array();}
		  if(window.top){window.top.homeChapter5();} else {window.parent.homeChapter5();}	
	 });
	 
	 $(".scoreHigh .choice0").on("click", function(){
		  //window.location.href = "1/exercise.html";
		  if(window.top){window.top.gotoChapter6Activity(0);} else {window.parent.gotoChapter6Activity(0);}	  
	 });
	 
	 var myText = "I am afraid that the pass<br>score is 90%... And you<br>have only achieved "+myScore+"%.<br>Let's give it another try.";
	 $(".speech").html(myText);
	 
});