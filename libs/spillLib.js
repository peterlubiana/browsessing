
/**
* spillLib.js, et Java-like Javscript bibliotek som forenkler en del ting!
* 
* Kollisjon
* Entity-klasse
* Rektangel-klasse
* Muse Lytting
* Basic knappelytting
* Basic touchlytting
* SpriteSheet - At Animasjons objekt.
*********/


// Objekt som kan animere og tegne seg selv dersom det har et superobjekt med x & y verdier! 
var SpriteSheet = function(superObject,sheetPath,frameSizeX,frameSizeY,drawSpeed){
	
	// The entity object;
	this.superObject = superObject;
	
	// the actual image
	this.sheet = new Image();
	this.sheet.src = sheetPath;
	
	// The width & height of each image
	this.frameSizeX = frameSizeX;
	this.frameSizeY = frameSizeY;
	
	// How often it will update
	this.drawSpeed = drawSpeed;
	this.drawCounter = 0;
	// Where in the sheet we currently are drawing
	this.xPos = 0;
	this.yPos = 0;
	
	// METODER
	this.drawNextFrame = drawNextFrame;
	// drawTheNextFrame!
	function drawNextFrame(context){
			// Increments the counter
			this.drawCounter++;
			
			// checks wether the drawCounter's value is equal to drawSpeed
			// to Draw the next subImage!
			if(this.drawCounter == drawSpeed){
					
					if(this.xPos < this.sheet.width-frameSizeX){
						this.xPos += frameSizeX;
					}
					else if(this.yPos < this.sheet.height-frameSizeY) {
						this.yPos += frameSizeY;
						this.xPos = 0;
					}else{
						this.yPos = 0;
						this.xPos = 0;
					}
				this.drawCounter = 0;
			}
				// Tegner det bildet som er tilgjengelig
				context.drawImage(this.sheet,0+this.xPos,0+this.yPos,this.frameSizeX,this.frameSizeY,
				this.superObject.x,this.superObject.y,this.frameSizeX,this.frameSizeY);		
			
	}
	
	this.getBounds = getBounds;
	
	function getBounds(){
			if(arguments[0]){
				offset = arguments[0];
		return new Rectangle(this.superObject.x+offset,this.superObject.y+offset,
		this.frameSizeX-offset,this.frameSizeY-offset);		
			}
		return new 
		Rectangle(this.superObject.x,this.superObject.y,this.frameSizeX,this.frameSizeY);
	}
	
}
/////// SpriteSheet OBJEKT OVER  ///////////////



// REKTANGEL OBJEKT I BRUK MED KOLLISJONvar Rectangle = function (x,y,width,height){    this.x = x;    this.y = y;    this.width = width;    this.height = height;
	
	// Metode som returnerer Rektangelet
	this.getBounds = getBounds;
	function getBounds(){
			
			if(arguments[0]){
			arguments[0] = offset;
			return new Rectangle(this.x+offset,this.y+offset,
									this.width-offset,this.height-offset);
				}
	
		return this;
	}
}
// Metode sjekker om to rektangel objekter kolliderer !    function intersects(r1,r2){
    	r1Left = r1.x;
    	r1Right = r1.x+r1.width;
    	r1Top = r1.y;
    	r1Bottom = r1.y+r1.height;
    	r2Left = r2.x;
    	r2Right = r2.x+r2.width;
    	r2Top = r2.y;
    	r2Bottom = r2.y+r2.height;	return ((r1Right > r2Left && r1Bottom > r2Top ) && ( r2Right > r1Left && r2Bottom > r1Top));    }// ENTITY OBJEKTvar Entity = function(x, y){    this.x = x;    this.y = y;    this.img = new Image();    this.width = 0;    this.height = 0;	//METODER    this.getBounds = getBounds;       // Metode som returnerer et rektangel som kan brukes i boundssjekking.       function getBounds(){	
    
    if(arguments[0]){
    	return new Rectangle(this.x+offset,this.y+offset,
    							this.width-offset,this.height-offset);
    }		return new Rectangle(this.x,this.y,this.img.width,this.img.height);    }
    
        this.setImage = setImage;    // Metode som setter et entity til å få et bestemt bilde     function setImage(imgPath){	    this.img.src = imgPath;	    width = this.img.src.width;	    height = this.img.src.height;     }  
     
     this.draw = draw;
     // metode som gjør det mulig for Entities å tegne seg selv!
     function draw(context){
     context.drawImage(this.img,this.x,this.y);	
     }
     
     this.drawBounds = drawBounds;
     // metode som tegner kollisjons rektangelet
     function drawBounds(context,offset){
		if(arguments[1]){
			context.strokeRect(this.x+offset,this.y+offset,
								this.img.width-offset,this.img.height-offset);
			return;
			}

     		context.strokeRect(this.x,this.y,this.img.width,this.img.height);
     }
     
     this.giveInfo = giveInfo;
     // Metode som skriver informasjon om objektet
     function giveInfo(context){
     		context.strokeText("X,Y:("+this.x+","+this.y+")",this.x,this.y-20);
     }
     
     this.update = update;
     // Overridable method that is used to change variables in the Entity.
     function update(){
     }    }	    // ENTITY OBJECT ENDS..				// SETTING UP GLOBAL MOUSELISTENER!	var mouseX = 0;	var mouseY = 0;	var mousePressed = false;	document.onmousemove = function(event){    	mouseX = event.clientX;    	mouseY = event.clientY;	}        document.onmousedown = function(event){		mousePressed = true;    }		document.onmouseup = function(event){		mousePressed = false;	}	    	    	///////////// OPPRETTING AV OBJEKTER ////////////////// KNAPPE-LYTTING & TOUCH-LYTTING OG ALT SOM HÃ˜RER MEDvar upPressed = false;var downPressed = false;var leftPressed = false;var rightPressed = false;

