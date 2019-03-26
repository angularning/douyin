var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');
var md5 = require('md5');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/test', function(req, res, next) {
    var r = generateRandom().toString();
    var url=req.query.url;
    var parseTempStr = req.query.url + '@&^' + r;
    var parseStr = generateStr(parseTempStr);
    function generateStr(str) {
        var hash = md5(str);
        return hash
    }
    var options = {
        method: 'POST',
        uri: 'https://dy.kukutool.com/douyin',
        body: {"sourceURL":url,"e":parseStr,"r":r},
        json: true // Automatically stringifies the body to JSON
    };

    rp(options)
        .then(function (parsedBody) {
            // POST succeeded...
            res.send(parsedBody);
        })
        .catch(function (err) {
            // POST failed...
            res.send(err);

        });


  // res.render('index', { title: 'Express' });
});

function generateRandom() {
   var c = Math.random().toString(10).substring(2)
    return c
}
module.exports = router;
