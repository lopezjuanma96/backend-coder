const socket = io(); //this comes from <script src="/socket.io/socket.io.js"></script> being run on the HMTL file

const user = new normalizr.schema.Entity('users');
const message = new normalizr.schema.Entity('messages', {
    user: user
});

const chatSchema = new normalizr.schema.Entity('logs', {
    messages: [message]
});

postProductButton = document.querySelector(".postProductButton");
productForm = document.querySelector(".productsForm");
productsTable = document.querySelector(".productsTable");

chatInputButton = document.querySelector(".chatInputButton");
chatInput = document.querySelector(".chatInput");
chatUserNamePrompt = document.querySelector(".chatUserNamePrompt");
chatLog = document.querySelector(".chatLog");

userNameInput = document.querySelector(".userNameInput");
userSurnameInput = document.querySelector(".userSurnameInput");
userEmailInput = document.querySelector(".userEmailInput");
userAgeInput = document.querySelector(".userEmailInput");
userAliasInput = document.querySelector(".userAliasInput");

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
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${sendObject['title']}</td><td>${sendObject['price']}</td><td>${sendObject['thumbnail']}</td>`;
        newRow.style.backgroundColor="sandybrown";
        productsTable.append(newRow);
    })
}

if(chatInputButton && chatUserNamePrompt){
    chatInputButton.addEventListener('click', (e) => {
        e.preventDefault();
        //HERE: data validation
        const sendObject = { user: {} }
        sendObject.user.id = localStorage.getItem('userEmail');
        sendObject.user.name = localStorage.getItem('userName');
        sendObject.user.surname = localStorage.getItem('userSurname');
        sendObject.user.age = localStorage.getItem('userAge');
        sendObject.user.alias = localStorage.getItem('userAlias');
        sendObject.user.avatar = 'temp.png';
        sendObject.text = chatInput.value;
        sendObject.date = new Date();
        //console.log(sendObject);
        socket.emit("chatMessage", sendObject);
    })
    socket.on("messageList", (data) => {
        if (data.length > 0){
            const denormData = normalizr.denormalize(data[0].result, chatSchema, data[0].entities)
            const compRate = (100*JSON.stringify(data[0].entities).length/JSON.stringify(denormData).length).toFixed(2);
            const chatLogText = denormData.messages.map((elem) => `<p><b>${elem.user.alias}:</b> ${elem.text} \t [${elem.date}]`)
            chatLog.innerHTML = `<h1>Compression Rate: ${compRate}%</h1>` + chatLogText.join('<br>')
        }
    })
}

/*
if(userNameInput){
    
    userEmailInput.value = localStorage.getItem('userEmail');
    userEmailInput.addEventListener('keypress', (e) => {
        localStorage.setItem('userEmail', userEmailInput.value + e.key);
        console.log(localStorage.getItem('userEmail'));
    })
    userNameInput.value = localStorage.getItem('userName');
    userNameInput.addEventListener('keypress', (e) => {
        localStorage.setItem('userName', userNameInput.value + e.key);
        console.log(localStorage.getItem('userName'));
    })
    userSurnameInput.value = localStorage.getItem('userSurname');
    userSurnameInput.addEventListener('keypress', (e) => {
        localStorage.setItem('userSurname', userSurnameInput.value + e.key);
        console.log(localStorage.getItem('userSurname'));
    })
    userAgeInput.value = localStorage.getItem('userAge');
    userAgeInput.addEventListener('keypress', (e) => {
        localStorage.setItem('userAge', userAgeInput.value + e.key);
        console.log(localStorage.getItem('userAge'));
    })
    userAliasInput.value = localStorage.getItem('userAlias');
    userAliasInput.addEventListener('keypress', (e) => {
        localStorage.setItem('userAlias', userAliasInput.value + e.key);
        console.log(localStorage.getItem('userAlias'));
    })
}
*/