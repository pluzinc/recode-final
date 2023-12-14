let angle = 0;
let yPos = 650; // Initial y-position
let mouseX = 0
let dthetaXdt = 0;
let smoothFactor = 0.05;

let startPage = true
let icedAPage = false
let LattePage = false
let CappPage = false
//let img;

// function preload() {
//   img = loadImage('bg.jpg');
// }


function setup() {
  createCanvas(375, 812);
  angleMode(DEGREES)
  background(220);
  button1 = createButton('Iced Americano');
  button1.mousePressed(drawIcedAmericano);
  button1.position(135, 300);
  button2 = createButton('Oat Latte');
  button2.mousePressed(drawOatLatte);
  button2.position(135, 400);
  button3 = createButton('Cappuccino');
  button3.mousePressed(drawCappuccino);
  button3.position(135, 500);
  button4 = createButton('click to activate');
  button4.mousePressed(onClick);
  button5 = createButton('back');
  button5.mousePressed(drawStart);
}

function draw() {
  if (startPage == true) {
    drawStart();
  } else if (icedAPage == true) {
    drawIcedAmericano();
  } else if (LattePage == true) {
    drawOatLatte();
  } else if (CappPage == true) {
    drawCappuccino();
  }
}

function drawStart() {
  background(220)
  //image(img, 0, 0);
  textSize(60)
  text("Goolu", 100, 100);
  textSize(22)
  text("what would you like to drink today?", 20, 140)
  button1.show();
  button2.show();
  button3.show();
}

function drawIcedAmericano() {
  //coffee
  startPage = false
  LattePage = false;
  CappPage = false;
  background(220)
  rectMode(CENTER)
  //lerp dthetaXdt
  let targetAngle = map(dthetaXdt, -1, 1, -45, 45);
  angle = lerp(angle, targetAngle, smoothFactor);

  translate(width / 2, yPos)
  if (abs(mouseX - pmouseX) > 1 || abs(mouseY - pmouseY) > 1) {
    yPos += 1;
  }
  noStroke()
  fill(79, 31, 5)
  rotate(angle)
  rect(0, 0, 400, 1000)


  //hide button
  button1.hide();
  button2.hide();
  button3.hide();
  console.log('Button is clicked!');
}

function drawOatLatte() {
  startPage = false
  IcedAPage = false;
  CappPage = false;
  background(220)
  //draw gradient
  let topcolor = color(253, 250, 218)
  let bottomcolor = color(79, 31, 5)
  for (let y = 150; y < 815; y++) {
    s = map(y, 0, 700, 0, 1)
    let newcolor = lerpColor(topcolor, bottomcolor, s)
    stroke(newcolor)
    line(0, y, 375, y)
  }
  noStroke()
  button1.hide();
  button2.hide();
  button3.hide();
}

function drawCappuccino() {
  background(220)
  startPage = false
  IcedAPage = false;
  LattePage = false;
  //draw foam
  noStroke()
  fill(247, 231, 196)
  rect(0, 150, 375, 150)
  //draw coffee
  fill('rgb(79,31,5)')
  rect(0, 300, 375, 1000)

  button1.hide();
  button2.hide();
  button3.hide();
  console.log('Button is clicked!');
}

function cb(event) {
  dthetaXdt = event.rotationRate.alpha * PI / 180;
  dthetaYdt = event.rotationRate.beta * PI / 180;
  dthetaZdt = event.rotationRate.gamma * PI / 180;
  console.log(dthetaXdt)
}


function onClick() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          //ask for device motion
          window.addEventListener('devicemotion', cb);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('devicemotion', cb);
    // handle regular non iOS 13+ devices
  }
}

