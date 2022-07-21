const fs = require("fs").promises;
const axios = require("./services");
require('dotenv').config();

// const API_KEY = '2b794e84f2a84c6b9af194929221105';
const API_KEY = process.env.API_KEY;

(async () => {
  try {
    const readmeTeplate = await fs.readFile("./README.md.tpl", "utf-8");
    const today = new Date();
    const weather = await fetchWeatherInfo(API_KEY, "cordoba");
    console.log(weather);
    const newTemplate = readmeTeplate
      .replace(
        "{{Date}}",
        `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`
      )
      .replace("{{Temperature}}", weather);

    await fs.writeFile("./README.md", newTemplate);
    console.log("Work finished!");
  } catch (error) {
    console.error(`API_KEY could not be read - value: ${API_KEY}`);
  }
})();

const fetchWeatherInfo = async (key, city) => {
  try {
    const response = await axios.get("v1/current.json", {
      params: {
        key: key,
        q: city,
        aqi: "yes",
      },
    });
    const { location, current } = response.data;
    return `Location: ${location.name} - Temperature: ${current.temp_c}ºC`;
  } catch (error) {
    console.log(error);
    return "";
  }
};
