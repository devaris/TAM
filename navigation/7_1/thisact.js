// JavaScript Document
var currTar = "";
var dndCookie = 'ccTAMex5_37';
var cookieLifetime = 365;
var thenext = 1;
var allObjs = 0;
var totalQs = 4;
var myScore;

// Return Total Score
//if(window.top){myScore = window.top.getchapter5Score();} else {myScore = window.parent.getchapter5Score();}

// End Scorm
if(window.top){window.top.setComplete();} else {myScore = window.parent.setComplete();}
	
$(document).ready(function() {
	document.querySelector("video").play();
});