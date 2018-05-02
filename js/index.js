var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var canvas4 = document.getElementById('canvas4');
var canvas5 = document.getElementById('canvas5');
var canvas6 = document.getElementById('canvas6');
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var ctx3 = canvas3.getContext('2d');
var ctx4 = canvas4.getContext('2d');
var ctx5 = canvas5.getContext('2d');
var ctx6 = canvas6.getContext('2d');

var rainthroughnum = 500;
var speedRainTrough = 25;
var RainTrough = [];

var rainnum = 500;
var rain = [];

var lightning = [];
var lightTimeCurrent = 0;
var lightTimeTotal = 0;

var w = canvas1.width = canvas2.width = canvas3.width = window.innerWidth;
var h = canvas1.height = canvas2.height = canvas3.height = window.innerHeight;
canvas4.width = canvas5.width = canvas6.width = 320;
canvas4.height = canvas5.height = canvas6.height = 360;
window.addEventListener('resize', function () {
  w = canvas1.width = canvas2.width = canvas3.width = window.innerWidth;
  h = canvas1.height = canvas2.height = canvas3.height = window.innerHeight;
  canvas4.width = canvas5.width = canvas6.width = 320;
  canvas4.height = canvas5.height = canvas6.height = 360;
});

function load_profile_image() {
  profile_image = new Image();
  profile_image.src = './test1.jpg';
  profile_image.onload = function () {
  ctx4.drawImage(profile_image, 0, 0, canvas4.width, canvas4.height);
  }
}

function load_bug_image() {
  bug_image = new Image();
  bug_image.src = './test2.png';
  bug_image.onload = function () {
  ctx5.drawImage(bug_image, 0, 0, canvas5.width, canvas5.height);
  }
}

function load_versus_image() {
  versus_image = new Image();
  versus_image.src = './versus_icon.png';
  versus_image.onload = function () {
  ctx6.drawImage(versus_image, 0, 0, canvas6.width / 2, canvas6.height / 2);
  }
}

function random(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function clearcanvas1() {
  ctx1.clearRect(0, 0, w, h);
}

function clearcanvas2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function clearCanvas3() {
  ctx3.globalCompositeOperation = 'destination-out';
  ctx3.fillStyle = 'rgba(0,0,0,' + random(1, 30) / 100 + ')';
  ctx3.fillRect(0, 0, w, h);
  ctx3.globalCompositeOperation = 'source-over';
};

function createRainTrough() {
  for (var i = 0; i < rainthroughnum; i++) {
    RainTrough[i] = {
      x: random(0, w),
      y: random(0, h),
      length: Math.floor(random(1, 830)),
      opacity: Math.random() * 0.2,
      xs: random(-2, 2),
      ys: random(10, 20)
    };
  }
}

function createRain() {
  for (var i = 0; i < rainnum; i++) {
    rain[i] = {
      x: Math.random() * w,
      y: Math.random() * h,
      l: Math.random() * 1,
      xs: -4 + Math.random() * 4 + 2,
      ys: Math.random() * 10 + 10
    };
  }
}

function createLightning() {
  var x = random(100, w - 100);
  var y = random(0, h / 4);

  var createCount = random(1, 10);
  for (var i = 0; i < createCount; i++) {
    single = {
      x: x,
      y: y,
      xRange: random(5, 30),
      yRange: random(10, 25),
      path: [{
        x: x,
        y: y
      }],
      pathLimit: random(40, 55)
    };
    lightning.push(single);
  }
};

function drawRainTrough(i) {
  ctx1.beginPath();
  var grd = ctx1.createLinearGradient(0, RainTrough[i].y, 0, RainTrough[i].y + RainTrough[i].length);
  grd.addColorStop(0, "rgba(255,255,255,0)");
  grd.addColorStop(1, "rgba(255,255,255," + RainTrough[i].opacity + ")");

  ctx1.fillStyle = grd;
  ctx1.fillRect(RainTrough[i].x, RainTrough[i].y, 1, RainTrough[i].length);
  ctx1.fill();
}

function drawRain(i) {
  ctx2.beginPath();
  ctx2.moveTo(rain[i].x, rain[i].y);
  ctx2.lineTo(rain[i].x + rain[i].l * rain[i].xs, rain[i].y + rain[i].l * rain[i].ys);
  ctx2.strokeStyle = 'rgba(174,194,224,0.5)';
  ctx2.lineWidth = 1;
  ctx2.lineCap = 'round';
  ctx2.stroke();
}

function drawLightning(ctx) {
  for (var i = 0; i < lightning.length; i++) {
    var light = lightning[i];

    light.path.push({
      x: light.path[light.path.length - 1].x + (random(0, light.xRange) - (light.xRange / 2)),
      y: light.path[light.path.length - 1].y + (random(0, light.yRange))
    });

    if (light.path.length > light.pathLimit) {
      lightning.splice(i, 1);
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, .1)';
    ctx.lineWidth = 3;
    if (random(0, 15) === 0) {
      ctx.lineWidth = 6;
    }
    if (random(0, 30) === 0) {
      ctx.lineWidth = 8;
    }

    ctx.beginPath();
    ctx.moveTo(light.x, light.y);
    for (var pc = 0; pc < light.path.length; pc++) {
      ctx.lineTo(light.path[pc].x, light.path[pc].y);
    }
    if (Math.floor(random(0, 30)) === 1) { //to fos apo piso
      ctx.fillStyle = 'rgba(255, 255, 255, ' + random(1, 3) / 100 + ')';
      ctx.fillRect(0, 0, w, h);
    }
    ctx.lineJoin = 'miter';
    ctx.stroke();
  }
};

function animateRainTrough() {
  clearcanvas1();
  for (var i = 0; i < rainthroughnum; i++) {
    if (RainTrough[i].y >= h) {
      RainTrough[i].y = h - RainTrough[i].y - RainTrough[i].length * 5;
    } else {
      RainTrough[i].y += speedRainTrough;
    }
    drawRainTrough(i);
  }
}

function animateRain() {
  clearcanvas2();
  for (var i = 0; i < rainnum; i++) {
    rain[i].x += rain[i].xs;
    rain[i].y += rain[i].ys;
    if (rain[i].x > w || rain[i].y > h) {
      rain[i].x = Math.random() * w;
      rain[i].y = -20;
    }
    drawRain(i);
  }
}

function animateLightning() {
  clearCanvas3();
  lightTimeCurrent++;
  if (lightTimeCurrent >= lightTimeTotal) {
    createLightning();
    lightTimeCurrent = 0;
    lightTimeTotal = 100;  //rand(100, 200)
  }
  drawLightning(ctx3);
}

function init() {
  createRainTrough();
  createRain();
  load_bug_image();
  load_profile_image();
  load_versus_image();
  window.addEventListener('resize', createRainTrough);
}
init();

function animloop() {
  animateRainTrough();
  animateRain();
  animateLightning();
  requestAnimationFrame(animloop);
}
animloop();


