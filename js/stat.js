'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var FONT_GAP = 15;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var initialPositionX = CLOUD_X + (CLOUD_GAP * 4);

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText(text, x, y);
};

var renderResultBar = function (ctx, x, y, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BAR_WIDTH, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);
  renderText(ctx, 'Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 3.2);

  for (var i = 0; i < times.length; i++) {
    var maxTime = getMaxElement(times);
    var barHeight = Math.round(times[i]) * BAR_MAX_HEIGHT / maxTime;
    var resultBarY = CLOUD_Y + CLOUD_HEIGHT - (FONT_GAP * 2.5) - barHeight;

    renderResultBar(ctx, initialPositionX + (BAR_WIDTH + BAR_GAP) * i, resultBarY, barHeight, fillBarColor(players[i]));
    renderText(ctx, Math.round(times[i]), initialPositionX + (BAR_WIDTH + BAR_GAP) * i, resultBarY - (FONT_GAP / 2.5));
    renderText(ctx, players[i], initialPositionX + (BAR_WIDTH + BAR_GAP) * i, resultBarY + barHeight + (FONT_GAP * 1));
  }

  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
  }

  function fillBarColor(playerName) {
    if (playerName === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(' + 240 + ',' + getRandomValue(1, 100) + '%,' + 50 + '%)';
    }
  }
};
