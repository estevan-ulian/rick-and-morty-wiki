import { MY_GITHUB } from "../data/constants";
import { AiFillGithub } from 'react-icons/ai';
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="fixed bottom-0 flex items-center justify-center w-full py-4 bg-gradient-to-r from-slate-900 to-slate-800">
                <div className="w-full flex justify-center items-center">
                    <Link href={MY_GITHUB}>
                        <a target='_blank' className="text-white items-center gap-2 flex transition-all duration-300 hover:scale-105"><AiFillGithub className="text-white" />Estevan Ulian</a>
                    </Link>
                </div>
            </footer>
        </>
    )
}