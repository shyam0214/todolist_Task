const fs = require("fs");
const path = require("path");

function writeDataToFile(data, filename = "todoistData.json", folder = "data") {
  const folderPath = path.join(__dirname, "..", folder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, filename);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Data written to ${filePath}`);
  return filePath;
}

module.exports = {writeDataToFile};

