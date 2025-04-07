import { URL } from "./connection";

export const retrievePosts = async () => {
    const response = await fetch(`${URL}/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();

};

export const createPost = async () => {
    const response = await fetch(`${URL}/posts`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    return response.json();
};

export const updatePost = async (id, body) => {
    const response = await fetch(`${URL}/posts/${id}?_method=PATCH`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),

    });
    return response.json();
}

export const deletePost = async (id) => {
    const response = await fetch(`${URL}/posts/${id}?_method=DELETE`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },

    });
    return response.json();
}
