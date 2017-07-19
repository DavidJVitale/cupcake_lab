import * as React from "react"
import 'whatwg-fetch'

import { DropdownList } from "react-widgets" 

import "../styles/CupcakeAssembler.less"

const NO_INFO_MSG : string = "No information at this time."

export interface CupcakeAssemblerProps { CupcakeBodies : string[],
                                         SelectedBody : string,
                                         BodyDetails: string,
                                         CupcakeFrostings: string[],
                                         SelectedFrosting: string,
                                         FrostingDetails: string,
                                         CupcakeToppings: string[],
                                         SelectedTopping: string,
                                         ToppingDetails: string }

export class CupcakeAssembler extends React.Component<undefined, CupcakeAssemblerProps>{
    constructor(props : any){
        super(props)
        this.state = { CupcakeBodies : ["one", "two"],
                       SelectedBody : "",
                       BodyDetails : NO_INFO_MSG,
                       CupcakeFrostings : ["a", "b"],
                       SelectedFrosting : "",
                       FrostingDetails : NO_INFO_MSG,
                       CupcakeToppings : ["apple", "orange"],
                       SelectedTopping : "",
                       ToppingDetails : NO_INFO_MSG }
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.handleFrostingChange = this.handleFrostingChange.bind(this)
        this.handleToppingChange = this.handleToppingChange.bind(this)}

    handleBodyChange(SelectedBody){
        this.setState({ SelectedBody })}

    handleFrostingChange(SelectedFrosting){
        this.setState({ SelectedFrosting })}

    handleToppingChange(SelectedTopping){
        this.setState({ SelectedTopping })}

    render() {
        return (<div className="CupcakeBodyGet">
            <h1> Cupcake Body Microservice </h1>
            <DropdownList defaultValue={this.state.SelectedBody} data={this.state.CupcakeBodies} onChange={this.handleBodyChange}/>
            <b> Details: </b> { this.state.BodyDetails }
            <hr></hr>
            <h1> Cupcake Frosting Microservice </h1>
            <DropdownList defaultValue={this.state.SelectedFrosting} data={this.state.CupcakeFrostings} onChange={this.handleFrostingChange}/>
            <b> Details: </b> { this.state.FrostingDetails }
            <hr></hr>
            <h1> Cupcake Topping Microservice </h1>
            <DropdownList defaultValue={this.state.SelectedTopping} data={this.state.CupcakeToppings} onChange={this.handleToppingChange}/>
            <b> Details </b> { this.state.ToppingDetails }
            <hr></hr>
          </div>)}}
