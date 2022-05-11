const fs = require("fs").promises;

(async () => {
const readmeTeplate = await fs.readFile("./README.md.tpl", "utf-8");
const today = new Date();
const newTemplate = readmeTeplate.replace('{{Date}}',`${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`);
await fs.writeFile('./README.md', newTemplate);
})();

