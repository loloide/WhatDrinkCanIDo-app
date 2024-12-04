const protocol = "http";
const ip = "192.168.20.114";
const port = "8000";
const basePrefix = "/api/";
import {
    drinkInfoRoute,
    getIngredientsRoute,
    randomDrinkRoute,
    searchByIngredientsRoute,
    searchByNameRoute
} from "./routes";
const baseRoute = protocol + "://" + ip + ":" + port + basePrefix;
const staticRoute = protocol + "://" + ip + ":" + port;
function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

async function request(url, contentType, method, body) {
    let newHeaders = contentType;

    const response = await fetch(url, {
        headers: newHeaders,
        method,
        body: body,
    })
        .then(checkStatus)
        .then(parseJSON)
        .catch((err) => {
            console.log("Request error: ", JSON.stringify(err));
        });
    return response;
}

export const api = {
    getDrinkInfo: (id) => {
        return request(
            baseRoute + drinkInfoRoute + id,
            { "Content-Type": "application/json" },
            "GET"
        );
    },
    getIngredients: () => {
        return request(
            baseRoute + getIngredientsRoute,
            { "Content-Type": "application/json" },
            "GET"
        );
    },
    searchDrinksByIngreditents: (ingredients) => {
        return request(
            baseRoute + searchByIngredientsRoute + ingredients,
            { "Content-Type": "application/json" },
            "GET"
        );
    },
    searchDrinksByName: (query) => {
        return request(
            baseRoute + searchByNameRoute + query,
            { "Content-Type": "application/json" },
            "GET"
        )
    },
    getImageUrl: (url) => {
        return staticRoute + url
    },
    getRandomDrink: () => {
        return request(
            baseRoute + randomDrinkRoute,
            { "Content-Type": "application/json" },
            "GET"
        )
    }
};
