// JavaScript Document
var currTar = "";
var objPositions = {};
var dndCookie = 'ccTAMex3_1';
var cookieLifetime = 365;
var thenext = 1;
var allObjs = 0;
var totalQs = 4;

var cTl = {};
cTl.crosswrdCookie = 'FGcrosswrdCookie';

cTl.cookieLifetime = 365;
cTl.elements = [];
cTl.crosswrd = 'EF';
cTl.crosswrdData = {};
cTl.completedPieces = 0;

function startAnimation(){
	$(".subtitle").removeClass("animated");
	$(".subtitle").removeClass("bounceInLeft");
	$(".crossDiv").removeClass("animated");
	$(".crossDiv").removeClass("fadeIn");
	$(".subtitle").animate({
		 left: "261px",
   		 top: "268px"
	    }, 0, function() {
		// Animation complete.
	    });
	$(".subtitle").addClass("solvedAnimation");
	$(".crossDiv").animate({
		 left: "-136px",
   		 top: "295px"
	    }, 0, function() {
		// Animation complete.
	    });
	$(".crossDiv").addClass("solvedAnimation");
	$("#fefo0").css("display", 'block');
	$("#fefo1").css("display", 'block');
	$("#fefo2").css("display", 'block');
	$("#fefo3").css("display", 'block');
	$(".extraInfo").css("display", 'block');
	$("#fefo0").addClass("animated fadeIn");
	$("#fefo1").addClass("animated fadeIn");
	$("#fefo2").addClass("animated fadeIn");
	$("#fefo3").addClass("animated fadeIn");
	$(".extraInfo").addClass("animated bounceIn");
}

$(document).ready(function() {
	$("#fefo0").css("display", 'none');
	$("#fefo1").css("display", 'none');
	$("#fefo2").css("display", 'none');
	$("#fefo3").css("display", 'none');
	$(".extraInfo").css("display", 'none');
	 $('input.crosswrd').keypress(function(event) {
		if (event.which == 2) {
			//event.preventDefault();
			$(this).val("");
			cTl.crosswrdData[$(this).attr("id")] = $(this).val();
			$(this).css("color", "#000");
			var tmpId = Number($(this).attr("id").replace("inp", ""));
			tmpId--;
			try {
			$("#" + "inp" + tmpId).focus();
			} catch (err) {
			//focus nowhere!
			}
		}
		else {
			//		alert(event.which);
			$(this).val(String.fromCharCode(event.which));
			var tmpId = Number($(this).attr("id").replace("inp", ""));
			if ($(this).val().toUpperCase() == $("#" + "hinp" + tmpId).val()) {
			$(this).css("color", "#090");
			audioCorrect();
			
			allObjs++;
			if(allObjs == 2){
				// COMPLETED MAIN ACTIVITY 
				window.parent.activateFor();
				
				// HOME ANIME 
				window.parent.animateHome();
			}
			
			
			} else {
			$(this).css("color", "#F00");
			audioWrong();
			}
			cTl.crosswrdData[$(this).attr("id")] = $(this).val();
			tmpId++;
			try {
			$("#" + "inp" + tmpId).focus();
			} catch (err) {
			//focus nowhere!
			}
		}
		});

    $('input.crosswrd').keyup(function(event) {

	if (event.which == 8) {
	    //event.preventDefault();
	}
	else {
	    var tmpChecks = $('input.crosswrd').length;
	    var tmpSolution = "";
	    for (var i = 0; i < tmpChecks; i++) {
			tmpSolution = tmpSolution + $('input.crosswrd')[i].value;
	    }
	    if (tmpSolution.toUpperCase() == cTl.crosswrd) {
		$("span.crossText").css("visibility", "visible");
		$('input.crosswrd').unbind();
		$("input.crosswrd").attr('disabled', 'disabled');
		startAnimation();

	    }
	}
	var myBrowser = get_browser();
	if (myBrowser == 'Chrome') {
	    localStorage.setObject(cTl.crosswrdCookie, cTl.crosswrdData);
	} else {

	    $.cookie(cTl.crosswrdCookie, cTl.crosswrdData, {expires: cTl.cookieLifetime});
	}
    });

    //then ready cookies
    $.cookie.json = true;
    var myBrowser = get_browser();
	 //cookie for crossword		
    if (myBrowser == 'Chrome') {
		if (localStorage.getItem(cTl.crosswrdCookie) === null) {
			var tmpChecks = $('input.crosswrd').length;
			for (var i = 0; i < tmpChecks; i++) {
				cTl.crosswrdData["inp" + i] = "";
			}
			localStorage.setObject(cTl.crosswrdCookie, cTl.crosswrdData);
			cTl.crosswrdData = localStorage.getObject(cTl.crosswrdCookie);
		}
		else {
			cTl.crosswrdData = localStorage.getObject(cTl.crosswrdCookie);
			var tmpChecks = $('input.crosswrd').length;
			var tmpSolution = "";
			for (var i = 0; i < tmpChecks; i++) {
				$("#" + "inp" + i).val(cTl.crosswrdData["inp" + i]);
				tmpSolution = tmpSolution + $("#" + "inp" + i).val();
				if ($("#" + "inp" + i).val() == $("#" + "hinp" + i).val()) {
					$("#" + "inp" + i).css("color", "#090");
				} else {
					$("#" + "inp" + i).css("color", "#F00");
				}
			}
			if (tmpSolution.toUpperCase() == cTl.crosswrd) {
				$("span.crossText").css("visibility", "visible");
				$('input.crosswrd').unbind();
				$("input.crosswrd").attr('disabled', 'disabled');
				//alert("open tool crooswd");
				//setTimeout("openTheTool(3)", 10);
				startAnimation();
				
				// COMPLETE
				window.parent.activateFor();
				
				// HOME ANIME 
				window.parent.animateHome();
			}
		}
    }
    else {
		if ($.cookie(cTl.crosswrdCookie) === null) {
			var tmpChecks = $('input.crosswrd').length;
			for (var i = 0; i < tmpChecks; i++) {
			cTl.crosswrdData["inp" + i] = "";
			}
	
			$.cookie(cTl.crosswrdCookie, cTl.crosswrdData, {expires: cTl.cookieLifetime});
		}
		else {
			cTl.crosswrdData = $.cookie(cTl.crosswrdCookie);
			var tmpChecks = $('input.crosswrd').length;
			var tmpSolution = "";
			for (var i = 0; i < tmpChecks; i++) {
				$("#" + "inp" + i).val(cTl.crosswrdData["inp" + i]);
				tmpSolution = tmpSolution + $("#" + "inp" + i).val();
				if ($("#" + "inp" + i).val().toUpperCase() == $("#" + "hinp" + i).val().toUpperCase()) {
					$("#" + "inp" + i).css("color", "#090");
				} else {
					$("#" + "inp" + i).css("color", "#F00");
				}
			}
			if (tmpSolution.toUpperCase() == cTl.crosswrd) {
				$("span.crossText").css("visibility", "visible");
				$('input.crosswrd').unbind();
				$("input.crosswrd").attr('disabled', 'disabled');
				//alert("open tool crooswd");
				//setTimeout("openTheTool(3)", 10);
				startAnimation();
				window.parent.activateFor();
				
				// HOME ANIME 
				window.parent.animateHome();
			}
		}
    }
	var myBrowser = get_browser();
	if (myBrowser == 'Chrome') {
	    localStorage.setObject(cTl.highlightCookie, cTl.highlightData);
	} else {
	    $.cookie(cTl.highlightCookie, cTl.highlightData, {expires: cTl.cookieLifetime});
	}
    
});