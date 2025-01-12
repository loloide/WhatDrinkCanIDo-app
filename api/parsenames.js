const data = require("./drinks.json");
var fs = require("fs");
var names = [];

for (let drink of data) {
    names.push({ name: drink.strDrink, id: drink[""] });
}

fs.writeFile(
    "names.json",
    JSON.stringify(names),
    "utf8",
    function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        }
    }
);

console.log(names);
