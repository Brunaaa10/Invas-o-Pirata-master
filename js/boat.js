class Boat{
    constructor(x,y,w,h, boatPos){
        
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.boatPos = boatPos

        this.image = loadImage("./assets/boat.png");
        
        var options ={
            restitution:0.8,
            friction:1.0,
            density:1.0,
            isStatic:false
        }

        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options)
        World.add(world, this.body)
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        
        push()
        imageMode(CENTER)
        translate(pos.x, pos.y)
        rotate(angle)
        image(this.image, 0, this.boatPos , this.w, this.h)
        pop()   

    }
}