import { Component } from "react";
import { PackGlass } from ".";
import { SEE_REACTJSON } from "..";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
export class ModalObj extends Component<{ obj: any }, { isHide: boolean }>{
    constructor(props: any) { super(props); this.state = { isHide: true } }
    render() {
        return <div>
            <div style={{ visibility: this.state.isHide ? "visible" : "collapse", }}>
                <PackGlass text="Voire Json" onClick={() => { this.setState({ isHide: false }) }} />
            </div>
            <div style={{
                visibility: this.state.isHide ? "collapse" : "visible", position: "fixed", overflowY: "scroll",
                width: "70vw", height: "90vh", margin: "auto", zIndex: 100, backgroundColor: "tomato", top: 30, left: 30
            }}>
                <div style={{ position: "relative" }}>
                    <div className="StatsMinusButton" style={{ position: "fixed", zIndex: 100, right: 250, top: 40, border: "2px red solid" }}>
                        <PackGlass text="X" onClick={() => { this.setState({ isHide: true }) }} />
                    </div>
                    <div style={{ margin: "auto", marginTop: 10 }}>
                        {SEE_REACTJSON(this.props.obj)}
                    </div>
                </div>
            </div>
        </div>
    }
}