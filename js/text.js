// JavaScript Document

function positionText(allText){
	var allLength = allText.length; 
	for (var i=0;i<allLength;i++){
		var innerData = allText[i];
		if (innerData.indexOf("/") <= 0) {
			document.getElementById("exText"+i).innerHTML = allText[i];	
		} else {
			var searchPattern = new RegExp;
			var replacePattern = '<input data-test="$1"  maxlength="1" accept="text/plain" class="crosswrd" type="text">'; //'<span class="gaps" data-test="$1">_</span>'
			searchPattern = /\/(.)/g;
			var newContent = innerData.replace(searchPattern, replacePattern);
			document.getElementById("exText"+i).innerHTML = newContent;
//			alert(newContent);
			//create spans and shit
		}
	}
	return true;
}