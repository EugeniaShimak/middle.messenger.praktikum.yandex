const snowMax = 50;
const snowColor = [
    '#AAAACC',
    '#DDDDFF',
    '#9090dc',
    '#d3d3d3',
    '#F0FFFF',
    '#FFFFFF',
    '#9ebeff',
    '#92f6f5'];
const snowType = ['Arial Black', 'Arial Narrow', 'Times', 'Comic Sans MS'];
const snowLetter = '*';
const sinkSpeed = 0.6;
const snowMaxSize = 56;
const snowMinSize = 4;

const snow = [];
let marginBottom;
let marginRight;
let x_mv = [];
let crds = [];
let lftrght = [];
let browserinfos = navigator.userAgent;
let opera = browserinfos.match(/Opera/);

function randomMaker(range) {
    return Math.floor(range * Math.random());
}

function initSnow() {
    if (opera) {
        marginBottom = document.body.clientHeight;
        marginRight = document.body.clientWidth;
    } else {
        marginBottom = window.innerHeight;
        marginRight = window.innerWidth;
    }
    let snowSizeRange = snowMaxSize - snowMinSize;
    for (let i = 0; i <= snowMax; i++) {
        crds[i] = 0;
        lftrght[i] = Math.random() * 15;
        x_mv[i] = 0.03 + Math.random() / 10;
        snow[i] = document.getElementById('s' + i);
        snow[i].style.fontFamily = snowType[randomMaker(snowType / length)];
        snow[i].size = randomMaker(snowSizeRange) + snowMinSize;
        snow[i].style.fontSize = snow[i].size + 'px';
        snow[i].style.color = snowColor[randomMaker(snowColor.length)];
        snow[i].sink = sinkSpeed * snow[i].size / 5;
        snow[i].posx = randomMaker(marginRight - snow[i].size)
        snow[i].posy = randomMaker(2 * marginBottom - marginBottom - 2 * snow[i].size);
        snow[i].style.left = snow[i].posx + 'px';
        snow[i].style.top = snow[i].posy + 'px';
    }
    moveSnow();
}

function moveSnow() {
    for (let i = 0; i <= snowMax; i++) {
        crds[i] += x_mv[i];
        snow[i].posy += snow[i].sink;
        snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + 'px';
        snow[i].style.top = snow[i].posy + 'px';
        if (snow[i].posy >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lftrght[i])) {
            snow[i].posx = randomMaker(marginRight - snow[i].size)
            snow[i].posy = 0;
        }
    }
    setTimeout('moveSnow()', 50);
}

for (let i = 0; i <= snowMax; i++) {
    document.write('<span id=\'s' + i + '\' style=\'position:absolute;top:-' + snowMaxSize + 'px;\'>' + snowLetter + '</span>');
}

window.onload = initSnow;
