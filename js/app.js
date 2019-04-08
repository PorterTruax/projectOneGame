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
		this.speed= 10
		this.x=x
		this.y=y
		this.r = 15
		this.score = 0
		this.direction = {
			up: false,
			down: false,
			//come back and test this
			left: false,
			right: false
		}
	}
	draw(){
		ctx.beginPath()
		ctx.arc(this.x, this.y,this.r, 0 ,2*Math.PI)
		ctx.fillStyle= this.color
		ctx.fill()
	}
	clear(){
		ctx.clearRect(this.x-this.r, this.y-this.r, 2*this.r, 2*this.r)
	}
	move(){
		if (this.direction.up === true && (this.y-this.r) >= 0) {
			this.y -= this.speed;
			this.clear()
			this.draw()
		}
    	if(this.direction.left === true && (this.x-this.r) >= 0) {
    		this.x -= this.speed;
    		this.clear
    		this.draw()
    	}

    	if(this.direction.right === true && (this.x+this.r) <= canvas.width) { 
    		this.x += this.speed;
    		this.clear()
    		this.draw()
    	} 

    	if(this.direction.down === true && (this.y+this.r) <= canvas.height) { 
    		this.y += this.speed;
    		this.clear()
    		this.draw()
    	}
	}
	checkCollision(thing){
		//collision from the left
		if ((this.x + this.r) >= thing.x
			&& this.y >= thing.y
			&& this.y <= (thing.height +thing.y)
			&& (this.x+this.r) <= thing.x + thing.width
			&& thing.collided === false){
				thing.collided = true
				thing.erase()
				console.log("There's been a collision")
				this.score += thing.scoreImpact
				console.log('Player score: ' + this.score);
				game.updateScoreboard()
		}
		//collision from above
		if ((this.y+this.r) >= thing.y
			&& (this.y +this.r) <= thing.y + thing.height
			&& this.x >= thing.x
			&& this.x <= (thing.x +thing.width)
			&& thing.collided === false){
				thing.collided = true
				thing.erase()
				console.log("There's been a collision")
				this.score += thing.scoreImpact
				console.log('Player score: ' + this.score)
			}

		//collision from right
		if ((this.x-this.r)<= (thing.x +thing.width)
			&& (this.x-this.r) >= (thing.x)
			&& (this.y) >= thing.y
			&& (this.y) <= (thing.y+thing.height)
			&& thing.collided === false){
				thing.collided = true
				thing.erase()
				console.log("There's been a collision")
				this.score += thing.scoreImpact
				console.log('Player score: ' + this.score);
			}

		//collision from below
		if ((this.y-this.r) <= (thing.y+thing.height)
			&& (this.y-this.r) >= thing.y
			&& this.x >= thing.x
			&& this.x <= (thing.x + thing.width)
			&& thing.collided === false){
				thing.collided = true
				thing.erase()
				this.score += thing.scoreImpact
				console.log('Player score: ' + this.score);
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
		this.speed = -2
		this.name = "piggy"
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
		this.scoreImpact = 1
		this.speed = -2
		this.name = "pigeon"
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
	playerTwoScoreBoardExists: false,
	piggies:[],
	pigeons:[],
	levelThreshold: 1,
	endCreatingPigsPigeons: false,
	createPlayerOne(){
		this.playerOne = new Falcon(450,200)
		this.playerOne.draw()
	},
	createPlayerTwo(){
		this.playerTwo = new Falcon(350, 200)
		this.playerTwo.color = "green"
		this.playerTwoScoreBoardExists = true
		this.playerTwo.draw()
	},
	createPiggies(){
		for (let i=0; i < (this.level*10)/3;i++){
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
		for (let i=0; i < (this.level*10)/3;i++){
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
				this.playerOneScore+= this.piggies[i].scoreImpact
				return true
				// this.piggies[i].erase()
			}
		}
	},
	checkIfPlayerOneCollidesWithPigeon(){
		for(let i =0; i< this.pigeons.length; i++){
			if (this.playerOne.checkCollision(this.pigeons[i])){
				this.playerTwoScore+= this.pigeons[i].scoreImpact
				return true
			}
		}
	},
	checkIfPlayerTwoCollidesWithPigeon(){
		for (let i =0; i <this.pigeons.length; i++){
			if (this.playerTwo.checkCollision(this.pigeons[i])){
				this.playerTwoScore+= this.pigeons[i].scoreImpact
				return true

			}
		}
	},
	checkIfPlayerTwoCollidesWithPiggie(){
		for (let i =0; i <this.piggies.length; i++){
			if (this.playerTwo.checkCollision(this.piggies[i])){
				this.playerTwoScore+= this.piggies[i].scoreImpact
				return true
			}
		}
	},
	decreaseTime: function (){
		if(this.started === true){
			this.timerHandle = setInterval(()=>{
				this.timer -= 1
				// console.log(this.timer);
				this.updateTimerDisplay()

				this.makePigsAndPigeonsFly()
				console.log(this.timer)

				//end the game
				if(this.timer <= 0 || this.started === false){
					clearInterval(this.timerHandle)
					console.log("game over");
					this.endLevel()
					this.updateLevelThreshold()
				}
				}, 500)
			}
	},
	updateTimerDisplay(){
		let timerDiv = document.getElementById('timer')
		timerDiv.textContent =`${this.timer}` 
	},
	updateScoreboard(){ 
			
			let playerOneScore = document.getElementById('playerOneScoreboard')
			
			//set it
			playerOneScore.textContent=`Player One Score: ${this.playerOne.score}`
		
		if (this.playerTwoScoreBoardExists === true){
			
			//get and open up the player two scoreboard
			let playerTwoScore = document.getElementById('playerTwoScoreboard')
			
			playerTwoScore.style.display = 'block'

			playerTwoScore.textContent = `Player Two Score: ${this.playerTwo.score}`
		}
	},
	endLevel(){
			if (this.timer === 0 && this.playerOne.score >= this.levelThreshold){
				console.log('Good, job player one! You beat the level and this is console logging correctly')
				this.levelEnd = true
				congrats.style.display="block"
				congrats.textContent= "You beat the level onto the next one"
			} 

			if (this.timer===0 && this.playerOne.score < this.levelThreshold) {
				console.log("Whoop :( Sorry, player one. you lost the level and this is console logging correctly");
				canvas.style.display ='none'
				lost.style.display = "block"
				reset.style.display ='none'
				this.started = false
			}
		else {
			if (this.timer === 0 
				&& this.playerTwo.score < this.levelThreshold
				&& this.playerOne.score >= this.levelThreshold){
					console.log("Congratulations, player one! You can keep playing.")
					//remove player two
					this.playerTwo.clear()
					this.playerTwo = null
					this.levelEnd = true 
					congrats.style.display="block"
					congrats.textContent= "Congrats Player One! You beat the level. Onto the next one."
			}
			if (this.timer === 0
				&& this.playerOne.score < this.levelThreshold
				&& this.playerTwo.score >= this.levelThreshold){
					console.log("Congratulations player two! You can keep playing.")
					this.playerOne.clear()
					this.levelEnd = true
					congrats.style.display="block"
					this.playerOne = null
					congrats.textContent = "Congrats Player Two! You beat the level. Onto the next one."
			
			}
			if (this.timer === 0
				&& this.playerOne.score < this.levelThreshold
				&& this.playerTwo.score < this.levelThreshold){
					console.log("Neither player advances");
					canvas.style.display ='none'
					lost.style.display = "block"
					this.started = false
			}
			if (this.timer === 0
				&& this.playerOne.score >= this.levelThreshold
				&& this.playerTwo.score >= this.levelThreshold){
					console.log("Both players advance!");
					this.levelEnd = true
					congrats.textContent = "Congrats! Both players advance!"

			}

		}
	},
	updateLevelThreshold(){
		this.levelThreshold = this.level*5
		let goalThresholdDisplay = document.getElementById('levelThreshold')
		goalThresholdDisplay.textContent =`Goal Threshold: ${this.levelThreshold}`
		
		if (this.levelEnd === true){
			this.level += 1
			this.playerOne.score = 0
			if(this.playerTwo !== null){
				this.playerTwo.score = 0
			}


			console.log("Level has updated")
			let levelDisplay = document.getElementById('level')
			levelDisplay.textContent = `Level: ${this.level}`
			this.timer = (this.level*10)+30
			this.updateTimerDisplay()
			this.decreaseTime()
			this.levelEnd = false
		}
	},
	//need to figure out why this function keeps running even
	//even when timer is out
	makeNewPigsandPigeonsInterval: function (){
		if (this.started === true && this.timer %5 ===0){
			this.timerHandle = setInterval(()=>{	
				this.keepMakingPigsAndPigeons()

					if (this.timer <= 0){
					clearInterval(this.timerHandle)
					console.log("Should I be here?");
				}
			}, 5000)
			console.log(this.timerHandle)
		}
	},
	//is there a way to do the reset without messing up the CSS?
	resetGame(){
		ctx.clearRect(0,0, canvas.width, canvas.height)
		this.timer = 30
		this.level = 1
		this.started = false
		let levelDisplay = document.getElementById('level')
		levelDisplay.textContent = `Level: ${this.level}`		
		this.updateTimerDisplay()

		this.playerTwo.score= 0
		this.playerOne.score = 0
		this.updateScoreboard()

		this.playerTwoScoreBoardExists = false
		
		let startGame = document.getElementById('start')
		startGame.style.display = 'block'
		canvas.style.display ='block'
		startGame2Players.style.display ='block'
		playerTwoScoreboard.style.display = 'none'

	}
}

// //add an animation function in the global scope
// let x = 0;
// function animate() {
// 	//create the players
// 	game.createPlayerOne()
// 	if (game.playerTwoScoreBoardExists === true){
// 		game.createPlayerTwo()
// 	}

// 	game.playerOne.move(playerKey)
// 	game.playerTwo.move(player2Key)

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


function clearCanvas() {
  // you can erase smaller parts or just one shape
  // for convenience we erase it all
  // this is usually what you want
  ctx.clearRect(0, 0, canvas.width, canvas.height)  
}


canvas.style.display ='none'
congrats.style.display = 'none'
lost.style.display='none'



//we'll need event listeners -- mostly related to key strokes...
startGame.addEventListener('click',() =>{
	if (game.started === false){
			canvas.style.display ='block'
			game.started = true
			game.endCreatingPigsPigeons = false

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

			// //end level
			// game.endLevel()

			//update level threshold when level ends
			// game.updateLevelThreshold()
			startGame.style.display = 'none'

	}
})

startGame2Players.addEventListener('click',() => {
	if (game.started === false){
			canvas.style.display ='block'
			game.started= true
			game.endCreatingPigsPigeons = false

			// create characters
			game.createPlayerOne()
			game.createPlayerTwo()
			game.createPiggies()
			game.createPigeons()
			// console.log(timerDiv);
			
			//make pigs/pigeons move
			// game.makePigsAndPigeonsFly()

			//keep making pigs/pigeons on the map oninterval
			game.makeNewPigsandPigeonsInterval()

			//roll the timer
			game.decreaseTime()

			// //end level
			// game.endLevel()

			//update level threshold when level ends
			// game.updateLevelThreshold()
			
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
	if (game.playerOne !== null){
 		// if(['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
 			if (event.key === 'ArrowUp'){
 				game.playerOne.direction.up = true
 			}
 			if (event.key === 'ArrowDown'){
 				game.playerOne.direction.down = true
 			}
 			if (event.key === 'ArrowRight'){
 				game.playerOne.direction.right = true
 			}
 			if (event.key === 'ArrowLeft'){
 				game.playerOne.direction.left = true
 			}	

 	 	// }
 	 	// if(event.key === "ArrowDown") player1.setDirection('down'
	}

	if (game.playerTwoScoreBoardExists === true){
		// if(['w', 'a', 's', 'd'].includes(event.key)) {
			if (event.key === 'w'){
 				game.playerTwo.direction.up = true
 			}
 			if (event.key === 's'){
 				game.playerTwo.direction.down = true
 			}
 			if (event.key === 'd'){
 				game.playerTwo.direction.right = true
 			}
 			if (event.key === 'a'){
 				game.playerTwo.direction.left = true
 			}
 		}
	// }

})

document.addEventListener('keyup', (event) =>{
	if(game.playerOne !== null){
		// if(['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
			if (event.key === 'ArrowUp'){
 				game.playerOne.direction.up = false
 			}
 			if (event.key === 'ArrowDown'){
 				game.playerOne.direction.down = false
 			}
 			if (event.key === 'ArrowRight'){
 				game.playerOne.direction.right = false
 			}
 			if (event.key === 'ArrowLeft'){
 				game.playerOne.direction.left = false
			}
		// }
	}

	if (game.playerTwoScoreBoardExists === true){
		// if(['w', 'a', 's', 'd'].includes(event.key)) {
			if (event.key === 'w'){
 				game.playerTwo.direction.up = false
 			}
 			if (event.key === 's'){
 				game.playerTwo.direction.down = false
 			}
 			if (event.key === 'd'){
 				game.playerTwo.direction.right = false
 			}
 			if (event.key === 'a'){
 				game.playerTwo.direction.left = false
 			}
 		}
 	// }
})


// add an animation function in the global scope
let x = 0;
function animate() {
	if (game.started === true){
		game.playerOne.move()
		clearCanvas()
		game.playerOne.draw()

		game.checkIfPlayerOneCollidesWithPiggie()
		game.checkIfPlayerOneCollidesWithPigeon()
		
		if (game.playerTwoScoreBoardExists === true){
			game.playerTwo.move()
			clearCanvas()
			game.playerTwo.draw()
			game.playerOne.draw()

			game.checkIfPlayerTwoCollidesWithPigeon()
			game.checkIfPlayerTwoCollidesWithPiggie()
		}

		game.makePigsAndPigeonsFly()
		game.updateScoreboard()
	}

	window.requestAnimationFrame(animate)
}

console.log(game.playerOne);
console.log(game.playerTwo);


animate();

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

//if both 

//build the infrastructure for multiplayer -- maybe make player number a property of
//the bird object the commands that move the player two are different from player 1 and 
//player two scoreboard gets updated.... rather then have the players go in rounds
//have the players play simultaneously


// this.playerOne.move = function(key){
// 	if (game.started === true
// 		&& key === "ArrowDown"
// 		&& (this.y+this.r) < canvas.height){
// 			this.clear()
// 			this.y += this.speed
// 			this.draw()
// 	}
// if (game.started === true
// 		&& key === "ArrowUp"
// 		&& (this.y-this.r) > 0){
// 			this.clear()
// 			this.y-= this.speed
// 			this.draw()
// 	}
// if (game.started === true 
// 		&& key === "ArrowRight"
// 		&& (this.x+this.r) < canvas.width){
// 			this.clear()
// 			this.x += this.speed
// 			this.draw()
// 	}
// if (game.started === true
// 		&& key === "ArrowLeft"
// 		&& (this.x-this.r) > 0){
// 			this.clear()
// 			this.x-=this.speed
// 			this.draw()
// 	}
// }