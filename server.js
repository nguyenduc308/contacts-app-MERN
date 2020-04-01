const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path')

mongoose.connect('mongodb://localhost:27017/contacts', {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Db connected");
}).catch(err => console.log(err))

//template engine
app.set('view engine', 'pug')
app.set('views', './views')
//init middlware
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//api routes
app.use('/api', require('./routes/api'))

app.listen(PORT, ()=> {
    console.log(`App is running on port:${PORT}`);
})
