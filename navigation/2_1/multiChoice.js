var xmlDoc;
var xmlloaded = false;
var ua = navigator.userAgent;
var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
var score;
var myHighlight;
var mySignature = "multiple";
var cookieJSON;
var myCookieName = 'ccTAMex2_1';
var cookieLifetime = 365;
var cookieSavedNo=0;
var foundThem=[];

function animateClicks(){
	var x=$(".TrueFalse");
	for (var i=0;i<x.length;i++){
		var y=$(x[i].getElementsByTagName("input"));
		for (var j=0;j<y.length;j++){
			$(y[j].nextElementSibling).addClass('animated fadeInLeft');
		}
	}
}

function hideAnswers(){
	var x=$("input")
	for (i=0;i<x.length;i++){
		$(x[i].nextElementSibling).removeClass("checkCorr");
		$(x[i].nextElementSibling).removeClass("checkWron");
		$(x[i].nextElementSibling).removeClass("showCorr");
	}
	
	var z=$("span")
	for (var j=0;j<z.length;j++){
		var o=$(z[j].getElementsByTagName("img"))
		$(o[1]).removeClass("showMe");
		$(o[1]).addClass("hideMe");
		$(o[2]).removeClass("showMe");
		$(o[2]).addClass("hideMe");
	}
}

function checkAnswersImg(myImg){
	var myInput = $(myImg.parentNode.parentNode.getElementsByTagName("input"))[0]
	myInput.click()
	//checkAnswers()
}
//top: "-=250"
function startAnimation(){
	 $("#truefalses").animate({
		 left: "-144px",
   		 top: "125px"
	    }, 0, function() {
		// Animation complete.
	    });
	$("#truefalses").addClass("solvedAnimation");
}

