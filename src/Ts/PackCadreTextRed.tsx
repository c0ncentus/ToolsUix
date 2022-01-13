import { Component } from "react";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface CadreTextRedState { }

interface CadreTextRedProps {
    text: string,
    color?: string,
    size?: string,
    fontSize: string
}
export class PackCadreTextRed extends Component<CadreTextRedProps, CadreTextRedState> {
    render() {
        const { text, fontSize } = this.props;
        return <div style={{ position: "absolute", top: "-80%", zIndex: 2, left: "50%" }}>
            <a href="#" className="cadreTextRed" style={{ fontSize }}>{text}</a>
        </div>
    }
}