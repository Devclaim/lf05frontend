import React from "react";
import Button from "./Button";
import { GetKunde, GetKundenAll, DeleteKunde } from "./APICalls";

export default function KundenForm() {
    const [output, setOutput] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [input, setInput] = React.useState("");
    const [showBox, setShowBox] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [outputTime, setOutputTime] = React.useState("");

    const onChangeHandler = (e) => {
        setInput(e.target.value)
    }

    const formHandler = async (e)  => {
        var start = Date.now();
        setError(false)
        setLoading(true)
        e.preventDefault()
        let data = await GetKunde(input)
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        if(!data)
        {
            setError(true);
        } else {
            setOutput([data]);
        }
        setInput("");
    }

    const allCustomerBtn = async () => {
        var start = Date.now();
        setLoading(true)
        let data = await GetKundenAll()
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        setOutput(data.kunden);
    }

    const clearOutput = (e) => {
        setOutput([]);
    }

    const toggleBox = (e) => {
        setShowBox(!showBox);
    }

    const delKundeBtn = async (e) => {
        var start = Date.now();
        setLoading(true)
        await DeleteKunde(e.target.id)
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        setOutput([])
    }

    return(
        <div className={`${showBox ? "max-h-[5000px]" : "max-h-[87px]"} overflow-hidden transition-all duration-500 ease-out`}>
            <button
                onClick={toggleBox}
                className="bg-emerald-700 rounded-t-2xl w-full border-emerald-700 hover:border-gray-200 border transition-all duration-300 ease-out">
                <h3 className="w-full text-3xl font-bold text-center text-white p-6"> GET CUSTOMERS </h3>
            </button>
            <div className={`${showBox ? "" : "scale-y-0 opacity-0"} max-h-[4000px] overflow-y-auto bg-gray-200 w-full flex flex-col gap-6 p-6 rounded-b-2xl transition-all duration-300 ease-out origin-top`}>
                <form onSubmit={formHandler} className="justify-center flex flex-col w-full gap-2">
                    <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> KUNDE</span> <b>WHERE</b> <span className="text-black">KUNDE.KUNDENNR={input}</span></div>} </h3>
                    <input
                        onChange={onChangeHandler}
                        className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                        " outline-none focus:border-emerald-700 border-gray-300 transition-all duration-500 border w-full text-center"]} 
                        placeholder="Enter valid Customer ID here..."
                        value={input}
                    >    
                    </input>
                    <Button text="GET CUSTOMER"></Button>
                    {error ? <p className="text-rose-700 text-xl text-center"> Invalid Customer ID</p> : ""}
                </form>
                <div className="w-full">
                    <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> KUNDE</span> </div>} </h3>
                    <Button onClick={allCustomerBtn} text="GET ALL CUSTOMERS"></Button>
                </div>
                <div className="w-full text-2xl flex flex-col gap-2 text-emerald-700 text-center font-bold">
                    Output 
                    <span className="text-black text-lg">{outputTime}</span>
                    <p>{loading ? "Loading..." : ""}</p>
                    {output.length !== 0 ? <Button onClick={clearOutput} red={true} text="CLEAR OUTPUT"></Button> : ""}
                    {output.map((kunde ,i) => {
                        return <div 
                            key={i}
                            className="p-6 border rounded-2xl w-full border-emerald-700">
                            <p>Kunde: <span className="text-black">{kunde.vorname} {kunde.nachname}</span></p>
                            <p>Kundennummer: <span className="text-black">{kunde.kundennr}</span></p>
                            <p>Geburtsdatum: <span className="text-black">{kunde.geburtsdatum[2] + " / " + kunde.geburtsdatum[1] + " / " + kunde.geburtsdatum[0]}</span></p>
                            <p>E-Mail: <span className="text-black">{kunde.email}</span></p>
                            <p>Tel.: <span className="text-black">{kunde.telefon}</span></p>
                            <p>AdressID: <span className="text-black">{kunde.adressid}</span></p>
                            <div className="w-full pt-2 mt-2 border-t border-emerald-700">
                                <h3 className="text-center text-base font-bold"> {<div><b>DELETE FROM</b> <span className="text-black"> BESTELLUNGSKUNDE</span> <b>WHERE</b> <span className="text-black">BESTELLUNGSKUNDE.KUNDENNR={kunde.kundennr} </span> </div>} </h3>
                                <h3 className="text-center text-base font-bold"> {<div><b>DELETE FROM</b> <span className="text-black"> KUNDE</span> <b>WHERE</b> <span className="text-black">KUNDE.KUNDENNR={kunde.kundennr} </span> </div>} </h3>
                                <h3 className="text-center text-base font-bold"> {<div><b>DELETE FROM</b> <span className="text-black"> ADRESSE</span> <b>WHERE</b> <span className="text-black">ADRESSE.ADRESSID=</span> ( <b>WHERE</b> <span className="text-black">KUNDE.ADRESSID</span> <b>FROM</b> <span className="text-black">KUNDE</span> <b>WHERE</b> <span className="text-black">KUNDE.KUNDENNR={kunde.kundennr}</span> ) </div>} </h3>
                                <Button id={kunde.kundennr.toString()} onClick={delKundeBtn} red={true} text="DELETE CUSTOMER"></Button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
} 