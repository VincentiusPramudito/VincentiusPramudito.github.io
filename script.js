let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');

let countLife = 3
let currentlyPlaying = true
let life1 = document.getElementById('life1')
let life2 = document.getElementById('life2')
let life3 = document.getElementById('life3')

let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg"
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg"
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg"
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg"

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

const isBot = (door) => {
  if(door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
	} else {
    return true;
	}
}

const playDoor = (door) => {
  numClosedDoors--
  if (numClosedDoors === 0) {
  	gameOver('win');
	}else if(isBot(door)){
    gameOver('lose')
  }
}

const randomChoreGenerator = () => {
  let choreDoor = Math.floor(Math.random()* numClosedDoors)
  if(choreDoor === 0){
    openDoor1 = botDoorPath
    openDoor2 = beachDoorPath
    openDoor3 = spaceDoorPath
  }else if(choreDoor === 1){
    openDoor2 = botDoorPath
    openDoor1 = spaceDoorPath
    openDoor3 = beachDoorPath
  }else if(choreDoor === 2){
    openDoor3 = botDoorPath
    openDoor1 = beachDoorPath
    openDoor2 = spaceDoorPath
  }
}

doorImage1.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage1)) {
  	door1.src = openDoor1;
  	playDoor(door1);
  }
}
doorImage2.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage2)) {
  	door2.src = openDoor2;
  	playDoor(door2);
  }
}
doorImage3.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage3)) {
  	door3.src = openDoor3;
  	playDoor(door3);
  }
}

startButton.onclick = () => {
  if(!currentlyPlaying) {
		startRound();
	}
}

const startRound = () => {
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = "Good luck!"
  randomChoreGenerator();
  if(countLife === 0){
    countLife = 3;
    life1.style.visibility = 'visible'
    life2.style.visibility = 'visible'
    life3.style.visibility = 'visible'
  }
}

const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
	}else {
    startButton.innerHTML = 'Game over! Play again?'
    countLife--
    if(countLife === 2){
      life1.style.visibility = 'hidden'
    }else if(countLife === 1){
      life2.style.visibility = 'hidden'
    }else if(countLife === 0){
      life3.style.visibility = 'hidden'
    }
	}
  currentlyPlaying = false
}

startRound();
