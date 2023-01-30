import React from "react";
import KundenForm from "./KundenForm";
import Akkordeon from "./Akkordeon";
import Section from "./Section";
import InfoBox from "./InfoBox";
import RezeptForm from "./RezeptForm";
import ZutatForm from "./ZutatForm";

export default function MainBody() {
    const [sqlHidden , setSqlHidden] = React.useState(false);
    const handleClick = () => {
        setSqlHidden(!sqlHidden);
    }

    return(
        <div className="flex flex-col gap-6 text-emerald-700 min-h-screen pb-6">
            <Section title="Database Architecture"></Section>
            <div>
                <Akkordeon></Akkordeon>
                <InfoBox></InfoBox>
            </div>
            <Section title="Explore Database"></Section>
            <div className={`w-full flex flex-col gap-6 items-center overflow-hidden text-3xl px-6 lg:px-[17%]`}>
                <button onClick={handleClick} className="w-full bg-transparent hover:bg-emerald-700 text-gray-200 font-semibold hover:text-white p-4 border border-gray-200 hover:border-transparent rounded-2xl">
                    {`${sqlHidden ? "Hide All SQL Statements" : "Show All SQL Statements"}`}
                </button>
            </div>
            <div className="[SQL STATEMENTS] grid lg:grid-cols-2 gap-6 px-6 lg:px-12 min-h-[150vh]">
                <div className="flex flex-col gap-6">
                    <KundenForm sqlHidden={sqlHidden}></KundenForm>
                    <ZutatForm sqlHidden={sqlHidden}></ZutatForm>
                </div>
                <div className="flex flex-col gap-6">
                    <RezeptForm sqlHidden={sqlHidden}></RezeptForm>   
                </div>
            </div>
        </div>
    );
}