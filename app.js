const express = require("express");
const path = require("path");
const axios = require("axios");
const sassMiddleware = require("node-sass-middleware");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: false,
    sourceMap: true,
  })
);
app.use("/images", express.static(process.cwd() + "/images"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const url = "https://restcountries.com/v3.1/all";
const variables = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
let allData;

(async () => {
  const response = await axios(url);
  allData = response.data;
})();

app.get("/country/:countryName", (req, res) => {
  let borders = [];
  const countryName = req.params.countryName;
  const country = allData.find((c) => c.name.official === countryName);
  if (country.borders) {
    for (eachCountry of country.borders) {
      let border = allData.find((c) => c.fifa === eachCountry);
      if (border !== undefined) {
        borders.push(border.name.official);
      }
    }
  }
  const currencyKey = Object.keys(country.currencies)[0];
  const nativeKey = Object.keys(country.name.nativeName)[0];
  const currency = country.currencies[currencyKey].name;
  const nativeName = country.name.nativeName[nativeKey].official;
  res.render("country", {
    country: country,
    currency: currency,
    nativeName: nativeName,
    borders: borders,
  });
});

app.get("/", (req, res) => {
  res.render("index", { regions: variables, alls: allData });
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
