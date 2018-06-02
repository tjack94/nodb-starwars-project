var express = require('express')
var bodyParser = require('body-parser')
var pc = require('./planetController')
var cors = require('cors')
var vc = require('./visitedController')


var app = express()
app.use(cors())
app.use(bodyParser.json())
app.use( express.static( __dirname + '/../public/build' ) );

app.get("/planets", pc.read)
app.get('/visited', vc.read)
app.post('/visited', vc.post)
app.patch('/visited/:index', vc.update)
app.delete('/visited/:index', vc.delete)

var port = 3002
app.listen(port, ()=> {console.log(`Listening on port ${port}`)})