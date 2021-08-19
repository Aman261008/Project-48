var background1;
var bg;
var jet,jet1;
var obstacles1Img,obstacles2Img,obstacles3Img;
var bullet;
var alienGroup,aliens,ufoGroup,ufos,cometGroup,comets,bulletGroup;
var ground;
var score=0;
var g,gImg,r,rImg;
var END =0;
var PLAY =1;
var gameState = PLAY;




function preload(){
bg=loadImage("images/bg2.jpg");
jet1=loadImage("images/fj.gif");
obstacles1Img=loadImage("images/comet.png");
obstacles2Img=loadImage("images/ufo.png");
obstacles3Img=loadImage("images/alien.png");
gImg=loadImage("images/gameover.png");
rImg=loadImage("images/restart.png");


alienGroup=new Group();
ufoGroup=new Group();
cometGroup=new Group();
bulletGroup=new Group();

}

function setup(){
createCanvas(windowWidth,windowHeight);
background1=createSprite(windowWidth,windowHeight);
background1.addImage(bg);

background1.scale=5;

jet =createSprite(windowWidth/2.5,windowHeight/1.1,50,50);
jet.addImage(jet1);
jet.scale=0.2;

ground=createSprite(windowWidth,windowHeight,windowWidth*2,20);
console.log(alienGroup+" insetup")
ground.visible=true;
ground.debug=true;
    g=createSprite(width/2,height/3);
  g.addImage(gImg);
  g.scale=2;
  r=createSprite(width/2,height/2);
  r.addImage(rImg);
  r.scale=0.2;

}

function draw(){
  if(gameState===PLAY){
    background(255);
   g.visible=false; 
 r.visible=false;
  edges=createEdgeSprites();
  jet.collide(edges);
    background1.velocityY = 3 

      if(background1.y>height){
    background1.y=height/2;
  }

    if(keyIsDown(LEFT_ARROW)){
        jet.x=jet.x-10;
    }
    if(keyIsDown(RIGHT_ARROW)){
        jet.x=jet.x+10;
    }
   var select_obstacles = Math.round(random(1,3));
  
  if (World.frameCount % 100 == 0) {
    if (select_obstacles == 1) {
      CreateAlien();
    }  } if (World.frameCount % 200 == 0) {
     if (select_obstacles == 2) {
       CreateUfo();
    } } if (World.frameCount % 150 == 0) {
     if (select_obstacles == 3) {
      CreateComet(); 
    } }   

if (keyWentDown("space")){
    
   createBullet();
  }
    if(bulletGroup.isTouching(alienGroup)){
    
    score=score+Math.round (10);
    
    alienGroup.destroyEach(); 
    bulletGroup.destroyEach();
  }
  if(bulletGroup.isTouching(ufoGroup)){
    
    score=score+Math.round (30);
    
    ufoGroup.destroyEach(); 
    bulletGroup.destroyEach();
  } 
  if(bulletGroup.isTouching(cometGroup)){
    
    score=score+Math.round (20);
    
    cometGroup.destroyEach(); 
    bulletGroup.destroyEach();
  }
  
    if(ground.isTouching(alienGroup)){
    alienGroup.destroyEach();
      
    cometGroup.destroyEach();
    
    ufoGroup.destroyEach();
    
    bulletGroup.destroyEach();
    
    
    
    
    background1.velocityY=0;
    gameState=END;
  }
        if(ground.isTouching(ufoGroup)){
    alienGroup.destroyEach();
      
    cometGroup.destroyEach();
    
    ufoGroup.destroyEach();
    
    bulletGroup.destroyEach();
    
    
    
    
    background1.velocityY=0;
    gameState=END;
  }
        if(ground.isTouching(cometGroup)){
    alienGroup.destroyEach();
      
    cometGroup.destroyEach();
    
    ufoGroup.destroyEach();
    
    bulletGroup.destroyEach();
    
    
    
    
    background1.velocityY=0;
    gameState=END;
  }
  }
    if(gameState===END){
    g.visible=true;
    r.visible=true;
     if(mousePressedOver(r)) {
      reset();
    }
  }
 
drawSprites();
    textSize(30);
    strokeWeight(3);
    stroke(0);
    fill(255);
    text("Score : " + score,windowWidth-250,60) ;
}
function reset(){
  gameState=PLAY;
  g.visible=false;
  r.visible=false;
  score=0;
 
}

function CreateAlien() {
  var aliens = createSprite(Math.round(random(50, windowWidth-50)),0, 10, 10);
  aliens.addImage(obstacles3Img);
  aliens.velocityY = 3;
  aliens.lifetime = windowWidth;
  aliens.scale = 0.14;
 
  alienGroup.add(aliens);
  
}

function CreateUfo() {
  var ufos = createSprite(Math.round(random(50, windowWidth-50)),0, 10, 10);
  ufos.addImage(obstacles2Img);
  ufos.velocityY = 3;
  ufos.lifetime = windowWidth;
  ufos.scale = 0.2;
  
  ufoGroup.add(ufos);
}

function CreateComet() {
  var comets = createSprite(Math.round(random(50, windowWidth-50)),0, 10, 10);
  comets.addImage(obstacles1Img);
  comets.velocityY = 3;
  comets.lifetime = windowWidth;
  comets.scale = 0.2;
  
  cometGroup.add(comets);
}


function createBullet(){
  var bullet = createSprite(100,100,10,60);
  bullet.shapeColor="red";
  bullet.velocityY=-2;
  bullet.x=jet.x;
  bullet.y=jet.y;
  bullet.scale=0.3;

  
  bulletGroup.add(bullet);
}
