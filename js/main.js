const canvas = document.getElementById("canvas");
const g = canvas.getContext("2d");

var levels = [];
var level = 0;
var currentLevel;

var elements = [];

const tileSet = new Image();
tileSet.src = "../images/0x72_DungeonTilesetII_v1.1.png";

function update(){
	for(let i in elements){
		elements[i].update();
	}
}

function render(){
	g.fillStyle = "rgb(240, 240, 240)";
	g.fillRect(0,0,canvas.width,canvas.height);
	for(let i in elements){
		elements[i].render();
	}
}

var Wall = function(){
	var args = Array.prototype.slice.call(arguments);
	
	this.camera = currentLevel.camera;
	
	this.x = args[0] || 0;
	this.y = args[1] || 0;
	this.speed = args[2] || 0;
	this.vx = 0;
	this.vy = 0;
	
	this.w = 47;
	this.h = 19;
	
	this.states = {
		full: {
			texture:
				[17, 13, 64, 32]
		}
	};
	this.state = args[3] || this.states.full;
	
	this.update = function(){
		
	}
	
	this.render = function(){
		
	}
	
	this.collision = function(){
		var collisions = [];
		for(let i=0; i<elements.length; i++){
			var rect = elements[i];
			if(rect != this && rect.inGame){
				if (this.x < rect.x + rect.w && this.x + this.w > rect.x && this.y < rect.y + rect.h && this.y + this.h > rect.y) {
					//console.log(this.id + " collided with " + rect.id);
					collisions.push(rect);
				}
			}
		}
		return collisions;
	}
	
}

var gameLoop = setInterval(function(){
	update();
	render();
}, 31);