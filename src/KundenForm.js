import React from "react";
import Button from "./Button";
import { GetKunde, GetKundenAll } from "./APICalls";

export default function KundenForm() {
    const [output, setOutput] = React.useState([]);
    const [showAllKundenInfo, setShowAllKundenInfo] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [input, setInput] = React.useState("");
    const [showBox, setShowBox] = React.useState(true);

    const onChangeHandler = (e) => {
        setInput(e.target.value)
    }

    const formHandler = async (e)  => {
        setError(false);
        e.preventDefault();
        let data = await GetKunde(input)
        if(!data)
        {
            setError(true);
        } else {
            setOutput([data]);
            setShowAllKundenInfo(true);
        }
        setInput("");
    }

    const allCustomerBtn = async () => {
        let data = await GetKundenAll()
        setOutput(data.kunden);
        setShowAllKundenInfo(false);
    }

    const clearOutput = (e) => {
        setOutput([]);
    }

    const toggleBox = (e) => {
        setShowBox(!showBox);
    }

    return(
        <div className={`${showBox ? "max-h-[5000px]" : "max-h-[87px]"} overflow-hidden transition-all duration-500 ease-out`}>
            <button
                onClick={toggleBox}
                className="bg-emerald-700 rounded-t-2xl w-full border-emerald-700 hover:border-gray-200 border transition-all duration-300 ease-out">
                <h3 className="w-full text-3xl font-bold text-center text-white p-6"> GET CUSTOMERS </h3>
            </button>
            <div className={`${showBox ? "" : "scale-y-0 opacity-0"} bg-gray-200 w-full flex flex-col gap-6 p-6 rounded-b-2xl transition-all duration-300 ease-out origin-top`}>
                <form onSubmit={formHandler} className="justify-center flex flex-col w-full gap-2">
                    <h3 className="text-center text-l font-bold"> {<div><b>SELECT</b> <span className="text-black"> KUNDE</span> <b>FROM</b> <span className="text-black"> KUNDEN</span> <b>WHERE</b> <span className="text-black">KUNDENNR={input}</span></div>} </h3>
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
                    <h3 className="text-center text-l font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> KUNDEN</span> </div>} </h3>
                    <Button onClick={allCustomerBtn} text="GET ALL CUSTOMERS"></Button>
                </div>
                <div className="w-full text-2xl flex flex-col gap-2 text-emerald-700 text-center font-bold">
                    Output
                    {output.length !== 0 ? <Button onClick={clearOutput} red={true} text="CLEAR OUTPUT"></Button> : ""}
                    {output.map((kunde ,i) => {
                        return <div 
                            key={i}
                            className="p-6 border rounded-2xl w-full border-emerald-700">
                            <p>Kunde: <span className="text-black">{kunde.vorname} {kunde.nachname}</span></p>
                            <p>Kundennummer: <span className="text-black">{kunde.kundennr}</span></p>
                            {showAllKundenInfo ? <div><p>Geburtsdatum: <span className="text-black">{kunde.geburtsdatum[2] + " / " + kunde.geburtsdatum[1] + " / " + kunde.geburtsdatum[0]}</span></p>
                            <p>AdressID: <span className="text-black">{kunde.adressid}</span></p></div> : "" }
                    </div>})}
                </div>
            </div>
        </div>
    );
}