//let's kick off the canvas stuff

const canvas = document.getElementById('my-Canvas')
console.log(canvas);

const ctx = canvas.getContext('2d');
console.log(ctx);

//we'll need a class each for the bird, the pigs, and the pigeons
class Falcon{
	constructor(x,y){
		this.playerOne = false
		this.playerTwo = false
		this.color = "pink"
		this.speed=10
		this.x=x
		this.y=y
		this.r = 15
	}
	draw(){
		ctx.beginPath()
		ctx.arc(this.x, this.y,this.r, 0 ,2*Math.PI)
		ctx.fillStyle= this.color
		ctx.fill()
	}
	move(key){
		if (key === "ArrowDown"){
			this.clear()
			this.y += this.speed
			this.draw()
		}
		if (key ==="ArrowUp"){
			this.clear()
			this.y-= this.speed
			this.draw()
		}
		if (key ==="ArrowRight"){
			this.clear()
			this.x+=this.speed
			this.draw()
		}
		if (key ==="ArrowLeft"){
			this.clear()
			this.x-=this.speed
			this.draw()
		}
	}
	clear(){
		ctx.clearRect(this.x-this.r, this.y-this.r, 2*this.r, 2*this.r)
	}
}

class Piggy{
	constructor(x,y){
		this.x = x
		this.y = y
		this.color = "blue"
		this.width = 25
		this.height = 25
		this.collided = false
	}
	draw(){
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height)
		ctx.fillStyle=this.color
		ctx.fill()
	}
	erase(){
		if (this.collided === true){
		this.color = "grey"
		this.draw()
		}

	}
}

class Pigeon{
	constructor(x,y){
		this.x=x
		this.y=y
		this.color ="red"
		this.width =15
		this.height = 15
		this.collided = false
	}
	draw(){
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height)
		ctx.fillStyle=this.color
		ctx.fill()
	}
	erase(){
		if (this.collided === true){
			this.color ="grey"
			this.draw()
		}
	}
}


const newPigeon = new Pigeon(66,66)
newPigeon.draw()




//we'll need a game object

//we'll need event listeners -- mostly related to key strokes...


//build the game/collision logic including the score updating

//then do the timer

//once the timer and score are done, set the goal threshold

// //level design (i.e. how many pigs, pigeons, goal threshold  will be altered to reflect
// a mathematical relationship to the level number)

//build the infrastructure for multiplayer -- maybe make player number a property of
//the bird object the commands that move the player two are different from player 1 and 
//player two scoreboard gets updated.... rather then have the players go in rounds
//have the players play simultaneously