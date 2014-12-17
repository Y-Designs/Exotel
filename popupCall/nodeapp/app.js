var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendfile('index.html');
});


//For handling Exotel get request
app.get('/calling', function(req, res){
	var CallDetails = {
		CallSid : req.query.CallSid,
		From : req.query.From,
		To : req.query.To,
		Direction : req.query.Direction,
		DialCallDuration : req.query.DialCallDuration,
		StartTime : req.query.StartTime,
		EndTime : req.query.EndTime,
		CallType : req.query.CallType,
		Digits : req.query.Digits,
		RecordingUrl : req.query.RecordingUrl
	};

	//Processing incoming call
	if(CallDetails.Direction === "incoming") {
		//CallDetails can be saved in application knowledgebase for call reference
		io.emit("call alert", CallDetails);
		res.json({ status : "success"});
	} else {
		res.json({ status : "error", message : "Not a incoming call."});
	}
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
