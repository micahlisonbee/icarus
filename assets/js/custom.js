// Custom JS for SynchroDev

function makeAjaxRequest(type, action, dataString, successHandler, errorHandler) {

	$.ajax({
	    type: type,
	    url: action,
	    data: dataString,
	    dataType: "JSON"
	}).success(function(response){
	    
	    console.log(response);
	    if (successHandler) {
	    	successHandler(response);
	    }

	}).error(function(response, status, err){
	    
	    console.log(response);
	    if (errorHandler) {
	    	errorHandler(response);
	    }

	});

}