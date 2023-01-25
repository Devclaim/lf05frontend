import React from "react";
import Button from "./Button";
import { GetZutatenAll } from "./APICalls";

export default function ZutatForm() {
    const [output, setOutput] = React.useState([]);
    const [showBox, setShowBox] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [outputTime, setOutputTime] = React.useState("");

    const allZutatenBtn = async () => {
        var start = Date.now();
        setLoading(true)
        let data = await GetZutatenAll()
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        console.log(data);
        setOutput(data);
    }

    const clearOutput = () => {
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
                <h3 className="w-full text-3xl font-bold text-center text-white p-6"> GET INGREDIENTS </h3>
            </button>
            <div className={`${showBox ? "" : "scale-y-0 opacity-0"} max-h-[4000px] overflow-y-auto bg-gray-200 w-full flex flex-col gap-6 p-6 rounded-b-2xl items-center transition-all duration-300 ease-out origin-top`}>
                <div className="w-full">
                    <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> ZUTAT</span> </div>} </h3>
                    <Button onClick={allZutatenBtn} text="GET ALL INGREDIENTS"></Button>
                </div>
                <div className="w-full text-2xl flex flex-col gap-2 text-emerald-700 text-center font-bold">
                    Output
                    <span className="text-black text-lg">{outputTime}</span>
                    <p>{loading ? "Loading..." : ""}</p>
                    {output.length !== 0 ? <Button onClick={clearOutput} red={true} text="CLEAR OUTPUT"></Button> : ""}
                    {output.map((zutat ,i) => {
                        return <div 
                            key={i}
                            className="p-6 border rounded-2xl w-full border-emerald-700">
                            <p>Zutatennr: <span className="text-black">{zutat.zutatennr}</span></p>
                            <p>Bezeichnung: <span className="text-black">{zutat.bezeichnung}</span></p>
                            <p>Bestand: <span className="text-black">{zutat.bestand} {zutat.einheit}</span></p>
                            <p>Lieferantennr: <span className="text-black">{zutat.lieferantennr}</span></p>
                            <p>Einkaufspreis: <span className="text-black">{zutat.einkaufspreis + "€"}</span></p>
                            <p>Verkaufspreis: <span className="text-black">{zutat.verkaufspreis + "€"}</span></p>
                            <p>Kalorien: <span className="text-black">{zutat.kalorien + " kcal"}</span></p>
                            <p>Kohlenhydrate: <span className="text-black">{zutat.kohlenhydrate + " KE"}</span></p>
                            <p>Protein: <span className="text-black">{zutat.protein + " g"}</span></p>
                    </div>})}
                </div>
            </div>
        </div>
    );
}