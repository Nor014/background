
const canvas = document.getElementById('wall'),
  ctx = canvas.getContext('2d');

// основные переменные

let figures = [];

const minFigures = 50,
  maxFigures = 200;

let size;

const maxSize = 0.6,
  minSize = 0.1;

const nextPoint = [
  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
  },
  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }
];

const minAngleOfRotation = 0,
  maxAngleOfRotation = 360;

const minTurningSpeed = -0.2,
  maxTurningSpeed = 0.2;


function random(min, max) {
  return Math.random() * (max - min) + min;
}

const amountOfFigures = random(minFigures, maxFigures).toFixed(0);

// функция-конструктор для круга
function craeteArc(amountOfFigures) {
  for (let i = 0; i < amountOfFigures; i++) {
    let arc = {
      name: 'arc',
      size: random(minSize, maxSize),
      startX: random(0, canvas.width),
      startY: random(0, canvas.height),
      nextPoint: nextPoint[random(0, nextPoint.length - 1).toFixed(0)]
    }
    figures.push(arc);
  }
}

// функция-конструктор для крестика
function createCross(amountOfFigures) {
  for (let i = 0; i < amountOfFigures; i++) {
    let arc = {
      name: 'cross',
      size: random(minSize, maxSize),
      startX: random(0, canvas.width),
      startY: random(0, canvas.height),
      nextPoint: nextPoint[random(0, nextPoint.length - 1).toFixed(0)],
      angleOfRotation: random(minAngleOfRotation, maxAngleOfRotation),
      turningSpeed: random(minTurningSpeed, maxTurningSpeed)
    }
    figures.push(arc);
  }
}

// формируем массив с объектами(фигурами)
let p = new Promise((done, fail) => {
  craeteArc(amountOfFigures);
  createCross(amountOfFigures);
}).then(show());

// функция отрисовки фигур на полотне
function draw(el) {

  if (el.name === 'arc') {
    let { x, y } = el.nextPoint(el.startX, el.startY, Date.now());
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5 * el.size;
    ctx.arc(x, y, el.size * 12, 0, Math.PI * 2, false);
    ctx.stroke();
  }

  if (el.name === 'cross') {
    let { x, y } = el.nextPoint(el.startX, el.startY, Date.now());
    ctx.beginPath()
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5 * el.size;
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20 * el.size, y + 20 * el.size);
    ctx.moveTo(x + 20 * el.size, y);
    ctx.lineTo(x, y + 20 * el.size);
    ctx.stroke();
  }

}

// через интервал обновляем канвас, предварительно отчищая его, тем самым добиваемся анимации движения
function show() {
  setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    figures.forEach(el => draw(el));
  }, 20);
}