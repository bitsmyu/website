var lineNum=12;
var row = 100;
var color;
var animation = 0;
var angle=0;//円の角度
var R=400;//円の動きの半径
var scl=0.32;
var scl_row = 1.0;
var scl_easing=0.02;
var clickNum=0;
var colorNum=6;
var colorNo=0;
var font;

//座標の格納
var logoFont =["b","i","t","s"];
var targetX = new Array(3*row);
var targetY = new Array(3*row);
var targetFontX = new Array(4);
var targetFontY = new Array(4);
var easing = 0.3;//変化の速度
var currentCol = new Array(3*row);
var targetCol = new Array(3*row);
var fontCol = new Array(4);
var xoff = new Array(3*row);
//色の設定　0:緑系 1:青　2:オレンジ 3:紫
var colorChart = [
[[134,231,184],[147,255,150],[78,255,168],[208,255,183],[242,245,222]],
[[207,222,231],[146,180,244],[94,124,226],[68,114,202],[10,54,157]],
[[204,88,3],[226,113,29],[255,149,5],[255,182,39],[255,201,113]],
[[239,217,206],[222,192,241],[183,156,237],[149,127,239],[113,97,239]],
[[7,190,184],[61,204,199],[104,216,214],[156,234,239],[196,255,249]],
[[73,160,120],[91,191,123],[99,211,133],[110,201,153],[168,196,175]],
];
var pos = new Array(lineNum*row);
for(var i=0; i<lineNum * row; i++){
    pos[i] = new Array(2);
}
var posFontX = new Array(4);
var posFontY = new Array(4);
var logoInit = [
  [0, -10],[130, -85],[0, -160],[-130, -85],
  [5, 0],[135, -75],[135, 75],[5, 150],
  [-5, 0],[-135, -75],[-135, 75],[-5, 150]
  ];//初期位置の座標を格納

//********************************初期設定********************************
function setup() {
  var canvas = createCanvas(windowWidth,windowHeight);
  canvas.parent("wrapper");
  font = loadFont("fonts/OCRAStd.otf");
  for(var i=0; i<row; i++){
    for(var j=0; j<12; j++){
      pos[i*lineNum+j][0] = logoInit[j][0];
      pos[i*lineNum+j][1] = logoInit[j][1];
    }
  }
  for(var i=0; i<4; i++){
    posFontX[i] = -210 + i * 105;
    posFontY[i] = 320;
  }
  setColor();
  setFontColor();
  resizeScale();
  targetReset();
  // animation = animationUne;
}

//リサイズ
function windowResized() {
  resizeScale();
  resizeCanvas(windowWidth, windowHeight);
}


//********************************描画********************************
function draw() {
  background(255,255,255);
  translate(width/2, height/2);
  scale(scl);

    //アニメーション
  if(animation){
    animation();
  }

  strokeWeight(0);
  textSize(150);
  textFont(font);
  for(var i=0; i<4; i++){
    posFontX[i] = posFontX[i] + (targetFontX[i]-posFontX[i]) * easing*2;
    posFontY[i] = posFontY[i] + (targetFontY[i]-posFontY[i]) * easing*2;
    fill(colorChart[colorNo][fontCol[i]][0],colorChart[colorNo][fontCol[i]][1],colorChart[colorNo][fontCol[i]][2]);
    text(logoFont[i],posFontX[i],posFontY[i]);
  }

  noStroke();
  var speedX = 0;
  var speedY = 0;



  //イージング
  for(var i=0; i<row; i++){
    for(var j=0; j<3; j++){
      speedX = (targetX[i*3+j] - pos[i*lineNum+j*4][0]) * easing;
      speedY = (targetY[i*3+j] - pos[i*lineNum+j*4][1]) * easing;
      for(var s=0; s<4; s++){
        pos[i*lineNum+j*4+s][0] = pos[i*lineNum+j*4+s][0] + speedX;
        pos[i*lineNum+j*4+s][1] = pos[i*lineNum+j*4+s][1] + speedY;
      }
      var r = red(currentCol[i*3+j]);
      var g = green(currentCol[i*3+j]);
      var b = blue(currentCol[i*3+j]);
      r = r + (colorChart[colorNo][targetCol[i*3+j]][0] - r) * easing;
      g = g + (colorChart[colorNo][targetCol[i*3+j]][1] - g) * easing;
      b = b + (colorChart[colorNo][targetCol[i*3+j]][2] - b) * easing;
      currentCol[i*3+j] = color(r,g,b);
    }
  }
  //描画
  for(var i=0; i<row; i++){
    scale(scl_row);
    for(var j=0; j<3; j++){
      fill(red(currentCol[i*3+j]),green(currentCol[i*3+j]),blue(currentCol[i*3+j]));
      beginShape();
      vertex(pos[i*lineNum+j*4][0],pos[i*lineNum+j*4][1]);
      vertex(pos[i*lineNum+j*4+1][0],pos[i*lineNum+j*4+1][1]);
      vertex(pos[i*lineNum+j*4+2][0],pos[i*lineNum+j*4+2][1]);
      vertex(pos[i*lineNum+j*4+3][0],pos[i*lineNum+j*4+3][1]);
      endShape(CLOSE);
    }
  }

}

