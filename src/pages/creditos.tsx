import Head from "next/head";
import Link from "next/link";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import { SITE_TITLE } from "../data/constants";

export default function Creditos() {
  const metaTitle = `Créditos - ${SITE_TITLE}`;
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
      </Head>
      <Navbar />
      <Section>
        <Container>
          <div className="w-full flex flex-col gap-4 items-center justify-center mt-20">
            <h1 className="text-slate-700 text-4xl font-bold">Créditos</h1>
            <h2 className="text-slate-800">
              Rick and Morty API -{" "}
              <Link
                href="https://rickandmortyapi.com/about"
                className="text-slate-500 hover:text-slate-700 font-bold"
                target="_blank"
              >
                Axel Fuhrmann
              </Link>
            </h2>
            <h2 className="text-slate-800">
              NextJS -{" "}
              <Link
                href="https://nextjs.org/"
                className="text-slate-500 hover:text-slate-700 font-bold"
                target="_blank"
              >
                Vercel
              </Link>
            </h2>
            <h2 className="text-slate-800">
              Desenvolvimento FrontEnd -{" "}
              <Link
                href="https://github.com/estevan-ulian/"
                className="text-slate-500 hover:text-slate-700 font-bold"
                target="_blank"
              >
                Estevan Ulian
              </Link>
            </h2>
          </div>
        </Container>
      </Section>
      <Footer />
    </>
  );
}
