// CCS Params
var scorm = pipwerks.SCORM;
scorm.version = "2004";

var lmsConnected = false;
var unloaded = false;
var hasSCORMscore = false;


function traceMsg(msg){
	//alert(msg);
	//console.log(msg);
	//window.close();
}


function setScormScore(score){
	if(lmsConnected){
		/**** SET SCORM Score *****/
		if(score<0){
			score = 0;
		}
		var savedScore = scorm.set("cmi.score.raw", Math.round(score));
		var savedScaledScore = scorm.set("cmi.score.scaled", (Math.round(score) / 100));
	}
	
	//traceMsg("setScormScore: "+score);
}



/***** DEFAULT ************************************/

function initCourse(){

	//scorm.init returns a boolean
	lmsConnected = scorm.init();
	
	//If the scorm.init function succeeded...
	if(lmsConnected){	

		/**** Let's get the completion status to see if the course has already been completed ****/
		var completionStatus = scorm.get("cmi.completion_status");
		traceMsg("get completionStatus: "+completionStatus);
		
		
		//If the course has already been completed...
		if(completionStatus == "completed"){
			
			//scorm.set("cmi.exit", "logout");
			
			//...let's display a message and close the browser window
			traceMsg("You have already completed this course. You do not need to continue.");
		
		} else if (completionStatus == "unknown") {
			scorm.set("cmi.exit", "suspend");
			scorm.set("cmi.completion_status", "incomplete");
			
		}
		
		
		/**** SET Default Score *****/
		var scormMinScore = scorm.set("cmi.score.min", "0");
		var scormMaxScore = scorm.set("cmi.score.max", "100");
		
		/**** GET SCORM Score *****/
		var savedScore = scorm.get("cmi.score.raw");
		var savedScaledScore = scorm.get("cmi.score.scaled");
		var score;
		
		if (savedScore == "unknown" || savedScore == "" || savedScore == "null") {
			score = 0;			
		} else {
			score = parseInt(savedScore);
			//score = savedScore*1;
		}
		
		setScormScore(score);
		
		traceMsg("INIT GET > score: "+score+" | savedScore: "+savedScore+" | savedScaledScore: "+savedScaledScore+" | scormMinScore: "+scormMinScore+" | scormMaxScore: "+scormMaxScore);
				
		
		var savedData = scorm.get("cmi.suspend_data");
		traceMsg("INIT GET > savedData: "+savedData);
		
		if (savedData == "unknown" || savedData == "" || savedData == "null") {
			saveScormArrays();	
			traceMsg("INIT NO");
		} else {
			fillScormArrays();	
			traceMsg("INIT YES");
		}
		
		traceMsg("INIT Suspend_Data > "+savedData);
		
		// IF Chapter 5 Score is Higher than 90%, proceed to Menu2
		checkScoreChap5();
		
		
		/* SHOULD WORK BUT NO WORK IN IE
		var scormSolvedTests = scorm.get("cmi.location");
		solvedTests = scormSolvedTests;
		traceMsg("INIT GET > solvedTests: "+solvedTests+" | scormSolvedTests: "+scormSolvedTests);
		*/
		

		
		// Default		
		/*
		var bookmark = scorm.get("cmi.location");
		
		traceMsg("INIT GET> bookmark: "+bookmark);
		
		if (bookmark == "unknown" || bookmark == "" || bookmark == "null") {
			scorm.set("cmi.location", "pages/landing.html");
		}
		bookmark = scorm.get("cmi.location");
		
		traceMsg("INIT after SET> bookmark: "+bookmark);
		*/
		
		/**** Now let's get the username from the LMS 
		var userName = scorm.get("cmi.learner_name");
		var userId = scorm.get("cmi.learner_id");	
		traceMsg("userName: "+userName+" userId: "+userId);
		****/
		
		// SAVE ALL INIT	
		scorm.save();

	//If the course couldn't connect to the LMS for some reason...
	
	} else {
		
		initCookiesMain();
		
		traceMsg("Error: Course could not connect with the LMS");	
	}
	
	

}
function fillScormArrays(){	
	var savedData = scorm.get("cmi.suspend_data");
	//var savedData = "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,|-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,"
	
	var tempArray1=savedData.split('|');
	var tempArray2=tempArray1[0].split(',');
	var tempArray3=tempArray1[1].split(',');
	
	//traceMsg("tempArray1[0]: "+tempArray1[0]+" |tempArray1[1]: "+tempArray1[1]+" |tempArray2: "+tempArray2+" |tempArray3: "+tempArray3);
	
	var tempCounter2=0;
	$.each(chaptersCompleted, function(index, value) {
		$.each(chaptersCompleted[index], function(index2, value2) {
			chaptersCompleted[index][index2] = parseInt(tempArray2[tempCounter2]);
			tempCounter2++;
		});
    });
	
	var tempCounter3=0;
	$.each(chapter5Array, function(index, value) {
		$.each(chapter5Array[index], function(index2, value2) {
			chapter5Array[index][index2] = parseInt(tempArray3[tempCounter3]);
			tempCounter3++;
		});
    });

	traceMsg("fillScormArrays > chaptersCompleted: "+alertArray(chaptersCompleted)+" chapter5Array: "+alertArray(chapter5Array));
	
}
//fillScormArrays();
	
