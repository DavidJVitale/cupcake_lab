import * as React from "react"
import 'whatwg-fetch'

const options = [
    'one', 'two', 'three'
]
const defaultOption = options[0]

export interface CupcakeGetProps { CupcakeBodies : string[] }

export class CupcakeBodyGet extends React.Component<undefined, CupcakeGetProps>{
    constructor(props : any){
        super(props)
        this.state = { CupcakeBodies : ["one", "two"] }
        this.handleClick = this.handleClick.bind(this)
        this.handleSelect = this.handleSelect.bind(this)}

    handleClick() {
        console.log("Button is pressed: Nothing happened yet")}

    handleSelect() {
        console.log("Selected Something!")}

    render() {
        return (<div className="CupcakeBodyGet">
            <button onClick={this.handleClick}>{"Get Cupcake Body"}</button> 
        </div>)}}
