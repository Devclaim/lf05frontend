import React from "react";
import KundenForm from "./KundenForm";
import Akkordeon from "./Akkordeon";
import Section from "./Section";
import InfoBox from "./InfoBox";
import RezeptForm from "./RezeptForm";

export default function MainBody() {
    return(
        <div className="flex flex-col gap-6 text-emerald-700 min-h-screen pb-6">
            <Section title="Database Architecture"></Section>
            <div>
                <Akkordeon></Akkordeon>
                <InfoBox></InfoBox>
            </div>
            <Section title="Explore Database"></Section>
            <div className="[SQL STATEMENTS] grid lg:grid-cols-2 gap-6 px-6 lg:px-12 min-h-[150vh]">
                <div className="flex flex-col gap-6">
                    <KundenForm></KundenForm>
                    <RezeptForm></RezeptForm>
                </div>
                <div className="flex flex-col gap-6">
                    <RezeptForm></RezeptForm>
                    <KundenForm></KundenForm>
                </div>
            </div>
        </div>
    );
}