var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');
var config = require('./config');
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('public'))

var visual_recognition = new VisualRecognitionV3({
  version: '2018-03-19',
  url: "https://gateway.watsonplatform.net/visual-recognition/api",
  iam_apikey: "mPCrleVnOXtSDUfYhJhSXPzmjXrYoGMjvM3-5S_fX6BG",
  api_key: config.iam_apikey,
});

// var images_file= fs.createReadStream('./c8.jpg');
var classifier_ids = ["MarvelVsDC_1636684056"];
var threshold = 0.49;

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // allow request from all origin
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
});

app.post('/', bodyParser.json(), (req, res) => {
        const { image } = req.body
        if (image) {
                var params = {
                        url: image,
                        classifier_ids: classifier_ids,
                        threshold: threshold
                };
                
                visual_recognition.classify(params, function(err, response) {
                        if (err)
                        console.log(err);
                        else
                                res.send(JSON.stringify(response));
                });
        } else {
                res.status(403).send({
                error: 'Please provide an image'
                })
        }
});

app.listen(config.port, () => {
        console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})