// TODO: https://github.com/romanmtb/Flappy-Bird-Game/issues/2
/* eslint-disable eqeqeq,no-plusplus,no-restricted-globals,no-mixed-operators,no-undef,no-use-before-define,no-var,vars-on-top */
import birdSrc from '../img/bird.png';
import bgSrc from '../img/bg.png';
import fgSrc from '../img/fg.png';
import pipeUpSrc from '../img/pipeUp.png';
import pipeBottomSrc from '../img/pipeBottom.png';

console.log('game.js has been included');

// just for test

const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

bird.src = birdSrc;
bg.src = bgSrc;
fg.src = fgSrc;
pipeUp.src = pipeUpSrc;
pipeBottom.src = pipeBottomSrc;


// Tap on any button
document.addEventListener('keydown', moveUp);
document.addEventListener('touchstart', moveUp);

function moveUp() {
  yPos -= 25;
  fly.play();
}

// Creating blocks
const pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

// Bird Position
const gap = 100;
const xPos = 10;
var yPos = 150;
const grav = 1.5;
let score = 0;


var fly = new Audio();
// eslint-disable-next-line camelcase
const score_audio = new Audio();

fly.src = '.audio/score.mp3';
score_audio.src = './audio/score.mp3';

function draw() {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(fg, 0, cvs.height - fg.height);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * 0.50 * pipeUp.height) - pipeUp.height,
      });
    }

    //  Touch tracking
    if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
            || yPos >= cvs.height - fg.height) {
      // Page reload
      location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  ctx.fillStyle = '#663333';
  ctx.font = '26px Georgia';
  ctx.fillText(`Score ${score}`, 100, cvs.height - 20);

  yPos += grav;
  requestAnimationFrame(draw);
}

pipeBottom.onload = draw();
console.log( bird );
