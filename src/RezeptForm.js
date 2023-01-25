import React from "react";
import Button from "./Button";
import { GetRezepteAll , GetRezepteByZutat , GetRezept } from "./APICalls";

export default function RezeptForm() {
    const [output, setOutput] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [error2, setError2] = React.useState(false);
    const [input, setInput] = React.useState("");
    const [input2, setInput2] = React.useState("");
    const [showBox, setShowBox] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [outputTime, setOutputTime] = React.useState("");

    const allRecipesBtn = async () => {
        var start = Date.now();
        setLoading(true)
        let data = await GetRezepteAll()
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        setOutput(data.rezepte);
    }

    const formHandler = async (e)  => {
        var start = Date.now();
        setError(false);
        setLoading(true)
        e.preventDefault();
        let data = await GetRezepteByZutat(input)
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        console.log(data);
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
        setLoading(true)
        setError2(false);
        e.preventDefault();
        let data = await GetRezept(input2)
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        console.log(data);
        if(!data)
        {
            setError2(true);
        } else {
            setOutput(data);
        }
        setInput2("");
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
                <h3 className="w-full text-3xl font-bold text-center text-white p-6"> GET RECIPES </h3>
            </button>
            <div className={`${showBox ? "" : "scale-y-0 opacity-0"} max-h-[4000px] overflow-y-auto bg-gray-200 w-full flex flex-col gap-6 p-6 rounded-b-2xl items-center transition-all duration-300 ease-out origin-top`}>
                <form onSubmit={formHandler2} className="justify-center flex flex-col w-full gap-2">
                    <h3 className="text-center text-base font-bold"> <b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> REZEPT</span> <b>WHERE</b> <span className="text-black"> REZEPT.REZEPTNR={input2}</span> </h3>
                    <input
                        onChange={onChangeHandler2}
                        className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                        " outline-none focus:border-emerald-700 border-gray-300 transition-all duration-500 border w-full text-center"]} 
                        placeholder="Enter valid Recipe ID here..."
                        value={input2}
                    >    
                    </input>
                    <Button text="GET RECIPE"></Button>
                    {error2 ? <p className="text-rose-700 text-xl text-center"> Invalid Recipe ID</p> : ""}
                </form>
                <form onSubmit={formHandler} className="justify-center flex flex-col w-full gap-2">
                    <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> REZEPT</span> <b>WHERE</b> <span className="text-black"> REZEPT.REZEPTNR</span> <p><b>{"IN ("}</b><b>FROM</b>  <span className="text-black"> REZEPTZUTAT.ZUTATNR </span>  <b>WHERE</b> <span className="text-black">REZEPTZUTAT.ZUTATNR={input}</span> <b>{")"}</b></p></div>} </h3>
                    <input
                        onChange={onChangeHandler}
                        className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                        " outline-none focus:border-emerald-700 border-gray-300 transition-all duration-500 border w-full text-center"]} 
                        placeholder="Enter Ingredient ID here..."
                        value={input}
                    >    
                    </input>
                    <Button text="GET RECIPES BY INGREDIENT"></Button>
                    {error ? <p className="text-rose-700 text-xl text-center"> Invalid Ingredient ID</p> : ""}
                </form>
                <div className="w-full">
                    <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> REZEPT</span> </div>} </h3>
                    <Button onClick={allRecipesBtn} text="GET ALL RECIPES"></Button>
                </div>
                <div className="w-full text-2xl flex flex-col gap-2 text-emerald-700 text-center font-bold">
                    Output
                    <span className="text-black text-lg">{outputTime}</span>
                    <p>{loading ? "Loading..." : ""}</p>
                    {output.length !== 0 ? <Button onClick={clearOutput} red={true} text="CLEAR OUTPUT"></Button> : ""}
                    {output.map((rezept ,i) => {
                        return <div 
                            key={i}
                            className="p-6 border rounded-2xl w-full border-emerald-700">
                            <p>Rezeptnummer: <span className="text-black">{rezept.rezeptnr}</span></p>
                            <p>Rezeptname: <span className="text-black">{rezept.rezeptname}</span></p>
                    </div>})}
                </div>
            </div>
        </div>
    );
}