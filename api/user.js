import { URL } from "./connection";


export const retrieveUser = async () => {
    const response = await fetch(`${URL}/user`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    });
    
    return response.json();
};

export const createUser = async (user) => {
    const response = await fetch(`${URL}/user`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return response.json();
};

export const updateUser = async (user) => {
    const response = await fetch(`${URL}/user/${id}?_method=PATCH`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`${URL}/user/${id}?_method=DELETE`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};
