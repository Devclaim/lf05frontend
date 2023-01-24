import React from "react";
import Button from "./Button";
import { GetRezepteAll } from "./APICalls";

export default function RezeptForm() {
    const [output, setOutput] = React.useState([]);
    const [showBox, setShowBox] = React.useState(true);

    const allRecipesBtn = async () => {
        let data = await GetRezepteAll()
        setOutput(data.rezepte);
    }

    const clearOutput = (e) => {
        setOutput([]);
    }

    const toggleBox = () => {
        setShowBox(!showBox);
    }

    return(
        <div className={`${showBox ? "max-h-[5000px]" : "max-h-[87px]"} overflow-hidden transition-all duration-500 ease-out`}>
            <button
                onClick={toggleBox}
                className="bg-emerald-700 rounded-t-2xl w-full border-emerald-700 hover:border-gray-200 border transition-all duration-300 ease-out">
                <h3 className="w-full text-3xl font-bold text-center text-white p-6"> GET RECIPES </h3>
            </button>
            <div className={`${showBox ? "" : "scale-y-0 opacity-0"} bg-gray-200 w-full flex flex-col gap-6 p-6 rounded-b-2xl items-center transition-all duration-300 ease-out origin-top`}>
                <div className="w-full">
                    <h3 className="text-center text-l font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> REZEPTE</span> </div>} </h3>
                    <Button onClick={allRecipesBtn} text="GET ALL RECIPES"></Button>
                </div>
                <div className="w-full text-2xl flex flex-col gap-2 text-emerald-700 text-center font-bold">
                    Output
                    {output.length !== 0 ? <Button onClick={clearOutput} red={true} text="CLEAR OUTPUT"></Button> : ""}
                    {output.map((rezept ,i) => {
                        return <div 
                            key={i}
                            className="p-6 border rounded-2xl w-full border-emerald-700">
                            <p>Rezeptname: <span className="text-black">{rezept.rezeptname}</span></p>
                            <p>Rezeptnummer: <span className="text-black">{rezept.rezeptnr}</span></p>
                    </div>})}
                </div>
            </div>
        </div>
    );
}