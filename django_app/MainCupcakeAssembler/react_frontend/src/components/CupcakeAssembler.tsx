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
                                         CupcakeToppings: any[],
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
        return data.map((item) => { return item[mapName] })}

    infoOfSelectedBody(SelectedBody){
        for(var i=0; i<this.state.CupcakeBodies.length; i++){
            if(this.state.CupcakeBodies[i].body_name == SelectedBody){
                return this.state.CupcakeBodies[i].body_info}}
        return NO_INFO_MSG}

    infoOfSelectedFrosting(SelectedFrosting){
        for(var i=0; i<this.state.CupcakeFrostings.length; i++){
            if(this.state.CupcakeFrostings[i].name == SelectedFrosting){
                return this.state.CupcakeFrostings[i].info}}
        return NO_INFO_MSG}

    infoOfSelectedTopping(SelectedTopping){
        for(var i=0; i<this.state.CupcakeToppings.length; i++){
            if(this.state.CupcakeToppings[i].name == SelectedTopping){
                return this.state.CupcakeToppings[i].details}}
        return NO_INFO_MSG}

    appropriateToppingsForFrosting(someFrosting){
        for(var i=0; i<this.state.CupcakeFrostings.length; i++){
            if(this.state.CupcakeFrostings[i].name == someFrosting){
                return this.state.CupcakeFrostings[i].appropriate_toppings}}
        return []}

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

    imageUrlOfSelectedTopping(){
        var urlBase = LOCALHOST+":6500"
        console.log(this.state.CupcakeToppings)
        for(var i=0; i<this.state.CupcakeToppings.length; i++){
            if(this.state.CupcakeToppings[i].name == this.state.SelectedTopping){
                return urlBase + this.state.CupcakeToppings[i].url}}
        return ""}

    handleBodyChange(SelectedBody){
        this.setState({ SelectedBody })
        this.setState({ BodyDetails : this.infoOfSelectedBody(SelectedBody)})

        this.setState({ SelectedFrosting : "" })
        this.setState({ FrostingDetails : NO_INFO_MSG })
        this.setState({ SelectedTopping : "" })
        this.setState({ ToppingDetails : NO_INFO_MSG })
        this.setState({ CupcakeFrostings : []})
        this.setState({ CupcakeToppings : []})
        
        var bodyFlav = SelectedBody.slice()
        bodyFlav = bodyFlav.toLowerCase().split(/[ ,]+/)[0]
        var url = LOCALHOST+":5000/api/frostingoptions/"+bodyFlav+"bodies"
        fetch(url).then((response) => {
            response.json().then((data : any) => {
                this.setState({
                    CupcakeFrostings : data })})})}

    handleFrostingChange(SelectedFrosting){
        this.setState({ SelectedFrosting })
        this.setState({ FrostingDetails : this.infoOfSelectedFrosting(SelectedFrosting)})

        this.setState({ SelectedTopping : "" })
        this.setState({ ToppingDetails : NO_INFO_MSG })
        this.setState({ CupcakeToppings : [] })
        
        var toppings = this.appropriateToppingsForFrosting(SelectedFrosting)
        for(var i=0; i<toppings.length; i++){
            fetch("http://127.0.0.1:6500/api/toppings/"+toppings[i]).then((response) => {
                response.json().then((data : any) => {
                    this.setState({CupcakeToppings : this.state.CupcakeToppings.concat(data)})})})}}

    handleToppingChange(SelectedTopping){
        this.setState({ SelectedTopping })
        this.setState({ ToppingDetails : this.infoOfSelectedTopping(SelectedTopping)})}

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
                data={this.toNameArray(this.state.CupcakeToppings, "name")}
                onChange={this.handleToppingChange}/>
            <b> Details </b> { this.state.ToppingDetails }
            <hr></hr>

            <img className="parent" src={this.imageUrlOfSelectedBody()} height="200" width="200"/>
            <img className="child2" src={this.imageUrlOfSelectedFrosting()} height="200" width="200"/>
            <img className="child1" src={this.imageUrlOfSelectedTopping()} height="200" width="200"/>

          </div>)}}
