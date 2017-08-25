/*
	Track Clicks v.2.0
	-----------------
	License: MIT, http://www.opensource.org/licenses/mit-license.php
	Author: Josan Iracheta
*/

document.addEventListener('click',function(e){
	//create trackClicks object
	var trackClicks = getClickInfo(e.target);
	//if click event does not belong to our list of elements
	//do nothing
	if(!trackClicks){
		return false;
	}
	//prevent default link behavior
	//will send user to link page later
	if(trackClicks.isLink){
		e.preventDefault();
	}
	//send event information to Google Analytics
	ga("send", "event", {
		"eventCategory" : "Track Clicks",
		"eventAction" : trackClicks.deviceType,
		"eventLabel" : trackClicks.info,
		"hitCallback" : function(){ 
			if(trackClicks.isLink){
			//send user to link page 
			window.location.href = findAnchorLink(e.target).href;
			}
		}
	});
});
	
function getClickInfo(eventTarget){

	var clickType = ('ontouchstart' in document.documentElement) ? 'touchDevice' : 'mouseClick';
	var lk = findAnchorLink(eventTarget);
	var isLink = lk.href && lk.href != null && !~lk.href.indexOf('#') ? true : false;
	var elemList = {
		'A': ['textContent','className','id','href'],
		'BUTTON': ['textContent','className','id'],
		'IMG': ['src','alt'],
		'INPUT': ['value','className','id']
	};

	var clickTarget = !!~Object.keys(elemList).indexOf(eventTarget.tagName) ? eventTarget : findParentNode(eventTarget, ['A','BUTTON']);

	if(!clickTarget){
		return false;
	}
	
	var clickTargetAttr = (function(){
		//get each attribute
		var attrList = elemList[clickTarget.tagName].map(function(attr){
			if(clickTarget[attr]){
				return clickTarget[attr];
			}	
		});
		//remove null values
		//attrList = attrList.filter(attr => attr != null);
		attrList = attrList.filter(function(attr){
			return attr != null;
		});
		//console.log(attrList);
		return attrList.join(',');
	})();
  
  return {
  	deviceType: clickType,
    isLink: isLink,
    info: clickTargetAttr
    };
  
}

//find parentNode that matches an element tagName
//tag can be an array of element tagNames
function findParentNode(el,tag){
  var isArr = {
  	true: function(){
    	//return tag.includes(el.tagName)
		return !!~tag.indexOf(el.tagName)
    },
    false: function(){
    	return el.tagName === tag
    }
  };
  while(el.parentNode){
  	el = el.parentNode;
    if(isArr[Array.isArray(tag)]()){
    	return el;
    }
    else if(el.tagName === 'DIV'){
    	return false;
    }
  }
  return false;
}
function findAnchorLink(node){
	if(node.tagName == 'A'){
		return node;
	}
	return findParentNode(node,'A');
}