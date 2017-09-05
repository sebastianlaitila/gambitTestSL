var express = require('express');
var request = require('request');
var app = express();

var router = express.Router();
app.use(router);
app.set('port', (process.env.PORT || 5000));

var names = require('./names.json');

var data = {
  "time": new Date()
}

function retrieve(){
  request('http://tuftuf.gambitlabs.fi/feed.txt', function(error, response, body){
    var requestArray = body.split('\n');
    data["time"] = new Date(requestArray[0]);
    console.log(data["time"]);
    for(var i = 1;i<requestArray.length;i++)
    {
      var item = requestArray[i].split(':');
        data[item[0]]=item[1];
    }
    console.log(data);
  });
}

//get everything
retrieve();

//Update the data hourly
setInterval(retrieve, 1000*60*60);

app.use('/', express.static('public'))


router.get('/api/registers/', function (req, res) {

try{
  var response = [];
  var start = parseInt(req.query.startIndex)
  var amount = parseInt(req.query.count)
  for(var i = start;i< start+amount;i++){
    response.push(dataItem(i));
  }

  res.send(response);
}
catch(e){
  console.log(e);
  res.send(null)}

})

router.get('/api/register/:register', function (req, res) {
  try
  {
    var reg = parseInt(req.params.register);
    res.send(dataItem(reg));
  }
  catch(e)
  {res.send(null)}
})

router.get('/api/search/:part', function (req, res) {
  var part = req.params.part.toLowerCase();
  var response = [];
  for(var n in names){
    if(names[n].toLowerCase().includes(part))
    response.push(dataItem(n));
  }
  res.send(response);
})

function dataItem(index){
  return {Time: data["time"], Register: index, Name: names[index], Value: data[index]};
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
