class Singleton{
    constructor(){
        val = Math.random()
    }

    getValue(){
        return this.val;
    }

    static getInstance(){
        if(!this.instance){
            instance = new Singleton();
        } else {
            return this.instance;
        }
    }
}

module.exports = {Singleton}