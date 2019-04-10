//let's kick off the canvas stuff

const canvas = document.getElementById('myCanvas')
console.log(canvas);

const ctx = canvas.getContext('2d');
console.log(ctx);


//global variables

let timerDiv = document.getElementById('timer')
let playerTwoScore = document.getElementById('playerTwoScoreboard')
let congrats = document.getElementById('congratulations')
let lost = document.getElementById('lost')
let reset = document.getElementById('reset')
let playAgain = document.getElementById('playAgain')
let startButtons = document.getElementsByClassName('startButtons')
let startGame = document.getElementById('start')
let startGame2Players = document.getElementById('start2')

//graphics
// let falconPicture = document.getElementById('falcon')
// let pigPicture = document.getElementById('flyingPig')
// let pigeonPicture = document.getElementById('pigeon')

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
		this.onSwitch = true
		this.direction = {
			up: false,
			down: false,
			//come back and test this
			left: false,
			right: false
		}
	}
	draw(){
		const falconImage = new Image();
		falconImage.src = "images/falconPicture.png"
		ctx.drawImage(falconImage,this.x, this.y)
	}
	clear(){
		ctx.clearRect(this.x-this.r, this.y-this.r, 2*this.r, 2*this.r)
	}
	move(){
		if (this.onSwitch === true && this.direction.up === true && (this.y-this.r) >= 0) {
			this.y -= this.speed;
			this.clear()
			this.draw()
		}
    	if(this.onSwitch === true && this.direction.left === true && (this.x-this.r) >= 0) {
    		this.x -= this.speed;
    		this.clear
    		this.draw()
    	}

    	if(this.onSwitch === true && this.direction.right === true && (this.x+this.r) <= canvas.width) { 
    		this.x += this.speed;
    		this.clear()
    		this.draw()
    	} 

    	if(this.onSwitch === true && this.direction.down === true && (this.y+this.r) <= canvas.height) { 
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
			&& thing.collided === false
			&& this.onSwitch === true){
				thing.collided = true
				thing.erase()
				console.log("There's been a collision")
				this.score += thing.scoreImpact
				game.updateScoreboard()
		}
		//collision from above
		if ((this.y+this.r) >= thing.y
			&& (this.y +this.r) <= thing.y + thing.height
			&& this.x >= thing.x
			&& this.x <= (thing.x +thing.width)
			&& thing.collided === false
			&& this.onSwitch === true){
				thing.collided = true
				thing.erase()
				console.log("There's been a collision")
				this.score += thing.scoreImpact
			}

		//collision from right
		if ((this.x-this.r)<= (thing.x +thing.width)
			&& (this.x-this.r) >= (thing.x)
			&& (this.y) >= thing.y
			&& (this.y) <= (thing.y+thing.height)
			&& thing.collided === false
			&& this.onSwitch === true){
				thing.collided = true
				thing.erase()
				this.score += thing.scoreImpact
			}

		//collision from below
		if ((this.y-this.r) <= (thing.y+thing.height)
			&& (this.y-this.r) >= thing.y
			&& this.x >= thing.x
			&& this.x <= (thing.x + thing.width)
			&& thing.collided === false
			&& this.onSwitch === true){
				thing.collided = true
				thing.erase()
				this.score += thing.scoreImpact
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
		this.speed = -(Math.random() +.5)
		this.name = "piggy"
	}
	draw(){
		const pigImage = new Image();
		pigImage.src = "images/pigs.png"
		ctx.drawImage(pigImage, this.x, this.y)
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
		const pigeonImage = new Image();
		pigeonImage.src = "images/pigeon.png"
		ctx.drawImage(pigeonImage,this.x, this.y)
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

class Airplane{
	constructor(x,y){
		this.x=x
		this.y=y
		this.color ="orange"
		this.width = 40
		this.height = 20
		this.collided = false
		this.scoreImpact = -5
		this.speed = Math.random()
		this.name = "airplane"
	}
	draw(){
		const planeImage = new Image();
		planeImage.src = "images/airplane.png"
		ctx.drawImage(planeImage,this.x, this.y)
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
			this.x+= this.speed
			this.draw()
		}
	}
}

//we'll need a game object


const game = {
	level: 1,
	timer: 15,
	started: false,
	playerOne: null,
	playerTwo: null,
	piggies:[],
	pigeons:[],
	planes:[],
	levelThreshold: 1,
	endCreatingPigsPigeons: false,
	createPlayerOne(){
		this.playerOne = new Falcon(250,200)
		this.playerOne.draw()
	},
	createPlayerTwo(){
		this.playerTwo = new Falcon(450, 200)
		this.playerTwo.color = "green"
		this.playerTwo.draw()
	},
	createPiggies(){
		for (let i=0; i < (this.level*8)/3;i++){
			//create pigs at random places on the map
			let piggie = new Piggy((Math.floor(Math.random() * canvas.width)), (Math.floor(Math.random() * canvas.height)))
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
			let pigeon = new Pigeon((Math.floor(Math.random() * canvas.width)), (Math.floor(Math.random() * canvas.height)))
			pigeon.draw()
			this.pigeons.push(pigeon)
		}
	},
	createPlanes(){
		if (this.level > 2){
			for (let i =0; i < (this.level)*2; i++){
				let airplane = new Airplane(-10, Math.floor(Math.random()*canvas.height))
				airplane.draw()
				this.planes.push(airplane)
			}
		}
	},
	makePlanesFly(){
		for (let i=0; i <this.planes.length; i++){
			this.planes[i].move()
		}
	},
	keepMakingPigsAndPigeons(){
		//make pigs and pigeons in the lower half of map 
		for (let i=0; i < (this.level*15)/3;i++){
			let pigeon = new Pigeon((Math.floor(Math.random()* canvas.width)), (Math.floor(Math.random() *200)+canvas.height))
			pigeon.draw()
			this.pigeons.push(pigeon)
		}
		for (let i=0; i < (this.level*10)/3;i++){
			let piggie = new Piggy((Math.floor(Math.random() * canvas.width)), (Math.floor(Math.random() * 200)+canvas.height))
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
	checkIfPlayerOneCollidesWithPlane(){
		for (let i =0; i < this.planes.length;i++){
			if (this.playerOne.checkCollision(this.planes[i])){
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
	checkIfPlayerTwoCollidesWithPlane(){
		for(let i = 0; i <this.planes.length;i++){
			if (this.playerOne.checkCollision(this.planes[i])){
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

				this.makePigsAndPigeonsFly()

				if (this.timer % 5 === 0){
					this.keepMakingPigsAndPigeons()
				}

				if (this.timer % 20 ===0){
					this.createPlanes()
				}

				this.timer -= 1
				// console.log(this.timer);
				this.updateTimerDisplay()

				//end the game
				if(this.timer <= 0 || this.started === false){
					clearInterval(this.timerHandle)
					console.log("game over");
					this.endLevel()
					this.updateLevelThreshold()
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
			playerOneScore.textContent=`Player One Score: ${this.playerOne.score}`
		
		if (this.playerTwo !== null){
			
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
		if (this.playerTwo !== null) {
			if (this.timer === 0 
				&& this.playerTwo.score < this.levelThreshold
				&& this.playerOne.score >= this.levelThreshold){
					console.log("Congratulations, player one! You can keep playing.")
					//remove player two
					this.playerTwo.clear()
					this.playerTwo.onSwitch = false
					this.levelEnd = true 
					congrats.style.display="block"
					congrats.textContent= "Congrats Player One! You beat the level. Onto the next one. Player Two, you're frozen. Sorry!"
					playerTwoScore.style.display = 'none'
			}
			if (this.timer === 0
				&& this.playerOne.score < this.levelThreshold
				&& this.playerTwo.score >= this.levelThreshold){
					console.log("Congratulations player two! You can keep playing.")
					this.playerOne.clear()
					this.playerOne.onSwitch = false
					this.levelEnd = true
					congrats.textContent = "Congrats Player Two! You beat the level. Onto the next one. Player One, you're frozen. Sorry!"
			
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
					this.levelEnd = true
					congrats.textContent = "Congrats! Both players advance!"

			}

		}
	},
	updateLevelThreshold(){
		this.levelThreshold = ((this.level*10)/2)*3
		let goalThresholdDisplay = document.getElementById('levelThreshold')
		goalThresholdDisplay.textContent =`Pigeons to eat: ${this.levelThreshold}`
		
		if (this.levelEnd === true){
			this.level += 1
		
			let levelDisplay = document.getElementById('level')
			levelDisplay.textContent = `Level: ${this.level}`
			this.timer = (this.level*5)+25
			this.updateTimerDisplay()
			this.decreaseTime()
			this.levelEnd = false
		}
	},
	//is there a way to do the reset without messing up the CSS?
	resetGame(){
		clearCanvas()
		this.timer = 16
		this.level = 0
		let levelDisplay = document.getElementById('level')
		levelDisplay.textContent = `Level: ${this.level}`


		// startButtons.style.display = "flex"
		// startButtons.style.justifyContent = "center"

		if (this.playerOne !== null){
			this.playerOne.score = 0
			this.updateScoreboard()
		}

		if (this.playerTwo !== null){
			this.playerTwo.score = 0
			this.updateScoreboard()
		}

		this.started = false

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


function clearCanvas() {
  // you can erase smaller parts or just one shape
  // for convenience we erase it all
  // this is usually what you want
  ctx.clearRect(0, 0, canvas.width, canvas.height)  
}


canvas.style.display ='none'
canvas.style.textAlign ="center"
congrats.style.display = 'none'
lost.style.display='none'



//we'll need event listeners -- mostly related to key strokes...
startGame.addEventListener('click',() =>{
	if (game.started === false){
			canvas.style.display ='block'
			canvas.style.textAlign ="center"
			game.started = true
			game.endCreatingPigsPigeons = false
			game.playerTwo = null

			// create characters
			game.createPlayerOne()
			game.createPiggies()
			game.createPigeons()
			game.createPlanes()
			
			//make pigs/pigeons move
			game.makePigsAndPigeonsFly()

			//keep making pigs/pigeons on the map oninterval
			// game.makeNewPigsandPigeonsInterval()

			//roll the timer
			game.decreaseTime()

			// //end level
			// game.endLevel()

			//update level threshold when level ends
			// game.updateLevelThreshold()

	}
})

startGame2Players.addEventListener('click',() => {
	if (game.started === false){
			canvas.style.display ='block'
			canvas.style.textAlign ="center"
			game.started= true
			game.endCreatingPigsPigeons = false
			game.playerTwoScoreBoardExists = false

			// create characters
			game.createPlayerOne()
			game.createPlayerTwo()
			game.createPiggies()
			game.createPigeons()
			game.createPlanes()
	
			game.decreaseTime()

			// //end level
			// game.endLevel()
			//update level threshold when level ends
			// game.updateLevelThreshold()

			// startGame.style.display = 'none'
			// startGame2Players.style.display='none'
	}

})


// playAgain.addEventListener('click',() => {
// 	game.resetGame()
// 	lost.style.display = "none"
// })

reset.addEventListener('click', () =>{
	game.resetGame()
})


window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if(e.key === "ArrowUp" 
    	|| e.key === "ArrowDown" 
    	|| e.key === "ArrowLeft"  
    	|| e.key === "ArrowRight" ) {
        e.preventDefault();
    }
}, false);


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

	if (game.playerTwo !== null){
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

	if (game.playerTwo !== null){
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
		game.checkIfPlayerOneCollidesWithPlane()
		
		if (game.playerTwo !== null){
			game.playerTwo.move()
			clearCanvas()
			game.playerTwo.draw()
			game.playerOne.draw()
			game.checkIfPlayerTwoCollidesWithPigeon()
			game.checkIfPlayerTwoCollidesWithPiggie()
			game.checkIfPlayerTwoCollidesWithPlane()
		}


		game.makePlanesFly()
		game.makePigsAndPigeonsFly()
		game.updateScoreboard()
	}

	window.requestAnimationFrame(animate)
}


animate();

