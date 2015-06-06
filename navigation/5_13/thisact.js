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
myScore = window.parent.getchapter5Score();

// COMPLETED MAIN ACTIVITY 
window.parent.activateFor();


$(document).ready(function() {
	

	 if (myScore >= 90){
		 $(".scoreLow").css("display", "none");
		 window.parent.changeHome();
	 }
	 else{
		 $(".scoreHigh").css("display", "none");
	 }

	  $(".scoreLow .choice0").on("click", function(){
		  //window.location.href = "1/exercise.html";
		  window.parent.resetChapter5Array();
		  window.parent.homeChapter5();	
	 });
	 
	 $(".scoreHigh .choice0").on("click", function(){
		  //window.location.href = "1/exercise.html";
		  window.parent.gotoChapter6Activity(0);});
	 
	 var myText = "I am afraid that the pass<br>score is 90%... And you<br>have only achieved "+myScore+"%.<br>Let's give it another try.";
	 $(".speech").html(myText);
	 
});