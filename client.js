"use strict";
// const socket: WebSocket = new WebSocket("ws://localhost:8000/");
const socket = new WebSocket("wss://kreko-counter-pads.herokuapp.com/");
// list of pad/counter names
const counterNames = [
    "numClients",
    "topLeft",
    "topCenter",
    "topRight",
    "middleLeft",
    "middleRight",
    "bottomLeft",
    "bottomCenter",
    "bottomRight",
];
// create pads
for (let counterName of counterNames) {
    const padDiv = document.querySelector(`#${counterName}`);
    if (padDiv.id !== "numClients") {
        // register click listener
        padDiv.addEventListener("touchstart", (evt) => {
            const div = evt.target;
            // send pad index to server
            socket.send(div.dataset.index);
            // blink pad
            div.classList.add("active");
            setTimeout(() => div.classList.remove("active"), 100);
            // suppress any further action associated to touchstart
            evt.preventDefault();
        });
    }
}
// listen to connection open
// socket.addEventListener("open", (event) => {
// });
// listen to message from server
socket.addEventListener("message", (event) => {
    const counters = JSON.parse(event.data);
    // update pad counters
    for (let i = 0; i < counters.length; i++) {
        const counterName = counterNames[i];
        const counterDiv = document.querySelector(`#${counterName} .counter`);
        counterDiv.innerHTML = counters[i].toString();
    }
});
//# sourceMappingURL=client.js.map