var express = require('express');
var router = express.Router();

const cheerio = require('cheerio');
const request = require('request');
const Iconv = require('iconv').Iconv;
const iconv = new Iconv('CP949', 'utf-8//translit//ignore');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/getResource", function (req, res, next) {
  let resultArr = {
    btv: {
      movie: [],
      etc: [],
    },
    ollehtv: {
      movie: [],
      etc: [],
    }
  };
  let sktMovieVodUrl = "http://skbroadband.com/content/vod/Vod_List.do?depth1_menu=105";
  let sktEtcVodUrl = "http://skbroadband.com/content/vod/Vod_List.do?depth1_menu=105";

  request({ url: sktMovieVodUrl, encoding: null }, function (error, response, body) {
    let htmlDoc = iconv.convert(body).toString();
    const $ = cheerio.load(htmlDoc);
    let colArr = $(".movie_front");
    for (let i = 0; i < colArr.length; i++) {
      resultArr.btv.movie.push({ src: colArr[i].children[3].attribs.src, title: colArr[i].children[3].attribs.alt});
    }

    res.json(resultArr)
  });
})

module.exports = router;
