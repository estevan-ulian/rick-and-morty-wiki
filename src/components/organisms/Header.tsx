import Image from "next/image";
import Navbar from "../molecules/Navbar";

const Header = () => {
  return (
    <header className="bg-gradient-to-tr from-slate-600 via-slate-700 to-slate-800 w-full min-h-[80px] flex items-center">
      <div className="flex-grow max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <a href="/">
          <Image
            src="/images/rick_and_morty_logo.webp"
            width={267}
            height={104}
            alt="Rick and Morty logo"
            className="object-contain w-auto h-20"
          />
        </a>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
