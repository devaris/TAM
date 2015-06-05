// JavaScript Document
var currTar = "";
var objPositions = {};
var dndCookie = 'ccTAMex4_2';
var cookieLifetime = 365;
var thenext = 1;
var allObjs = 0;
var totalQs = 4;

function addTada(){
	$(this).removeClass("fadeIn");
	$(this).css("animation-delay", "0s");
	$(this).css("-ms-animation-delay", "0s");
	$(this).css("-webkit-animation-delay", "0s");
	$(this).addClass("tada");
}


function setMenu2(){
				
	addTada();
	
	// positionText(myText);
	$('#picA').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', addTada);
	$('#picB').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', addTada);
	$('#picC').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', addTada);
	$('#picD').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', addTada);
	$('#picE').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', addTada);
	
}
/*
$(document).ready(function() {
	
});
*/