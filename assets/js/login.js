import { initSockets } from "./socket";
import events from "../../src/events";

const body = document.querySelector("body");
const loginForm = document.getElementById("jsLogin");

const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";
const NICKNAME = "nickname"
const nickname = localStorage.getItem(NICKNAME);

const logIn = (nickname) => {
    const socket = io("/");
    socket.emit(events.setNickname, { nickname });
    initSockets(socket);
};

if(nickname === null){
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}

const handleFormSubmit = event =>{
  event.preventDefault();
  const input = loginForm.querySelector("input");
  const {value} = input;
  input.value="";
  localStorage.setItem(NICKNAME,value);
  body.className = LOGGED_IN;
  logIn(value);
  
}


if(loginForm){
  loginForm.addEventListener("submit",handleFormSubmit)
}