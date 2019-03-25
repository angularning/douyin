var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');
var md5 = require('md5');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var https = require("https");
var iconv = require("iconv-lite");
var url="https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appid+"&secret="+secret+"&code="+code+"&grant_type=authorization_code";
https.get(url, function (res) {
    var datas = [];
    var size = 0;
    res.on('data', function (data) {
        datas.push(data);
        size += data.length;
        //process.stdout.write(data);
    });
    res.on("end", function () {
        var buff = Buffer.concat(datas, size);
        var result = iconv.decode(buff, "utf8");//转码//var result = buff.toString();//不需要转编码,直接tostring
        console.log(result);
    });
}).on("error", function (err) {
    Logger.error(err.stack)
    callback.apply(null);
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
            res.send(parsedBody)
        })
        .catch(function (err) {
            // POST failed...
        });


  // res.render('index', { title: 'Express' });
});

function generateRandom() {
   var c = Math.random().toString(10).substring(2)
    return c
}
module.exports = router;
