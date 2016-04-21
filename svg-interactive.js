var SVGNS = "http://www.w3.org/2000/svg";
var XLINKNS = "http://www.w3.org/1999/xlink";

function circle(){
    var intervalID;
    var going = false;
    var pic = document.getElementById('vimage');
    var clear_all = function() {
        var toDelete = pic.children;
        for (var i = toDelete.length - 1; i >= 0; i--) {
            pic.removeChild(toDelete[i]);
        }
    };

    var draw_image = function(x, y) {
        var c = document.createElementNS(SVGNS, 'image');
        c.setAttribute('x', x);
        c.setAttribute('y', y);
        c.setAttribute('width', 50);
        c.setAttribute('height', 50);
        c.setAttributeNS(XLINKNS, 'href', "sharingan.png");
        pic.appendChild(c);
    };

    var bounce = function() {
        var curr_x = 250;
        var curr_y = 250;
        var vx = (Math.round(Math.random() * 100) % 5) + 1;
        var vy = (Math.round(Math.random() * 100) % 5) + 1;

        clear_all();
        draw_image(curr_x, curr_y);
        var animate_code = function() {
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
    
    var stop = function stop(){
        window.clearInterval(intervalID);
        clear_all();
        going = false;
    };

    return {
	      bounce : bounce,
        stop : stop
    };

}


var clicked = function clicked(e) {
    if (!going && e.toElement == this) {
        bounce();
        going = true;
    }
};



var start_button = document.getElementById("start");
var stop_button = document.getElementById("stop");
var c = circle();

start_button.addEventListener("click", c.bounce);
stop_button.addEventListener("click", function() {
    c.stop();
});
