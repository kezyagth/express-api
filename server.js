const express =require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
//panggil library mongo
const mongoose = require("mongoose");

//connect db ke mongo
mongoose.connect('mongodb://localhost/belajarmongo');
//bikin model untuk collection person
const PersonModel = mongoose.model("person",{
    firstname: String,
    lastname: String
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/',(req, res) => res.send('Hello World'))

app.get('/hello', function(req, res){ //req itu request, res itu response
    const respon = {
        statusCode: 200,
        error: "",
        message: 'hello json'
    }
    res.json(respon);
})

app.post('/profile', function(req, res){
    console.log(req.body);
    const respon = {
        statusCode : 200,
        error : "",
        content : req.body
    }
    res.json(respon);
})

app.post('/create', async (req, res) =>{
    //Do something here
    console.log(req.body)
    var person = new PersonModel(req.body);
    var result = await person.save();
    const response = {
        statusCode : 200,
        error: "",
        message: "create Person",
        content: result
    }
    res.json(response);
})

app.get('/list', async (req, res) => {
    var person = await PersonModel.find().exec();
    const response = {
        statusCode : 200,
        error: "",
        message: "List Person",
        content: person
    }
    res.json(response);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!` ))