//********************************マウスアクション********************************
function mousePressed(){
  clickNum++;
  colorNo = Math.floor(Math.random()*colorNum);
  switch(clickNum){
    //分散(scale=1.0)
    case 1:
      targetSet();
      animation = 0;
      break;
    //円(scale=1)
    case 2:
      animation = animationCircle;
      break;
    //整列うねうね(scale=0.9)
    case 3:
      setGrid();
      animation = animationSin;
      break;
    //回転うねうね(scale=1.1)
    case 4:
      setSpiral();
      animation = animationSpiral;
      break;
    //円(scale=0.9)
    case 5:
      animation = animationCircle;
      break;
    //整列うねうね(scale=1.1)
    case 6:
      setGrid();
      animation = animationSin;
      break;
    //回転うねうね(scale=1)
    case 7:
      setSpiral();
      animation = animationSpiral;
      break;
    //円(scale=1.1)
    case 8:
      animation = animationCircle;
      break;
    //整列うねうね(scale=1.0)
    case 9:
      setGrid();
      animation = animationSin;
      break;
    //回転うねうね(scale=0.9)
    case 10:
      setSpiral();
      animation = animationSpiral;
      clickNum = 0;
      break;
    //集合
    // case 11:
    //   targetReset();
    //   clickNum = 0;
    //   animation = animationReset;
    //   break;
  }
}

//********************************アニメーション********************************
function animationCircle(){
  if(clickNum === 2){
    scl_row = scl_row + ((0.99 - scl_row) * scl_easing);
  }
  else if(clickNum === 5){
    scl_row = scl_row + ((0.97 - scl_row) * scl_easing);
  }
  else if(clickNum === 8){
    scl_row = scl_row + ((1.02 - scl_row) * scl_easing);
  }
  angle += 1;
  for(var i=0; i<row; i++){
    for(var j=0; j<3; j++){
      targetX[i*3+j] =  ( cos(radians(angle) - i * 10) * 700);
      targetY[i*3+j] = ( sin(radians(angle)- i * 10) * 700);
    }
  }
}

function animationSpiral(){
    if(clickNum === 7){
    scl_row = scl_row + ((1.0 - scl_row) * scl_easing);
  }
  else if(clickNum === 10){
    scl_row = scl_row + ((0.9 - scl_row) * scl_easing);
  }
  else if(clickNum === 4){
    scl_row = scl_row + ((1.03 - scl_row) * scl_easing);
  }
  angle += 3;
  for(var i=0; i<row; i++){
    for(var j=0; j<3; j++){
      if(targetX[i*3+j] > (width * 2)){
        targetX[i*3+j] = -width * 2;
      }
      targetX[i*3+j] += 10;
      targetY[i*3+j] = ( sin(radians(angle) - i * 10) * 500);
    }
  }
}

function animationSin(){
  if(clickNum === 9){
    scl_row = scl_row + ((1.0 - scl_row) * scl_easing);
  }
  else if(clickNum === 3){
    scl_row = scl_row + ((0.9 - scl_row) * scl_easing);
  }
  else if(clickNum === 6){
    scl_row = scl_row + ((1.03 - scl_row) * scl_easing);
  }
  angle += 1;
  for(var i=0; i<row; i++){
    for(var j=0; j<3; j++){
      if(targetX[i*3+j] > width * 2){
        targetX[i*3+j] = -(width * 2);
      }
      //targetX[i*3+j] += 5;
      targetY[i*3+j] = ( sin(radians(angle - i * 10)) * 500);
    }
  }
}
//最初のうねうね
// function animationUne(){
//   angle += 5;//うねうね速度
//   translate(0,sin(radians(angle))*50);//上下の幅
// }

function animationReset(){
  scl_row = scl_row + (1.0 - scl_row) * scl_easing;
}


//********************************パターンごとの設定********************************
function targetSet(){
  for(var i=0; i<4; i++){
    targetFontX[i] = (Math.random() * width - Math.random() * width)*width;
    targetFontY[i] = (Math.random() * height - Math.random() * height)*height;
  }
  for(var i=0; i<row; i++){
    for(var j=0; j<3; j++){
      targetX[i*3+j] = (Math.random() * width - Math.random() * width)*2;
      targetY[i*3+j] = (Math.random() * height - Math.random() * height)*2;
    }
  }
}

function targetReset(){
  for(var i=0; i<4; i++){
    targetFontX[i] = -210 + i * 105;
    targetFontY[i] = 320;
  }
  for(var i=0; i<row; i++){
    for(var j=0; j<3; j++){
      targetX[i*3+j] = logoInit[j*4][0];
      targetY[i*3+j] = logoInit[j*4][1];
    }
  }
}


function setGrid(){
  for(var i=0; i<row; i++){
    for(var j=0; j<3; j++){
      targetX[i*3+j] = (width * 2/10) * (i % 10) - width + 107.5;
      targetY[i*3+j] = (height/(row/10)) * Math.floor(i/10) * 2.2 - height/4 * 3;//もう少し再考
    }
  }
}


function setSpiral(){
  for(var i=0; i<row; i++){
    for(var j=0; j<3; j++){
      targetX[i*3+j] =  ( cos(radians(angle) - i * 10) * 700);
      targetY[i*3+j] = ( sin(radians(angle)- i * 10) * 700);
    }
  }
}

//********************************カラー********************************
function setColor(){
  colorNo = Math.floor(Math.random()*colorNum);
  for(var i=0; i<row*3; i++){
    var n = Math.floor(Math.random()*5);
    currentCol[i] = color(colorChart[colorNo][n][0],colorChart[colorNo][n][1],colorChart[colorNo][n][2]);
    targetCol[i] = n;
  }
}

function setFontColor(){
  for(var i=0; i<4; i++){
    fontCol[i] = Math.floor(Math.random()*5);
  }
}


//********************************スケール変更********************************
function resizeScale(){
    var w=windowWidth;
  if(w>1190){
    scl = 0.32;
  }else if(w>768){
    scl = 0.3;
  }else if(w>600){
    scl = 0.25;
  }else{
    scl = 0.2;
  }
}



