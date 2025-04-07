import { URL } from "./connection";

export const retrievePostsComments = async () => {
    const response = await fetch(`${URL}/postscomment`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const createPostComment = async (comment) => {
    const response = await fetch(`${URL}/postcomment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    return response.json();
};

export const updatePostComment = async (id, comment) => {
    const response = await fetch(`${URL}/postcomment/${id}?_method=PATCH`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    return response.json();
};

export const deletePostComment = async (id) => {
    const response = await fetch(`${URL}/postcomment/${id}?_method=DELETE`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};