var PLAY =1
var END =0
var gameState = PLAY

var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie_IMG;
var bullets = 50;
var bulletGroup, zombieGroup;

var life1, life2,life3;
var heart1, heart2, heart3;
var explosionSound, loseSound, winSound;

var life = 3;
var score = 0;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
   
  bgImg = loadImage("assets/bg.jpeg")

  zombie_IMG = loadImage("assets/zombie.png");

  life1 = loadImage("assets/heart_1.png");
  life2 = loadImage("assets/heart_2.png");
  life3 = loadImage("assets/heart_3.png");

  explosionSound = loadSound("assets/explosion.mp3");
  loseSound = loadSound("assets/lose.mp3");
  winSound = loadSound("assets/win.mp3");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   bulletGroup= new Group();
   zombieGroup= new Group();

   heart1 = createSprite(60,30,5,5);
   heart1.scale=0.4
   heart1.addImage("heart1",life1);
   heart1.visible=false

   heart2 = createSprite(70,30,5,5);
   heart2.scale=0.4
   heart2.addImage("heart2",life2);
   heart2.visible=false

   heart3 = createSprite(120,30,5,5);
   heart3.scale=0.4
   heart3.addImage("heart3",life3);
   


}


function draw() {
  background(0); 

  if(gameState === PLAY){

    if(life===3){
      heart3.visible=true;
      heart2.visible=false;
      heart1.visible=false;
    }
    if(life===2){
      heart2.visible=true;
      heart3.visible=false;
      heart1.visible=false;
    }
    if(life===1){
      heart1.visible=true;
      heart2.visible=false;
      heart3.visible=false;
    }
    if(life===0){
      heart1.visible=false;
      heart2.visible=false;
      heart3.visible=false;
      gameState=END;
    }

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
   player.addImage(shooter_shooting)
  bullet = createSprite(player.x,player.y-25,15,3);
  bullet.velocityX = 40
  bullet.shapeColor="yellow";
  player.depth=bullet.depth;
  player.depth+=2
  bulletGroup.add(bullet);
  bullets=bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

    if(bulletGroup.isTouching(zombieGroup)){
      for(var i=0; i<zombieGroup.length; i++){
        if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
        }
    }
  }
  if(zombieGroup.isTouching(player)){
    for(var i=0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(player)){
     zombieGroup[i].destroy();
     life=life-1
    
    }
   }
  }
    Enemy();
}
drawSprites();

if(gameState === END){
  bulletGroup.destroyEach();
  zombieGroup.destroyEach();
  player.destroy();

  textSize(25);
  fill("Red");
  stroke("black");
  strokeWeight(6);
  text("GAME OVER!!!",width/2,50);
  
}

fill("yellow")
text(mouseX+","+mouseY, mouseX,mouseY);

}

function Enemy(){ 
  if(frameCount % 80===0){
    enemy = createSprite(displayWidth,random(80,500), 600,80);
    enemy.addImage(zombie_IMG); 
    enemy.scale = 0.15
    enemy.velocityX = -6
    enemy.setCollider("rectangle",0,0,400,1000);
    enemy.debug=true
    zombieGroup.add(enemy);
  }
  
}
