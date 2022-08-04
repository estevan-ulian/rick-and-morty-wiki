import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

interface ToggleMenuProps {
    onClick: () => void;
    open: boolean;
}

export default function ToggleMenu({ onClick, open }: ToggleMenuProps) {

    function renderToggleMenu() {
        const styles = `w-8 h-8 text-white`;
        if(!open) {
            return <AiOutlineMenu className={styles} />
        } else {
            return <AiOutlineClose className={styles} />
        }   
    }

    return (
        <>        
            <button onClick={onClick} className="transition-all duration-300 absolute z-20 right-3 top-8 text-3xl cursor-pointer lg:hidden">
                {renderToggleMenu()}
            </button>
        </>
    )
}