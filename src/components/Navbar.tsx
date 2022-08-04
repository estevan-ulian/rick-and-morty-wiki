import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "./Container";
import ToggleMenu from "./ToggleMenu";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(open) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'unset';
        }

    }, [open])

    function handleToggleMenu() {
        setOpen(!open);
    }

    return (
        <>
            <header className="w-full flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 h-24 relative">
                <Container>
                    <div className="w-2/5 lg:w-1/5 flex items-center relative">
                        <Link href="/">
                            <a className="flex relative w-2/3 lg:w-4/5">
                                <Image src='/images/rick-and-morty-logo.png' alt="rick and morty" width={267} height={104} />
                            </a>
                        </Link>
                    </div>
                    <ToggleMenu open={open} onClick={() => handleToggleMenu()} />
                    <nav className={`lg:w-4/5 absolute lg:static top-24 px-2 z-10 w-full h-[calc(100vh-96px)] lg:h-auto flex flex-col lg:flex-row gap-10 lg:gap-2 items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 lg:bg-gradient-to-r lg:from-transparent lg:to-transparent transition-all duration-300 ease-in-out ${open ? 'left-0' : 'left-[-100%]'}`}>
                        <ul className="w-full flex flex-col lg:flex-row items-center justify-end gap-10 lg:gap-3">
                            <li><Link href="/"><a onClick={() => setOpen(false)} className="text-4xl lg:text-base font-light text-white lg:font-bold px-3 py-2 border-b border-transparent transition-all duration-300 hover:border-b-2 hover:border-[#b2df28]">Personagens</a></Link></li>
                            <li><Link href="/episode"><a onClick={() => setOpen(false)} className="text-4xl lg:text-base font-light text-white lg:font-bold px-3 py-2 border-b border-transparent transition-all duration-300 hover:border-b-2 hover:border-[#b2df28]">Episódios</a></Link></li>
                            <li><Link href="/location"><a onClick={() => setOpen(false)} className="text-4xl lg:text-base font-light text-white lg:font-bold px-3 py-2 border-b border-transparent transition-all duration-300 hover:border-b-2 hover:border-[#b2df28]">Localidades</a></Link></li>
                            <li><Link href="/creditos"><a onClick={() => setOpen(false)} className="text-4xl lg:text-base font-light text-white lg:font-bold px-3 py-2 border-b border-transparent transition-all duration-300 hover:border-b-2 hover:border-[#b2df28]">Créditos</a></Link></li>
                        </ul>
                    </nav>

                </Container>
            </header>
        </>
    )
}