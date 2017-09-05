var express = require('express');
var request = require('request');
var app = express();
var names = require('./names.json');

app.set('port', (process.env.PORT || 5000));

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

retrieve();

app.get('/', function (req, res) {
  res.send(data)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
