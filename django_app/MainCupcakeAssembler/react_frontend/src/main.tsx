import * as React from "react"
import * as ReactDOM from "react-dom"

import { Hello } from "./components/Hello"
import { CupcakeBodyGet } from "./components/CupcakeBodyGet" 

import "./styles/main.less"

ReactDOM.render(
        <div>
        <Hello compiler="Python" framework="Typescript" styler="React" />
        <CupcakeBodyGet/>
        </div>,
    document.getElementById("example")
);
