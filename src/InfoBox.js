import React from "react";
import InfoBoxItem from "./InfoBoxItem";

export default function InfoBox() {
    return(
        <div className="w-full px-6 lg:px-[17%]">
            <div className="text-3xl font-bold text-center text white bg-emerald-700 text-white rounded-t-2xl pt-6"> Software Stack </div>
            <div className="w-full bg-emerald-700 rounded-b-2xl flex flex-wrap justify-center gap-12 p-6">
                <InfoBoxItem title="Frontend" app="React" src="./React-icon.svg"></InfoBoxItem>
                <InfoBoxItem title="Database" app="PostgreSQL" src="./postgresql.svg"></InfoBoxItem>
                <InfoBoxItem title="Backend" app="Java" src="./javaCup.svg"></InfoBoxItem>
                <InfoBoxItem title="Interface" app="OpenAPI 3.0" src="./openapi-icon.svg"></InfoBoxItem>
            </div>
        </div>
    )
}