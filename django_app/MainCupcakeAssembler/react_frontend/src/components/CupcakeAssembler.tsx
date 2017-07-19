import * as React from "react"
import 'whatwg-fetch'

import { DropdownList } from "react-widgets"

import "../styles/CupcakeAssembler.less"

const NO_INFO_MSG : string = "No information at this time."

export interface CupcakeAssemblerProps { CupcakeBodies : any[],
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
        this.state = { CupcakeBodies : [],
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
        this.handleToppingChange = this.handleToppingChange.bind(this)
        
        fetch("/api/cupcakebodies").then((response) => {
            response.json().then((data : any ) => {
                this.setState({ BodyDetails : "CupcakeBody Endpoint Running!"})
                this.setState({
                    CupcakeBodies : this.jsonToCupcakeBodies(data)})})})}

    jsonToCupcakeBodies(data){
        return JSON.parse(data).map((item) => { return item["fields"]})}

    toNameArray(data : any[], mapName : string) : string[]{
        return data.map((item) => { return item[mapName] })}

    imageUrlOfSelectedBody(){
        var urlBase = "http://127.0.0.1:8000"
        for(var i=0; i<this.state.CupcakeBodies.length; i++){
            if(this.state.CupcakeBodies[i].body_name == this.state.SelectedBody){
                return urlBase + this.state.CupcakeBodies[i].body_url}}
        return ""}

    handleBodyChange(SelectedBody){
        this.setState({ SelectedBody })}

    handleFrostingChange(SelectedFrosting){
        this.setState({ SelectedFrosting })}

    handleToppingChange(SelectedTopping){
        this.setState({ SelectedTopping })}

    render() {
        return (<div className="CupcakeBodyGet">
            <h1> Cupcake Body Microservice </h1>
            <DropdownList defaultValue={this.state.SelectedBody} data={this.toNameArray(this.state.CupcakeBodies, "body_name")} onChange={this.handleBodyChange}/>
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
            <img src={this.imageUrlOfSelectedBody()} height="200" width="200"/>
          </div>)}}
