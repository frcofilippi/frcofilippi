const fs = require("fs").promises;
const axios = require("./services");

const API_KEY = process.env.API_K;

(async () => {
  try {
    const readmeTeplate = await fs.readFile("./README.md.tpl", "utf-8");
    const today = new Date();
    const weather = await fetchWeatherInfo(API_KEY, "cordoba");
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
    const { location, current } = rsponse.data;
    return `Location: ${location.name} - Temperature: ${current.temp_c}ºC`;
  } catch (error) {
    return "";
  }
};
