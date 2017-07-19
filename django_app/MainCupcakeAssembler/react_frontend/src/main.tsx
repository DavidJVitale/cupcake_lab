import * as React from "react"
import * as ReactDOM from "react-dom"

import { CupcakeAssembler } from "./components/CupcakeAssembler" 

import "./styles/main.less"

ReactDOM.render(
        <div>
        <CupcakeAssembler/>
        </div>,
    document.getElementById("example")
);
