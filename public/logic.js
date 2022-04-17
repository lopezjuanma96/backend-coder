postProductButton = document.querySelector(".postProductButton");
productForm = document.querySelector(".productsForm");

chatInputButton = document.querySelector(".chatInputButton");
chatUser = document.querySelector(".chatUser");
chatInput = document.querySelector(".chatInput");

if(postProductButton){
    postProductButton.addEventListener('click', (e) => {
        e.preventDefault();
        //HERE: data validation
        const sendObject = {}
        Array.from(productForm.children).forEach((ch) => {
            if(ch.tagName === "INPUT"){
                sendObject[ch.name] = ch.value;
            }
        });
        console.log(sendObject);
    })
}

if(chatInputButton){
    chatInputButton.addEventListener('click', (e) => {
        e.preventDefault();
        //HERE: data validation
        const sendObject = {}
        sendObject["user"] = chatUser.value;
        sendObject["msg"] = chatInput.value;
        sendObject["date"] = new Date();
        console.log(sendObject);
    })
}