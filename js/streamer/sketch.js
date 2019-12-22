
var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");
// ctx is how you draw on the canvas

let offsety = c.offsetTop;
let offsetx = c.offsetLeft;
let woff = window.pageYOffset;

var mouse = { x: 0, y: 0, down: false };

var stringLength = 100;
var stringMinSpeed = 0.4;
var stringMaxSpeed = 0.9;
var stringCount = 10;
var strings = [];
for (var j = 0; j < stringCount; j++) {
  //make a string
  var string = [];
  for (var i = 0; i < stringLength; i++) {
    string.push({ x: 0, y: 0 });
  }
  // add to list of strings
  strings.push(string);
}

var timer = 0;

function drawString(stringArray, timer) {
  var startHue = 0;
  var hueChange = 5;
  ctx.globalCompositeOperation = "lighter";
  for (var i = 1; i < stringArray.length; i++) {
    ctx.strokeStyle = "hsl(" + timer + ",50%, 50%)";
    ctx.beginPath();
    ctx.moveTo(stringArray[i - 1].x, stringArray[i - 1].y);
    ctx.lineTo(stringArray[i].x, stringArray[i].y);
    ctx.stroke();
  }
}

function moveString(stringArray, stringSpeed) {
  stringArray[0].x = mouse.x;
  stringArray[0].y = mouse.y;
  for (var i = 1; i < stringArray.length; i++) {
    stringArray[i].x += (stringArray[i - 1].x - stringArray[i].x) * stringSpeed;
    stringArray[i].y += (stringArray[i - 1].y - stringArray[i].y) * stringSpeed;
  }
}

function render() {
  timer++;
  //clear old drawing
  ctx.clearRect(0, 0, c.width, c.height);
  for (var i = 0; i < strings.length; i++) {
    drawString(strings[i], timer);
    moveString(
      strings[i],
      stringMinSpeed + (i / stringCount) * (stringMaxSpeed - stringMinSpeed)
    );
  }
  woff = window.pageYOffset;
  offsetx = c.offsetLeft;
  offsety = c.offsetTop;
  window.requestAnimationFrame(render);
}

render();
window.addEventListener("mousemove", function(event) {
  mouse.x = event.clientX - offsetx;
  mouse.y = event.clientY - offsety + woff;
});
