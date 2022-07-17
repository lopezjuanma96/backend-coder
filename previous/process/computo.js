const calculo = () => {
    let sum = 0;
    for (let i = 0; i < 6e9; i++) {
        sum += i
    }
    return sum;
}

process.on('message', (msg) => { // expects messages from parent/global process/server
    if(msg === 'start'){
        console.log('child process received START');
        const result = calculo();
        process.send(result)
    }
})