function saveScormArrays(){
	var tempString1="";
	var tempString2="";
	var tempString="";
	
	$.each(chaptersCompleted, function(index, value) {
		$.each(chaptersCompleted[index], function(index2, value2) {
			//if(index2 != (chaptersCompleted[index].length-1)){
				tempString1 += value2+",";
			//}
			/* else {
				tempString1 += value2;
			}
			*/
			
		});
    });
	
	var myScormScore = 0;
	var myScormScoreCounter = -6;
	
	$.each(chapter5Array, function(index, value) {
		$.each(chapter5Array[index], function(index2, value2) {
			
			if(chapter5Array[index][index2]==-1){
				myScormScore += 0;
			} else {
				myScormScore += chapter5Array[index][index2];
			}
			myScormScoreCounter++;
			
			//if(index2 != (chapter5Array[index].length-1)){
				tempString2 += value2+",";
			//}
			/*
			else {
				tempString2 += value2;
			}
			*/
		});
    });
	
	tempString = tempString1 +"|"+tempString2;
	
	var savedData = scorm.set("cmi.suspend_data", tempString);
	// SAVE ALL INIT
	scorm.set("cmi.exit", "suspend");
	scorm.save();
	
	var myTotalScormScore = myScormScore/myScormScoreCounter;
	setScormScore(myTotalScormScore);
	
	//traceMsg("saveScormArrays > myScormScore: "+myScormScore+" myScormScoreCounter: "+myScormScoreCounter);
	
	traceMsg("saveScormArrays > savedData: "+savedData+" tempString: "+tempString);
}
//saveScormArrays();

function setCompleteEnd(){
	if(lmsConnected){
		var success = scorm.set("cmi.completion_status", "completed");
		/*var success = scorm.set("cmi.success_status", "passed");*/
		scorm.set("cmi.exit", "normal");
		scorm.save();
		scorm.quit();
		traceMsg("!! setCompleteEnd");
	}
}

function setComplete(){
	if(lmsConnected){
		var success = scorm.set("cmi.completion_status", "completed");
		/*var success = scorm.set("cmi.success_status", "passed");*/
		scorm.set("cmi.exit", "suspend");
		scorm.save();
		traceMsg(":) setComplete");
	}
	//console.log("setComplete");
}

function setInComplete(){
	
	if(lmsConnected){
		
		var success = scorm.set("cmi.completion_status", "incomplete");
		scorm.set("cmi.exit", "suspend");
		scorm.save();

		traceMsg(":| setInComplete");
	}
	//console.log("setInComplete");
}

function unloadHandler(){

	traceMsg("unloadHandler");
	//console.warn("closing.connection.onbeforeunload | onunload");
	
	if(!unloaded){
		traceMsg("Save on Quit");
		scorm.set("cmi.exit", "suspend");
		scorm.save(); //save all data that has already been sent
		scorm.quit(); //close the SCORM API connection properly
		unloaded = true;
	}
}

/* MOVED to main.js $(document).ready
$(document).ready(function() {
	window.onbeforeunload = unloadHandler;
	window.onunload = unloadHandler;
	initCourse();
});
*/