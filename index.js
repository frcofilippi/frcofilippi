const fs = require("fs").promises;
const axios = require("./services");

const API_KEY = process.env.API_KEY;

(async () => {
  try {
    const response = await axios.get("v1/current.json", {
      params: {
        key: API_KEY,
        // key: '2b794e84f2a84c6b9af194929221105',
        q: "Cordoba",
        aqi: "yes",
      },
    });
    const { location, current } = response.data;

    const readmeTeplate = await fs.readFile("./README.md.tpl", "utf-8");
    const today = new Date();
    const newTemplate = readmeTeplate
      .replace(
        "{{Date}}",
        `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`
      )
      .replace(
        "{{Temperature}}",
        `Location: ${location.name} - Temperature: ${current.temp_c}ºC`
      );
    await fs.writeFile("./README.md", newTemplate);
  } catch (error) {
    console.error(`API_KEY could not be read - value: ${API_KEY}`);
  }
})();
