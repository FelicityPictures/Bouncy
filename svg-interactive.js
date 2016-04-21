var SVGNS = "http://www.w3.org/2000/svg";
var XLINKNS = "http://www.w3.org/1999/xlink";
var pic = document.getElementById('vimage');
var going = false;
var intervalID;

var circle = function circle() {
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
        curr_x : 250,
        curr_y : 250,
        vx : (Math.round(Math.random() * 100) % 5) + 1,
        vy : (Math.round(Math.random() * 100) % 5) + 1,
        bounce : function() {
            if (this.curr_x + this.vx + 50 >= 500 || this.curr_x + this.vx <= 0) {
                this.vx *= -1;
            }
            if (this.curr_y + this.vy + 50 >= 500 || this.curr_y + this.vy <= 0) {
                this.vy *= -1;
            }
            this.curr_x += this.vx;
            this.curr_y += this.vy;
            this.draw_image(this.curr_x, this.curr_y);
        }
    };
};

var clear_all = function() {
    var toDelete = pic.children;
    for (var i = toDelete.length - 1; i >= 0; i--) {
        pic.removeChild(toDelete[i]);
    }
};

var balls = [];

var bounce_all = function() {
    clear_all();
    for (var i = 0; i < balls.length; i++) {
        balls[i].bounce();
    }
}

var stop_button = document.getElementById("stop");

pic.addEventListener("click", function() {
    going = true;
    var c = circle();
    balls.push(c);
    c.bounce();
    if (balls.length == 1) {
        intervalID = window.setInterval(bounce_all, 16);
    }
});

stop_button.addEventListener("click", function() {
    going = false;
    window.clearInterval(intervalID);
});
