import { handleNewUser, handleDisconnected } from "./notifications";
import events from "../../src/events";
import { handleNewMsg } from "./chat";
import { handleBeganPath, handleStrokePath, handleFilled } from "./canvas";
import { handlePlayerUpdate, handleGameStarted } from "./player";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = aSocket => socket = aSocket;

export const initSockets = aSocket => {
    updateSocket(aSocket);
    aSocket.on(events.newUser, handleNewUser);
    aSocket.on(events.disconnected, handleDisconnected);
    aSocket.on(events.newMsg, handleNewMsg);
    aSocket.on(events.beganPath, handleBeganPath);
    aSocket.on(events.strokedPath, handleStrokePath);
    aSocket.on(events.filled, handleFilled);
    aSocket.on(events.playerUpdate, handlePlayerUpdate)
    aSocket.on(events.gameStarted, handleGameStarted);
}