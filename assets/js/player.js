import { disableCanvas } from "./canvas";

const PBoard = document.getElementById("jsPBoard");

const addPlayers = (players) =>{
    PBoard.innerText = "";
    players.forEach(player => {
        const playerElement = document.createElement("span");
        playerElement.innerText = `${player.nickname}: ${player.point} `
        PBoard.appendChild(playerElement);
    });
} 




export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
    disableCanvas();
}