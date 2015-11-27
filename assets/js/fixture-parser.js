(function() {
	window.FixturesParser = {};

	window.FixturesParser.convertedFixturesToDom = function(str){
	  var arr = [];
	  var lineNum = 0;
	  var fixtures = [];
	  
	  for (var i = 0, len = str.length; i < len; i++) {
		if(str[i] == "\n"){
		  lineNum++;
		  continue;
		}
		
		if(!arr[lineNum])
		  arr[lineNum] = ""; 
		
		arr[lineNum] = arr[lineNum] + str[i];
	  }
	  
	  //console.log(arr);
	  arr.splice(0, 4);
	  arr.splice(arr.length-3, 3);
	  
	  
	  var totalColumns = 2,
		  currentColumn = 1;
	  
	  for(var j = 0; j < arr.length; j++){
		if(totalColumns === 2 && arr[j].indexOf("@") > 0){
		  totalColumns = 3;
		  currentColumn = 3;
		}
		
		if(currentColumn === 3 && arr[j].indexOf("@") === -1){
		  totalColumns = 2;
		  currentColumn = 1;
		}
		
		if(currentColumn === 1){
		  fixtures[fixtures.length] = { date: arr[j] };
		}
		
		if(currentColumn === 2){
			fixtures[fixtures.length - 1].fixture = arr[j];
		}
		
		if(currentColumn === 3)
		{
		  fixtures[fixtures.length - 1].time = arr[j];
		}
		
		if(currentColumn < totalColumns){
		   currentColumn++;
		}
		else{
		  currentColumn = 1;
		}  
	  }
	  
	  return fixtures;
	};
})();

