var SVGNS = "http://www.w3.org/2000/svg";
var XLINKNS = "http://www.w3.org/1999/xlink";

var pic = document.getElementById('vimage');
var start_button = document.getElementById("start");
var stop_button = document.getElementById("stop");

var intervalID;
var going = false;

var clear_all = function clear_all() {
    var toDelete = pic.children;
    for (var i = toDelete.length - 1; i >= 0; i--) {
        pic.removeChild(toDelete[i]);
    }
};

var draw_image = function draw_image(x, y) {
    var c = document.createElementNS(SVGNS, 'image');
    c.setAttribute('x', x);
    c.setAttribute('y', y);
    c.setAttribute('width', 50);
    c.setAttribute('height', 50);
    c.setAttributeNS(XLINKNS, 'href', "sharingan.png");
    pic.appendChild(c);
};

var bounce = function bounce() {
    var curr_x = 250;
    var curr_y = 250;
    var vx = (Math.round(Math.random() * 100) % 5) + 1;
    var vy = (Math.round(Math.random() * 100) % 5) + 1;

    clear_all();
    draw_image(curr_x, curr_y);
    var animate_code = function animate_code() {
        var c = document.getElementsByTagName("image")[0];
        curr_x = parseInt(c.getAttribute("x")) + vx;
        curr_y = parseInt(c.getAttribute("y")) + vy;

        if (curr_x + vx + 50 >= 500 || curr_x + vx <= 0) {
            vx *= -1;
        }
        if (curr_y + vy + 50 >= 500 || curr_y + vy <= 0) {
            vy *= -1;
        }

        clear_all();
        draw_image(curr_x, curr_y);
    };

    intervalID = window.setInterval(animate_code, 16);
};

var clicked = function clicked(e) {
    if (!going && e.toElement == this) {
        bounce();
        going = true;
    }
};

start_button.addEventListener("click", clicked);
stop_button.addEventListener("click", function() {
    window.clearInterval(intervalID);
    going = false;
});


