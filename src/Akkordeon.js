import React from "react";
import Zoom from "./Zoom";

export default function Akkordeon() {
    const [bodyHidden , setBodyHidden] = React.useState(false);
    const handleClick = () => {
        setBodyHidden(!bodyHidden);
    }

    return(
        <div className={`w-full flex flex-col gap-6 items-center overflow-hidden text-3xl px-6 lg:px-[17%]`}>
            <div className="w-full">
            <button onClick={handleClick} className="w-full bg-transparent hover:bg-emerald-700 text-gray-200 font-semibold hover:text-white p-4 border border-gray-200 hover:border-transparent rounded-2xl">
                {`${bodyHidden ? "Show Entitity Relationship Diagram (ERD)" : "Hide Entitity Relationship Diagram (ERD)"}`}
            </button>
            </div>
            <div className={`transition-all ease-linear duration-500 origin-top ${bodyHidden ? "max-h-0 opacity-0" : "mb-6 max-h-[900px]"}`}>
                <Zoom></Zoom>
            </div>
        </div>
    );
}