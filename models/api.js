const { readFile } = require("fs/promises");

exports.readEndpoints = () => {
  return readFile("./endpoints.json", "utf8").then((fileContents) => {
    return JSON.parse(fileContents);
  });
};
