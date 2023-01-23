import React from "react";

export default function Section(props) {
    return(
        <div className="bg-emerald-700 text-white p-6">
            <h2 className="w-full text-center text-4xl font-bold font-caps">{props.title} </h2>
        </div>
    )
}