function checkAnswers(myItem){
	var qScore;
	score  = 0;
	hideAnswers()
	var mistakes
	var questions=$(".TrueFalse")
	//alert("cookiJSON = "+JSON.stringify(cookieJSON))
	for (var i=0;i<questions.length;i++){
		var myCorrects = 0;
		qScore = 0;
		mistakes = 0;
		var answerSel=$(questions[i].getElementsByTagName("input"));
		var answerText=$(questions[i].getElementsByTagName("span"));
		for (var j=0;j<answerSel.length;j++){
			
			if ($(questions[i]).attr("corrects")>1){
				cookieJSON.selections[i][j]=false
			}
			if ($(answerSel[j]).attr("checked")){
				if ($(questions[i]).attr("corrects")>1){
					cookieJSON.selections[i][j]=true
				}
				else{
					cookieJSON.selections[i] = j
				}
				if ($(answerSel[j]).attr("isCorrect")){
					//$(answerSel[j].nextElementSibling).addClass("checkCorr");
					/*var o=$(answerText[j].getElementsByTagName("img"))
					$(o[1]).removeClass("hideMe");
					$(o[1]).addClass("showMe");*/
					foundThem[i] = true;
					$(answerSel[j].nextElementSibling.firstChild).attr("src", "correct.png");
					qScore++
					myCorrects++;
					if (answerSel[j]==myItem){
						audioCorrect();
					}
				}
				else{
					//$(answerSel[j].nextElementSibling).addClass("checkWron");
					//$(answerSel[j].nextElementSibling).addClass('animated fadeOut');
					/*var o=$(answerText[j].getElementsByTagName("img"));
					$(o[2]).removeClass("hideMe");
					$(o[2]).addClass("showMe");*/
					$(answerSel[j].nextElementSibling.firstChild).attr("src", "try_again.png");
					$(answerSel[j].nextElementSibling.firstChild).addClass("animated");
					$(answerSel[j].nextElementSibling.firstChild).addClass("tada");
						if ($(questions[i]).attr("any_answer")){
							mistakes++;
						}
						else
						{
							qScore--;							
						}
					if (answerSel[j]==myItem){
						audioWrong();
					}
				}
			}
			else{
				/*
				if ($(answerSel[j]).attr("isCorrect")){
					$(answerSel[j].nextElementSibling).addClass("checkCorr");
				}
				else{
					$(answerSel[j].nextElementSibling).addClass("checkWron");
					$(answerSel[j].nextElementSibling).addClass('animated fadeOut');
				}
				*/
			}
		}
		if ($(questions[i]).attr("corrects")==myCorrects){
			for (var j=0;j<answerSel.length;j++){
				if (!$(answerSel[j]).attr("checked")){					
					$(answerSel[j].nextElementSibling).addClass("checkWron");
					//$(answerSel[j].nextElementSibling).addClass('animated fadeOut');
				}
			}
		}
		if (qScore/$(questions[i]).attr("corrects")<1){
			if ($(questions[i]).attr("any_answer")){
				if (mistakes>0){
					qScore = 0
				}
			}
			else{
				qScore = 0
			}
		}
		else{
			qScore = 1
			if ($(questions[i]).attr("any_answer")){
				if (mistakes>0){
					qScore = 0;
				}
			}
		}
		score=score+qScore;
	}	
	$("#myScore").val(score);
	foundAll = 0;
	for (var i=0;i<questions.length;i++){
		var answerSel=$(questions[i].getElementsByTagName("input"))
		var answerText=$(questions[i].getElementsByTagName("span"))
		if (foundThem[i]==true){
			foundAll++;
			for (var j=0;j<answerSel.length;j++){
				$(answerSel[j]).attr("checked", true);
				/*if ($(answerSel[j]).attr("isCorrect")){
					
				}
				else{
					var o=$(answerText[j].getElementsByTagName("img"))
					$(o[1]).removeClass("hideMe");
					$(o[1]).addClass("showMe");
				}*/
				$(answerSel[j]).attr('disabled', true);
				$(answerSel[j]).parent().attr('style','cursor:default')
			}
		}
	}
	
	
	var myBrowser = get_browser();
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(myCookieName,null);
		localStorage.setObject(myCookieName,cookieJSON);
	}
	else{
		$.removeCookie(myCookieName)
		$.cookie(myCookieName, cookieJSON, {expires: cookieLifetime});
	}	
	if ($(questions[i]).attr("any_answer")){
		if (mistakes>0){
			qScore = 0
		}
	}
	
	var y=exJSON.exercise.items;
	//$("#myScorePerc").val(Math.round((score/y.length)*100) + '%')
	//alert (Math.round((score/y.length)*100) + '%')
	//updateMain(this);
	if ((Math.round((score/y.length)*100)==100)&&(foundAll==y.length)){
		//alert("disable all")
		$("input").attr('disabled', true);
		$("ul li").attr('style','cursor:default');
		$(".exInfo").attr('style','display:block');
		$(".exInfo").addClass("animated slideInUp");
		//setTimeout("openTools()", 3000);
		//audioCorrect();
		startAnimation();
		// COMPLETED MAIN ACTIVITY 
     	window.parent.activateFor();
	} else {
		//audioWrong();
	}
}

function openTools(){
	this.parent.parent.openTheTool(5)
}

function showAnswers(){
	var x=$("input")
	for (i=0;i<x.length;i++){
		if ($(x[i]).attr("iscorrect")){
			$(x[i].nextElementSibling).addClass("showCorr");
		}
	}
}

