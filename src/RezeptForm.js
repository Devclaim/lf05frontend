import React from "react";
import Button from "./Button";
import { GetRezepteAll , GetRezepteByZutat , GetRezept, GetRezepteByMaxKal, GetRezepteByEigenschaft, GetRezepteByEigenschaftAndMaxZutat , GetRezepteByMaxZutat } from "./APICalls";

export default function RezeptForm(props) {
    const [output, setOutput] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [error2, setError2] = React.useState(false);
    const [error3, setError3] = React.useState(false);
    const [error4, setError4] = React.useState(false);
    const [error7, setError7] = React.useState(false);
    const [input, setInput] = React.useState("");
    const [input2, setInput2] = React.useState("");
    const [input3, setInput3] = React.useState("");
    const [input4, setInput4] = React.useState("");
    const [input5, setInput5] = React.useState("");
    const [input6, setInput6] = React.useState("");
    const [input7, setInput7] = React.useState("");
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

    const formHandler3 = async (e)  => {
        var start = Date.now();
        setLoading(true)
        setError3(false);
        e.preventDefault();
        let data = await GetRezepteByMaxKal(input3)
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        console.log(data);
        if(!data)
        {
            setError3(true);
        } else {
            setOutput(data);
        }
        setInput3("");
    }

    const formHandler4 = async (e)  => {
        var start = Date.now();
        setLoading(true)
        setError4(false);
        e.preventDefault();
        let data = await GetRezepteByEigenschaft(input4)
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        console.log(data);
        if(!data)
        {
            setError4(true);
        } else {
            setOutput(data);
        }
        setInput4("");
    }

    const formHandler5 = async (e)  => {
        var start = Date.now();
        setLoading(true)
        setError4(false);
        e.preventDefault();
        let data = await GetRezepteByEigenschaftAndMaxZutat(input5, input6)
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        console.log(data);
        if(!data)
        {
            setError4(true);
        } else {
            setOutput(data);
        }
        setInput5("");
        setInput6("");
    }

    const formHandler7 = async (e)  => {
        var start = Date.now();
        setLoading(true)
        setError7(false);
        e.preventDefault();
        let data = await GetRezepteByMaxZutat(input7)
        var end = Date.now();
        setOutputTime("[Fetched result in " + (end-start).toString() + " ms]");
        setLoading(false)
        console.log(data);
        if(!data)
        {
            setError7(true);
        } else {
            setOutput(data);
        }
        setInput7("");
    }

    const onChangeHandler = (e) => {
        setInput(e.target.value)
    }
    const onChangeHandler2 = (e) => {
        setInput2(e.target.value)
    }
    const onChangeHandler3 = (e) => {
        setInput3(e.target.value)
    }
    const onChangeHandler4 = (e) => {
        setInput4(e.target.value)
    }
    const onChangeHandler5 = (e) => {
        setInput5(e.target.value)
    }
    const onChangeHandler6 = (e) => {
        setInput6(e.target.value)
    }
    const onChangeHandler7 = (e) => {
        setInput7(e.target.value)
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
                <div className="w-full">
                    {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> REZEPT</span> </div>} </h3> : ""}
                    <Button onClick={allRecipesBtn} text="GET ALL RECIPES"></Button>
                </div>
                <form onSubmit={formHandler2} className="justify-center flex flex-col w-full gap-2">
                    {props.sqlHidden ? <h3 className="text-center text-base font-bold"> <b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> REZEPT</span> <b>WHERE</b> <span className="text-black"> REZEPT.REZEPTNR={input2}</span> </h3> : ""}
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
                    {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> REZEPT</span> <b>WHERE</b> <span className="text-black"> REZEPT.REZEPTNR</span> <p><b>{"IN ("}</b><b>FROM</b>  <span className="text-black"> REZEPTZUTAT.ZUTATNR </span>  <b>WHERE</b> <span className="text-black">REZEPTZUTAT.ZUTATNR={input}</span> <b>{")"}</b></p></div>} </h3> : ""}
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
                <form onSubmit={formHandler3} className="justify-center flex flex-col w-full gap-2">
                    {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> REZEPT.REZEPTNR, REZEPT.REZEPTNAME,</span> <b>SUM</b> <span className="text-black">(ZUTAT.KALORIEN.</span><b>MULTIPLY</b><span className="text-black">(REZEPTZUTAT.MENGE))</span> <b>AS</b> <span className="text-black"> KALORIEN</span> <b>FROM</b> <span className="text-black"> REZEPT</span> <b>JOIN</b> <span className="text-black"> REZEPTZUTAT</span> <b>ON</b> <span className="text-black"> REZEPTZUTAT.REZEPTNR = REZEPT.REZEPTNR </span> <b>JOIN</b>  <span className="text-black"> ZUTAT </span>  <b>ON</b> <span className="text-black">ZUTAT.ZUTATNR = REZEPTZUTAT.ZUTATNR</span> <b>GROUP BY</b> <span className="text-black"> REZEPT.REZEPTNR </span> <b>HAVING</b> <span className="text-black">KALORIEN {'<'} {input3}</span> <b>ORDER BY</b> <span className="text-black">REZEPT.REZEPTNR</span></div>} </h3> : "" }
                    <input
                        onChange={onChangeHandler3}
                        className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                        " outline-none focus:border-emerald-700 border-gray-300 transition-all duration-500 border w-full text-center"]} 
                        placeholder="Enter max Calories here..."
                        value={input3}
                    >    
                    </input>
                    <Button text="GET RECIPES WITH MAX CALORIES"></Button>
                    {error3 ? <p className="text-rose-700 text-xl text-center"> Enter valid Integer... </p> : ""}
                </form>
                <form onSubmit={formHandler4} className="justify-center flex flex-col w-full gap-2">
                    {props.sqlHidden ?  <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> REZEPT.REZEPTNR, REZEPT.REZEPTNAME, <b className="text-emerald-700">COUNT</b> REZEPT.REZEPTNR</span> <b>AS</b> <span className="text-black">ANZAHLREZEPTE</span> <b>FROM</b> <span className="text-black"> REZEPT</span> <b>JOIN</b> <span className="text-black"> REZEPTZUTAT</span> <b>ON</b> <span className="text-black"> REZEPTZUTAT.REZEPTNR = REZEPT.REZEPTNR</span> <b>JOIN</b> <span className="text-black"> ZUTAT </span> <b>ON</b>  <span className="text-black"> ZUTAT.ZUTATNR = REZEPTZUTAT.ZUTATNR </span>  <b>JOIN</b> <span className="text-black">ZUTATEIGENSCHAFT</span> <b>ON</b> <span className="text-black"> REZEPT.REZEPTNR = ZUTATEIGENSCHAFT.ZUTATNR </span> <b>JOIN</b> <span className="text-black">EIGENSCHAFTEN</span> <b>ON</b> <span className="text-black">EIGENSCHAFTEN.EIGENSCHAFTENID = ZUTATEIGENSCHAFT.EIGENSCHAFTENID </span> <b>WHERE</b> <span className="text-black">EIGENSCHAFTEN.BEZEICHNUNG = {input4} </span> <b>GROUP BY</b> <span className="text-black">REZEPT.REZEPTNR </span>  </div>} </h3> : ""}
                    <select
                        onChange={onChangeHandler4}
                        className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                        " hover:bg-emerald-700 hover:text-white outline-none border-emerald-700 text-xl transition-all duration-500 border w-full text-center"]} 
                        value={input4}
                    >
                        <option className="text-emerald-700 bg-white" defaultValue> Select Category </option>
                        <option className="text-emerald-700 bg-white" value="Halal"> Halal </option>
                        <option className="text-emerald-700 bg-white" value="Vegan"> Vegan </option>
                        <option className="text-emerald-700 bg-white" value="Vegetarisch"> Vegetarisch </option>
                    </select>
                    <Button text="GET RECIPES BY CATEGORY"></Button>
                    {error4 ? <p className="text-rose-700 text-xl text-center"> Category doesnt exist... </p> : ""}
                </form>
                <form onSubmit={formHandler5} className="justify-center flex flex-col w-full gap-2">
                    {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div ><b>SELECT</b> <span className="text-black"> REZEPT.REZEPTNR, REZEPT.REZEPTNAME, <b className="text-emerald-700">COUNT</b> REZEPT.REZEPTNR</span> <b>AS</b> <span className="text-black">ANZAHLREZEPTE</span> <b>FROM</b> <span className="text-black"> REZEPT</span> <b>JOIN</b> <span className="text-black"> REZEPTZUTAT</span> <b>ON</b> <span className="text-black"> REZEPTZUTAT.REZEPTNR = REZEPT.REZEPTNR</span> <b>JOIN</b> <span className="text-black"> ZUTAT </span> <b>ON</b>  <span className="text-black"> ZUTAT.ZUTATNR = REZEPTZUTAT.ZUTATNR </span>  <b>JOIN</b> <span className="text-black">ZUTATEIGENSCHAFT</span> <b>ON</b> <span className="text-black"> REZEPT.REZEPTNR = ZUTATEIGENSCHAFT.ZUTATNR </span> <b>JOIN</b> <span className="text-black">EIGENSCHAFTEN</span> <b>ON</b> <span className="text-black">EIGENSCHAFTEN.EIGENSCHAFTENID = ZUTATEIGENSCHAFT.EIGENSCHAFTENID </span> <b>WHERE</b> <span className="text-black">EIGENSCHAFTEN.BEZEICHNUNG = {input5} </span> <b>AND</b> <span className="text-black">ANZAHLREZEPTE {"<"} {input6} </span> <b>GROUP BY</b> <span className="text-black">REZEPT.REZEPTNR </span>  </div>} </h3> : ""}
                    <div className="w-full flex gap-2">
                        <select
                            onChange={onChangeHandler5}
                            className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                            " hover:bg-emerald-700 hover:text-white outline-none border-emerald-700 text-xl transition-all duration-500 border w-full text-center"]} 
                            value={input5}
                        >
                            <option className="text-emerald-700 bg-white" defaultValue> Select Category </option>
                            <option className="text-emerald-700 bg-white" value="Halal"> Halal </option>
                            <option className="text-emerald-700 bg-white" value="Vegan"> Vegan </option>
                            <option className="text-emerald-700 bg-white" value="Vegetarisch"> Vegetarisch </option>
                        </select>
                        <input
                            onChange={onChangeHandler6}
                            className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                            " outline-none focus:border-emerald-700 border-gray-300 transition-all duration-500 border w-full text-center"]} 
                            placeholder="Enter max Ingredients here..."
                            value={input6}
                        >    
                        </input>
                    </div>
                    <Button text="GET RECIPES BY CATEGORY & MAX INGREDIENTS"></Button>
                    {error4 ? <p className="text-rose-700 text-xl text-center"> Category doesnt exist... </p> : ""}
                </form>
                <form onSubmit={formHandler7} className="justify-center flex flex-col w-full gap-2">
                    {props.sqlHidden ? <h3 className="text-center text-base font-bold"> {<div><b>SELECT</b> <span className="text-black"> REZEPT.REZEPTNR, REZEPT.REZEPTNAME,</span> <b>COUNT</b> <span className="text-black">(REZEPTZUTAT.ZUTATNR)</span> <b>FROM</b> <span className="text-black"> REZEPT</span> <b>JOIN</b> <span className="text-black"> REZEPTZUTAT</span> <b>ON</b> <span className="text-black"> REZEPTZUTAT.REZEPTNR = REZEPT.REZEPTNR </span> <b>GROUP BY</b> <span className="text-black"> REZEPT.REZEPTNR </span> <b>HAVING</b> <span className="text-black">ANZAHLZUTATEN {'<='} {input7}</span> <b>ORDER BY</b> <span className="text-black">REZEPT.REZEPTNR</span></div>} </h3> : ""}
                    <input
                        onChange={onChangeHandler7}
                        className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                        " outline-none focus:border-emerald-700 border-gray-300 transition-all duration-500 border w-full text-center"]} 
                        placeholder="Enter max Ingredients here..."
                        value={input7}
                    >    
                    </input>
                    <Button text="GET RECIPES WITH MAX INGREDIENTS"></Button>
                    {error7 ? <p className="text-rose-700 text-xl text-center"> Enter valid Integer... </p> : ""}
                </form>
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
                            {rezept.sumKalorien ?  <p>Summe Kalorien: <span className="text-black">{rezept.sumKalorien} kcal</span></p> : ""}
                            {rezept.anzahlZutaten ?  <p>Anzahl Zutaten: <span className="text-black">{rezept.anzahlZutaten}</span></p> : ""}
                    </div>})}
                </div>
            </div>
        </div>
    );
}