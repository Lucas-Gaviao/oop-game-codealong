
class Game {
    constructor(){
        this.player = null;
        this.obstacleArray = []; //here, we will store instances of the class obstacle!!
    }

    start(){
        this.player = new Player(); 

        this.attachEventListeners();
        // Create new obstacle;
        setInterval(() => {       //Creating new obstacles every 3sec and storing them in the obstacleArray.
            const newObstacle = new Obstacle();
            this.obstacleArray.push(newObstacle);
        },3000)

        setInterval(() => {  //looping through the array and calling the .moveDown() for each element and detect collision;
            this.obstacleArray.forEach((obstacleInstance) => {
               
                obstacleInstance.moveDown();
        
                // Detect Collision
                this.detectCollision(obstacleInstance);
                //Delete Object
                this.deleteObstacle(obstacleInstance);
                });    
        }, 60);
    }

    attachEventListeners() {
        //attach  addEventListener =>
     document.addEventListener("keydown", (event) => {

         if(event.code === "ArrowLeft"){
            this.player.moveLeft();
        } else if(event.code === "ArrowRight"){
            this.player.moveRight();
        } else if(event.code === "ArrowUp"){
            this.player.moveUp();
        } else if(event.code === "ArrowDown"){
            this.player.moveDown();
        }
    })
    
    }
    detectCollision(obstacleInstance){
        if (obstacleInstance.positionX < this.player.positionX + this.player.width &&
            obstacleInstance.positionX + obstacleInstance.width > this.player.positionX &&
            obstacleInstance.positionY < this.player.positionY + this.player.height &&
            obstacleInstance.height + obstacleInstance.positionY > this.player.positionY) {
                location.href = "/GameOver.html";
                //console.log("game over my fren"); ///// Code to detect collision //////////////  
    }
}

    deleteObstacle(obstacleInstance){
       //Detect if object needs to be deleted;
       if(obstacleInstance.positionY < 0 - obstacleInstance.height){
        //remove the element from the DOM
        obstacleInstance.domElement.remove();
        //remove element from the array
        this.obstacleArray.shift(); 
    }
}

}

class Player{

    constructor(){
        this.width = 10;
        this.height = 5;
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
        //console.log(`this is the new position ${this.positionX}`)
    }
    moveRight(){
            this.positionX += 2;
            this.domElement.style.left = this.positionX + "vw";
     };

    moveUp(){
        this.positionY += 2;
        this.domElement.style.bottom = this.positionY + "vh";
    }
    moveDown(){
        this.positionY -=2;
        this.domElement.style.bottom = this.positionY + "vh";
        
    }
}

class Obstacle {
    constructor(){
        this.width = 20;
        this.height = 10;
        this.positionX = Math.floor(Math.random() * (100 - this.width));
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
        //console.log(`this is my obstacle position... ${this.positionY}`);
    }

}

const game = new Game();
game.start();



