import React from "react";

export default function Button(props) {
    return(
        <div>
            <button onClick={props.onClick}
                id={props.id}
                className={`text-2xl w-full bg-transparent ${props.red ? "hover:bg-rose-700 text-rose-700 font-semibold border-rose-700" : "hover:bg-emerald-700 text-emerald-700 font-semibold border-emerald-700"} hover:text-white py-2 px-4 border hover:border-transparent rounded-2xl`}>
                {props.text}
            </button>
        </div>
    )
}