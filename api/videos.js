import { URL } from "./connection";


export const retrieveVideos = async () => {
    const response = await fetch(`${URL}/video`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    return response.json();
};


export const createVideos = async (video) => {
    const response = await fetch(`${URL}/video`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
    });
    return response.json();
};

export const updateVideos = async (video) => {
  
    const response = await fetch(`${URL}/video/${video.id}?_method=PATCH`, {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),  
    });

    return response.json();
};


export const deleteVideos = async (id) => {
    const response = await fetch(`${URL}/video/${id}?_method=DELETE`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};