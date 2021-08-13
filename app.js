const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body.city);
  const cityName = req.body.city;

  const place = cityName;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    place +
    "&APPID=" +
    process.env.APP_ID +
    "&units=" +
    unit;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const wData = JSON.parse(data);
      const tempr = wData.main.temp;
      const weatherdesp = wData.weather[0].description;
      const icon = wData.weather[0].icon;

      const img_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1></h1>");

      res.write("<h2>the weather is currently " + weatherdesp + "</h2>");
      res.write("<h2> " + wData.name + " </h2>");
      res.write("<h2>temperature is " + tempr + " degree celcius</h2>");
      res.write("<img src='" + img_url + "' />");

      res.send();
    });
  });
});

app.listen(2000, () => console.log(" sever started at http://localhost:2000"));

/************************************JOKE API********************** */
//const joke = JSON.parse(data)
//            console.log(joke)
//            const img_url = "http://openweathermap.org/img/wn/10d@2x.png";
//    /*         res.write("<img src="+img_url+">") */
//            res.write('<img src="http://openweathermap.org/img/wn/10d@2x.png">')
//            res.write(joke.joke)
//            res.send()
