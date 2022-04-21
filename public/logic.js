const socket = io();

postProductButton = document.querySelector(".postProductButton");
productForm = document.querySelector(".productsForm");

chatInputButton = document.querySelector(".chatInputButton");
chatInput = document.querySelector(".chatInput");
chatUserNamePrompt = document.querySelector(".chatUserNamePrompt");
chatLog = document.querySelector(".chatLog");

userNameInput = document.querySelector(".userNameInput");

if(postProductButton){
    postProductButton.addEventListener('click', (e) => {
        e.preventDefault();
        const sendObject = {}
        Array.from(productForm.children).forEach((ch) => {
            if(ch.tagName === "INPUT"){
                sendObject[ch.name] = ch.value;
                ch.value = "";
            }
        });
        //HERE: data validation
        //sendObject["user"] = localStorage.getItem('userNameInput'); for later use
        //sendObject["date"] = new Date();
        console.log(sendObject);
        socket.emit("productAdd", sendObject);
    })
}

if(chatInputButton && chatUserNamePrompt){
    chatUserNamePrompt.innerHTML = localStorage.getItem('userName');
    chatInputButton.addEventListener('click', (e) => {
        e.preventDefault();
        //HERE: data validation
        const sendObject = {}
        sendObject["user"] = localStorage.getItem('userName');
        sendObject["msg"] = chatInput.value;
        sendObject["date"] = new Date();
        console.log(sendObject);
        socket.emit("chatMessage", sendObject);
    })
    socket.on("messageList", (data) => {
        const chatLogText = data.map((elem) => `<p><b>${elem.user}:</b> ${elem.msg} \t [${elem.date}]`);
        chatLog.innerHTML = chatLogText.join('<br>')
    })
}

if(userNameInput){
    userNameInput.value = localStorage.getItem('userName')
    userNameInput.addEventListener('keypress', (e) => {
        localStorage.setItem('userName', userNameInput.value + e.key);
        console.log(localStorage.getItem('userName'));
    })
}