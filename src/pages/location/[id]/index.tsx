import Head from "next/head";
import CardCharacter from "../../../components/CardCharacter";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { LOCATION_ENDPOINT, SITE_TITLE } from "../../../data/constants";
import { fetchAPI } from "../../../utils/fetch-api";
import { fetcherArrayUrls } from "../../../utils/fetcher-array-urls";
import { handleDimension, handleType } from "../../../utils/handle-info-strings";

export default function LocationByID({ location, residents }) {
    
    const metaTitle = `${location.name} - ${SITE_TITLE}`

    return (
        <>  
            <Head>
                <title>{metaTitle}</title>
            </Head>
            <Navbar />
            <section className="w-full my-10">
                <div className="w-full max-w-screen-xl mx-auto flex flex-col items-center justify-center gap-4">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 text-center">{location.name}</h1>
                    <div className="w-full flex justify-center flex-wrap gap-3">
                        <span className={`text-slate-800 capitalize ${location.dimension ? 'block' : 'hidden'}`}><strong>Dimensão:</strong> {handleDimension(location.dimension)}</span>
                        <span className={`text-slate-800 capitalize ${location.type ? 'block' : 'hidden'}`}><strong>Tipo:</strong> {handleType(location.type)}</span>
                    </div>                  
                </div>
            </section>
            <hr />
            <section className={`my-10 w-full ${residents.length < 1 && 'hidden'}`}>                
                <div className="w-full flex flex-col justify-center items-center mb-10">
                    <h2 className="text-3xl font-medium text-slate-800 text-center">{residents.length} {residents.length > 1 ? 'personagens vistos em' : 'personagem visto em'}  <span className="font-light">{location.name}</span></h2>
                </div>  
                <div className={`flex flex-wrap gap-4 justify-center w-full mx-auto px-2`}>
                    <CardCharacter results={residents} />
                </div>
            </section>
            <Footer />
        </>
    )
}

export async function getStaticPaths() {
    const data = await fetchAPI(LOCATION_ENDPOINT);

    const paths = data.results.map(data => ({
        params: { id: data.id.toString() }
    }));

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;
    const location = await fetchAPI(`${LOCATION_ENDPOINT}/${id}`);
    const residents = await fetcherArrayUrls(location.residents);

    return {
        props: { location, residents },
    }
}