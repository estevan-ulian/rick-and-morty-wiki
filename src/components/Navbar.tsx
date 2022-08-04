import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function Navbar() {
    return (
        <>
            <header className="w-full flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 py-1 h-20">
                <Container>
                    <div className="w-1/5 flex items-center relative">
                        <Link href="/">
                            <a className="flex h-auto w-4/5">
                                <Image src='/images/rick-and-morty-logo.png' alt="rick and morty" width={267} height={104} />
                            </a>
                        </Link>
                    </div>
                    <nav className="w-4/5 flex items-center">
                        <ul className="w-full flex items-center justify-end gap-3">
                            <li><Link href="/"><a className="text-white font-bold px-3 py-2 border-b border-transparent transition-all duration-300 hover:border-b-2 hover:border-[#b2df28]">Personagens</a></Link></li>
                            <li><Link href="/episode"><a className="text-white font-bold px-3 py-2 border-b border-transparent transition-all duration-300 hover:border-b-2 hover:border-[#b2df28]">Episódios</a></Link></li>
                            <li><Link href="/location"><a className="text-white font-bold px-3 py-2 border-b border-transparent transition-all duration-300 hover:border-b-2 hover:border-[#b2df28]">Localidades</a></Link></li>
                            <li><Link href="/creditos"><a className="text-white font-bold px-3 py-2 border-b border-transparent transition-all duration-300 hover:border-b-2 hover:border-[#b2df28]">Créditos</a></Link></li>
                        </ul>
                    </nav>
                </Container>
            </header>
        </>
    )
}