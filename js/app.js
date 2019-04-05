//let's kick off the canvas stuff

const canvas = document.getElementById('myCanvas')
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
	checkCollision(thing){
		// 
		let distX = Math.abs(this.x - thing.x-thing.width/2)
		let distY = Math.abs(this.y - thing.y-thing.width/2)

		//
		if (distX > (thing.width/2 +this.r)){
			console.log("no collision");
			return false
		}

		if (distY > (thing.height/2 +this.r)) {
			console.log("no collision");
			return false

		}

		if (distX <= (thing.width/2) && thing.collided ===false) {
			console.log("collision");
			console.log(thing);
			thing.collided = true
			thing.erase()
			return true
		}

		if (distY <= (thing.height/2 && thing.collided ===false)) {
			console.log(thing);
			thing.collided = true
			thing.erase()
			return true
		}
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
		this.scoreImpact = 1
	}
	draw(){
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height)
		ctx.fillStyle=this.color
		ctx.fill()
	}
	erase(){
		if (this.collided === true){
			ctx.clearRect(this.x, this.y, this.width, this.height)
		// this.color = "grey"
		// this.draw()
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
		this.scoreImpact = -1
	}
	draw(){
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height)
		ctx.fillStyle=this.color
		ctx.fill()
	}
	erase(){
		if (this.collided === true){
			ctx.clearRect(this.x, this.y, this.width, this.height)
			// this.color ="grey"
			// this.draw()
		}
	}
}

//we'll need a game object


const game = {
	level: 1,
	timer: 60,
	started: false,
	playerOne: null,
	playerTwo: null,
	playerOneScore: 0,
	playerTwoScoreBoardExists: false,
	playerTwoScore: 0,
	piggies:[],
	pigeons:[],
	createPlayerOne(){
		const playerOneMade = new Falcon(450,200)
		this.playerOne = playerOneMade
		this.playerOne.draw()
	},
	createPlayerTwo(){
		const playerTwoMade = new Falcon(350, 200)
		this.playerTwo = playerTwoMade
		this.playerTwoScoreBoardExists = true
	},
	//this function creates the pigs in random places, over the weekend and going
	//into next week, think about how these could be spaced better (to prevent overlap)
	//are there css properties to tap into? padding?
	createPiggies(){
		for (let i=0; i < (this.level*30)/3;i++){
			//create pigs at random places on the map
			let piggie = new Piggy((Math.floor(Math.random() * 600)), (Math.floor(Math.random() * 600)))
			piggie.draw()
			this.piggies.push(piggie)
		}
	},
	createPigeons(){
		for (let i=0; i < (this.level*25)/3;i++){
			//create pigs at random places on the map
			let pigeon = new Pigeon((Math.floor(Math.random() * 600)), (Math.floor(Math.random() * 600)))
			pigeon.draw()
			this.pigeons.push(pigeon)
		}

	},
	checkIfPlayerOneCollidesWithPiggie(){
		for (let i=0; i < this.piggies.length; i++){
			if (this.playerOne.checkCollision(this.piggies[i]))
				this.playerOneScore -= 1
				// this.piggies[i].erase()
		}
	},
	checkIfPlayerOneCollidesWithPigeon(){
		for(let i =0; i< this.pigeons.length; i++){
			if (this.playerOne.checkCollision(this.pigeons[i]))
				this.playerOneScore +=1
				// this.pigeons[i].erase()
		}
	},
	decreaseTime: function (){
		if(this.started === true){
			this.timerHandle = setInterval(()=>{
				this.timer -=1
				// console.log(this.timer);
				this.updateTimerDisplay()
				//end the game
				if(this.timer <= 0){
					clearInterval(this.timerHandle)
					console.log("game over");
				}
				}, 1000)
			}
	},
	updateTimerDisplay(){
		let timerDiv = document.getElementById('timer')
		timerDiv.textContent =`${this.timer}` 
	},
	updateScoreboard(){
		if (this.playerTwoScoreBoardExists === true){
			//get and open up the player two scoreboard
			let playerTwoScore = document.getElementById('playerTwoScoreboard')
			playerTwoScore.style.display = 'block'

			//get the player one scoreboard
			let playerOneScore = document.getElementById('playerOneScoreboard')
			playerOneScore.textContent=`${this.playerOneScore}`

			//set it
			playerOneScore.textContent=`${this.playerOneScore}`
			playerTwoScore.textContent=`${this.playerTwoScoreboard}`
		} else{
			//get the player one scoreboard
			let playerOneScore = document.getElementById('playerOneScoreboard')

			//set it
			playerOneScore.textContent=`${this.playerOneScore}`
		}

	}
}

// //initialState (get the divs we're going to update throughout the game, set and hide
// them as need be)
let timerDiv = document.getElementById('timer')
let playerTwoScore = document.getElementById('playerTwoScoreboard')

playerTwoScoreboard.style.display = 'none'


//we'll need event listeners -- mostly related to key strokes...

timerDiv.addEventListener('click',() =>{
	if (game.started === false){
			game.started= true
			game.createPlayerOne()
			game.createPiggies()
			game.createPigeons()
			console.log(timerDiv);
			game.decreaseTime()
			game.checkIfPlayerOneCollidesWithPiggie()
	}
})

document.addEventListener('keydown',(event) =>{
	game.playerOne.move(event.key)
	game.checkIfPlayerOneCollidesWithPiggie()
	game.checkIfPlayerOneCollidesWithPigeon()
	game.updateScoreboard()
})


//build the game/collision logic including the score updating

//then do the timer

//once the timer and score are done, set the goal threshold

// //level design (i.e. how many pigs, pigeons, goal threshold  will be altered to reflect
// a mathematical relationship to the level number)

//build the infrastructure for multiplayer -- maybe make player number a property of
//the bird object the commands that move the player two are different from player 1 and 
//player two scoreboard gets updated.... rather then have the players go in rounds
//have the players play simultaneously