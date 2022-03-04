// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { urlencoded } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api", (req, res, next) => {
  date = new Date().toUTCString();
  time = new Date().getTime().toString();
  next();
}, (req, res) => {
  res.json({"utc": date,
            "unix": time})
});

app.get("/api/", (req, res, next) => {
  res.sendDate(__dirname);

  
})

//app.use(urlencoded({extended:false}));

app.get("/api", urlencoded({extended: false}, (req,res, next) => {
  let time = req.body.time;
  res.json({
    "utc": time.toUTCString,
    "unix": time.getTime.toString
  })
}));




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
