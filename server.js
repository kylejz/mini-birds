var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongo = require('mongojs');

var port = 9001;
var db = mongo('birds', ['sightings']);

var app = express();

app.use(bodyParser.json(), cors())


app.post('/api/sighting?', function(req, res) {
	console.log(000, req.query);
	res.send('cool');
	db.sightings.save(req.query, function(err, data) {console.log(err,data)})
});

app.get('/api/sighting?', function(req,res) {
	console.log(111, req.query);
	db.sightings.find(req.query, function(err, data) {console.log(err, data); res.send(data)})
})

app.put('/api/sighting?', function(req,res) {
	if (!req.query.id) {
		res.status(404).send('send an ID, nerd.')
	} else {
		db.sightings.findAndModify({
			query: {
				_id: mongo.ObjectId(req.query.id)
			},
			update: {
				$set: req.body
			}
		}, function(err, data) {
			if (err) {
				res.status(500).json(err)
			} else {
				res.json(data)
			}
		})
	}
	
})

app.delete('/api/sighting', function(req, res) {
	if (!req.query.id) {
		res.status(404).send('send an ID, nerd.')
	} else {
		db.sightings.remove({
			_id: mongo.ObjectId(req.query.id)
		}, function(err, data) {
			if (err) {
				res.status(500).json(err)
			} else {
				res.json(data)
			}
		})
	}
})

app.listen(port, function() {
	console.log("this app is im" + port + "ant!")
})