var aPressed = false;
var sPressed = false;
var wPressed = false;
var dPressed = false;var touched = false;var leftTouched = false;var rightTouched = false;

var twoTouches = false;
var threeTouches = false;
var fourTouches = false;var KEY_UP = 38;var KEY_DOWN = 40;var KEY_RIGHT = 39;var KEY_LEFT = 37;
var KEY_A = 65;
var KEY_S = 83;
var KEY_W = 87;
var KEY_D = 68;document.onkeydown = function(event){keyDown(event);}document.onkeyup = function(event){keyUp(event);}


//////// BROKEN TOUCHKODE!!  ///////////////////////////
var touchPosX;
var touchPosY;
document.ontouchstart = function (event){fingerDown(event);}document.ontouchend = function (event){fingerUp(event);}
document.ontouchmove = function (event){fingerMoved(event);}// Called if a finger touches the screen.function fingerDown(event){
	event.preventDefault();
	touched = true;    touchPosX = event.touches[0].pageX;
    touchPosY = event.touches[0].pageY;     
    if(touchPosX > document.width/2){    rightTouched = true;    }else{   	leftTouched = true;    }
    
    if(event.touches.length == 2){
    	twoTouches = true;
    }else{
    	twoTouches = false;
    }
    
    if(event.touches.length == 3){
    	threeTouches = true;
    }else{
    	threeTouches = false;
    }
    
    if(event.touches.length == 4){
    	fourTouches = true;
    }else{
    	fourTouches = false;
    }
    	}// Called if a finger has been released..function fingerUp(event){
	touched = false;	leftTouched = false;	rightTouched = false;
	twoTouches = false;
	threeTouches = false;
	fourTouches = false;}


// Called if a finger has been moved..
function fingerMoved(event){
	 touchPosX = event.touches[0].pageX;
    touchPosY = event.touches[0].pageY;
}

///////////////////////
function keyDown(event){    event = event || document.event;    var keyCode = event.keyCode;        if(keyCode == KEY_UP){	upPressed = true;    }    if(keyCode == KEY_DOWN){	downPressed = true;    }    if(keyCode == KEY_LEFT){	leftPressed = true;    }    if(keyCode == KEY_RIGHT){	rightPressed = true;    }
    if(keyCode == KEY_A){	aPressed = true;    }
    if(keyCode == KEY_S){	sPressed = true;    }
    if(keyCode == KEY_W){	wPressed = true;    }
    if(keyCode == KEY_D){	dPressed = true;    }}function keyUp(event){    event = event || document.event;    var keyCode = event.keyCode;        if(keyCode == KEY_UP){	upPressed = false;    }    if(keyCode == KEY_DOWN){	downPressed = false;    }    if(keyCode == KEY_LEFT){	leftPressed = false;    }    if(keyCode == KEY_RIGHT){	rightPressed = false;    }
    if(keyCode == KEY_UP){	upPressed = false;    }   if(keyCode == KEY_A){	aPressed = false;    }
    if(keyCode == KEY_S){	sPressed = false;    }
    if(keyCode == KEY_W){	wPressed = false;    }
    if(keyCode == KEY_D){	dPressed = false;    }}// Hjelpemetode som avgjorr om musa er over et rektangelfunction mouseOverRect(x,y,width,height) {  if (mouseX >= x && mouseX <= x+width &&     mouseY >= y && mouseY <= y+height) {    return true;  }   else {    return false;  }}

function touchOverRect(x,y,width,height) {
  if (touchPosX >= x && touchPosX <= x+width && 
    touchPosY >= y && touchPosY <= y+height) {
    return true;
  } 
  else {
    return false;
  }
}

// Returns a random number between 0 and your specified number..
function random(number){
return Math.random()*number;
}

function drawImage(imagePath,x,y){
var im = new Image();
im.src = imagePath;
ctx.drawImage(im,x,y);
}
////////// KODE SOM TAR SEG AV SMUD ANIMERING ////////////////////////(function() {    var lastTime = 0;    var vendors = ['ms', 'moz', 'webkit', 'o'];    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']                                   || window[vendors[x]+'CancelRequestAnimationFrame'];    }     if (!window.requestAnimationFrame)        window.requestAnimationFrame = function(callback, element) {            var currTime = new Date().getTime();            var timeToCall = Math.max(0, 16 - (currTime - lastTime));            var id = window.setTimeout(function() { callback(currTime + timeToCall); },              timeToCall);            lastTime = currTime + timeToCall;            return id;        };     if (!window.cancelAnimationFrame)        window.cancelAnimationFrame = function(id) {            clearTimeout(id);        };}());
function animateCallback() {
        requestAnimationFrame(animateCallback);
            updateCanvas();
        	draw();
}

// Waiting to be overloaded.
function draw(){}

// Method that is called once, wait to be overloaded.
function init(){}


// Global variable that is used to refer to the graphicsgrawing context.
var canv;
var ctx;
var canvasPath, canvasWidth, canvasHeight;

// function that is used to Set the canvas that has been specified in a html document. 
function canvas(canvasPath,canvasWidth,canvasHeight){
		this.canvasPath = canvasPath;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
}


// functoin that updates the canvas..
function updateCanvas(){
    canv = document.getElementById(canvasPath);
    canv.width = canvasWidth;
    canv.height = canvasHeight;
    ctx = canv.getContext("2d");

    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.fillStyle = 'black';	
}


// Method that checks if the program is ready to start!
(function(){
	var readyStateCheckInterval = setInterval(function() {
	    if (document.readyState === "complete") {
	    	init();
	    	animateCallback();
	        clearInterval(readyStateCheckInterval);
	    }
	}, 10);
}());

//////// ANIMATION BACKSIDE DONE ////////////