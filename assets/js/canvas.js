import { getSocket } from "./socket";
import events from "../../src/events";

const canvas = document.getElementById("jsCanvas");
const controls = document.getElementById("controls");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll("#jsColor")
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"
ctx.fillStyle = "#2c2c2c"
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const stopPainting = () =>{
    painting = false;
}
const startPainting = () => {
    painting = true;
}

const beganPath = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x,y);
}

const strokedPath = (x,y, color = null) => {
    let currentColor = ctx.strokeStyle;
    if(color){
        ctx.strokeStyle = color;
    }
    ctx.lineTo(x,y);
    ctx.stroke();
    ctx.strokeStyle = currentColor;
}

const onMouseMove = event =>{
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        beganPath(x,y);
        getSocket().emit(events.beginPath, { x, y });
    } else {
        strokedPath(x,y);
        getSocket().emit(events.strokePath, { x, y ,color: ctx.strokeStyle});
    }

}

const fill = (color = null) => {
    let currentColor = ctx.fillStyle;
    if(color){
        ctx.fillStyle = color
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = currentColor;

}

const handleColorClick = event => {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

const handleRangeChange = event => {
    const size = event.target.value
    ctx.lineWidth = size;
}

const handleModeClick = event => {
    if(filling === true){
        filling = false
        mode.innerText = " 채우기 "
    } else {
        filling = true;
        mode.innerText = " 그리기 "
    }
}

const handleCanvasClick = () =>{
    if (filling) {
        fill();
        getSocket().emit(events.fill, {color: ctx.fillStyle})
    }
}

const handleCM = event =>{
    event.preventDefault();
}

const handleSaveClick = event => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "그림";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup",  stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);

}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input",handleRangeChange)
}

if(mode) {
    mode.addEventListener("click",handleModeClick);
}

if(save){
    save.addEventListener("click",handleSaveClick);
}

export const handleBeganPath = ({x,y}) => beganPath(x,y)
export const handleStrokePath = ({x,y, color}) => strokedPath(x,y, color);
export const handleFilled = ({color}) => fill(color);

export const disableCanvas = () => {
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mousedown", startPainting);
    canvas.removeEventListener("mouseup",  stopPainting);
    canvas.removeEventListener("click", handleCanvasClick);
}
export const hideCanvasControls = () => {

}