const fs = require("fs").promises;
const axios = require("./services");

(async () => {
  const response = await axios.get('v1/current.json',{
    params: {
      key: process.env.API_KEY,
    // key: '2b794e84f2a84c6b9af194929221105',
      q: "Cordoba",
      aqi: "yes",
    },
  });

  const {location, current} = response.data

  const readmeTeplate = await fs.readFile("./README.md.tpl", "utf-8");
  const today = new Date();
  const newTemplate = readmeTeplate.replace(
    "{{Date}}",
    `${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`
  ).replace('{{Temperature}}', `Location: ${location.name} - Temperature: ${current.temp_c}ºC`);
  await fs.writeFile("./README.md", newTemplate);
})();
