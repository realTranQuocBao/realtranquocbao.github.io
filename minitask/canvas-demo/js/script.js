const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const numberPartical = 20;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = [
  "#f2432a",
  "#ffcccf",
  "#00cd3f",
  "#01f2f0",
  "#dcec3f",
  "#13579f",
];

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

function randomColor(colors) {
  return colors[Math.floor(Math.random() * 6)];
}

function Partical(x, y, radius, color, velocity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = velocity;
  // time to leave
  this.ttl = 100;
  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };
  this.update = () => {
    // this.x = Math.floor(Math.random() * 500);
    // this.y = Math.floor(Math.random() * 500);
    // this.radius = Math.floor(Math.random() * 10);
    this.ttl--;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  };
}

function genarateFirework() {
  setTimeout(genarateFirework, 500);
  for (let index = 0; index < numberPartical; index++) {
    const radians = (Math.PI * 2) / numberPartical;
    const x = mouse.x;
    const y = mouse.y;
    const color = randomColor(colors);
    const velocity = {
      x: Math.cos(radians * index),
      y: Math.sin(radians * index),
    };
    particals.push(new Partical(x, y, 1, color, velocity));
  }
}

// const partical = new Partical(200, 200, 10, "#ff0000");
let particals;
function init() {
  particals = [];
  for (let index = 0; index < numberPartical; index++) {
    const radians = (Math.PI * 2) / numberPartical;
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const color = randomColor(colors);
    const velocity = {
      x: Math.cos(radians * index),
      y: Math.sin(radians * index),
    };
    particals.push(new Partical(x, y, 1, color, velocity));
  }
}

function animate() {
  requestAnimationFrame(animate);
  //   partical.update();
  //   ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particals.forEach((item, index) => {
    if (item.ttl === 0) {
      particals.splice(index, 1);
    }
    item.update();
  });
}

init();
genarateFirework();
animate();

// console.log("hihi", partical);

window.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
