const baseURL = import.meta.env.VITE_API_URL_BASE;

export const UseFetchWithoutToken = async (endpoint: string, method = "GET", data: unknown) => {
    const url = `${baseURL}/${endpoint}`;
    let response;

    if (method === "GET") {
        response = await fetch(url, {
            method,
        });
    }

    if (method === "POST") {
        response = await fetch(url, {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        });
    }

    if (!response) {
        throw new Error('No response received from the server');
    }
    const result = await response.json();

    return result;
};


export const UseFetchWithToken = async (endpoint : string, method = "GET", token : string | null, data : unknown) => {
    const url = `${baseURL}/${endpoint}`;
    let response;

    if (method === "GET") {
        response = await fetch(url, {
            method,
            headers: token ? {
                Authorization : token
            } : {}
        });
    }

    if (method === "POST") {
        response = await fetch(url, {
            method,
            body: data ? JSON.stringify(data) : null,
            headers: token ? {
                "Content-type": "application/json",
                Authorization : token
            } : {
                "Content-type": "application/json",
            }
        });
    }

    if (!response) {
        throw new Error('No response received from the server');
    }
    const result = await response.json();

    return result;
};