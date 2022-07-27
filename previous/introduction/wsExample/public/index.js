// este script representa a el cliente

const socket = io(); //conexion con websockets, la variable io la saca del script server.js, no se bien como

const sendButton = document.querySelector('#inputSendButton');
const sendSpace = document.querySelector("#inputSpace");
const receivedText = document.querySelector("#receivedText");

sendButton.addEventListener('click', () => {
    //console.log("enviando", sendSpace.value);
    socket.emit("message", sendSpace.value);
    sendSpace.value.set("");
})

socket.on("messages", (data) => {
    var text = ""
    data.forEach((m) => {text += (`<p>SocketID:${m.id}->Mensaje:${m.data}</p>`)});
    receivedText.innerHTML = text;
})

