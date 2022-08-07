export async function fetchAPI(endpoint) {
    try {
        const res = await fetch(endpoint, {
            headers: {
                Accept: 'application/json'
            },
        });
        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error('Erro ao consumir API');
    }
}