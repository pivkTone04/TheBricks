let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const height=canvas.height
const width=canvas.width
const r=10;

const wood = document.getElementById("wood");
const more_wood = document.getElementById("more_wood");

var tocke=0; 
var interval;

var st_bricks = 10;

var ball_moving=0;

var brickxCoord = [];
var brickyCoord = [];

var paddlex;
var paddleh;
var paddlew;

var lives = 3;

var rowheight;
var colwidth;
var row ;
var col;
var paddle_margin;



function init_paddle() {
    paddlew = 110;
    //paddlex = da ga narise v sredini
    paddlex = (width / 2) - (paddlew/2);  //(500/2) - (100/2) = 200
    paddleh = 15;
    paddle_margin = 0; 
}

function drawIt() {
    var x = paddlex+paddlew/2;
    var y =  height-paddleh-r-paddle_margin;
    var dx = -1.8;
    var dy = -2.5;
    
    
    function init() { 
      $("#zivljenja").html(lives);
      //cajt
      //sekunde = 0;
      //izpisTimer = "00:00";

     

      canvas=document.getElementById('canvas');
      ctx = canvas.getContext('2d');
      return (interval = setInterval(draw, 0.01)); //klic funkcije draw vsakih 10 ms; http://www.w3schools.com/jsref/met_win_setinterval.asp
      
    }



    function draw() {
      
      
      if(tocke==73){
        win_game();
      }
      
      $("#tocke").html(tocke);
      //vse zbrise
      clear();
      //narisce krog
      cicle(x,y,r);
      //narise ploscek (prvi dve sta poziciji kje se nahaja)
      rect(paddlex, height-paddleh-paddle_margin /*500-10==490*/, paddlew, paddleh);
      
      
      
      //collision with borders!!   //zidi hehe
      if (x + dx > width - r || x + dx < r)   //prva desno, druga levo
        dx = -dx;
     if (y + dy > height - r || y + dy < r)  //prva spodaj, druga zgoraj
        dy = -dy;
      x += dx;
      y += dy;
      //----------------------------



    if (x + dx > width-r || x + dx < 0+r)  // gleda sirino ploscka
      dx = -dx;
    else if (y + dy > height - r - paddleh - paddle_margin) {  //gleda visino ploscka
      console.log("zadeli smo opeko")
      if (x > paddlex && x < paddlex + paddlew) {
        dx = 5 * ((x-(paddlex+paddlew/2))/paddlew);
        dy = -dy;
      }
      else if(y + dy > height - r -paddle_margin +paddle_margin/10){
       
        lives--;
        clearInterval(interval);
        ball_moving=0;
        clear();
        death_init();
      }
    }
    
    if(lives==0){
      lose_game();
    }


    //premikanje ploscka levo - denso
    if (rightDown) paddlex += 2;
    else if (leftDown) paddlex -= 2;
    //omejevanje ploscka oz da plosecek ne gre iz canvasa
    if(rightDown){
      if((paddlex+paddlew) < width){
        paddlex += 2;
      }else{
        paddlex = width-paddlew;
      }
      }
        else if(leftDown){
      if(paddlex>0){
        paddlex -=2;
      }else{
        paddlex=0;
      }
    }



 
//podiranje
//---------  
  
//Kje so opeke;
  brickyCoord = [];
  brickxCoord = [];
  for (i = 0; i < NROWS; i++) {
    for (j = 0; j < NCOLS; j++) {
      var brickx = j * (BRICKWIDTH + PADDING) + PADDING;
      brickxCoord.push(brickx);
      var bricky = i * (BRICKHEIGHT + PADDING) + PADDING;
      brickyCoord.push(bricky);
    }
  }
  
  
  
  
  rowheight = (BRICKHEIGHT + PADDING/2); //Smo zadeli opeko?
  colwidth = (BRICKWIDTH + PADDING/2) ;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);


  //risemo opeke barve itd
    for (let i = 0; i < bricks.length; i++) {
      for (let j = 0; j < bricks[i].length; j++) {
        if (bricks[i][j] == 1) {
        // draw bricks
        //console.log(brickxCoord[i * NROWS + j])
        image(
          wood,
          brickxCoord[i * NROWS + j],
          brickyCoord[i * NROWS + j],
          BRICKWIDTH,
          BRICKHEIGHT
        );
        } else if (bricks[i][j] == 2) {
        image(
          more_wood,
          brickxCoord[i * NROWS + j],
          brickyCoord[i * NROWS + j],
          BRICKWIDTH,
          BRICKHEIGHT
        );
        }/* else if (bricks[i][j] == 3) {
        rect(
          //red_Brick_hit,
          brickxCoord[i * NROWS + j],
          brickyCoord[i * NROWS + j],
          BRICKWIDTH,
          BRICKHEIGHT
          );
        }*/
      
    
  //podiranje
    if (
      x - 10 < brickxCoord[i * NROWS + j] + BRICKWIDTH &&
      y - 10 < brickyCoord[i * NROWS + j] + BRICKHEIGHT &&
      x + 10 > brickxCoord[i * NROWS + j] &&
      y + 10 > brickyCoord[i * NROWS + j]
    ) {
      if (bricks[i][j] == 1 || bricks[i][j] == 2 || bricks[i][j] == 4 || bricks[i][j] == 3) {
        var obj = {
          bot: brickyCoord[i * NROWS + j] + BRICKHEIGHT - y,
          top: y - brickyCoord[i * NROWS + j],
          left: x - brickxCoord[i * NROWS + j],
          right: brickxCoord[i * NROWS + j] + BRICKWIDTH - x,
        };

        var smallest = "";
        for (var key in obj) {
          if (smallest !== "" && obj[key] < obj[smallest]) {
            smallest = key;
          } else if (smallest === "") {
            smallest = key;
          }
        }
        console.log(smallest);

        if (smallest == "bot") {
          dy = -dy;
          bricks[i][j] -= 1;
          tocke ++;
          st_bricks --;
          //updateScore(bricks[i][j]);
        } else if (smallest == "top") {
          dy = -dy;
          bricks[i][j] -= 1;
          tocke ++;
          st_bricks --;
          //updateScore(bricks[i][j]);
        } else if (smallest == "left") {
          dx = -dx;
          bricks[i][j] -= 1;
          tocke ++;
          st_bricks --;
          //updateScore(bricks[i][j]);
        } else if (smallest == "right") {
          dx = -dx;
          bricks[i][j] -= 1;
          tocke ++;
          st_bricks --;
          //updateScore(bricks[i][j]);
        }

      }
    }
  }
  }
  }
    //$("#tocke").html(tocke);


      init();
 }

    //zbrise vse
    function clear(){
        ctx.clearRect(0,0,height,width);
    }
    function clear_bottom(x,y){
      ctx.beginPath();
      ctx.clearRect(x,y,height,width);
      ctx.closePath();
  }

  function image(img, x, y, width, height){
      ctx.drawImage(img, x, y, width, height);
  }

    //narise krog
    function cicle(x, y, c){
        ctx.beginPath();
        ctx.arc(x, y, c, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
    }
    // narise ploscek
    function rect(x, y, width, height){
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        
    }

    function rect_blue(x, y, width, height){
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
      
    }
    init_paddle();



    var bricks;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;
 
    function initbricks() { //inicializacija opek - polnjenje v tabelo
      NROWS = 7;
      NCOLS = 7;
      PADDING = 1;
      BRICKWIDTH = (width/NCOLS) - PADDING - PADDING/NCOLS ;
      BRICKHEIGHT = 30;
      
      
    var g=0;

      bricks = new Array(NROWS);
      for (i=0; i < NROWS; i++) {
        bricks[i] = new Array(NCOLS);
        for (j=0; j < NCOLS; j++) {
          if(g%2==0)
            bricks[i][j] = 1;
          else
            bricks[i][j] = 2;
          g++;
        }
      }
    }
    initbricks();













  function death_init(){
    return (interval_death = setInterval(death, 0.01));
  }

  function death(){
    $("#zivljenja").html(lives);
    clear_bottom(0, 300);
    //narise ploscek (prvi dve sta poziciji kje se nahaja)
    rect(paddlex, height-paddleh-paddle_margin /*500-10==490*/, paddlew, paddleh);
    cicle(paddlex+paddlew/2, height-paddleh-r-paddle_margin, r);
        //premikanje ploscka levo - denso
        if (rightDown) paddlex += 0.2;
        else if (leftDown) paddlex -= 0.2;
        //omejevanje ploscka oz da plosecek ne gre iz canvasa
        if(rightDown){
          if((paddlex+paddlew) < width){
            paddlex += 0.5;
          }else{
            paddlex = width-paddlew;
          }
          }
            else if(leftDown){
          if(paddlex>0){
            paddlex -=0.5;
          }else{
            paddlex=0;
          }
        }


        addEventListener("click", (event) => {});

        
        onclick = (event) => {
          if(ball_moving==0){
            clearInterval(interval_death)
            clear_bottom(0,300);
            drawIt();
            ball_moving=1;
          }
        };

  }







  //nastavljanje premikanja ploscka spodaj
var rightDown = false;
var leftDown = false;
var canvasMinX;
var canvasMaxX;

//nastavljanje leve in desne tipke

function onKeyDown(evt) {
  if (evt.keyCode == 39)
    rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39)
    rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp); 


function init_mouse() {
  //canvasMinX = $("#canvas").offset().left;
  canvasMinX = $("canvas").offset().left + paddlew / 2;
  canvasMaxX = canvasMinX + width - paddlew;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX;
  }
}
$(document).mousemove(onMouseMove); 

init_mouse();


function time(){
  sekunde = 0;
  izpisTimer = izpisTimer;
  intTimer = setInterval(timer, 1000);
}
time();

//timer
var sekunde;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer ="00:00";
//timer
function timer(){
sekunde++;

sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
izpisTimer = minuteI + ":" + sekundeI;

$("#cas").html(izpisTimer);
}

var pavza=0;
function pause(){
  if(pavza==1){
      drawIt();
      dx=0;
      dy=0;

      pavza=0;
  }
  else if(pavza==0){
    clearInterval(interval);
    
    pavza=1;
  }
}
 

function lose_game(){
  clearInterval(interval);
  Swal.fire({
    icon: 'error',
    title: 'Game Over',
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  })
}

function win_game(){
  clearInterval(interval);
  Swal.fire({
    icon: 'success',
    title: 'Great Job',
    text: "Your time was " + izpisTimer,
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  })
}

