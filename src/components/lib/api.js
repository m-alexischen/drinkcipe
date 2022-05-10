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

async function dataFetchHandler(url, params, errorMessage, fn) {
    const response = await fetch(url, params);
    
    let data = {};

    if (response.status === 200) {
        data = await response.json();
    } else {
        data = await response.text();
    };

    if (!response.ok) {
        if (!errorMessage) {
            errorMessage = 'Could not fetch data.'
        }
        console.log(data.message || errorMessage);
    };
    
    if (fn !== undefined) {
        fn(data);
    }

    return data;
};

//prefix
export async function searchUser(input, data, errorMessage, fn) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/user/name?prefix=${input}`, headerHandler(data, 'GET'), errorMessage, fn);

    return dataOutput;
};

//friends
export async function showRandomBartenders(number, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/user/random/allowedFollowUsers/${number}`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function showFriends(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/friend/`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function friendRequest(toUserId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/friend/invite/userId/${toUserId}`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function checkMyInvites(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/friend/sendInvites`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function cancelRequest(inviteId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/friend/invite/cancel/${inviteId}`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function checkRecivedInvites(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/friend/invites`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function acceptRequest(inviteId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/friend/invite/accept/${inviteId}`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function rejectRequest(inviteId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/friend/invite/reject/${inviteId}`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function deleteFriend(friendId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/friend/${friendId}`, headerHandler(data, 'DELETE'));

    return dataOutput;
};

//share
export async function shareRecipe(recipeId, toUserId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/share/recipe/${recipeId}/toUser/${toUserId}`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function checkRecivedShare(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/share/user`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function acceptShare(shardId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/share/${shardId}/accept`, headerHandler(data, 'PUT'));

    return dataOutput;
};

//authentication
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

//user
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

//items of recipe
export async function addItemToForm(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/items/recipe/${recipeId}`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function addItemsToForm(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/items/recipe/${recipeId}/bulk`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function editItemsInForm(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/items/recipe/${recipeId}/bulk`, headerHandler(data, 'PUT'));

    return dataOutput;
};

export async function deleteItemFromForm(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/items/recipe/${recipeId}`, headerHandler(data, 'DELETE'));

    return dataOutput;
};

//recipes
export async function addRecipe(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/recipe/`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function editRecipe(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/recipe/`, headerHandler(data, 'PUT'));

    return dataOutput;
};

export async function deleteRecipe(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/recipe/${recipeId}`, headerHandler(data, 'DELETE'));

    return dataOutput;
};

export async function showRandomRecipes(number, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/public/public/random/${number}`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function getAllMyRecipes(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/recipe/`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function getRecipesByUserId(userId, data) {
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

//comments
export async function addComment(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/comment/recipe/${recipeId}`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function editComment(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/comment/recipe/${recipeId}`, headerHandler(data, 'PUT'));

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

//rating
export async function addRating(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/rating/recipe/${recipeId}`, headerHandler(data, 'POST'));

    return dataOutput;
};

export async function editRating(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/rating/recipe/${recipeId}`, headerHandler(data, 'PUT'));

    return dataOutput;
};

export async function deleteRating(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/rating/recipe/${recipeId}`, headerHandler(data, 'DELETE'));

    return dataOutput;
};

export async function getmyRating(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/rating/recipe/${recipeId}`, headerHandler(data, 'GET'));

    return dataOutput;
};

export async function getAllRatings(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/rating/board/recipe/${recipeId}`, headerHandler(data, 'GET'));

    return dataOutput;
};

//image
export async function addUserImage(data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/image/user`, data);

    return dataOutput;
};

export async function addRecipeImage(recipeId, data) {
    const dataOutput = dataFetchHandler(`${LOCAL_HOST}/api/image/recipe/${recipeId}`, data);

    return dataOutput;
};

export async function getImage(imageId, errorMessage) {
    const response = await fetch(`${LOCAL_HOST}/api/public/image/${imageId}`, {
        method: 'GET',
        // headers: {
        //     'Content-Type': 'image/png',
        // },
    });

    let data = {};

    data = await response.blob();
    
    const dataOutput = URL.createObjectURL(data);

    if (!response.ok) {
        if (!errorMessage) {
            errorMessage = 'Could not fetch data.'
        }
        throw new Error(data.message || errorMessage);
    };
    
    return dataOutput;
};