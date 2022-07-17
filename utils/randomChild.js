export const compute = (nums, max) => {
    const counts = {};
    var eachNum;
    for(let i=0; i<nums; i++){
        eachNum = Math.floor(Math.random() * max);
        if (counts[`${eachNum}`]) counts[`${eachNum}`]++;
        else counts[`${eachNum}`] = 1;
    }
    return counts;
}

process.on('message', (msg) => {
    const msgParts = msg.split(",");
    if (msgParts[0] === 'start') {
        const result = compute(parseInt(msgParts[1]), parseInt(msgParts[2]));
        process.send(result);
    }
})