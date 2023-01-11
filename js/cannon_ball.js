class Cannon_ball{
   constructor(x,y,){
    this.x = x;
    this.y = y;
    this.r = 23;
    this.speed = 0.05;
    this.trajectory = []
    this.isSink = false;
    this.image = loadImage("./assets/cannonball.png")
    this.animation = [this.image]


    var options ={
        restitution:0.8,
        friction:1.0,
        density:1.0,
        isStatic:true
    }

     this.body = Bodies.circle(this.x, this.y, this.r, options) 

     World.add(world, this.body)
  }

  animate(){
    this.speed += 0.05
  
  }

  removeBalls(index){
    this.animation = waterAnimation
    this.speed = 0.05
    this.r = 150
    this.isSink = true;
    Matter.Body.setVelocity(this.body, {x:0, y:0})

    setTimeout(() => {
        World.remove(world, balls[index].body)
        balls.splice(index, 1);
        
    }, 1000);



}
 
  display(){
    var pos = this.body.position;
    var angle = this.body.angle;
    var index = floor(this.speed % this.animation.length);
    
    push()
    imageMode(CENTER)
    translate(pos.x, pos.y)
    rotate(angle)
    image(this.animation[index], 0,0, this.r, this.r)
    pop()

    if(this.body.velocity.x > 0 && this.body.position.x > 200){
      var position = [this.body.position.x, this.body.position.y]
      this.trajectory.push(position);
    }

    for(var i = 0; i < this.trajectory.length; i ++){

      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5,5);

    }
  }

  shoot(){
    //convertendo o ângulo para graus
    var newAngle = cannon.a * (180/3.14)
    newAngle = newAngle - 28
    //convertendo o ângulo para radiando
    newAngle = newAngle * (3.14/180)
    var velocity = p5.Vector.fromAngle(newAngle)
    //velocity = velocity * 20
    //velocity *= 20
    velocity.mult(25)
    Body.setStatic(this.body, false)
    Body.setVelocity(this.body, {x: velocity.x, y: velocity.y})
    
  }

  
}