// Initialize stuff!
$(document).ready(init);

function init(){
    
    $("#runbutton").click(updateshit);
    updateshit();

    $("#codeBtn").click(toggleCodeWindow);
    
    $("#documentationBtn").click(function(){
	    window.open("http://processingjs.org/reference/");
	});

    $("#logo").click(function(){
	    toggle("panel");
	});

    
    
    document.onkeydown = function(event){
	event = event || document.event;
	var keyCode = event.keyCode;
	if(keyCode == 222)
	    updateshit();
	
	if(keyCode == 17)
	    toggleCodeWindow();
    }
}


var logoHidden = true;
function toggle(arg){
    if(logoHidden){
	$("#"+arg).show();
	logoHidden = false;
    }else{
	$("#"+arg).hide();
	logoHidden = true;
    }
}

var hidden = true;
function toggleCodeWindow(){
    if(hidden){
	$("#editables").show();
	hidden = false;
    }else{
	$("#editables").hide();
	hidden = true;
    }
    
}

var documentHidden = true;
function toggleDocumentWindow(){
    if(documentHidden){
	 $("#documentationWindow").show();
	documentHidden = false;
    }else{
	$("#documentationWindow").hide();
	documentHidden = true;
    }
}


function updateshit(){
    if(!hidden)
	return;

    var jsCode = $("#psCode").val();
    
    var head = "<!DOCTYPE html>"
	+"<html><head>"
	+"<style>"+$("#cssedit").val()+"</style>"
	+"<script src='libs/processing-1.4.1.min.js'></script>"
	+"<script type='text/processing' data-processing-target='sketchWindow'>"
        +jsCode+"</script>"
	+"</head><body>";

    var html = document.getElementById("htmledit").value;
    
    var foot = "</body></html>";

    var iframe = document.createElement('iframe');
    var result = document.getElementById('result');
    
    result.innerHTML = null;
    result.appendChild(iframe);
    
    iframe.contentWindow.document.open('text/html', 'replace');
    iframe.contentWindow.document.write(head+html+foot);
    iframe.contentWindow.document.close();
    
}

