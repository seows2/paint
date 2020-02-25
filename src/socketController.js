import events from "./events";
import { chooseWord } from "../assets/js/words";

let sockets = [];
let inProgress = false;
let word = null;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
    const broadcast = (event, data) => socket.broadcast.emit(event,data);
    const AllBroadcast = (event, data) => io.emit(event, data);
    const startGame = () => {
        if (inProgress === false) {
          inProgress = true;
          const leader = chooseLeader();
          word = chooseWord();
          io.to(leader.id).emit(events.leaderNotif, { word });
          AllBroadcast(events.gameStarted);
        }
      };

    socket.on(events.setNickname, ({nickname}) => {
        socket.nickname = nickname;
        sockets.push({id: socket.id, point: 0, nickname});
        broadcast(events.newUser, { nickname });
        AllBroadcast(events.playerUpdate, { sockets })
        startGame();
    });

    socket.on(events.disconnect, () => {
        sockets = sockets.filter(aSocket => aSocket.id !== socket.id)
        broadcast(events.disconnected, { nickname : socket.nickname});
        AllBroadcast(events.playerUpdate, { sockets })
    });
    
    socket.on(events.sendMsg, ({message}) => {
        broadcast(events.newMsg, { message, nickname : socket.nickname });
    });

    socket.on(events.beginPath, ({ x, y }) => {
        broadcast(events.beganPath, { x, y });
    });

    socket.on(events.strokePath, ({ x, y, color }) => {
        broadcast(events.strokedPath, { x, y ,color });
    });

    socket.on(events.fill, ({color}) => {
        broadcast(events.filled, { color });
    })
};

export default socketController;