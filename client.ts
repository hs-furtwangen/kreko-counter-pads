// const socket: WebSocket = new WebSocket("ws://localhost:8000/");
const socket: WebSocket = new WebSocket("wss://kreko-counter-pads.herokuapp.com/");

// list of pad/counter names
const counterNames: string[] = [
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
  const padDiv: HTMLDivElement = document.querySelector(`#${counterName}`);

  if (padDiv.id !== "numClients") {
  // register click listener
  padDiv.addEventListener("touchstart", (evt) => {
      const div: HTMLDivElement = <HTMLDivElement>evt.target;

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
  const counters: number[] = JSON.parse(event.data);

  // update pad counters
  for (let i: number = 0; i < counters.length; i++) {
    const counterName: string = counterNames[i];
    const counterDiv: HTMLDivElement = document.querySelector(`#${counterName} .counter`);
    counterDiv.innerHTML = counters[i].toString();
  }
});
