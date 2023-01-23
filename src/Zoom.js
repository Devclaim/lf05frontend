import React from "react";

export default function Zoom() {
    const src = require("./ERDLF5.png")
    const [state, setState] = React.useState('0% 0%');

    const handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = (e.pageX - left) / width * 100
        const y = (e.screenY - (top + 100)) / height * 100
        setState( `${x}% ${y}%` )
    }

    return(
        <figure 
            onMouseMove={handleMouseMove}
            className="bg-no-repeat w-full rounded-2xl"
            style ={{backgroundImage: `url(${src})` , backgroundPosition: state}}
        >
            <img 
                src= {src}
                className="hover:opacity-0 block w-full rounded-2xl"
                alt="checkDieURLNochmal"
            />
        </figure>
    )
}