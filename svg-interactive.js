var SVGNS = "http://www.w3.org/2000/svg";
var XLINKNS = "http://www.w3.org/1999/xlink";
var pic = document.getElementById('vimage');
var going = false;
var intervalID;
var balls = [];

var circle = function circle(initX, initY) {
    return {
        draw_image : function(x, y) {
            var c = document.createElementNS(SVGNS, 'image');
            c.setAttribute('x', x);
            c.setAttribute('y', y);
            c.setAttribute('width', 50);
            c.setAttribute('height', 50);
            c.setAttributeNS(XLINKNS, 'href', "sharingan.png");
            pic.appendChild(c);
        },
        curr_x : initX - 25,
        curr_y : initY - 25,
        vx : (Math.round(Math.random() * 100) % 5) + 1,
        vy : (Math.round(Math.random() * 100) % 5) + 1,
        bounce : function() {
            if (this.curr_x + this.vx + 50 >= 500 ||
                this.curr_x + this.vx <= 0) {
                this.vx *= -1;
            }
            if (this.curr_y + this.vy + 50 >= 500 ||
                this.curr_y + this.vy <= 0) {
                this.vy *= -1;
            }
            for(var i = 0; i < balls.length; i++){
                if(this.curr_x != balls[i].curr_x &&
                   this.curr_y != balls[i].curr_y){
                    if (this.curr_x + 50 >= balls[i].curr_x &&
                        this.curr_x <= balls[i].curr_x + 50 &&
                        this.curr_y + 50 >= balls[i].curr_y &&
                        this.curr_y <= balls[i].curr_y + 50){
                        //AABBs are overlapping
                        distance = Math.sqrt(((this.curr_x - balls[i].curr_x) * (this.curr_x - balls[i].curr_x)) + ((this.curr_y - balls[i].curr_y) * (this.curr_y - balls[i].curr_y)));
                        if (distance < 25 + 25){
                            //balls have collided
                            var tempx = this.vx;
                            var tempy = this.vy;
                            this.setvx(balls[i].vx);
                            this.setvy(balls[i].vy);
                            balls[i].setvx(tempx);
                            balls[i].setvy(tempy);
                        }
                    }   
                }
            }
            this.curr_x += this.vx;
            this.curr_y += this.vy;
            this.draw_image(this.curr_x, this.curr_y);
        },
        setvx : function(lol){
            this.vx = lol;
        },
        setvy : function(lol){
            this.vy = lol;
        }
    };
};

var clear_all = function() {
    var toDelete = pic.children;
    for (var i = toDelete.length - 1; i >= 0; i--) {
        pic.removeChild(toDelete[i]);
    }
};

var bounce_all = function() {
    clear_all();
    for (var i = 0; i < balls.length; i++) {
        balls[i].bounce();
    }
}

var stop_button = document.getElementById("stop");

var check = function(newX,newY){
    var yes;
    if(newX >= 450){
        newX = 450;
    }
    if(newY >= 450){
        newY = 450;
    }
    for(var i = 0; i < balls.length; i++){
        if(newX >= balls[i].curr_x - 50 &&
           newX <= balls[i].curr_x + 50 &&
           newY >= balls[i].curr_y - 50 &&
           newY <= balls[i].curr_y + 50){
            return;
        }
    }
    var c = circle(newX, newY);
    balls.push(c);
    c.bounce();
}

pic.addEventListener("click", function(e) {
    going = true;
    check(e.offsetX, e.offsetY);
    if (balls.length == 1) {
        intervalID = window.setInterval(bounce_all, 16);
    }
});

stop_button.addEventListener("click", function() {
    going = false;
    window.clearInterval(intervalID);
    clear_all();
    balls = [];
});
