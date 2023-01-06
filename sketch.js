const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

let engine, world;

var ground;
var bgImg;
var tower;
var angle;
var cannon;
//var cannon_ball;
var balls = []
var boats = []
var boatAnimation = []
var boatData 
var boatSprite


function preload() {
  bgImg = loadImage("./assets/background.gif");
  boatSprite = loadImage("./assets/boat/boat.png");
  boatData = loadJSON("./assets/boat/boat.json");
}

function setup() {

  canvas = createCanvas(1200, 600);

  
  engine = Engine.create();
  world = engine.world;

  ground = Bodies.rectangle(0, height - 1, width*2, 1,{isStatic:true});
  World.add(world, ground);

  
  tower = new Tower(150, 350, 160, 310);
  angle = 20;
  cannon = new Cannon(180,110,130,100, angle);

  var boatFrames = boatData.frames;

  for(var i =  0; i < boatFrames.length; i++){
    var pos = boatFrames[i].position;
    var img = boatSprite.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push(img);
  }
  
  
 
}

function draw() {
  background(189);
 
  Engine.update(engine);
  image(bgImg,0,0,width,height);
  
  tower.display();
  
  //cannon_ball.display();

  for(var i =  0; i < balls.length; i++){
    showCannonBalls(balls[i], i);
    collisionWithBoats(i);
  }
  
  showBoats();

  cannon.display();
  
}

function keyReleased(){
  if (keyCode == DOWN_ARROW){
    balls[balls.length - 1].shoot();
  }
}

function keyPressed(){
  if (keyCode == DOWN_ARROW){
    var cannon_ball = new Cannon_ball(cannon.x, cannon.y);
    balls.push(cannon_ball);
  }
}

function showCannonBalls(ball, index){
  ball.display();

  if (ball.body.position.x > width){
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }

  if(ball.body.position.y > height - 50){
    Matter.World.remove(world, ball.body);

    balls.splice(index, 1);
  }
}

function showBoats(){
  
 if(boats.length > 0){
    
    if(boats.length < 4 && boats[boats.length - 1].body.position.x < width - 300){
      var positions = [-130, -100, -120, -80, -20]
      var position = random(positions);
      var boat = new Boat(width, height -100, 200, 200, position, boatAnimation);
      boats.push(boat);

  }
  for(var i = 0; i < boats.length; i ++){
      Body.setVelocity(boats[i].body, {x: -0.9, y: 0});
      boats[i].display();
      boats[i].animate();
  }

  } else {
    var boat = new Boat(width, height - 100, 200, 200, -100, boatAnimation);
    boats.push(boat);
  }
}

function collisionWithBoats(index){
  for(var i =  0; i < boats.length; i++){
    
    if (balls[index] !== undefined && boats[i] !== undefined){
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);

      if(collision.collided){
        Matter.World.remove(world,balls[index].body)
        balls.splice(index, 1)
        boats[i].removeBoats(i);
       
      }
      
    }
  }
  

}