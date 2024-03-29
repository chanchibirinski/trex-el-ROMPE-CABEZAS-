var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg, restartImg
var jumpSound, checkpointSound, dieSound


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

  jumpSound = loadSound("jump.mp3");
  checkpointSound = loadSound("checkpoint.mp3");
  dieSound = loadSound("die.mp3");
}

function setup() {
 createCanvas(600,200);

 trex = createSprite(50,160,20,50);
 trex.addAnimation("running", trex_running);
 trex.addAnimation("collided", trex_collided);
 trex.scale = 0.5;

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  gameOver = createSprite(300, 100);
  gameOver = addImage(gameOverIMG);

  restart = createSprite(300, 140);
  restart = addImage(restartIMG);

  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = crateGroup();
  cloudsGroup = crateGroup(); 

  trex.setCollider("circle", 0, 0, 40);
  trex.debug = true;

  score = 0;

}

function draw() {
  background(180);

  text("puntuación: "+score, 500, 5);

  if (gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;
    ground.velocityX = -4;
    score = score +Math.round(frameCount/60);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -12;
      //jumpSound.play();
    }

    trex.velocityY = trex.velocityY + 0.8;

    spownClouds();
    spownObtacles();

    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
      //dieSound.play();
    }
  }
  else if (gameState === END) {
   gameOver.visible = true;
   restart.visible = true;

   ground.velocityX = 0;
   trex.velocityX = 0;

   trex.changeAnimation("colided", trex_collided);

   obstaclesGroup.setLifeTimeEach(-1);
   cloudsGroup.setLifeTimeEach(-1);

   obstaclesGroup.setvelocityXEach(0);
   cloudsGroup.setvelocityXEach(0);
  }


  //evitar que el trex salte
  trex.collide(invisibleGround);
  


  drawSprites();
}

function spownClouds() {
  if (frameCount %60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.y = Math.round(random(10, 60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    cloud.lifeTime = 200;

    cloud.depth = trex.depth;
    trex.depth = trex.depth +1;
    cloudsGroup.add(cloud);
  }
}

function spownObtacles() {
  if (frameCount % 60 === 0){
  var obstacle = createSprite(700, 165, 10, 40);
  obstacle.velocityX = -6;

  var rand = Math.round(random(1,6));
  switch(rand) {
    case 1: obstacle.addImage(obstacle1);
        break;
    case 2: obstacle.addImage(obstacle2);
        break;
    case 3: obstacle.addImage(obstacle3);
       break;
    case 4: obstacle.addImage(obstacle4);
       break;
    case 5: obstacle.addImage(obstacle5);
       break;
    case 6: obstacle.addImage(obstacle6);
       break;
    default: break;
  }

  obstacle.scale = 0.5;
  obstacle.lifeTime = 300;

  obstaclesGroup.add(obstacle);
  }
}