import React from "react";
import Button from "./Button";
import { GetBestellungskundeAll, GetNahrwerteByKundennr} from "./APICalls";

export default function BestellungskundeForm(props) {
    const [output, setOutput] = React.useState([]);
    const [showBox, setShowBox] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [outputTime, setOutputTime] = React.useState("");
    const [error, setError] = React.useState(false);
    const [input, setInput] = React.useState("");

    const formHandler = async (e)  => {
        var start = Date.now();
        setError(false)
        setLoading(true)
        e.preventDefault()
        let data = await GetNahrwerteByKundennr(input)
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        console.log(data)
        if(!data)
        {
            setError(true);
        } else {
            setOutput([data]);
        }
        setInput("");
    }

    const allOrdersBtn = async () => {
        var start = Date.now();
        setLoading(true)
        let data = await GetBestellungskundeAll()
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        console.log(data);
        setOutput(data.bestellungskundes);
    }

    const onChangeHandler = (e) => {
        setInput(e.target.value)
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
                <h3 className="w-full text-3xl font-bold text-center text-white p-6"> GET ORDERS </h3>
            </button>
            <div className={`${showBox ? "" : "scale-y-0 opacity-0"} max-h-[4000px] overflow-y-auto bg-gray-200 w-full flex flex-col gap-6 p-6 rounded-b-2xl items-center transition-all duration-300 ease-out origin-top`}>
                <div className="w-full">
                {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> BESTELLUNGSKUNDE</span>  </div>} </h3> : ""}
                    <Button onClick={allOrdersBtn} text="GET ALL ORDERS"></Button>
                </div>
                <form onSubmit={formHandler} className="justify-center flex flex-col w-full gap-2">
                    {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black">{"ROUND(AVG(ZUTAT.KALORIEN),2) ROUND(AVG(ZUTAT.KOHLENHYDRATE),2) ROUND(AVG(ZUTAT.PROTEIN),2)" }</span> <b>FROM</b> <span className="text-black"> BESTELLUNG</span> <b>NATURAL JOIN</b> <span className="text-black">BESTELLUNGSZUTAT</span> <b>NATURAL JOIN</b> <span className="text-black">ZUTAT</span> <b>NATURAL JOIN</b> <span className="text-black">BESTELLUNGSKUNDE</span> <b>WHERE</b> <span className="text-black">BESTELLUNGSKUNDE.KUNDENNR = {input}</span> </div>} </h3> : ""}
                    <input
                        onChange={onChangeHandler}
                        className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                        " outline-none focus:border-emerald-700 border-gray-300 transition-all duration-500 border w-full text-center"]} 
                        placeholder="Enter valid Customer ID here..."
                        value={input}
                    >    
                    </input>
                    <Button text="GET AVG OF ORDER BY CUSTOMER ID"></Button>
                    {error ? <p className="text-rose-700 text-xl text-center"> Invalid Customer ID</p> : ""}
                </form>
                <div className="w-full text-2xl flex flex-col gap-2 text-emerald-700 text-center font-bold">
                    Output
                    <span className="text-black text-lg">{outputTime}</span>
                    <p>{loading ? "Loading..." : ""}</p>
                    {output.length !== 0 ? <Button onClick={clearOutput} red={true} text="CLEAR OUTPUT"></Button> : ""}
                    {output.map((bestellungskunde ,i) => {
                        return <div 
                            key={i}
                            className="p-6 border rounded-2xl w-full border-emerald-700">
                            {bestellungskunde.kundennr ? <p>Kundennummer: <span className="text-black">{bestellungskunde.kundennr}</span></p> : ""}
                            {bestellungskunde.bestellnr ? <p>Bestellungsnummer: <span className="text-black">{bestellungskunde.bestellnr}</span></p> : ""}
                            {bestellungskunde.avgkalorien ? <p>Kalorien Mittelwert: <span className="text-black">{bestellungskunde.avgkalorien} kcal</span></p> : ""}
                            {bestellungskunde.avgkohlenhydrate ? <p>Kohlenhydrate Mittelwert: <span className="text-black">{bestellungskunde.avgkohlenhydrate} g</span></p> : ""}
                            {bestellungskunde.avgprotein ? <p>Protein Mittelwert: <span className="text-black">{bestellungskunde.avgprotein} g</span></p> : ""}
                    </div>})}
                </div>
            </div>
        </div>
    );
}