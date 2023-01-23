import React from "react";
import Button from "./Button";

export default function Form(props) {
    const [resultText, setResultText] = React.useState("");
    const formHandler = (e)  => {
        e.preventDefault();
        setResultText(e.target.tableName.value);
        e.target.reset();
    }

    return(
        <div className="w-full">
            <div className="bg-emerald-700 rounded-t-2xl items-center">
                <h3 className="w-full text-3xl font-bold text-center text-white p-6"> {props.title} </h3>
            </div>
            <div className="bg-gray-200 flex flex-col gap-6 p-6 rounded-b-2xl items-center">
                <form onSubmit={formHandler} className="justify-center flex flex-col w-full gap-2">
                    <h3 className="text-center text-l font-bold"> {props.description} </h3>
                    {/**<input
                        className={["text-emerald-700 placeholder:italic font-semibold py-2 px-4 rounded-2xl bg-transparent ",
                        " outline-none focus:border-emerald-700 border-gray-300 transition-all duration-500 border w-full text-center"]} 
                        id="tableName"
                        placeholder={props.formPlaceholder}
                    >    
                    </input>**/}
                    <Button text={props.buttonText}></Button>
                </form>
                <div>
                    <span className="w-full text-2xl text-emerald-700 font-bold">Output {resultText}</span>
                </div>
            </div>
        </div>
    );
}