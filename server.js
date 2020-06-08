const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect(
    'mongodb+srv://admin:abc123!@blog-qcoje.mongodb.net/contacts?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Db connected");
    })
    .catch(err => console.log(err))

//init middlware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
});

app.use(function (error, req, res, next) {
    if(error instanceof SyntaxError) {
      return res.status(500).send({data : "Invalid data"});
    } else {
      next();
    }
});


//api routes
app.use('/api', require('./routes/api'))

app.listen(PORT, ()=> {
})

    console.log(`App is running on port:${PORT}`);