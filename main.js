var tankBlock = document.querySelector('.tank-block');
var ball = document.querySelector('.bullet');
var start = 0;
var end = -1500;
var frameRate = 60/1000;
var duration = 1000;
var currentStep = 0;
var newY = 0;

var config = {
    start : 0,
    speed : 10,
    x : tankBlock.getBoundingClientRect().left,
    y : tankBlock.getBoundingClientRect().top,
    rotate : 0,
    windowWindth : window.innerWidth,
    windowHeight : window.innerHeight,
    tankBlockWidth : tankBlock.getBoundingClientRect().width,
    tankBlockHeight : tankBlock.getBoundingClientRect().height,
    nitro : 1,
};

function moveX(k, rotate) {
    if(config.x >= config.start && config.x <= config.windowWindth + config.tankBlockWidth) {
        config.x += config.speed * k;
        config.rotate = rotate;
    } else {
        (k > 0) ? config.x = config.start : config.x = config.windowWindth;
    }
}

function moveY(k, rotate) {
    if(config.y >= config.start && config.y <= config.windowHeight + config.tankBlockHeight) {
        config.y += config.speed * k;
        config.rotate = rotate;
    } else {
        (k > 0) ? config.y = config.start : config.y = config.windowHeight;
    }
}

function shot() {

    var op = 0.1;  // initial opacity
    var timer = setInterval(function () {
        
        document.querySelector('.fire').style.opacity = op;
        document.querySelector('.fire').style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1; 

        if (op >= 1){
           clearInterval(timer);
           
           var timer2 = setInterval(function () {

            document.querySelector('.fire').style.opacity = op;
            document.querySelector('.fire').style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;

            if(op <= 0.01) {
                clearInterval(timer2);
            }

           }, 20);
              
        }

    }, 20);

    function easeInOutQuint(t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    }

    function animate() {
        ball.style.visibility = 'visible';
    
        currentStep++;
    
        newY = easeInOutQuint(currentStep, start, end - start, frameRate * duration);
    
        ball.style.left = newY + 'px';
    
        if(currentStep >= frameRate * duration) {
            return currentStep = 0;
        }
    
        requestAnimationFrame(animate);
        
    
    }

    animate()
    
}

window.addEventListener('keydown', function(e) {
    if(e == undefined) window.event;
    (e.shiftKey) ? config.nitro = 3 : config.nitro = 1;
    switch(e.keyCode) {
        case 68:
            moveX(config.nitro, 180);
            break;
        case 65:
            moveX(-config.nitro, 0);
            break;
        case 83:
            moveY(config.nitro, -90);
            break;
        case 87:
            moveY(-config.nitro, 90);
            break;
        case 32:
            shot();
            break;

    }
    tankBlock.style.left = config.x + 'px';
    tankBlock.style.top = config.y + 'px';
    tankBlock.style.transform = "rotate("+config.rotate + "deg)";
})