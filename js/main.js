class Player{

    constructor(){
        this.width = 10;
        this.height = 10;
        this.positionX = 50 - this.width/2;
        this.positionY = 0;


        this.domElement = null; //store a ref. to the dom element of the player.

        this.createDomElement();
    }  

    createDomElement(){
        this.domElement = document.createElement("div");
        /*Create the a new element*/
        this.domElement.id = "player";
        /*assign a new id to that new div*/
        this.domElement.style.width = this.width + "vw";/*concatenation `${this.width} vw`*/ 
        /*linking the this.width to the player, we don't add the 'viewwidth'
         or 'viewheight' to the constructor because it would prevent 
         the calculation from happening directly.*/
        this.domElement.style.height = this.height + "vh";/*concatenation `${this.height} vh`*/ 
        /*linking the this.width to the player, we don't add the 'viewwidth'
         or 'viewheight' to the constructor because it would prevent 
         the calculation from happening directly.*/
        this.domElement.style.bottom = this.positionY + "vh"; /*connecting the css bottom position with the this.positionY */
        this.domElement.style.left = this.positionX + "vw"; /* connecting the css left position with the this.positionX */
        /*used .innerText to add content to the div*/
        const parentElm = document.getElementById("board");
        /*get the parent Element where we want to store the player*/
        parentElm.appendChild(this.domElement);
        /*append or add the playerElm into the parentElm(board)*/
    }
    moveLeft(){
        this.positionX -= 2;
        
        if(this.positionX >= 0){ //added the if to stop the player from going outside by using 0 as a stop.
        this.domElement.style.left = this.positionX + "vw"; //this.domElement is now connected to the last line of createDomElement();
        }// or this.positionx -= 1 || this.position--;
        console.log(`this is the new position ${this.positionX}`)
    }
    moveRight(){
        this.positionX += 2;
        this.domElement.style.left = this.positionX + "vw";
       
     }
}

class Obstacle {
    constructor(){
        this.width = 20;
        this.height = 10;
        this.positionX = 50 - this.width/2;
        this.positionY = 100;


        this.domElement = null;

        this.createDomElement();
    }

    createDomElement(){

            this.domElement = document.createElement("div");
            /*Create the a new element*/
            this.domElement.className = "obstacle";
            /*assign a new id to that new div*/
            this.domElement.style.width = this.width + "vw";/*concatenation `${this.width} vw`*/ 
            /*linking the this.width to the obstacle, we don't add the 'viewwidth'
             or 'viewheight' to the constructor because it would prevent 
             the calculation from happening directly.*/
            this.domElement.style.height = this.height + "vh";/*concatenation `${this.height} vh`*/ 
            /*linking the this.width to the player, we don't add the 'viewwidth'
             or 'viewheight' to the constructor because it would prevent 
             the calculation from happening directly.*/
            this.domElement.style.bottom = this.positionY + "vh"; /*connecting the css bottom position with the this.positionY */
            this.domElement.style.left = this.positionX + "vw"; /* connecting the css left position with the this.positionX */
            /*used .innerText to add content to the div*/
            const parentElm = document.getElementById("board");
            /*get the parent Element where we want to store the obstacle*/
            parentElm.appendChild(this.domElement);
            /*append or add the obstacleElm into the parentElm(board)*/
    }

    moveDown(){
        this.positionY--; //or this.positionY = this.positionY + 1;
        this.domElement.style.bottom = this.positionY + "vh"
        console.log(`this is my obstacle position... ${this.positionY}`);
    }

}
const player = new Player(); 
const obstacleArray = []; //here, we will store instances of the class obstacle!!


setInterval(()=>{       //Creating new obstacles every 3sec and storing them in the obstacleArray.
    const newObstacle = new Obstacle();
    obstacleArray.push(newObstacle);
},3000)



const intervalId = setInterval(() => {  //looping through the array and calling the .moveDown() for each element and detect collision;
    obstacleArray.forEach((obstacleInstance) =>{
        obstacleInstance.moveDown();

        if (obstacleInstance.positionX < player.positionX + player.width &&
            obstacleInstance.positionX + obstacleInstance.width > player.positionX &&
            obstacleInstance.positionY < player.positionY + player.height &&
            obstacleInstance.height + obstacleInstance.positionY > player.positionY) {
            console.log("game over my fren"); ///// Code to detect collision //////////////
        }
    })    
}, 60);

clearInterval(intervalId);



//attach  addEventListener =>

document.addEventListener("keydown", (event) => {
console.log('user pressed a key....')
console.log(event.code)

if(event.code === "ArrowLeft"){
    player.moveLeft();
} else if(event.code === "ArrowRight"){
    player.moveRight();
}
})


