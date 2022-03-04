var express = require('express');
const res = require('express/lib/response');
require('dotenv').config();
var app = express();
let bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });
 
  app.use('/public',express.static(__dirname + "/public"));


  app.get("/json", (req, res) => {
    if(process.env.MESSAGE_STYLE === "uppercase"){
      res.json({"message": "HELLO JSON"})
    }else{
      res.json({"message": "Hello json"})
    }
  });

  app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
  }, (req, res) => {
    res.json({"time": req.time});
  })

  app.get('/:word/echo', (req,res) => {
    res.json({'echo': req.params.word});
  })

 app.use(bodyParser.urlencoded({extended: false}));

 app.post('/name',urlencoded({extended: false}), (req, res,next) => {
  let firstName = req.body.first;
  let lastName = req.body.last;
  let age = req.body.age
  res.json({
    firstName: `${firstName}`,
    lastName: `${lastName}`,
    age:`${age}`
  });
});
module.exports = app;