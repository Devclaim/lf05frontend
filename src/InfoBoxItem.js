import React from "react";

export default function InfoBoxItem(props) {
    return(
        <div className="flex flex-row gap-4 rounded-2xl">
            <img src={require(`${props.src}`)} alt="missingLogo" className="h-[80px] w-[80px]"/>
            <div className="flex flex-col text-white">
                <span className="text-3xl font-bold">{props.title}</span>
                <span className="text-2xl">{props.app}</span>
            </div>
        </div>
    );
}