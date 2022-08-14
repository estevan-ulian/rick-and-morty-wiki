import axios from "axios";

export const DEFAULT_ENDPOINT = 'https://rickandmortyapi.com/api';

export const api = axios.create({
    baseURL: DEFAULT_ENDPOINT,
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
    },
    responseType: 'json',
});


// Request All Data

export async function getAllCharacters() {
    try {
        const { data } = await api.get('/character');
        return data;
    } catch (err) {
        console.log('Erro na requisição dos Personagens: ', err);
    }
}

export async function getAllEpisodes() {
    try {
        const { data } = await api.get('/episode');
        return data;
    } catch (err) {
        console.log('Erro na requisição dos Episódios: ', err);
    }
}

export async function getAllLocation() {
    try {
        const { data } = await api.get('/location');
        return data;        
    } catch (err) {
        console.log('Erro na requisição das Localidades: ', err);
    }
}

// Request Data By ID

export async function getCharacterById(id) {
    try {
        const { data } = await api.get(`/character/${id}`);
        return data;        
    } catch(err) {
        console.log('Erro na requisição do Personagem (by id): ', err);
    }
}

export async function getEpisodeById(id) {
    try {
        const { data } = await api.get(`/episode/${id}`);
        return data;        
    } catch(err) {
        console.log('Erro na requisição do Episódio (by id): ', err);
    }
}

export async function getLocationById(id) {
    try {
        const { data } = await api.get(`/location/${id}`);
        return data;
    } catch (err) {
        console.log('Erro na requisição da Location (by id): ', err);        
    }
}

export async function getDataFromArrayOfUrls(urls: string[]) {
    try {
        const data =  await axios.all(urls.map(url => axios.get(url)))
            .then(axios.spread((...res) => (
                res.map(({ data }) => {
                    return data;
                })
            )));
        return data;
    } catch (err) {
        console.log('Erro na requisição das API`s: ', err);
    }
}