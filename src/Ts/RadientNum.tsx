import { Component } from "react";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
export class RadientNum extends Component<{ txt: string }, any> {
    render() {
        return <div className="RadientNum"><h1 className="GradientBorder">{this.props.txt}</h1></div>
    }
}