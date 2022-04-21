const LOCAL_HOST = 'http://localhost:8080';

const headerHandler = (data, method) => {
    const token = localStorage.getItem('token');

    return {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    }
};

async function dataFetchHandler(url, params, errorMessage) {
    const response = await fetch(url, params);
    const data = await response.json();

    if (!response.ok) {
        if (!errorMessage) {
            errorMessage = 'Could not fetch data.'
        }
        throw new Error(data.message || errorMessage);
    };
    
    return data;
};

export async function showRandomRecipes(number, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/public/public/random/${number}`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function login(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/auth/signin`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function signup(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/auth/signup`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function refreshTokenAPI(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/auth/refreshtoken`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function userProfile(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/user/data`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function passwordUpdate(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/user/password`, headerHandler(data, 'PUT'));

    return dataOutput;
};

export async function dataUpdate(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/user/data`, headerHandler(data, 'PUT'));

    return dataOutput;
};

export async function addItemToForm(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/items/recipe/${recipeId}`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function addItemsToForm(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/items/recipe/${recipeId}/bulk`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function addRecipe(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/recipe/`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function getAllMyRecipes(data) {
    const userId = localStorage.getItem('userId');
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/recipe/user/${userId}`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function getItemsOfRecipe(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/items/recipe/${recipeId}`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function getSingleRecipe(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/recipe/${recipeId}`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function addComment(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/comment/recipe/${recipeId}`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function deleteComment(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/comment/recipe/${recipeId}`, headerHandler(data, 'DELETE'));

    return dataOutput;
};

export async function getAllComments(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/comment/recipe/${recipeId}`, headerHandler(data, 'GET'));

    return dataOutput;
};