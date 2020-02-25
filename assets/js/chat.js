import events from "../../src/events";
import { getSocket } from "./socket";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

const appendMsg = (text, nickname) => {
    const li = document.createElement("li");
    console.log(`${nickname} : ${text}`);
    li.innerHTML = `
        <span class = "author ${nickname ? "out" : "self"}"> ${nickname ? nickname : "You" }:</span> ${text}
    `;
    messages.appendChild(li);
    const objDiv = document.getElementById("jsMessages");
        objDiv.scrollTop = objDiv.scrollHeight;
}


const handleSendMsg = event => {
    event.preventDefault();
    const input = sendMsg.querySelector("input");
    const { value } = input;
    getSocket().emit(events.sendMsg, {message: value});
    input.value = "";
    appendMsg(value);
}


export const handleNewMsg = ({ message, nickname }) => {
    appendMsg(message, nickname)
}

if( sendMsg ){
    sendMsg.addEventListener("submit", handleSendMsg);
}