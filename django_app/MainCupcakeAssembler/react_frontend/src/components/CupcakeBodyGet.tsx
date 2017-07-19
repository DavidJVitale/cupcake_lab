import * as React from "react"
import 'whatwg-fetch'

import { DropdownList } from "react-widgets" 

const options = [
    'one', 'two', 'three'
]
const defaultOption = options[0]

export interface CupcakeGetProps { CupcakeBodies : string[],
                                   SelectedBody : string }

export class CupcakeBodyGet extends React.Component<undefined, CupcakeGetProps>{
    constructor(props : any){
        super(props)
        this.state = { CupcakeBodies : ["one", "two"],
                       SelectedBody : "one"}
        this.handleClick = this.handleClick.bind(this)
        this.handleSelect = this.handleSelect.bind(this)}

    handleClick() {
        console.log("Button is pressed: Nothing happened yet")}

    handleSelect() {
        console.log("Selected Something!")}

    render() {
        return (<div className="CupcakeBodyGet">
            <DropdownList defaultValue={this.state.SelectedBody} data={this.state.CupcakeBodies} onChange={SelectedBody => this.setState({ SelectedBody })}/>
            <button onClick={this.handleClick}>{"Get Cupcake Body"}</button> 
        </div>)}}
