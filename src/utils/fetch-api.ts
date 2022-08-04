export async function fetchAPI(endpoint) {
    try {
        const res = await fetch(endpoint);
        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error('Erro ao consumir API');
    }
}