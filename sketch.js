var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie_IMG;
var bullet
var bulletGroup, zombieGroup;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
   
  bgImg = loadImage("assets/bg.jpeg")

  zombie_IMG = loadImage("assets/zombie.png");

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



}


function draw() {
  background(0); 

  
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
    Enemy();
      

drawSprites();

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
