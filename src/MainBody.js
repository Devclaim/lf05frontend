import React from "react";
import Form from "./Form";
import Akkordeon from "./Akkordeon";
import Section from "./Section";
import InfoBox from "./InfoBox";

export default function MainBody() {
    return(
        <div className="flex flex-col gap-6 text-emerald-700 min-h-screen pb-6">
            <Section title="Database Architecture"></Section>
            <div>
                <Akkordeon></Akkordeon>
                <InfoBox></InfoBox>
            </div>
            <Section title="Explore Database"></Section>
            <div className="[SQL STATEMENTS] grid lg:grid-cols-2 gap-6 px-6 lg:px-12">
                <Form 
                    title="GET CUSTOMER"
                    description={<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> KUNDE</span> </div>}
                    buttonText="GET CUSTOMER" 
                    formPlaceholder="Enter customer name here... or * to get all tables..."
                >
                </Form>
                <Form 
                    title = "GET RECIPES"
                    description={<div><b>SELECT</b> <span className="text-black"> *</span> <b>FROM</b> <span className="text-black"> REZEPT</span> </div>}
                    buttonText="GET RECIPE" 
                    formPlaceholder="Enter Recipe name here... or * to get all recipes..."
                >
                </Form>
                <Form 
                    title="GET RECIPES WITH CATEGORY"
                    buttonText="GET RECIPES" 
                    formPlaceholder="Enter category name here..."
                >
                </Form>
                <Form 
                    title="GET ALL INGREDIENTS OF RECIPE"
                    buttonText="GET INGREDIENTS" 
                    formPlaceholder="Enter Recipe name here..."
                >
                </Form>
                <Form 
                    title="GET RECIPES WITH CATEGORY"
                    buttonText="GET RECIPES" 
                    formPlaceholder="Enter category name here..."
                >
                </Form>
                <Form 
                    title="GET ALL INGREDIENTS OF RECIPE"
                    buttonText="GET INGREDIENTS" 
                    formPlaceholder="Enter Recipe name here..."
                >
                </Form>
                <Form 
                    title="GET RECIPES WITH CATEGORY"
                    buttonText="GET RECIPES" 
                    formPlaceholder="Enter category name here..."
                >
                </Form>
                <Form 
                    title="GET ALL INGREDIENTS OF RECIPE"
                    buttonText="GET INGREDIENTS" 
                    formPlaceholder="Enter Recipe name here..."
                >
                </Form>
            </div>
        </div>
    );
}