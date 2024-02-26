const axios = require("axios");
const express = require("express");
const path = require("path");
const { URLSearchParams } = require("url");
const app = express();
const PORT=process.env.PORT|4000

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'))

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.get("/", (req, res) => {
  // console.log("translator");
  res.render("index", { translation: null, error: null });
});
app.post("/translate", async (req, res) => {
  const { text } = req.body;
  const axios = require("axios");

  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", "en");
  encodedParams.set("target_language", "fr");
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "53ad52c0afmsh1730210c0195cdfp19645cjsnf2826e52d55d",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    res.render("index", {
      translation: response.data.data.translatedText,
      error: null,
    });
  } catch (error) {
    res.render("index", { translation: null, error: "Error fetching text" });
  }
});

app.listen(PORT, () => {
  console.log("server started");
});
