import React from "react";
import Button from "./Button";
import { GetZutatenAll, GetZutatenAllCo2, GetZutatenByRezeptNr, GetZutatenByRezeptName, GetZutatenUnused } from "./APICalls";

export default function ZutatForm(props) {
    const [output, setOutput] = React.useState([]);
    const [showBox, setShowBox] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [outputTime, setOutputTime] = React.useState("");
    const [error, setError] = React.useState(false);
    const [error2, setError2] = React.useState(false);
    const [input, setInput] = React.useState("");
    const [input2, setInput2] = React.useState("");

    const formHandler = async (e)  => {
        var start = Date.now();
        setError(false)
        setLoading(true)
        e.preventDefault()
        let data = await GetZutatenByRezeptNr(input)
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        if(!data)
        {
            setError(true);
        } else {
            setOutput(data);
        }
        setInput("");
    }

    const formHandler2 = async (e)  => {
        var start = Date.now();
        setError(false)
        setLoading(true)
        e.preventDefault()
        let data = await GetZutatenByRezeptName(input2)
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        if(!data)
        {
            setError2(true);
        } else {
            setOutput(data);
        }
        setInput2("");
    }

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

    const allZutatenBtnCo2 = async () => {
        var start = Date.now();
        setLoading(true)
        let data = await GetZutatenAllCo2()
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        console.log(data);
        setOutput(data);
    }

    const allZutatenUnused = async () => {
        var start = Date.now();
        setLoading(true)
        let data = await GetZutatenUnused()
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        console.log(data);
        setOutput(data);
    }

    const onChangeHandler = (e) => {
        setInput(e.target.value)
    }
    const onChangeHandler2 = (e) => {
        setInput2(e.target.value)
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
                {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> ZUTAT</span>  </div>} </h3> : ""}
                    <Button onClick={allZutatenBtn} text="GET ALL INGREDIENTS"></Button>
                </div>
                <div className="w-full">
                {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> ZUTAT</span> <b>ORDER BY</b> <span className="text-black"> ZUTAT.CO2BILANZ</span> <b>ASC</b> </div>} </h3> : ""}
                    <Button onClick={allZutatenBtnCo2} text="GET ALL INGREDIENTS (SORT BY CO2)"></Button>
                </div>
                <div className="w-full">
                {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> ZUTAT</span> <b>WHERE NOT EXISTS {"("}</b> <b>SELECT</b> <span className="text-black"> REZEPTZUTAT</span> <b>FROM</b> <span className="text-black"> REZEPTZUTAT.ZUTAT = ZUTAT.ZUTATNR</span> <b>{")"}</b> </div>} </h3> : ""}
                    <Button onClick={allZutatenUnused} text="GET ALL INGREDIENTS UNUSED IN RECIPES"></Button>
                </div>
                <form onSubmit={formHandler2} className="justify-center flex flex-col w-full gap-2">
                    {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> ZUTAT</span> <b>WHERE</b> <span className="text-black">ZUTAT.ZUTATNR</span> <b>IN {"("}</b> <b>SELECT</b> <span className="text-black">REZEPTZUTAT.ZUTATNR</span> <b>FROM</b> <span className="text-black"> REZEPTZUTAT</span> <b>WHERE</b> <span className="text-black">REZEPTZUTAT.REZEPTNAME={input2}</span> <b>{")"}</b> </div>} </h3> : ""}
                    <input
                        onChange={onChangeHandler2}
                        className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                        " outline-none focus:border-emerald-700 border-gray-300 transition-all duration-500 border w-full text-center"]} 
                        placeholder="Enter valid Recipe Name here..."
                        value={input2}
                    >    
                    </input>
                    <Button text="GET INGREDIENT BY RECIPE NAME"></Button>
                    {error2 ? <p className="text-rose-700 text-xl text-center"> Invalid Recipe name</p> : ""}
                </form>
                <form onSubmit={formHandler} className="justify-center flex flex-col w-full gap-2">
                    {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> ZUTAT</span> <b>WHERE</b> <span className="text-black">ZUTAT.ZUTATNR</span> <b>IN {"("}</b> <b>SELECT</b> <span className="text-black">REZEPTZUTAT.ZUTATNR</span> <b>FROM</b> <span className="text-black"> REZEPTZUTAT</span> <b>WHERE</b> <span className="text-black">REZEPTZUTAT.REZEPTNR={input}</span> <b>{")"}</b> </div>} </h3> : ""}
                    <input
                        onChange={onChangeHandler}
                        className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                        " outline-none focus:border-emerald-700 border-gray-300 transition-all duration-500 border w-full text-center"]} 
                        placeholder="Enter valid Recipe ID here..."
                        value={input}
                    >    
                    </input>
                    <Button text="GET INGREDIENT BY RECIPE ID"></Button>
                    {error ? <p className="text-rose-700 text-xl text-center"> Invalid Recipe ID</p> : ""}
                </form>
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
                            <p>Co2 Bilanz: <span className="text-black">{zutat.co2bilanz + " g/kWh"}</span></p>
                    </div>})}
                </div>
            </div>
        </div>
    );
}