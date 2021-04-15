"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
// // create WebSocket server with given port
const port = Number(process.env.PORT) || 8000;
const server = new WebSocket.Server({ port: port });
// set of connected sockets
const clientSockets = new Set();
// init counters (0 is number of connected clients)
const counters = [0, 0, 0, 0, 0, 0, 0, 0, 0];
server.on("connection", (socket) => {
    clientSockets.add(socket); // delete client socket to set of connected sockets
    counters[0]++; // increase number of clients
    // broadcast counters to newly connected client
    broadcastCounters();
    // receive counter increment from connected client
    socket.on("message", (message) => {
        const counterIndex = parseInt(message);
        counters[counterIndex]++;
        broadcastCounters();
    });
    // client connection closing
    socket.on("close", () => {
        clientSockets.delete(socket); // delete client socket from set of connected sockets
        counters[0]--; // decrease number of clients
        // update client counters
        broadcastCounters();
    });
    // broadcast all counters to all connected clients
    function broadcastCounters() {
        for (let socket of clientSockets) {
            socket.send(JSON.stringify(counters));
        }
    }
});
//# sourceMappingURL=server.js.map