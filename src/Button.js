import React from "react";

export default function Button(props) {
    return(
        <div>
            <button onClick={props.onClick} className="text-2xl w-full bg-transparent hover:bg-emerald-700 text-emerald-700 font-semibold hover:text-white py-2 px-4 border border-emerald-700 hover:border-transparent rounded-2xl">
                {props.text}
            </button>
        </div>
    )
}