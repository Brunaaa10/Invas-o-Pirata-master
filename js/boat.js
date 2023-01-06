class Boat{
    constructor(x,y,w,h, boatPos, boatAnimation){
        
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.boatPos = boatPos;
        this.speed = 0.05;
        this.isBroken = false;
        this.boatAnimation = boatAnimation;

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

    removeBoats(i){
        setTimeout(() => {
            World.remove(world, boats[i].body)
            boats.splice(i, 1);
            this.isBroken = true;
        }, 2000);

    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        var index = floor(this.speed % this.boatAnimation.length);
        
        push()
        imageMode(CENTER)
        translate(pos.x, pos.y)
        rotate(angle)
        image(this.boatAnimation[index], 0, this.boatPos , this.w, this.h)
        pop()   

    }

    animate(){
        this.speed += 0.05 % 1.1

    }
}