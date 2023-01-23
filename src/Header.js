import React from "react";
import krautundrubenlogo from "./krautundrueben_logo.svg";

export default function Header() {
    const [pageAtTop , setPageAtTop] = React.useState(window.scrollY===0);

    const UpdatePageAtTop = () => {
        setPageAtTop(window.scrollY===0)
    }

    React.useEffect(() => {
        window.addEventListener("scroll" , UpdatePageAtTop);
    });

    const handleClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return(
        <div className="[Header] w-full relative">
            <div className={`w-full ${pageAtTop ? "h-24" : "h-6"} bg-emerald-700 bg-opacity-80 shadow-2xl flex items-center justify-between fixed top-0 z-10 transition-all duration-500 ease-in-out`}>
                <img className="p-6 h-full" src={krautundrubenlogo} alt="logoPlaceholder"/>
                <span className={`px-6 flex items-center ${pageAtTop ? "text-2xl" : "text-xs"} text-white h-full transition-all duration-300 ease-in-out`}>by Kilian S. / Hakon T. / Burhan K.</span>
            </div>
            <img className="h-screen w-full z-0 object-cover" src={require("./gemuese.jpg")} alt="erdPlaceholder"/>
            <h1 className="w-[40%] text-6xl text-white absolute top-[45%] left-[15%] text-center ">
                LF5_NTeam1 
                <p className="font-bold textShadow">Database User Interface</p>
            </h1>
            <button onClick={handleClick} className={`fixed bottom-6 right-6 ${pageAtTop ? "opacity-0" : ""} h-12 w-12 bg-emerald-700 border-2 border-emerald-700 hover:border-white rounded-2xl shadow-lg text-white font-bold text-3xl overflow-hidden transition-all duration-500 ease-in-out`}>
                <p className="h-full">↑</p>
            </button>
        </div>
    );
}