import { Component, CSSProperties } from "react";
import { Direction } from "../../../../Util";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface OpenAndCloseState {
    isClose: boolean
    src: string,
    isPassed: boolean
}
type DirectionOpenAndClose = "left" | "right" | "up" | "bottom"
interface OpenAndCloseProps {
    refDir: DirectionOpenAndClose,
    refStart: DirectionOpenAndClose
    posWhenOpen: { left?: number, right?: number, top?: number, bottom?: number }
    img: Direction,
    cssCustom?: CSSProperties
}

export class PackOpenAndClose extends Component<OpenAndCloseProps, OpenAndCloseState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isClose: true,
            src: "",
            isPassed: false
        }
    }
    componentDidMount() {
        this.setState({ src: this.props.img[this.props.refStart] })
    }
    handleVisibility(isClose: boolean, direction: DirectionOpenAndClose, isPassed: boolean) {
        this.setState({
            isClose,
            src: this.props.img[direction],
            isPassed
        })
    }
    cssMerde = {
        right: { top: "50%", right: 0, left: "unset" },
        up: { top: 0, left: "50%" },
        left: { top: "50%", left: 0 },
        bottom: { left: "50%", bottom: 0 }
    }
    render() {
        const { cssCustom } = this.props
        const refDir = this.props.refDir;
        const isHoriz = (refDir === "left" || refDir === "right");
        return <div className="OpenMenu_Cpnt" style={{ position: "fixed", zIndex: 100000, width: this.state.isClose ? 0 : "100%", height: this.state.isClose ? 0 : "100%", top: 0 }}>
            <div className="a" style={{ width: isHoriz ? "50%" : "100%", height: isHoriz ? "100%" : "100%", overflowY: "scroll", zIndex: 200000, visibility: this.state.isClose ? "collapse" : "visible", background: "white", ...cssCustom }}>
                {this.props.children}
            </div>
            <div className="b" onClick={(() => {
                this.handleVisibility(!this.state.isClose,
                    isHoriz
                        ? this.state.isClose ? "left" : "right"
                        : this.state.isClose ? "bottom" : "up",
                    true)
            })}
                style={{
                    position: "fixed",
                    zIndex: 10000000,
                    width: 27, height: 27,
                    ...{
                        right: { top: "50%", right: 0 },
                        up: { top: 0, left: "50%" },
                        left: { top: "50%", left: 0 },
                        bottom: { left: "50%", bottom: 0 }
                    }[refDir]
                }}>
                <img alt="" style={{ cursor: "pointer" }} src={this.state.isPassed === false
                    ? this.props.img[this.props.refStart]
                    : this.state.src} />

            </div>
        </div>
    }
}