function readJSON() {
	var theJSONElements = "";
	var countCorrect;
	var itemType;
	var exItems=exJSON.exercise.items;
	var selectedAttr;
	var myClass;
	var markCorrClass;
	var markWronClass;
	//alert(x.length);
	for (i=0;i<exItems.length;i++)
	{
		countCorrect = 0;
		theJSONElements += '<div id="tf' + (i+1) + '" class="TrueFalse"';
		var w=exItems[i].stem;
		var y=exItems[i].answers;
		var o=exItems[i].correct;
		countCorrect = o.length;
		theJSONElements += ' corrects='+countCorrect;
		if (exItems[i].any_answer){
			theJSONElements += ' any_answer="true"';
		}
		theJSONElements += '> <div class="stem">' + w + '</div>'+'<ul>';
		if ((countCorrect>1)||(exItems[i].checkbox)){
			itemType = "checkbox";
		}
		else{
			itemType = "radio";
		}		
		if (cookieJSON.selections[i]==undefined){
			if (countCorrect>1){
				cookieJSON.selections[i]=[];
				for (j=0;j<y.length;j++){
					cookieJSON.selections[i].push("false");
				}
			}
			else{
				cookieJSON.selections[i]=-1;
			}
			selectedAttr = cookieJSON.selections[i];
		}
		else{
			selectedAttr = cookieJSON.selections[i];
		}
		for (j=0;j<y.length;j++)
		{
			myClass = ' class="checkWron"';
			markCorrClass = "hideMe";
		//	markWronClass = "showMe";
			if ((exJSON.exercise.checkButton)&&(exJSON.exercise.checkButton=="true")){
				theJSONElements += '<li>'+'<input name="mul'+i+'" type="'+itemType+'"' + ' onclick=hideAnswers()'
			}
			else {
				theJSONElements += '<li>'+'<input name="mul'+i+'" type="'+itemType+'"' + ' onclick=checkAnswers(this)'
			}
			for (var k=0;k<countCorrect;k++){
				if (o[k]==j){
					theJSONElements += ' isCorrect=true';
					myClass = ' class="checkCorr"';
					//markCorrClass = "showMe";
					markWronClass = "hideMe" ;
				}
			}
			if (countCorrect>1){
				if (selectedAttr[j]==true){
					cookieSavedNo++;
					theJSONElements += ' checked';
				}
				else{
					myClass = '';
					markCorrClass = "hideMe";
					markWronClass = "hideMe";
				}
			}
			else{
				if (j==selectedAttr){
					cookieSavedNo++;
					theJSONElements += ' checked';
				}
				else{
					myClass = ''
					markCorrClass = "hideMe";
					markWronClass = "hideMe";
				}
			}
			
			//theJSONElements += ' />'+'<span'+myClass+'>'+ y[j]+'<img class="imageChoicePos" src="'+y[j]+'" alt="'+y[j]+'"><img class="mymark '+markCorrClass+'" src="../../images/corr.png" width="30" height="30"><img class="mymark '+markWronClass+'" src="../../images/wron.png" width="30" height="30"></span>'+'</li>'
			//theJSONElements += ' class="hideMe"/>'+'<span'+myClass+'>'+ ''+'<img class="imageChoicePos" src="'+y[j]+'" alt="'+y[j]+'" onclick=checkAnswersImg(this)><img class="mymark '+markCorrClass+'" src="../../images/thumbsUp.png" width="93" height="54"><img class="mymark '+markWronClass+'" src="../../images/thumbsDown.png" width="93" height="54"></span>'+'</li>'
			theJSONElements += ' class="hideMe"/>'+'<span'+myClass+'>'+ ''+'<img class="imageChoicePos" src="'+y[j]+'" alt="'+y[j]+'" onclick=checkAnswersImg(this)></span>'+'</li>'
		}
		theJSONElements += '</ul>'+'</div>';
	}
	
	/*
	var z=exJSON.exercise.rubric
	theJSONElements += '<div class="sidebarCont2">' + z + '</div>'
	*/
	return theJSONElements;
}

function call1(){
	var x = exJSON.exercise.myText;
	document.getElementById("readTextarea").innerHTML = x;
	return true;
}

function callorig(kati){
	var x=$(".highlight");
	for (var i=0;i<x.length;i++)
	{
		if ($(x[i]).attr("id")=="hl"+myHighlight){
			$(x[i]).addClass("under");
		}
	}
	if ($("#readTextarea .scrollOnce").length != 0){
		$('#readTextarea').animate({scrollTop: $("#readTextarea .scrollOnce").offset().top - 100}, 0);
	}
//	$('#readTextarea').animate({scrollTop: $("#scrollAnchor").offset().top}, 0);
}

