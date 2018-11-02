const canvas = document.getElementById("canvas");
const g = canvas.getContext("2d");
g.imageSmoothingEnabled = false;

var levels = [];
var level = 0;
var currentLevel;

var elements = [];

var keys = [];

var ticks = 0;

const tileSet = new Image();
tileSet.src = "images/0x72_DungeonTilesetII_v1.1.png";
tileSet.onerror = function(){
	tileSet.src = "../images/0x72_DungeonTilesetII_v1.1.png";
}

function update(){
	for(let i in elements){
		elements[i].update();
	}
}

function render(){
	g.fillStyle = "rgb(34, 34, 34)";
	g.fillRect(0,0,canvas.width,canvas.height);
	for(let i in elements){
		elements[i].render();
	}
}

function nextTexture(){
	for(let i in elements){
		elements[i].nextTexture();
	}
}

var Wall = function(){
	var args = Array.prototype.slice.call(arguments);
	
	this.id = "wall";
	
	this.x = args[0] || 0;
	this.y = args[1] || 0;
	this.speed = args[2] || 0;
	this.vx = 0;
	this.vy = 0;
	
	this.w = 96;
	this.h = 40;
	
	this.states = {
		full: {
			texture:
				[
					1,
					[[17, 12, 48, 20]]
				]
		}
	};
	this.state = args[3] || this.states.full;
	
	this.update = function(){
		
	}
	
	this.render = function(){
		/* Have fun with this one! */
		var drawing = this.state.texture[this.state.texture[0]];
		for(let i = 0; i < drawing.length; i++){
			g.drawImage(tileSet, drawing[i][0], drawing[i][1], drawing[i][2], drawing[i][3], this.x, this.y, this.w, this.h);
		}
	}
	
	this.nextTexture = function(){
		if(this.state.texture[0] == this.state.texture.length-1){
			this.state.texture[0] = 1;
		}else{
			this.state.texture[0]++;
		}
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

var Vertical = function(){
	var args = Array.prototype.slice.call(arguments);
	
	this.id = "wall";
	
	this.x = args[0] || 0;
	this.y = args[1] || 0;
	this.speed = args[2] || 0;
	this.vx = 0;
	this.vy = 0;
	
	this.w = 24;
	this.h = 72;
	
	this.states = {
		full: {
			texture:
				[
					1,
					[[11, 125, 12, 36]]
				]
		}
	};
	this.state = args[3] || this.states.full;
	
	this.update = function(){
		
	}
	
	this.render = function(){
		/* Have fun with this one! */
		var drawing = this.state.texture[this.state.texture[0]];
		for(let i = 0; i < drawing.length; i++){
			g.drawImage(tileSet, drawing[i][0], drawing[i][1], drawing[i][2], drawing[i][3], this.x, this.y, this.w, this.h);
		}
	}
	
	this.nextTexture = function(){
		if(this.state.texture[0] == this.state.texture.length-1){
			this.state.texture[0] = 1;
		}else{
			this.state.texture[0]++;
		}
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

var floorTile = function(){
	var args = Array.prototype.slice.call(arguments);
	
	this.id = "floorTile";
	
	this.x = args[0] || 0;
	this.y = args[1] || 0;
	this.speed = args[2] || 0;
	this.vx = 0;
	this.vy = 0;
	
	this.w = 32;
	this.h = 32;
	
	this.states = {
		full: {
			texture:
				[
					1,
					[[16, 64, 16, 16]]
				]
		},
		cracked1:{
			texture:
				[
					1,
					[[32, 64, 16, 16]]
				]
		},
		cracked2:{
			texture:
				[
					1,
					[[48, 64, 16, 16]]
				]
		},
		cracked3:{
			texture:
				[
					1,
					[[16, 80, 16, 16]]
				]
		},
		cracked4:{
			texture:
				[
					1,
					[[32, 80, 16, 16]]
				]
		},
		cracked5:{
			texture:
				[
					1,
					[[48, 80, 16, 16]]
				]
		},
		cracked6:{
			texture:
				[
					1,
					[[16, 96, 16, 16]]
				]
		},
		cracked7:{
			texture:
				[
					1,
					[[32, 96, 16, 16]]
				]
		},
		greenGoo:{
			texture:
				[
					1,
					[[64, 96, 16, 16]]
				]
		}
	};
	this.state = args[3] || this.states.full;
	
	this.update = function(){
		
	}
	
	this.render = function(){
		/* Have fun with this one! */
		var drawing = this.state.texture[this.state.texture[0]];
		for(let i = 0; i < drawing.length; i++){
			g.drawImage(tileSet, drawing[i][0], drawing[i][1], drawing[i][2], drawing[i][3], this.x, this.y, this.w, this.h);
		}
	}
	
	this.nextTexture = function(){
		if(this.state.texture[0] == this.state.texture.length-1){
			this.state.texture[0] = 1;
		}else{
			this.state.texture[0]++;
		}
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

var Player = function(){
	var args = Array.prototype.slice.call(arguments);
	
	this.id = "player";
	
	this.lvl = 20;
	
	this.x = args[0] || 0;
	this.y = args[1] || 0;
	this.speed = args[2] || 1;
	this.vx = 0;
	this.vy = 0;
	
	this.w = 32;
	this.h = 40;
	
	this.states = {
		standing: {
			texture:
				[
					1,
					[[128, 109, 16, 20]],
					[[144, 109, 16, 20]]
				]
		}
	};
	this.state = args[3] || this.states.standing;
	
	this.update = function(){
		this.handleKeys();
		
		this.handleInteraction(this.collision());
		
		this.x += this.vx;
		this.y += this.vy;
		this.vy = this.vy*0.9;
		this.vx = this.vx*0.9;
		
	}
	
	this.render = function(){
		/* Have fun with this one! */
		var drawing = this.state.texture[this.state.texture[0]];
		for(let i = 0; i < drawing.length; i++){
			g.drawImage(tileSet, drawing[i][0], drawing[i][1], drawing[i][2], drawing[i][3], this.x, this.y, this.w, this.h);
		}
		g.fillStyle = "white";
		g.fillText(this.lvl, this.x, this.y - 5);
	}
	
	this.nextTexture = function(){
		if(this.state.texture[0] == this.state.texture.length-1){
			this.state.texture[0] = 1;
		}else{
			this.state.texture[0]++;
		}
	}
	
	this.handleKeys = function(){
		//w 87
		if(keys.includes(87)){
			this.vy-=this.speed;
		}
		//s 83
		if(keys.includes(83)){
			this.vy+=this.speed;
		}
		//a 65
		if(keys.includes(65)){
			this.vx-=this.speed;
		}
		//d 68
		if(keys.includes(68)){
			this.vx+=this.speed;
		}
		
		//r 82
		if(keys.includes(82)){
			
		}
	}
	
	this.handleInteraction  = function(){
		var args = Array.prototype.slice.call(arguments);
		var collidedWith = args[0];
		for(let i in collidedWith){
			if(collidedWith[i].id == "wall"){
				this.vx = 0;
				this.vy = 0;
			}
			if(collidedWith[i].id == "golem"){
				if(this.lvl > collidedWith[i].lvl){
					this.lvl+=collidedWith[i].lvl;
					elements.splice(elements.indexOf(collidedWith[i]), 1);
				}else{
					elements = [];
					alert("Unfortunately, you tried to kill an enemy that was bigger than you, and now you are dead.");
				}
			}
			if(collidedWith[i].id == "ogre"){
				if(this.lvl > collidedWith[i].lvl){
					this.lvl+=collidedWith[i].lvl;
					elements.splice(elements.indexOf(collidedWith[i]), 1);
				}else{
					elements = [];
					alert("Unfortunately, you tried to kill an enemy that was bigger than you, and now you are dead.");
				}
			}
			if(collidedWith[i].id == "demon"){
				if(this.lvl > collidedWith[i].lvl){
					this.lvl+=collidedWith[i].lvl;
					elements.splice(elements.indexOf(collidedWith[i]), 1);
					alert("Congradulations! You beat the demon!");
				}else{
					elements = [];
					alert("Unfortunately, you tried to kill an enemy that was bigger than you, and now you are dead.");
				}
			}
		}
	}
	
	this.collision = function(){
		var collisions = [];
		for(let i=0; i<elements.length; i++){
			var rect = elements[i];
			if(rect != this){
				if (this.x+this.vx < rect.x + rect.w && this.x+this.vx + this.w > rect.x && this.y+this.vy < rect.y + rect.h && this.y+this.vy + this.h > rect.y) {
					collisions.push(rect);
				}
			}
		}
		return collisions;
	}
	
}

var Ogre = function(){
	var args = Array.prototype.slice.call(arguments);
	
	this.id = "ogre";
	
	this.lvl = 30;
	
	this.x = args[0] || 0;
	this.y = args[1] || 0;
	this.speed = args[2] || 1;
	this.vx = 0;
	this.vy = 0;
	
	this.w = 40;
	this.h = 52;
	
	this.states = {
		standing: {
			texture:
				[
					1,
					[[23, 327, 20, 26]],
					[[55, 327, 20, 26]]
				]
		}
	};
	this.state = args[3] || this.states.standing;
	
	this.update = function(){
		
	}
	
	this.render = function(){
		/* Have fun with this one! */
		var drawing = this.state.texture[this.state.texture[0]];
		for(let i = 0; i < drawing.length; i++){
			g.drawImage(tileSet, drawing[i][0], drawing[i][1], drawing[i][2], drawing[i][3], this.x, this.y, this.w, this.h);
		}
		g.fillStyle = "white";
		g.fillText(this.lvl, this.x, this.y - 5);
	}
	
	this.nextTexture = function(){
		if(this.state.texture[0] == this.state.texture.length-1){
			this.state.texture[0] = 1;
		}else{
			this.state.texture[0]++;
		}
	}
	
	this.handleInteraction  = function(){
		var args = Array.prototype.slice.call(arguments);
		var collidedWith = args[0];
		for(let i in collidedWith){
			
		}
	}
	
	this.collision = function(){
		var collisions = [];
		for(let i=0; i<elements.length; i++){
			var rect = elements[i];
			if(rect != this){
				if (this.x+this.vx < rect.x + rect.w && this.x+this.vx + this.w > rect.x && this.y+this.vy < rect.y + rect.h && this.y+this.vy + this.h > rect.y) {
					collisions.push(rect);
				}
			}
		}
		return collisions;
	}
	
}

var Golem = function(){
	var args = Array.prototype.slice.call(arguments);
	
	this.id = "golem";
	
	this.lvl = 15;
	
	this.x = args[0] || 0;
	this.y = args[1] || 0;
	this.speed = args[2] || 1;
	this.vx = 0;
	this.vy = 0;
	
	this.w = 40;
	this.h = 54;
	
	this.states = {
		standing: {
			texture:
				[
					1,
					[[22, 278, 20, 27]],
					[[54, 278, 20, 27]]
				]
		}
	};
	this.state = args[3] || this.states.standing;
	
	this.update = function(){
		
	}
	
	this.render = function(){
		/* Have fun with this one! */
		var drawing = this.state.texture[this.state.texture[0]];
		for(let i = 0; i < drawing.length; i++){
			g.drawImage(tileSet, drawing[i][0], drawing[i][1], drawing[i][2], drawing[i][3], this.x, this.y, this.w, this.h);
		}
		g.fillStyle = "white";
		g.fillText(this.lvl, this.x, this.y - 5);
	}
	
	this.nextTexture = function(){
		if(this.state.texture[0] == this.state.texture.length-1){
			this.state.texture[0] = 1;
		}else{
			this.state.texture[0]++;
		}
	}
	
	this.handleInteraction  = function(){
		var args = Array.prototype.slice.call(arguments);
		var collidedWith = args[0];
		for(let i in collidedWith){
			
		}
	}
	
	this.collision = function(){
		var collisions = [];
		for(let i=0; i<elements.length; i++){
			var rect = elements[i];
			if(rect != this){
				if (this.x+this.vx < rect.x + rect.w && this.x+this.vx + this.w > rect.x && this.y+this.vy < rect.y + rect.h && this.y+this.vy + this.h > rect.y) {
					collisions.push(rect);
				}
			}
		}
		return collisions;
	}
	
}

var Demon = function(){
	var args = Array.prototype.slice.call(arguments);
	
	this.id = "demon";
	
	this.lvl = 50;
	
	this.x = args[0] || 0;
	this.y = args[1] || 0;
	this.speed = args[2] || 1;
	this.vx = 0;
	this.vy = 0;
	
	this.w = 48;
	this.h = 62;
	
	this.states = {
		standing: {
			texture:
				[
					1,
					[[21, 370, 24, 31]],
					[[53, 370, 24, 31]]
				]
		}
	};
	this.state = args[3] || this.states.standing;
	
	this.update = function(){
		
	}
	
	this.render = function(){
		/* Have fun with this one! */
		var drawing = this.state.texture[this.state.texture[0]];
		for(let i = 0; i < drawing.length; i++){
			g.drawImage(tileSet, drawing[i][0], drawing[i][1], drawing[i][2], drawing[i][3], this.x, this.y, this.w, this.h);
		}
		g.fillStyle = "white";
		g.fillText(this.lvl, this.x, this.y - 5);
	}
	
	this.nextTexture = function(){
		if(this.state.texture[0] == this.state.texture.length-1){
			this.state.texture[0] = 1;
		}else{
			this.state.texture[0]++;
		}
	}
	
	this.handleInteraction  = function(){
		var args = Array.prototype.slice.call(arguments);
		var collidedWith = args[0];
		for(let i in collidedWith){
			
		}
	}
	
	this.collision = function(){
		var collisions = [];
		for(let i=0; i<elements.length; i++){
			var rect = elements[i];
			if(rect != this){
				if (this.x+this.vx < rect.x + rect.w && this.x+this.vx + this.w > rect.x && this.y+this.vy < rect.y + rect.h && this.y+this.vy + this.h > rect.y) {
					collisions.push(rect);
				}
			}
		}
		return collisions;
	}
	
}

var gameLoop = setInterval(function(){
	if(ticks % 30 == 0){
		nextTexture();
	}
	update();
	render();
	ticks++;
}, 31);

document.addEventListener("keydown", function(e){
	if(!keys.includes(e.keyCode)){
		keys.push(e.keyCode);
	}
});

document.addEventListener("keyup", function(e){
	var index = keys.indexOf(e.keyCode);
	if(index > -1){
		keys.splice(index, 1);
	}
});