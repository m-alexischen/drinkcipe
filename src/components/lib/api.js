const LOCAL_HOST = 'http://localhost:8080';

const headerHandler = (data, method) => {
    return {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
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

export async function login(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/auth/signin`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function signup(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/auth/signup`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function getAllRecipes() {
    const data = dataFetchHandler(`${LOCAL_HOST}/recipes.json`);

    const transformedRecipes = [];

    for (const key in data) {
        const recipeObj = {
            id: key,            
            ...data[key],
        };

        transformedRecipes.push(recipeObj);
    }

    return transformedRecipes;
};

export async function getSingleRecipe(recipeId) {
    const data = dataFetchHandler(`${LOCAL_HOST}/recipes/${recipeId}.json`);

    const loadedRecipe = {
        id: recipeId,
        ...data,
    };

    return loadedRecipe;
};

export async function addRecipe(recipeData) {
    dataFetchHandler(`${LOCAL_HOST}/recipes.json`, {
        method: 'POST',
        body: JSON.stringify(recipeData),
        headers: {
        'Content-Type': 'application/json',
        },
    });

    return null;
};

export async function addComment(requestData) {
    const data = dataFetchHandler(`${LOCAL_HOST}/comments/${requestData.recipeId}.json`, {
        method: 'POST',
        body: JSON.stringify(requestData.commentData),
        headers: {
        'Content-Type': 'application/json',
        },
    });

    return { commentId: data.name };
};

export async function getAllComments(recipeId) {
    const data = dataFetchHandler(`${LOCAL_HOST}/comments/${recipeId}.json`);

    const transformedComments = [];

    for (const key in data) {
        const commentObj = {
        id: key,
        ...data[key],
        };

        transformedComments.push(commentObj);
    }

    return transformedComments;
};