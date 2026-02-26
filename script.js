function drawRoundedShape(points, radius,ctx) {
    if (points.length < 2) return;
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const prev = points[(i - 1 + points.length) % points.length];
      const curr = points[i];
      const next = points[(i + 1) % points.length];

      const v1 = { x: curr.x - prev.x, y: curr.y - prev.y };
      const len1 = Math.hypot(v1.x, v1.y);
      v1.x /= len1;
      v1.y /= len1;
      const v2 = { x: next.x - curr.x, y: next.y - curr.y };
      const len2 = Math.hypot(v2.x, v2.y);
      v2.x /= len2;
      v2.y /= len2;
      const p1 = {
        x: curr.x - v1.x * Math.min(radius, len1 / 2),
        y: curr.y - v1.y * Math.min(radius, len1 / 2),
      };
      const p2 = {
        x: curr.x + v2.x * Math.min(radius, len2 / 2),
        y: curr.y + v2.y * Math.min(radius, len2 / 2),
      };

      if (i === 0) {
        ctx.moveTo(p1.x, p1.y);
      } else {
        ctx.lineTo(p1.x, p1.y);
      }
      ctx.arcTo(curr.x, curr.y, p2.x, p2.y, radius);
    }
    ctx.closePath();

}



// script.js
function firstCanvas(){
  const canvas = document.querySelector(".first2 canvas");
  const first2 = document.querySelector(".first2").getBoundingClientRect();
  const firstNav = document.querySelector(".firstnav").getBoundingClientRect();

  canvas.style.height = `${first2.height + firstNav.height}px`;
  canvas.style.width = `${first2.width}px`;
  canvas.style.top = `-${firstNav.height}px`;

  canvas.width = first2.width;
  canvas.height = first2.height + firstNav.height;

  const ctx = canvas.getContext("2d");

  const points = [
    {x:0, y:0},
    {x:first2.width - firstNav.width - 20, y:0},
    {x:first2.width - firstNav.width - 10, y:firstNav.height - 10},
    {x:first2.width - firstNav.width, y:firstNav.height},
    {x:first2.width, y:firstNav.height},
    {x:first2.width, y:canvas.height},
    {x:0, y:canvas.height}
  ];

  const image = new Image();
  image.src = "images/Casa interior HD 8K papel de parede Imagem fotográfica _ imagem Premium gerada com IA 1.svg";

  image.onload = () => {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    drawRoundedShape(points, 30, ctx);
    ctx.clip();

    const scale = Math.max(canvas.height / image.height, canvas.width / image.width);
    const newWidth = image.width * scale;
    const newHeight = image.height * scale;

    ctx.save();
    ctx.translate(newWidth / 2, newHeight / 2);
    ctx.drawImage(image, -newWidth/2, -newHeight/2, newWidth, newHeight);
    ctx.restore();

    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    drawRoundedShape(points, 30, ctx);
    ctx.clip();

    ctx.fillStyle = "#00000042";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.closePath();
  };
}

function secondCanvas(){
const points = [
  {x:0,y:0}
]
const canvas = document.querySelector(".second3 > canvas")
const ctx = canvas.getContext("2d")
const canvasSize  = canvas.getBoundingClientRect()
canvas.width = canvasSize.width
canvas.height = canvasSize.height
let previousY = 0
document.querySelectorAll(".second3 > div").forEach((div,index)=>{
  const padding = parseFloat(window.getComputedStyle(div.querySelector("div")).paddingLeft)
const divH2 = div.querySelector("h2").getBoundingClientRect()
const divSec = div.querySelector("div").getBoundingClientRect()
points.push({x:canvasSize.width,y:previousY})
points.push({x:canvasSize.width,y:previousY+divH2.height})
points.push({x:padding,y:previousY+divH2.height})
previousY = previousY+divH2.height+divSec.height
points.push({x:padding,y:previousY})
const divLength = document.querySelectorAll(".second3 > div").length
if(divLength-1 === index){
  points.push({x:0,y:previousY})
}
console.log(padding)
})
    ctx.beginPath();
    ctx.moveTo(0, 0);
            ctx.fillStyle = "#ffffff13";
    drawRoundedShape(points, 30, ctx);
    ctx.fill();
    ctx.closePath()
}
function thridCanvas(){
  const canvas = document.querySelector(".products1 canvas")
  const firstDiv = document.querySelector(".products1 > div:first-of-type").getBoundingClientRect()
  const ctx = canvas.getContext("2d")
const canvasSize  = canvas.getBoundingClientRect()
canvas.width = canvasSize.width
canvas.height = canvasSize.height
  const padding = parseFloat(window.getComputedStyle(document.querySelector(".products1 > div:last-of-type")).paddingLeft)
  const paddingP = parseFloat(window.getComputedStyle(document.querySelector(".products1")).paddingLeft)
  const points = [
    {x:0,y:0},
    {x:canvasSize.width,y:0},
    {x:canvasSize.width,y:firstDiv.height + paddingP},
    {x:padding+paddingP,y:firstDiv.height + paddingP},
    {x:padding+paddingP,y:canvasSize.height},
    {x:0,y:canvasSize.height},

  ]  
  
  ctx.beginPath();
    ctx.moveTo(0, 0);
            ctx.fillStyle = "#ffffff13";
    drawRoundedShape(points, 30, ctx);
    ctx.fill();
    ctx.closePath()
}

const page = document.body.dataset.page;
      window.addEventListener("DOMContentLoaded",()=>{
        if (page === "index") {
         firstCanvas()
secondCanvas()
        }
        
if (page === "product") {
secondCanvas()
thridCanvas()
}


})

  const hideIcon = "images/Group 50.svg";
  const showIcon = "images/Vector (3).svg";

if(page === "log" || page === "sign"){
  const pwToggle = document.querySelectorAll(".pw-toggle")
   const pw = document.querySelectorAll(".password");
  pwToggle.forEach((toggle,i)=>{
      const pwIcon = toggle.querySelector(".pw-Icon");
  toggle.addEventListener("click", () => {
    const isHidden = pw[i].type === "password";

    // Switch input type
    pw[i].type = isHidden ? "text" : "password";

    // Switch icon
    pwIcon.src = isHidden ? hideIcon : showIcon;

    // Update accessibility
    pwIcon.alt = isHidden ? "Hide password" : "Show password";
    pwToggle.setAttribute("aria-pressed", isHidden ? "true" : "false");
  });
  })

console.log(pwToggle)

}
