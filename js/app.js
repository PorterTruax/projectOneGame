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
	// move(key){
	// 	if (game.started === true
	// 		&& key === "ArrowDown"
	// 		&& (this.y+this.r) < 600){
	// 		this.clear()
	// 		this.y += this.speed
	// 		this.draw()
	// 	}
	// 	if (game.started === true
	// 		&& key === "ArrowUp"
	// 		&& (this.y-this.r) > 0){
	// 		this.clear()
	// 		this.y-= this.speed
	// 		this.draw()
	// 	}
	// 	if (game.started === true 
	// 		&& key === "ArrowRight"
	// 		&& (this.x+this.r) < 800){
	// 		this.clear()
	// 		this.x += this.speed
	// 		this.draw()
	// 	}
	// 	if (game.started === true
	// 		&& key === "ArrowLeft"
	// 		&& (this.x-this.r) > 0){
	// 		this.clear()
	// 		this.x-=this.speed
	// 		this.draw()
	// 	}
	// }
	clear(){
		ctx.clearRect(this.x-this.r, this.y-this.r, 2*this.r, 2*this.r)
	}
	checkCollision(thing){
		// REVIEW THIS WITH REUBEN ON MONDAY
		let distX = Math.abs(this.x - thing.x-thing.width/2)
		let distY = Math.abs(this.y - thing.y-thing.width/2)

		//
		if (distX > (thing.width/2 +this.r)){
			// console.log("no collision");
			return false
		}
		if (distY > (thing.height/2 +this.r)) {
			// console.log("no collision");
			return false

		}
		if (distX <= (thing.width/2) && thing.collided ===false) {
			// console.log("collision");
			// console.log(thing);
			thing.collided = true
			thing.erase()
			return true
		}
		if (distY <= (thing.height/2 && thing.collided ===false)) {
			// console.log(thing);
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
		this.scoreImpact = -5
		this.speed = -10
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
	eraseToMove(){
		if (this.collided === false){
		ctx.clearRect(this.x, this.y, this.width, this.height)
		}
	}
	move(){
		if (this.collided ===false){
		this.eraseToMove()
		this.y+= this.speed
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
		this.scoreImpact = -1
		this.speed = -15
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
	eraseToMove(){
		if (this.collided === false){
			ctx.clearRect(this.x, this.y, this.width, this.height)
		}
	}
	move(){
		if (this.collided ===false){
			this.eraseToMove()
			this.y+= this.speed
			this.draw()
		}
	}
}

//we'll need a game object


const game = {
	level: 1,
	timer: 30,
	started: false,
	playerOne: null,
	playerTwo: null,
	playerOneScore: 0,
	playerTwoScoreBoardExists: false,
	playerTwoScore: 0,
	piggies:[],
	pigeons:[],
	levelThreshold: 1,
	levelEnd: false,
	createPlayerOne(){
		const playerOneMade = new Falcon(450,200)
		this.playerOne = playerOneMade
		this.playerOne.move = function (key){
			if (game.started === true
				&& key === "ArrowDown"
				&& (this.y+this.r) < 600){
					this.clear()
					this.y += this.speed
					this.draw()
			}
		if (game.started === true
				&& key === "ArrowUp"
				&& (this.y-this.r) > 0){
					this.clear()
					this.y-= this.speed
					this.draw()
			}
		if (game.started === true 
				&& key === "ArrowRight"
				&& (this.x+this.r) < 800){
					this.clear()
					this.x += this.speed
					this.draw()
			}
		if (game.started === true
				&& key === "ArrowLeft"
				&& (this.x-this.r) > 0){
					this.clear()
					this.x-=this.speed
					this.draw()
			}
		}
		this.playerOne.draw()
	},
	createPlayerTwo(){
		const playerTwoMade = new Falcon(350, 200)
		this.playerTwo = playerTwoMade
		this.playerTwo.color = "green"
		this.playerTwo.move = function (key){
			if (game.started === true
				&& key === "s"
				&& (this.y+this.r) < 600){
					this.clear()
					this.y += this.speed
					this.draw()
			}
		if (game.started === true
				&& key === "w"
				&& (this.y-this.r) > 0){
					this.clear()
					this.y-= this.speed
					this.draw()
			}
		if (game.started === true 
				&& key === "d"
				&& (this.x+this.r) < 800){
					this.clear()
					this.x += this.speed
					this.draw()
			}
		if (game.started === true
				&& key === "a"
				&& (this.x-this.r) > 0){
					this.clear()
					this.x-=this.speed
					this.draw()
			}
		}
		this.playerTwoScoreBoardExists = true
		this.playerTwo.draw()
	},
	//this function creates the pigs in random places, over the weekend and going
	//into next week, think about how these could be spaced better (to prevent overlap)
	//are there css properties to tap into? padding?
	createPiggies(){
		for (let i=0; i < (this.level*30)/3;i++){
			//create pigs at random places on the map
			let piggie = new Piggy((Math.floor(Math.random() * 800)), (Math.floor(Math.random() * 600)))
			piggie.draw()
			this.piggies.push(piggie)
		}
	},
	makePigsAndPigeonsFly(){
		for (let i=0; i < this.piggies.length;i++){
			this.piggies[i].move()
		}
		for (let i=0; i < this.pigeons.length;i++){
			this.pigeons[i].move()
		}
	},
	createPigeons(){
		for (let i=0; i < (this.level*25)/3;i++){
			//create pigs at random places on the map
			let pigeon = new Pigeon((Math.floor(Math.random() * 800)), (Math.floor(Math.random() * 600)))
			pigeon.draw()
			this.pigeons.push(pigeon)
		}

	},
	keepMakingPigsAndPigeons(){
		//make pigs and pigeons in the lower half of map 
		for (let i=0; i < (this.level*10)/3;i++){
			let pigeon = new Pigeon((Math.floor(Math.random()* 800)), (Math.floor(Math.random() *200)+400))
			pigeon.draw()
			this.pigeons.push(pigeon)
		}
		for (let i=0; i < (this.level*5)/3;i++){
			let piggie = new Piggy((Math.floor(Math.random() * 800)), (Math.floor(Math.random() * 200)+400))
			piggie.draw()
			this.piggies.push(piggie)
		}
	},
	checkIfPlayerOneCollidesWithPiggie(){
		for (let i=0; i < this.piggies.length; i++){
			if (this.playerOne.checkCollision(this.piggies[i])){
				this.playerOneScore -= 5
				// this.piggies[i].erase()
			}
		}
	},
	checkIfPlayerOneCollidesWithPigeon(){
		for(let i =0; i< this.pigeons.length; i++){
			if (this.playerOne.checkCollision(this.pigeons[i])){
				this.playerOneScore +=1
			}
		}
	},
	checkIfPlayerTwoCollideswithPigeon(){
		for (let i =0; i <this.piggies.length; i++){
			if (this.playerTwo.checkCollision(this.pigeons[i])){
				this.playerTwoScore +=1
			}
		}
	},
	checkIfPlayerTwoCollidesWithPiggie(){
		for (let i =0; i <this.piggies.length; i++){
			if (this.playerTwo.checkCollision(this.piggies[i])){
				this.playerTwoScore -=5
			}
		}
	},
	//need to figure out why this function keeps running even
	//when timer is out
	makeNewPigsandPigeonsInterval: function (){
		if (this.started === true){
			this.timerHandle = setInterval(()=>{	
				this.keepMakingPigsAndPigeons()

					if (this.timer <= 0 || this.started === false){
					clearInterval(this.timerHandle)
					console.log("Should I be here?");

				}
			}, 5000)
		}
	},
	decreaseTime: function (){
		if(this.started === true){
			this.timerHandle = setInterval(()=>{
				this.timer -=1
				// console.log(this.timer);
				this.updateTimerDisplay()

				this.makePigsAndPigeonsFly()

				this.endLevel()

				this.updateLevelThreshold()

				//end the game
				if(this.timer <= 0 || this.started === false){
					clearInterval(this.timerHandle)
					this.endLevel()
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
			
			let playerOneScore = document.getElementById('playerOneScoreboard')
			//set it
			playerOneScore.textContent=`Player One Score: ${this.playerOneScore}`
		
		if (this.playerTwoScoreBoardExists === true){
			
			//get and open up the player two scoreboard
			let playerTwoScore = document.getElementById('playerTwoScoreboard')
			
			playerTwoScore.style.display = 'block'

			playerTwoScore.textContent = `Player Two Score: ${this.playerTwoScore}`
		}
	},
	endLevel(){
		if (this.playerTwoScoreBoardExists ===false){
			if (this.timer === 0 && this.playerOneScore >= this.levelThreshold){
				console.log('Good, job player one! You beat the level and this is console logging correctly')
				this.levelEnd = true
				congrats.style.display="block"
				congrats.textContent= "You beat the level onto the next one"
			} 

			if (this.timer === 0 && this.playerOneScore < this.levelThreshold) {
				console.log("Whoop :( Sorry, player one. you lost the level and this is console logging correctly");
				canvas.style.display ='none'
				lost.style.display = "block"
				reset.style.display ='none'
				this.started = false
			}
		}
		else {
			if (this.timer === 0 
				&& this.playerOneScore > this.playerTwoScore
				&& this.playerOneScore > this.levelThreshold){
					console.log("Congratulations, player one! You can keep playing.")
					//remove player two
					this.playerTwo.clear()
					this.playerTwo = null
					this.levelEnd = true 
					congrats.style.display="block"
					congrats.textContent= "Congrats Player One! You beat the level. Onto the next one"
			}

			
		}
	},
	updateLevelThreshold(){
		this.levelThreshold = this.level*5
		let goalThresholdDisplay = document.getElementById('levelThreshold')
		goalThresholdDisplay.textContent =`Goal Threshold: ${this.levelThreshold}`
		
		if (this.levelEnd === true){
			this.level += 1
			this.playerOneScore = 0
			this.playerTwoScore = 0
			console.log("Level has updated")
			let levelDisplay = document.getElementById('level')
			levelDisplay.textContent = `Level: ${this.level}`
			this.timer += (this.level*10)+30
			this.levelEnd = false
		}
	},
	//is there a way to do the reset without messing up the CSS?
	resetGame(){
		ctx.clearRect(0,0, canvas.width, canvas.height)
		this.timer = 30
		this.level = 1
		let levelDisplay = document.getElementById('level')
		levelDisplay.textContent = `Level: ${this.level}`
		this.updateTimerDisplay()
		this.started = false
		let startGame = document.getElementById('start')
		startGame.style.display = 'block'
		canvas.style.display ='block'
		startGame2Players.style.display ='block'

	}
}

//add an animation function in the global scope
// let x = 0;
// function animate() {


// 	game.createPlayerOne()
// 	document.addEventListener('keydown',(event) =>{
// 	game.playerOne.move(event.key)
// 	})

// 	//createplayer one
// 	game.playerOne.move()
// 	ctx.clearRect(0,0, canvas.width, canvas.height)
// 	document.addEventListener('keydown',(event) =>{
// 	game.playerOne.move(event.key)
// 	})
	

// 	//move pigeons/pigs
// 	game.makePigsAndPigeonsFly()

// 	//check if player one collides with pigeons,etc.
// 	game.checkIfPlayerTwoCollidesWithPiggie()

// 	window.requestAnimationFrame(animate)
// }

// animate();

// //initialState (get the divs we're going to update throughout the game, set and hide
// them as need be)
let timerDiv = document.getElementById('timer')
let playerTwoScore = document.getElementById('playerTwoScoreboard')
let congrats = document.getElementById('congratulations')
let lost = document.getElementById('lost')
let reset = document.getElementById('reset')
let playAgain = document.getElementById('playAgain')
let startGame = document.getElementById('start')
let startGame2Players = document.getElementById('start2')


canvas.style.display ='none'
congrats.style.display = 'none'
lost.style.display='none'
playerTwoScoreboard.style.display = 'none'


//we'll need event listeners -- mostly related to key strokes...
startGame.addEventListener('click',() =>{
	if (game.started === false){
			canvas.style.display ='block'
			game.started= true

			// create characters
			game.createPlayerOne()
			game.createPiggies()
			game.createPigeons()
			// console.log(timerDiv);
			
			//make pigs/pigeons move
			game.makePigsAndPigeonsFly()

			//keep making pigs/pigeons on the map oninterval
			game.makeNewPigsandPigeonsInterval()

			//roll the timer
			game.decreaseTime()

			//end level
			game.endLevel()

			//update level threshold when level ends
			game.updateLevelThreshold()
			startGame.style.display = 'none'

	}
})

startGame2Players.addEventListener('click',() => {
	if (game.started === false){
			canvas.style.display ='block'
			game.started= true

			// create characters
			game.createPlayerOne()
			game.createPlayerTwo()
			game.createPiggies()
			game.createPigeons()
			// console.log(timerDiv);
			
			//make pigs/pigeons move
			game.makePigsAndPigeonsFly()

			//keep making pigs/pigeons on the map oninterval
			game.makeNewPigsandPigeonsInterval()

			//roll the timer
			game.decreaseTime()

			//end level
			game.endLevel()

			//update level threshold when level ends
			game.updateLevelThreshold()
			startGame.style.display = 'none'
			startGame2Players.style.display='none'
	}

})


playAgain.addEventListener('click',() => {
	game.resetGame()
	lost.style.display = "none"
})

reset.addEventListener('click', () =>{
	game.resetGame()
})


document.addEventListener('keydown',(event) =>{
	
	 if(['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
    game.playerOne.move(event.key)
  }
  	
  	if(['w', 'a', 's', 'd'].includes(event.key)) {
    game.playerTwo.move(event.key)
  }

	game.checkIfPlayerOneCollidesWithPiggie()
	game.checkIfPlayerOneCollidesWithPigeon()

	if (game.playerTwoScoreBoardExists=== true){
		game.checkIfPlayerTwoCollideswithPigeon()
		game.checkIfPlayerTwoCollidesWithPiggie()

	}
	game.updateScoreboard()
})


//build the game/collision logic including the score updating
//done

//then do the timer
//done

//once the timer and score are done, set the goal threshold
//done

//edit the pigs and pigeons so that they can "fly"
//done

// //level design (i.e. how many pigs, pigeons, goal threshold  will be altered to reflect
// a mathematical relationship to the level number) 
//done

//build reset button
//done

//build the infrastructure for multiplayer -- maybe make player number a property of
//the bird object the commands that move the player two are different from player 1 and 
//player two scoreboard gets updated.... rather then have the players go in rounds
//have the players play simultaneously