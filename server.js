"use strict"
const express= require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
// require and use "multer"...
var upload = multer();
app.use(multer({dest:'./uploads/'}).single('file'));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

// Upload The File and return file details
app.post('/submit', upload.single('file'), function(req, res){
  upload(req,res,function(err) {
         if (err) {
    return res.end("Error Uploading File"); 
  }
  res.end("File is uploaded"); 
  res.json({ "name":upload.originalname, "type": upload.mimetype,"size":upload.size});
  });

  
app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
})});
