import mongoose from "mongoose";

const URL =  "mongodb+srv://zagador123:446032@cluster0.snysn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conectado!"))
.catch((err) => console.log(err))
