const protocol = "http";
const ip = "192.168.20.114";
const port = "8000";
const basePrefix = "/api/";
import {
    drinkInfoRoute,
    getIngredientsRoute,
    searchByIngredientsRoute,
} from "./routes";
const baseRoute = protocol + "://" + ip + ":" + port + basePrefix;

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
        console.log(baseRoute + getIngredientsRoute);
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
};
