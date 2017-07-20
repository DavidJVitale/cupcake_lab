import * as React from "react"
import 'whatwg-fetch'

import { DropdownList } from "react-widgets"

import "../styles/CupcakeAssembler.less"

const NO_INFO_MSG : string = "No information at this time."
const LOCALHOST : string = "http://127.0.0.1"

export interface CupcakeAssemblerProps { CupcakeBodies : any[],
                                         SelectedBody : string,
                                         BodyDetails: string,
                                         CupcakeFrostings: any[],
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
                       CupcakeFrostings : [],
                       SelectedFrosting : "",
                       FrostingDetails : NO_INFO_MSG,
                       CupcakeToppings : [],
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
        console.log("toNameArrayCalled: " + mapName)
        console.log(data)
        return data.map((item) => { return item[mapName] })}

    infoOfSelectedBody(SelectedBody){
        for(var i=0; i<this.state.CupcakeBodies.length; i++){
            if(this.state.CupcakeBodies[i].body_name == SelectedBody){
                return this.state.CupcakeBodies[i].body_info}}
        return NO_INFO_MSG}

    infoOfSelectedFrosting(SelectedFrosting){
        for(var i=0; i<this.state.CupcakeFrostings.length; i++){
            console.log(this.state.CupcakeFrostings[i])
            if(this.state.CupcakeFrostings[i].name == SelectedFrosting){
                return this.state.CupcakeFrostings[i].info}}
        return NO_INFO_MSG}

    imageUrlOfSelectedBody(){
        var urlBase = LOCALHOST+":8000"
        for(var i=0; i<this.state.CupcakeBodies.length; i++){
            if(this.state.CupcakeBodies[i].body_name == this.state.SelectedBody){
                return urlBase + this.state.CupcakeBodies[i].body_url}}
        return ""}

    imageUrlOfSelectedFrosting(){
        var urlBase = LOCALHOST+":5000/"
        for(var i=0; i<this.state.CupcakeFrostings.length; i++){
            if(this.state.CupcakeFrostings[i].name == this.state.SelectedFrosting){
                return urlBase + this.state.CupcakeFrostings[i].image_url}}
        return ""}


    handleBodyChange(SelectedBody){
        this.setState({ SelectedBody })
        this.setState({ BodyDetails : this.infoOfSelectedBody(SelectedBody)})
        this.setState({ SelectedFrosting : "" })
        this.setState({ SelectedTopping : "" })
        var bodyFlav = SelectedBody.slice()
        bodyFlav = bodyFlav.toLowerCase().split(/[ ,]+/)[0]
        var url = LOCALHOST+":5000/api/frostingoptions/"+bodyFlav+"bodies"
        fetch(url).then((response) => {
            console.log(response)
            response.json().then((data : any) => {
                this.setState({
                    CupcakeFrostings : data })})})}

    handleFrostingChange(SelectedFrosting){
        this.setState({ SelectedFrosting })
        this.setState({ FrostingDetails : this.infoOfSelectedFrosting(SelectedFrosting)})}

    handleToppingChange(SelectedTopping){
        this.setState({ SelectedTopping })}

    render() {
        return (<div className="CupcakeBodyGet">
            <h1> Cupcake Body Microservice </h1>
            <DropdownList value={this.state.SelectedBody}
                data={this.toNameArray(this.state.CupcakeBodies, "body_name")}
                onChange={this.handleBodyChange}/>
            <b> Details: </b> { this.state.BodyDetails }
            <hr></hr>
            <h1> Cupcake Frosting Microservice </h1>
            <DropdownList value={this.state.SelectedFrosting}
                data={this.toNameArray(this.state.CupcakeFrostings, "name")}
                onChange={this.handleFrostingChange}/>
            <b> Details: </b> { this.state.FrostingDetails }
            <hr></hr>
            <h1> Cupcake Topping Microservice </h1>
            <DropdownList value={this.state.SelectedTopping}
                data={this.state.CupcakeToppings}
                onChange={this.handleToppingChange}/>
            <b> Details </b> { this.state.ToppingDetails }
            <hr></hr>
            <img src={this.imageUrlOfSelectedBody()} height="200" width="200"/>
            <img src={this.imageUrlOfSelectedFrosting()} height="200" width="200"/>
          </div>)}}
