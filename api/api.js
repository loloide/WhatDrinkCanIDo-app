const protocol = "http";
const ip = "192.168.20.114";
const port = "8000";
// const domain = "what-drink-can-i-do-api.vercel.app";
// const basePrefix = "/api/";
import drinks from "./drinks.json";
import ingredients from "./ingredients.json";
import names from "./names.json";
// import {
//     drinkInfoRoute,
//     getIngredientsRoute,
//     randomDrinkRoute,
//     searchByIngredientsRoute,
//     searchByNameRoute,
// } from "./routes";
// const baseRoute = protocol + "://" + ip + ":" + port + basePrefix;
const staticRoute = protocol + "://" + ip + ":" + port;
// function parseJSON(response) {
//     if (response.status === 204 || response.status === 205) {
//         return null;
//     }
//     return response.json();
// }

// function checkStatus(response) {
//     if (response.status >= 200 && response.status < 300) {
//         return response;
//     }

//     const error = new Error(response.statusText);
//     error.response = response;
//     throw error;
// }

// async function request(url, contentType, method, body) {
//     let newHeaders = contentType;

//     const response = await fetch(url, {
//         headers: newHeaders,
//         method,
//         body: body,
//     })
//         .then(checkStatus)
//         .then(parseJSON)
//         .catch((err) => {
//             console.log("Request error: ", JSON.stringify(err));
//         });
//     return response;
// }

function searchCocktails(cocktails, query) {
    // Normalize query to lowercase for case-insensitive comparison
    const lowerCaseQuery = query.toLowerCase();

    // Filter the cocktails array based on the query
    return drinks.filter((cocktail) =>
        cocktail.strDrink.toLowerCase().includes(lowerCaseQuery)
    );
}

export const api = {
    getDrinkInfo: (id) => {
        return drinks[id];
    },
    getIngredients: () => {
        return ingredients;
    },
    searchDrinksByIngreditents: (QueryIngredients) => {
        QueryIngredients = QueryIngredients.split(",");

        var i = 1;
        var res = [];
        for (let drink of drinks) {
            let add = true;
            i = 1;
            while (add == true && i < 16) {
                var ing = "strIngredient" + i;
                if (drink[ing] == "") {
                    break;
                }
                if (!QueryIngredients.includes(drink[ing])) {
                    add = false;
                    break;
                }
                i = i + 1;
            }
            if (add) {
                res.push(drink);
            }
        }
        return res;
    },
    searchDrinksByName: (query) => {
        if (query == "") {
            return drinks;
        } else {
            var res = [];

            for (var drink of drinks) {
                if (
                    drink.strDrink.toLowerCase().includes(query.toLowerCase())
                ) {
                    res.push(drink);
                }
            }

            return res;
        }
    },
    getImageUrl: (url) => {
        return staticRoute + url;
    },
};
