// ************ Global Vars ************

// Counters ++
var countIntro = 0;
var countChapters = 0;
var countActivity = 0;

// ************ Arrays  **************** 

// **** CONSTANTS
var chaptersTotalAct = [7,5,9,1,4,13,24];
var subMenuChapters = [[0,0,0,0,0,0,0],[0,0,2,2,2],[0,0,0,3,3,3,3,0,0],[0],[0,1,1,1],[0,1,1,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

// **** DYNAMIC
var chaptersCompleted = [[0,0,0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0],[0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
//var chaptersCompleted = [[0,0,0,0,0,0],[1,1,1,1,1],[1,1,1,1,1,1,1,1,1],[0],[1,1,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

// Score/Quizzes
var chapter5Array = [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1]];
var subChapterCounter;

//Property to Change Menu 2
var menu2Activated = false;

// Alert for Arrays
function alertArray(array){
	var mycutArray = "";
	jQuery.each(array, function(index, value) {
		mycutArray += " cell"+index+" :"+value;
	});
	return mycutArray;
}

/***************************************************
					INIT
*****************************************************/

// **** Update Main Variables (countChapters + countActivity) ****
function updateCountChapters(newValue){
	countChapters = newValue;
}

function updateCountActivity(newValue){
	countActivity = newValue;
}

// Function to Update Main Menu Button Choices
function updateChapterActivityMenuButtons(newChapter,newActivity){
	updateCountChapters(newChapter);
	updateCountActivity(newActivity);
}

function checkScoreChap5(){
	
	// **** Fill Arrays/SCORE Chapter 5+6 ****
	var temp5Score = 0;
	
	$.each(chapter5Array, function(index, value) {
		
		// FILL Chapters Completed
		$.each(chapter5Array[index], function(index2, value2) {
			
			// CHECK IF CHAPTER 5 IS COMPLETED / ABOVE 90%			
			if(index == 0 && index2 != 0 && index2 != (chapter5Array[0].length-1)){
				temp5Score = temp5Score+chapter5Array[index][index2];
			} 

		});
    });
	
	
	temp5Score = Math.round(temp5Score/(chapter5Array[0].length-2));
	
	// IF Chapter 5 has more than 90% proceed to the quizzes
	if (temp5Score >= 90){
		changeHome();
		console.log("changeHome!! temp5Score: "+temp5Score);
	}	
}

// **** COOKIES for Main ****

var cookieMainJSON;
var myCookieMainName ='ccTAMmain';
var cookieMainLifetime = 365;

function initCookiesMain(){
	
	var myBrowser = get_browser();

	if ((myBrowser=='Chrome')||(isiPad==true)) {
		if (localStorage.getItem(myCookieMainName)===null){	
			localStorage.setObject(myCookieMainName,{'selections':[],'extraChapters':[]});
			cookieMainJSON = localStorage.getObject(myCookieMainName);
		}
		else{
			cookieMainJSON = localStorage.getObject(myCookieMainName);
		}
	}
	else{
		$.cookie.json = true;
		if ($.cookie(myCookieMainName)===null){		
			$.cookie(myCookieMainName, {'selections':[],'extraChapters':[]}, cookieMainLifetime);
			cookieMainJSON = $.cookie(myCookieMainName);
		}
		else{
			cookieMainJSON = $.cookie(myCookieMainName);
		}
	}
	// **** Fill chaptersCompleted Array ****
	$.each(chaptersCompleted, function(index, value) {
		
		if(!cookieMainJSON.selections[index]){
			//alert("cookieMainJSON.selections NOT DEFINED")
			cookieMainJSON.selections[index] = chaptersCompleted[index];
		}
		
		// FILL Chapters Completed
		$.each(chaptersCompleted[index], function(index2, value2) {
			if(cookieMainJSON.selections[index][index2]!=0){
				chaptersCompleted[index][index2]=cookieMainJSON.selections[index][index2];
			}
		});
    });
	
	// **** Fill Arrays/SCORE Chapter 5+6 ****
	var temp5Score = 0;
	
	$.each(chapter5Array, function(index, value) {
		
		if(!cookieMainJSON.extraChapters[index]){
			//alert("cookieMainJSON.selections NOT DEFINED")
			cookieMainJSON.extraChapters[index] = chapter5Array[index];
		}
		
		// FILL Chapters Completed
		$.each(chapter5Array[index], function(index2, value2) {
			
			if(cookieMainJSON.extraChapters[index][index2]!=-1){
				chapter5Array[index][index2]=cookieMainJSON.extraChapters[index][index2];
			}
			
			// CHECK IF CHAPTER 5 IS COMPLETED / ABOVE 90%			
			if(index == 0 && index2 != 0 && index2 != (chapter5Array[0].length-1)){
				temp5Score = temp5Score+chapter5Array[index][index2];
			} 

		});
    });
	
	// IF Chapter 5 Score is Higher than 90%, proceed to Menu2
	checkScoreChap5();
	
	alert("initCookiesMain > chaptersCompleted: "+alertArray(chaptersCompleted)+" ||| chapter5Array: "+alertArray(chapter5Array));
	//console.log("initCookiesMain > chaptersCompleted: "+alertArray(chaptersCompleted)+" ||| chapter5Array: "+alertArray(chapter5Array));
}
//initCookiesMain();

// **************** LOADING FUNCTIONS **************** 

// VIDEO LOADING
function nextVideo(nextVideoToPlay){
	document.querySelector("video").src = nextVideoToPlay;
	document.querySelector("video").play();
}
// INDIVIDUAL CHAPTER main menu BUTTONS - RESUME From last visit
function initResumeChapterAct(chapterNum){
	
	updateChapterActivityMenuButtons(chapterNum,1);
	
	$.each(chaptersCompleted[chapterNum], function(index2, value2) {
		//console.log("index2: "+index2+" chaptersCompleted[chapterNum][index2]: "+chaptersCompleted[chapterNum][index2])
		if(chaptersCompleted[chapterNum][index2]!=0){
			//updateChapterActivityMenuButtons(chapterNum,(index2+1));			
		} else {
			updateChapterActivityMenuButtons(chapterNum,(index2+1));
			return false;
		}
	});

	console.log("initResumeChapterAct > countChapters: "+countChapters+" countActivity: "+countActivity+" menu2Activated: "+menu2Activated+" | chaptersCompleted: "+alertArray(chaptersCompleted)+" | chapter5Array: "+alertArray(chapter5Array));
	
	loadPage(countChapters, countActivity);
}

function menu1(){
	initResumeChapterAct(1)
}
function menu2(){
	initResumeChapterAct(2)
}
function menu3(){
	initResumeChapterAct(3)
}
function menu4(){
	initResumeChapterAct(4)
}
function menu5(){
	initResumeChapterAct(5)
}

/**************************************************************** 
						MENU
****************************************************************/

// ****************** ANIMATION ********************************

// !!! Check to Animate Suggested Chapter !!!!
function animateSuggestedMenu(){
	//alert("animateSuggestedMenu: "+this.id);
	$(this).unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", animateSuggestedMenu);
	
	$(this).removeClass('animated zoomIn rubberBand infinite');	
	
	this.offsetWidth = this.offsetWidth;
	
	$(this).addClass('animated rubberBand infinite');
}
function animateHome(){
	// HOME ANIME
	$('#homeBut img').removeClass('animated rubberBand infinite');
	
	// INIT ANIMATION
	document.querySelector("#homeBut img").offsetWidth = document.querySelector("#homeBut img").offsetWidth;
	
	$('#homeBut img').addClass('animated rubberBand infinite');	
}
function removeAnimateHome(){
	// HOME ANIME
	$('#homeBut img').removeClass('animated rubberBand infinite');
	
	// INIT ANIMATION
	document.querySelector("#homeBut img").offsetWidth = document.querySelector("#homeBut img").offsetWidth;
}
function menuAddClasses(){
	
	// INIT ANIMATION
	document.querySelector("#menuText").offsetWidth = document.querySelector("#menuText").offsetWidth;
	document.querySelector("#menuBack").offsetWidth = document.querySelector("#menuBack").offsetWidth;
	document.querySelector(".menu div").offsetWidth = document.querySelector(".menu div").offsetWidth;
			
	$('#menuText').addClass('animated rotateIn');
	$('#menuBack').addClass('animated zoomIn');
	$('.menu div').addClass('animated zoomIn');	
}
function menuRemoveClasses(){
	
	$('#menuText').removeClass('animated rotateIn');
	$('#menuBack').removeClass('animated zoomIn');
	$('.menu div').removeClass('animated zoomIn rubberBand infinite');
	
	// INIT ANIMATION
	document.querySelector("#menuText").offsetWidth = document.querySelector("#menuText").offsetWidth;
	document.querySelector("#menuBack").offsetWidth = document.querySelector("#menuBack").offsetWidth;
	document.querySelector(".menu div").offsetWidth = document.querySelector(".menu div").offsetWidth;
}
			

// ****************** MENU CHECK COMPLETION *********************

function chooseFunction(numberOfChapt){
	var myFunction;
	switch (numberOfChapt) {
		case 1:
			myFunction = menu1;			
			break;
		case 2:
			myFunction = menu2;			
			break;
		case 3:
			myFunction = menu3;			
			break;
		case 4:
			myFunction = menu4;			
			break;
		default: 
			break;
	}
	return myFunction;
}
function enableMainMenuButtons(numberOfChapt){
	
	$("#menu"+numberOfChapt).css('opacity','1');
	$("#menu"+numberOfChapt).css('cursor','pointer');
	
	var myFunc = chooseFunction(numberOfChapt);
	$("#menu"+numberOfChapt).click(myFunc);
}

function disableMainMenuButtons(numberOfChapt){
	
	$("#menu"+numberOfChapt).css('opacity','0.5');
	$("#menu"+numberOfChapt).css('cursor','default');
	
	var myFunc = chooseFunction(numberOfChapt);
	$("#menu"+numberOfChapt).unbind("click", myFunc);
}

// CHECK COMPLETION OF CHAPTERS
function checkChaptersCompleted(){
	// UNLOCK 5th - Check if all Active (4) Chapters are Completed 
	var flag = true;
	$.each(chaptersCompleted, function(index, value) {
		if (index!== 0 && index!== 5 && index!== 6) {
			$.each(chaptersCompleted[index], function(index2, value2) {
				//alert("Chapter 5 "+index);
				if (value2 === 0) {
					flag = false;
					//console.log("flag: "+flag+" index:  "+index+" index2: "+index2+" value2: "+value2);
					// EXITS when false
					return false;
				}
			});
		}
        return flag;
    });
	
	// UNLOCK 5th Chapter Menu
	if(flag){	
		$("#menu5").unbind("click", menu5);
		$("#menu5").css('opacity','1');
		$("#menu5").css('cursor','pointer');
		$("#menu5").click(menu5);		
	}
	
	// Use this Parameter to Show Current Unit
	var myCurrentMenuItem = -1;
	
	// Check whcih of all Active (4) Chapters are Completed 
	$.each(chaptersCompleted, function(index, value) {
		
		if (index!== 0 && index!== 5 && index!== 6) {
			
			disableMainMenuButtons(index);
			
			$.each(chaptersCompleted[index], function(index3, value3) {
				if (value3 === 0) {
					enableMainMenuButtons(index);
					
					// !!! Check to Animate Suggested Chapter !!!!
					if(myCurrentMenuItem == -1){
						myCurrentMenuItem = "#menu"+index;	
						$(myCurrentMenuItem).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', animateSuggestedMenu);
					}
					
					// EXITS when false
					return false;
				}
			});	
		}
    });
}

/***************************************************************** 
							ACTIVITIES 
*****************************************************************/

// FUNCTION TO RUN When each ACTIVITY is Completed
function activateFor(){
	
	$("#nextBut").css('opacity','1');
	$("#nextBut").css('pointer-events','all');
	
	// Update array
	chaptersCompleted[countChapters][countActivity-1] = 1;
	
	// UPDATE SCORM
	if(lmsConnected){
		saveScormArrays();
	}
	
	// !!!!! KEEP LAST ACTIVITY AT FIRST !!!!!!!!!!!!!!!!!!!!!!!!
	//chaptersCompleted[countChapters][countActivity-1] = countActivity;

	// Update Cookie
	cookieMainJSON.selections[countChapters][countActivity-1] = chaptersCompleted[countChapters][countActivity-1];
	
	// SAVE CHANGES IN COOKIE
	var myBrowser = get_browser();
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(myCookieMainName,null);
		localStorage.setObject(myCookieMainName,cookieMainJSON)
	}
	else{
		$.removeCookie(myCookieMainName)
		$.cookie(myCookieMainName, cookieMainJSON, cookieMainLifetime);
	}	
	
}

// ****************** CHAPTER 5 - SCORE ********************************

function update_chapter5Array(actScore){
	
	var replaceActivityChap6 = mapChapter6ActivityCount();
	
	chapter5Array[subChapterCounter][replaceActivityChap6-1] = actScore;
	
	
	// Update Cookie
	cookieMainJSON.extraChapters[subChapterCounter][replaceActivityChap6-1] = chapter5Array[subChapterCounter][replaceActivityChap6-1];
	
	// SAVE CHANGES IN COOKIE
	var myBrowser = get_browser();
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(myCookieMainName,null);
		localStorage.setObject(myCookieMainName,cookieMainJSON)
	}
	else{
		$.removeCookie(myCookieMainName)
		$.cookie(myCookieMainName, cookieMainJSON, cookieMainLifetime);
	}
}

function getchapter5Score(){
	var myTotalScore = 0;

	jQuery.each(chapter5Array[subChapterCounter], function(index, value) {
		if((subChapterCounter == 0 || subChapterCounter == 1)&& index != 0 && index != (chapter5Array[subChapterCounter].length-1)){
			myTotalScore = myTotalScore+value;
			console.log("Calculate 1: subChapterCounter"+subChapterCounter+" index: "+index);
		} else if(index != (chapter5Array[subChapterCounter].length-1)){
			myTotalScore = myTotalScore+value;
			console.log("Calculate 2: subChapterCounter"+subChapterCounter+" index: "+index);
		}		
	});
	
	// END of Chapter 5 + 6  only the first Sub Chapter(with the extra menu):
	if(subChapterCounter == 0 || subChapterCounter == 1){
		myTotalScore = Math.round(myTotalScore/(chapter5Array[subChapterCounter].length-2));
		//alert("myTotalScore: " +myTotalScore+" (chapter5Array[subChapterCounter].length-2): " +(chapter5Array[subChapterCounter].length-2))
	} else {
		// END of Chapter 6 the 2 others, except the 1st
		myTotalScore = Math.round(myTotalScore/(chapter5Array[subChapterCounter].length-1));
	}
		
	return myTotalScore;
}

// ********************* RESET ********************************************

function resetChapter5Array(){
	
	jQuery.each(chapter5Array[subChapterCounter], function(index, value) {
		chapter5Array[subChapterCounter][index] = -1;
	});
}

function resetEx(){
	var doReset = false;
	var replaceActivityChap6 = mapChapter6ActivityCount();
	
	if(chapter5Array[subChapterCounter][replaceActivityChap6-1]==-1){
		doReset = true;
	}	
	return doReset;
}

// ***************** CHANGE SCREENS CHAPTERS 5 + 6 / LAST QUIZZES **********************

// Function called from activities that have a menu of sub activities
function moveAtSubMenus(subSlideNum){
	
	updateCountActivity(countActivity+subSlideNum);

	// LOAD EXERCISE - When you are within a SubMenu and click on this Submenu Internal Buttons
	$("#contentFrame").attr("src", "navigation/"+countChapters+"_"+countActivity+"/exercise.html");
	
	// IMPORTANT to be at the end of the func
	showHidePrevNext();
}

// CHAPTER 5
function homeChapter5(){
	console.log("homeChapter5 > iFrameLoad 2");
	
	updateChapterActivityMenuButtons(5,1);
	
	// LOAD EXERCISE
	$("#contentFrame").attr("src", "navigation/"+countChapters+"_"+countActivity+"/exercise.html");
	
	// IMPORTANT to be at the end of the func
	showHidePrevNext();
}
// CHAPTER 6
function mapChapter6ActivityCount(){
	var whatActivityUpdate;
	
	switch (true) {
		case (countChapters == 5):
			subChapterCounter = 0;
			whatActivityUpdate = countActivity; 
			break;
		case (countChapters == 6 && (countActivity > 1 && countActivity < 12)):
			subChapterCounter = 1;
			whatActivityUpdate = countActivity; 
			break;
		case (countChapters == 6 && (countActivity >= 12 && countActivity < 16)):
			subChapterCounter = 2;
			whatActivityUpdate = countActivity-11; 
			break;
		case (countChapters == 6 && (countActivity >= 16 && countActivity <= 24)):
			subChapterCounter = 3;
			whatActivityUpdate = countActivity-15; 
			break;
		default:
			//alert("default");
			break;
	}
	
	return whatActivityUpdate;
}
function gotoChapter6Activity(staticChapter6){

	if(staticChapter6==0||staticChapter6==1||staticChapter6==2||staticChapter6==3){
		subChapterCounter=staticChapter6;
	}
		
	updateCountChapters(6);
	
	switch (subChapterCounter) {
		case (0):
			updateCountActivity(1);
			break;
		case (1):
			updateCountActivity(2);
			break;
		case (2):
			updateCountActivity(12);
			break;
		case (3):
			updateCountActivity(16);
			break;
		default:
			break;
	}

	// LOAD EXERCISE - Loads the first activity of Chapter 5 + Chapter 6
	$("#contentFrame").attr("src", "navigation/"+countChapters+"_"+countActivity+"/exercise.html");
	
	// IMPORTANT to be at the end of the func
	showHidePrevNext();
}
function checkChapter6_Completion(){
	var myChp6CompletionArray = [0,0,0];
	
	if(chaptersCompleted[6][10]!=0){
		myChp6CompletionArray[0] = 1;
	}
	if(chaptersCompleted[6][14]!=0){
		myChp6CompletionArray[1] = 1;
	}
	if(chaptersCompleted[6][23]!=0){
		myChp6CompletionArray[2] = 1;
	}
	
	return myChp6CompletionArray;
}

function theEnd(){
	
	updateChapterActivityMenuButtons(7,1);
	subChapterCounter = 0;
	
	$("#prevBut").css('visibility','hidden');
	$("#nextBut").css('visibility','hidden');
	$("#homeBut").css('visibility','hidden');
	
	// LOAD EXERCISE - LAST Video
	$("#contentFrame").attr("src", "navigation/"+countChapters+"_"+countActivity+"/exercise.html");
}


/***************************************************************** 
							MAIN APP NAVIGATION 
*****************************************************************/

// **************** GLOBAL NEXT PREVIOUS HANDLING **************** 

function showHidePrevNext(){
	
	$("#prevBut").css('visibility','visible');
	$("#nextBut").css('visibility','visible');
	
	if (chaptersCompleted[countChapters][countActivity-1] == 0){
		
		//alert("NOT COMPLETED");		
		$("#nextBut").css('opacity','0.5');
		$("#nextBut").css('pointer-events','none');
	} else {
		
		//alert("COMPLETED");		
		$("#nextBut").css('opacity','1');
		$("#nextBut").css('pointer-events','all');
	}
	
	// Check if Chapter has 1 or more activities and if activities navigation is at the beggining or at the end
	var totalActChapt = chaptersTotalAct[countChapters];
	
	if(countActivity == 1 && totalActChapt == 1){
		$("#prevBut").css('visibility','hidden');
		$("#nextBut").css('visibility','hidden');
		
	} else if(countActivity == 1){
		$("#prevBut").css('visibility','hidden');
	} else if(countActivity >= totalActChapt){
		$("#nextBut").css('visibility','hidden');
	}
	
	// CHPATER 6 NEXT + BACK Buttons
	if(countChapters == 6 && subChapterCounter == 2 && countActivity == 12){
		$("#prevBut").css('visibility','hidden');
	} else if(countChapters == 6 && subChapterCounter == 3 && countActivity == 16){
		$("#prevBut").css('visibility','hidden');
	}
	
	if(countChapters == 6 && subChapterCounter == 1 && countActivity >= 11){
		$("#nextBut").css('visibility','hidden');
		
	} else if(countChapters == 6 && subChapterCounter == 2 && countActivity >= 15){
		$("#nextBut").css('visibility','hidden');
		
	} else if(countChapters == 6 && subChapterCounter == 3 && countActivity >= 24){
		$("#nextBut").css('visibility','hidden');		
	}
}

// **************** CHAPTERS ******************

// HANDLING Previous or Next for CHAPTERS ONLY
function assignChaptersNav(){
	
	if(this.id == "prevBut"){
		updateCountActivity((countActivity-1));		
	} else {
		updateCountActivity((countActivity+1));	
	}
	
	/* 
	LOAD EXERCISE
	when press next in Activities
	*/
	$("#contentFrame").attr("src", "navigation/"+countChapters+"_"+countActivity+"/exercise.html");
	
	// Hide Prev - IMPORTANT to be at the end of the func
	showHidePrevNext();
}

// **************** HOME ***********************

function changeHome(){
	menu2Activated = true;
}

function goHome(){
	
	// UNLOCK 5th Chapter
	checkChaptersCompleted();

	/* 
	RESET iFrame Content
	when go back from activities to menu
	*/
	$("#contentFrame").attr("src", "exercise.html");

	// SUBMENU Home (Returns to each submenu Menu/Screen)
	if (subMenuChapters[countChapters][countActivity-1] != 0){
		
		// LOAD EXERCISE
		updateCountActivity(subMenuChapters[countChapters][countActivity-1]);
		
		$("#contentFrame").attr("src", "navigation/"+countChapters+"_"+subMenuChapters[countChapters][countActivity]+"/exercise.html");
		
		showHidePrevNext();
		
	} // NOT SUBMENU
	else{
		
		// HIDE - LOADING FRAME
		$("iframe").css('display','none');		
		// HOME Hide/Show
		$("#homeBut").css('visibility','hidden');
		// REMOVE CHAPTER NAV EVENTS
		$("#prevBut").unbind("click", assignChaptersNav);
		$("#nextBut").unbind("click", assignChaptersNav);
		
		removeAnimateHome();
		
		/* SHOW Menu */
		if(menu2Activated){
			// NAVIGATION Hide/Show
			$("#prevBut").css('visibility','hidden');
			$("#nextBut").css('visibility','visible');
			
			$("#nextBut").css('opacity','1');
			$("#nextBut").css('pointer-events','all');
			
			// ADD CHAPTERS NAV EVENTS	
			$("#nextBut").click(assignNavIntro);
			
			$(".menu2").css('display','block');
			
			// MENU2 INITIAL ANIMATION - Add Classes (menu2.js)
			setMenu2();
		} else {
			// NAVIGATION Hide/Show
			$("#prevBut").css('visibility','visible');
			$("#nextBut").css('visibility','hidden');
			
			// ADD CHAPTERS NAV EVENTS
			$("#prevBut").click(assignNavIntro);	
			$("#nextBut").click(assignNavIntro);
			
			$(".menu").css('display','block');
			
			// MENU - Add Classes
			menuAddClasses();
		}
		
	}
	
	/*
	// REMOVE HOME EVENTS
	$("#homeBut").unbind("click", goHome);	
	*/
}

// ************ LOAD PAGES > USED FROM MAIN MENU ***

function loadPage(chapterN, pageUrl, goPrev){
	switch (chapterN) {
		// INTRO PAGES
		case 0:
			handleIntro(goPrev);
			break;
		// CHAPTER PAGES
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			//  CHAPTERS MENU - HIDE Menu Div
			$(".menu").css('display','none');
			// MENU - REMOVE Classes
			menuRemoveClasses();
			
			// SHOW - LOADING FRAME
			$("iframe").css('display','block');
			// LOAD FIRST EXERCISE OF CHAPTERS 1-5 (Main Menu 1 -> Load Activities)
			$("#contentFrame").attr("src", "navigation/"+chapterN+"_"+pageUrl+"/exercise.html");
			
			// REMOVE INTRO NAV EVENTS
			$("#prevBut").unbind("click", assignNavIntro);
			$("#nextBut").unbind("click", assignNavIntro);
			
			// MENU Hide/Show
			showHidePrevNext();
			
			$("#homeBut").css('visibility','visible');
			// ADD CHAPTERS NAV EVENTS
			$("#prevBut").click(assignChaptersNav);
			//$("#homeBut").click(goHome);	
			$("#nextBut").click(assignChaptersNav);
			
			// subChapterCounter - CASE FOR CHAPTER 5 ONLY
			if (chapterN == 5){
				subChapterCounter = 0;
			}
			
			break;
		case 6:
			// subChapterCounter - CASE FOR CHAPTER 6 ONLY
			switch (true) {
				case (countActivity > 1 && countActivity < 12):
					subChapterCounter = 1;
					break;
				case (countActivity >= 12 && countActivity < 16):
					subChapterCounter = 2;
					break;
				case (countActivity >= 16 && countActivity <= 24):
					subChapterCounter = 3;
					break;
				default:
					//alert("default");
					break;
			}
			
			//console.log("Chapter 5: chapterN "+chapterN+" pageUrl "+pageUrl);
			
			//  CHAPTER 6 MENU - HIDE Menu Div
			$(".menu2").css('display','none');

			
			// SHOW - LOADING FRAME
			$("iframe").css('display','block');
			// LOAD FIRST EXERCISE OF CHAPTER 6 (Main Menu 1 -> Load Activities)
			$("#contentFrame").attr("src", "navigation/"+chapterN+"_"+pageUrl+"/exercise.html");
			
			// REMOVE INTRO NAV EVENTS
			$("#prevBut").unbind("click", assignNavIntro);
			$("#nextBut").unbind("click", assignNavIntro);
			
			
			// MENU Hide/Show
			showHidePrevNext();
			
			$("#homeBut").css('visibility','visible');
			// ADD CHAPTERS NAV EVENTS
			$("#prevBut").click(assignChaptersNav);
			//$("#homeBut").click(goHome);	
			$("#nextBut").click(assignChaptersNav);
			
			break;
		default: 
			break;
	}

}

// ************************* INTRO HANDLING ******************************

function introNextActivate(){		
	/*
	$("#nextBut").css('opacity','1');
	$("#nextBut").css('pointer-events','all');
	*/
	$("#nextBut").css('visibility','visible');
}
function introNextHide(){		
	/*
	$("#nextBut").css('opacity','0.5');
	$("#nextBut").css('pointer-events','none');	
	*/
	$("#nextBut").css('visibility','hidden');
}


// HANDLING Previous or Next for INTRO ONLY
function assignNavIntro(){
	if(this.id == "prevBut"){
		loadPage(0,0,true);

	} else if(menu2Activated && (countIntro==6)){
		updateChapterActivityMenuButtons(6,1);
		loadPage(countChapters,countActivity);		
		// RESET INTRO COUNTER
		countIntro = 6;
	} else {
		loadPage(0,0);
	}
}

function handleIntro(prevOrNext){
	// Move Screens
	if(prevOrNext==true){
		countIntro--;
		introNextActivate();
	} else {
		// CURRENT screen viewed/completed
		chaptersCompleted[0][countIntro] = 1;
		
		// UPDATE SCORM
		if(lmsConnected){
			saveScormArrays();
		}
		
		// Proceed to next screen		
		countIntro++;
		
		if(chaptersCompleted[0][countIntro] == 1){
			introNextActivate();
		} else {
			introNextHide();
		}
	}
	//console.log("handleIntro > prevOrNext: "+prevOrNext+" New countIntro: "+countIntro+" chaptersCompleted: "+alertArray(chaptersCompleted));
	
	switch (countIntro) {
		case 0:
			// Show Intro Graphics
			$(".introLogos").css('display','block');
			
			// INIT ANIMATION
			document.querySelector("#intro1").offsetWidth = document.querySelector("#intro1").offsetWidth;
			document.querySelector("#intro2").offsetWidth = document.querySelector("#intro2").offsetWidth;
			document.querySelector("#intro3").offsetWidth = document.querySelector("#intro3").offsetWidth;
	
			// Add Animate Classes
			$('#intro3').addClass('animated bounceInLeft');
			$('#intro1').addClass('animated rotateIn');
			$('#intro2').addClass('animated lightSpeedIn');
			// 1st End of Animation			
			$("#intro3").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", handleIntro);
			
			// Hide Videos
			$("video").css('display','none');
			// Remove End of Video
			$("video").unbind("ended", handleIntro);
			
			// HIDE PREVIOUS
			$("#prevBut").css('visibility','hidden');
			
			// STOP VIDEOS
			document.querySelector("video").pause();
			
			// VIDEO SCRIPTS HIDE
			videoScriptHide();
			
			break;
		case 1:
			// Remove Animate Classes
			$('#intro3').removeClass('animated bounceInLeft');
			$('#intro1').removeClass('animated rotateIn');
			$('#intro2').removeClass('animated lightSpeedIn');
			// Hide Intro Graphics
			$(".introLogos").css('display','none');
			$("#intro3").unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", handleIntro);
			
			// Show Videos
			$("video").css('display','block');
			nextVideo("videos/intro.mp4");
			//document.querySelector("video").play();						
			// On End of Video
			$("video").unbind("ended", handleIntro);
			$("video").bind("ended", handleIntro);
			
			// SHOW PREVIOUS BUTTON
			$("#prevBut").css('visibility','visible');
			
			// VIDEO SCRIPTS
			videoScriptShow();
			videoScript1Activate();			
			
			break;
		case 2:
			$("video").css('display','block');
			// STOP VIDEOS
			document.querySelector("video").pause();
			nextVideo("videos/intro2.mp4");
			//document.querySelector("video").play();	
			// On End of Video
			$("video").unbind("ended", handleIntro);
			$("video").bind("ended", handleIntro);
			
			// Hide 2nd Animation Screen
			$(".slide4").css('display','none');
			// Remove Animate Classes
			removeAnimationSlide4();
			
			// VIDEO SCRIPTS HIDE
			videoScriptHide();
			
			break;
		case 3:
			// Hide Videos
			$("video").css('display','none');
			// Remove End of Video
			$("video").unbind("ended", handleIntro);
			// STOP VIDEOS
			document.querySelector("video").pause();
			
			// Show 2nd Animation Screen
			$(".slide4").css('display','block');			
			// INTRO ACTIVITY : Slide 4
			runSlide4Init();
			
			// VIDEO SCRIPTS HIDE
			videoScriptHide();
			
			break;
		case 4:
			// Hide 2nd Animation Screen
			$(".slide4").css('display','none');
			// Remove Animate Classes
			removeAnimationSlide4();
			
			// Show Videos
			$("video").css('display','block');
			// STOP VIDEOS
			document.querySelector("video").pause();
			nextVideo("videos/intro3.mp4");	
			
			// On End of Video
			$("video").unbind("ended", handleIntro);
			$("video").bind("ended", handleIntro);
	
			// VIDEO SCRIPTS
			videoScriptShow();
			videoScript2Activate();	
			
			break;
		case 5:
			// Show Videos
			$("video").css('display','block');
			
			// STOP VIDEOS
			document.querySelector("video").pause();
			nextVideo("videos/intro4.mp4");	
			
			// On End of Video
			$("video").unbind("ended", handleIntro);
			$("video").bind("ended", handleIntro);
			
			//  MENU - HIDE Menu Div
			$(".menu ").css('display','none');
			// MENU - REMOVE Classes
			menuRemoveClasses();
			
			// VIDEO SCRIPTS HIDE
			videoScriptHide();	
			
			break;
		case 6:
			// Last Slide Of Intro
			
			// ************** VIDEO *********************
			
			//$("video").parent().css('display','none');
			$("video").css('display','none');
			// STOP VIDEOS
			document.querySelector("video").pause();
			// Remove End of Video
			$("video").unbind("ended", handleIntro);
			
			// ************** MENU *********************
			
			if(menu2Activated){

				// NAVIGATION Hide/Show
				$("#prevBut").css('visibility','hidden');
				$("#nextBut").css('visibility','visible');
				
				$("#nextBut").css('opacity','1');
				$("#nextBut").css('pointer-events','all');
				
				// ADD CHAPTERS NAV EVENTS	
				// Already assigned! -> $("#nextBut").click(assignNavIntro);
				
				$(".menu2").css('display','block');
				
				// MENU2 INITIAL ANIMATION - Add Classes (menu2.js)
				setMenu2();	
				
			} else {		

				//  MENU - Show Menu Div
				$(".menu ").css('display','block');
		
				// MENU - Add Classes
				menuAddClasses();			
				
				// MENU Hide Next Button
				$("#nextBut").css('visibility','hidden');
				
				// MENU Clear individual Events
				$("#menu1").unbind("click", menu1);
				$("#menu2").unbind("click", menu2);
				$("#menu3").unbind("click", menu3);
				$("#menu4").unbind("click", menu4);
				//$("#menu4b").unbind("click", menu4);
		
				/* Chapter 1 */
				$("#menu1").click(menu1);
				/* Chapter 2 */
				$("#menu2").click(menu2);
				/* Chapter 3 */
				$("#menu3").click(menu3);
				/* Chapter 4 */
				$("#menu4").click(menu4);
				/* Chapter 5 */
				//$("#menu4b").click(menu4);
		
				/*********************************************** 
				IS MAIN CHAPTERS COMPLETED? - UNLOCK 5th Chapter
				************************************************/
				checkChaptersCompleted();
				
			} // END IF MENU2
	
			break;
		default: 
			break;
	} // END SWITCH

}


// ************* VIDEO SCRIPTS *************

function videoScript1Open(){		
	if($("#videoScript1").css('display') == "block"){
		$("#videoScript1").css('display','hidden');
	} else{
		$("#videoScript1").css('display','block');
	}
}
function videoScript2Open(){		
	if($("#videoScript2").css('display') == "block"){
		$("#videoScript2").css('display','hidden');
	} else{
		$("#videoScript2").css('display','block');
	}
}
function videoScript1Activate(){		
	$(".goToLetter").click(videoScript1Open);
}
function videoScript2Activate(){		
	$(".goToLetter").click(videoScript2Open);
}
function videoScriptShow(){
	$(".goToLetter").css('display','block');	
}
function videoScriptHide(){		
	$("#videoScript1").css('display','none');
	$("#videoScript2").css('display','none');
	$("#videoScript1").unbind("click", videoScript1Open);
	$("#videoScript2").unbind("click", videoScript2Open);
	$(".goToLetter").css('display','none');
}
