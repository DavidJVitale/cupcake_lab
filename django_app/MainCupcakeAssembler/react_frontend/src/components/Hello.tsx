import * as React from "react"
import "../styles/Hello.less"

export interface HelloProps { compiler: string;
                              framework: string;
                              styler : string}

export class Hello extends React.Component<HelloProps, undefined> {
    render() {
        return <h1>Hello from {this.props.compiler},{" "}
        {this.props.framework}, and {this.props.styler}</h1>}}
