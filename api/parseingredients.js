const { parse } = require("path");
const data = require("./drinks.json");
var fs = require("fs");
var parsedIngredients = [];
var ingredients = [];

for (let drink of data) {
    var i = 1;
    while (i < 16) {
        var ing = "strIngredient" + i;

        if (drink[ing] != "" && !parsedIngredients.includes(drink[ing])) {
            parsedIngredients.push(drink[ing]);
        }

        i = i + 1;
    }
}

parsedIngredients.sort();
for (let ingredient of parsedIngredients) {
    ingredients.push({ name: ingredient });
}

fs.writeFile(
    "ings.json",
    JSON.stringify(ingredients),
    "utf8",
    function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        }
    }
);

console.log(ingredients);