function makePageChanges(theContent){
	myHighlight = 0;
	$("#truefalses").html(theContent);
	var x=$(".TrueFalse");
	//alert("cookiJSON = "+JSON.stringify(cookieJSON))
	for (var i=0;i<x.length;i++){
		var y=$(x[i].getElementsByTagName("input"));
		var z=$(x[i].getElementsByTagName("span"));
		var myCorrects = 0;
		for (var j=0;j<y.length;j++){
			if ($(y[j]).attr("checked")&&$(y[j]).attr("isCorrect")){		
				myCorrects++;
			}
		}
		for (var k=0;k<z.length;k++){
			$(z[k]).parent().addClass("animated");
			$(z[k]).parent().addClass("zoomIn");
		}
		if ($(x[i]).attr("corrects")==myCorrects){
			for (var j=0;j<y.length;j++){
				if (!$(y[j]).attr("checked")){					
					//$(y[j].nextElementSibling).addClass("checkWron");
					//$(y[j].nextElementSibling).addClass('animated fadeOut');
				}
				else{
					if ($(y[j]).attr("isCorrect")){
						$(y[j].nextElementSibling.firstChild).attr("src", "correct.png");
						$(".exInfo").attr('style','display:block');
						$(".exInfo").addClass("animated slideInUp");
						startAnimation();
						window.parent.activateFor();
					}
					else{
						$(y[j].nextElementSibling.firstChild).attr("src", "try_again.png");
					}
				}
				$(y[j]).attr('disabled', true);
				$(y[j]).parent().attr('style','cursor:default');
			}
		}
		else{
			for (var j=0;j<y.length;j++){
				if (!$(y[j]).attr("checked")){					
					//$(y[j].nextElementSibling).addClass("checkWron");
					//$(y[j].nextElementSibling).addClass('animated fadeOut');
				}
				else{
					if ($(y[j]).attr("isCorrect")){
						$(y[j].nextElementSibling.firstChild).attr("src", "correct.png");
					}
					else{
						$(y[j].nextElementSibling.firstChild).attr("src", "try_again.png");
					}
				}
			}
		}
		if (cookieSavedNo>0){
			//$(y[j]).attr("checked", true);
			//if ($(y[j]).attr("isCorrect")){
				//$(y[j]).attr("checked", true);
				//$(y[j].nextElementSibling).addClass("checkCorr");										
			//}
			//else{
				//$(y[j].nextElementSibling).addClass("checkWron");
				//$(y[j].nextElementSibling).addClass('animated fadeOut');
				/*
				var o=$(z[j].getElementsByTagName("img"))
				$(o[1]).removeClass("hideMe");
				$(o[1]).addClass("showMe");
						*/
			//}
			$(y[j]).attr('disabled', true);
			$(y[j]).parent().attr('style','cursor:default');
			// COMPLETED MAIN ACTIVITY 
     		//window.parent.activateFor();
		}
	}
	//callorig(call1());
}

Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}
function get_browser(){
    var N=navigator.appName, ua=navigator.userAgent, tem;
    var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
    return M[0];
    }
function get_browser_version(){
    var N=navigator.appName, ua=navigator.userAgent, tem;
    var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
    return M[1];
    }

function clearCookie(){
	var myBrowser = get_browser();
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(myCookieName,{'selections':[]});
	}
	else{
		if ($.cookie(myCookieName)===null){		
		}
		else{
			cookieJSON = $.cookie(myCookieName)
		}
		$.removeCookie(myCookieName);
	}	
}

$(document).ready(function() {	
	var doIreset=false;
	try {
		doIreset=window.parent.resetEx();
	}
	catch(e){
	}
	
	if (doIreset==true)
		clearCookie();
	var myBrowser = get_browser();
	//alert("myBrowser = "+myBrowser);
	//alert("isiPad = "+isiPad);
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
	//$.removeCookie(myCookieName)
		$.cookie.json = true;
		if ($.cookie(myCookieName)===null){		
			$.cookie(myCookieName, {'selections':[]}, {expires: cookieLifetime});
			cookieJSON = $.cookie(myCookieName)
		}
		else{
			cookieJSON = $.cookie(myCookieName)
		}
	}
	//alert("cookiJSON = "+JSON.stringify(cookieJSON))
	score = 0;
	makePageChanges(readJSON());
	$("#showAnswers").click(function(){
		showAnswers()
 	});
	$("#checkAnswers").click(function(){
		checkAnswers()
 	});
	if ((exJSON.exercise.checkButton)&&(exJSON.exercise.checkButton=="true")){
	}
	else{
		document.getElementById("showAnswers").style.display = "none";
		document.getElementById("checkAnswers").style.display = "none";
	}
	
	//sendMyRubric();
	animateClicks();
	//window.parent.showRelevantItems(mySignature);
});