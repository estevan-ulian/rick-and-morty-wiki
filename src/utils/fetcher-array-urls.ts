export async function fetcherArrayUrls(urls) {
    try {
        const res = await Promise.all(urls.map(u => fetch(u)));
        const data = await Promise.all(res.map(r => r.json()));
        return data;
    } catch (e) {
        throw new Error('Erro ao consumir API');
    }    
}