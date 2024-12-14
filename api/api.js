const protocol = "http";
const ip = "192.168.20.114";
const port = "8000";
// const domain = "what-drink-can-i-do-api.vercel.app";
// const basePrefix = "/api/";
import drinks from "./drinks.json";
import ingredients from "./ingredients.json"
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

export const api = {
    getDrinkInfo: (id) => {
        return drinks[id]
    },
    getIngredients: () => {
        return ingredients
    },
    searchDrinksByIngreditents: (QueryIngredients) => {
        QueryIngredients = QueryIngredients.split(",");
        var i = 0;
        var res = [];
        for (let drink of drinks) {
            let add = true;
            for (let ingredient of drink.ingredients) {
                if (!QueryIngredients.includes(ingredient)) {
                    add = false;
                    break;
                }
            }
            if (add) {
                drink["id"] = i;
                res.push(drink);
            }
            i = i + 1;
        }
        return res;
    },
    searchDrinksByName: (query) => {
        console.log(query)
        var i = 0
        var res = []

        for (let drink in drinks) {
            let name = drinks[drink]["name"].toLowerCase()
            //console.log(name)
            if (name.includes(query)) {
                console.log(name)
                drinks[drink]["id"] = i;
                res.push(drinks[drink]);
            }
            i = i + 1
        }
        
        console.log(res)
        return res
    },
    getImageUrl: (url) => {
        return staticRoute + url;
    },
};
