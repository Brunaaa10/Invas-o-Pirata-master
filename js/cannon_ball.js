class Cannon_ball{
   constructor(x,y,){
    this.x = x;
    this.y = y;
    this.r = 23;
    this.image = loadImage("./assets/cannonball.png")


    var options ={
        restitution:0.8,
        friction:1.0,
        density:1.0,
        isStatic:true
    }

     this.body = Bodies.circle(this.x, this.y, this.r, options) 

     World.add(world, this.body)
  }
  display(){
    var pos = this.body.position;
    var angle = this.body.angle;
    
    push()
    imageMode(CENTER)
    translate(pos.x, pos.y)
    rotate(angle)
    image(this.image, 0,0, this.r, this.r)
    pop()
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