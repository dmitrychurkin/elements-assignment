export const api = (input: RequestInfo, init = getDefaultApiSettings()) => {
    return fetch(input, init);
};

function getDefaultApiSettings(): RequestInit {
    return {
        mode: 'cors'
    };
}
