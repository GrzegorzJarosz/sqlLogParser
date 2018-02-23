const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const parseFile = require('./parsmod/parser');

//port number
const port = process.env.PORT || 3000;

//app
const app = express();

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body-parser
app.use(bodyParser.json());

//cors
app.use(cors());

//index route
app.post('/api', (req, res) => {
	let item = req.body.item;

	let odp = parseFile.parseFile(item);
	//console.log(odp);
  res.json(odp);
});




//tst
app.post('/api/test', (req, res) => {
	let item = req.body.item;

  res.json(item);
});




app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'public/index.html'));
});

//start server
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
