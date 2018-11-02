var TestLevel = function(){
	this.get = function(){
		var el = [];
		
		for(let i = 0; i<canvas.width/32; i++){
			for(let k = 0; k < canvas.height/32; k++){
				var temp = new floorTile(32*i, 32*k);
				var tex = Math.floor(Math.random()*8);
				if(tex == 0){
					temp.state = temp.states.full;
				}else if(tex == 1){
					temp.state = temp.states.cracked1;
				}else if(tex == 2){
					temp.state = temp.states.cracked2;
				}else if(tex == 3){
					temp.state = temp.states.cracked3;
				}else if(tex == 4){
					temp.state = temp.states.cracked4;
				}else if(tex == 5){
					temp.state = temp.states.cracked5;
				}else if(tex == 6){
					temp.state = temp.states.cracked6;
				}else if(tex == 7){
					temp.state = temp.states.cracked7;
				}
				el.push(temp);
			}
		}
		
		for(let i = 0; i < canvas.width/96; i++){
			var temp = new Wall(96*i, 0);
			el.push(temp);
		}
		for(let i = 0; i < canvas.width/96; i++){
			var temp = new Wall(96*i, canvas.height-32);
			el.push(temp);
		}
		
		for(let i = 0; i <= canvas.height/72 + 5; i++){
			var temp = new Vertical(0, 40*i);
			el.push(temp);
		}
		for(let i = 0; i <= canvas.height/72 + 5; i++){
			var temp = new Vertical(canvas.width-18, 40*i);
			el.push(temp);
		}
		
		el.push(new Golem(400, 100));
		el.push(new Ogre(400, 200));
		el.push(new Demon(400, 300));
		
		el.push(new Player(100, 100));
		
		return el;
	}
}
var testLevel = new TestLevel();
elements = testLevel.get();
