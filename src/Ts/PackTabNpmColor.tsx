import { Component } from "react";
import { rgbToAnotherRgb } from "../../../../Util";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface TabNpmColorProps {
    items: { colorRGB: string, text: string, svg?: JSX.Element, display: JSX.Element }[],
    iActiveDefault?: number, onSwitchTab?: Function
}
interface TabNpmColorState { iActive: number | null, iHover: number | null }
export class PackTabNpmColor extends Component<TabNpmColorProps, TabNpmColorState>{
    constructor(props: any) {
        super(props);
        this.state = { iActive: null, iHover: null }
    }
    componentDidMount() {
        const { iActiveDefault } = this.props;
        if (iActiveDefault !== undefined) { this.setState({ iActive: iActiveDefault }) }
    }
    rgbToRgba(str: string, level: number) {
        const rgb = str.replace("rgb", "").replace("(", "").replace(")", "").replace(" ", "").split(",");
        return `rgba(${rgb.join(",")}, ${level})`

    }

    render() {
        const { items, onSwitchTab } = this.props;
        return <div style={{ width: "max-content", height: "max-content" }}>
            <ul className="TabNpmColor" style={{ background: "white" }}>

                {items === undefined ? <></> : items.map((element, i) => {
                    const { colorRGB, text } = element;
                    const colorLight = rgbToAnotherRgb(colorRGB, true, 100);
                    const colorDark = rgbToAnotherRgb(colorRGB, false, 100);
                    const css_ = {
                        cssInactif: { color: colorDark, borderColor: colorRGB },
                        cssActif: { color: colorDark, borderColor: colorRGB, backgroundColor: colorLight, fontWeight: 900 },
                        cssHover: { backgroundColor: colorLight }
                    }
                    const currentCss = this.state.iActive === i
                        ? this.state.iHover === i
                            ? { ...css_.cssActif, ...css_.cssHover }
                            : css_.cssActif
                        : this.state.iHover === i
                            ? { ...css_.cssInactif, ...css_.cssHover }
                            : css_.cssInactif;
                    return <li
                        key={`${i}`}
                        onMouseEnter={(() => { this.setState({ iHover: i }) })}
                        onMouseLeave={(() => { this.setState({ iHover: null }) })}
                        onClick={(() => { if (onSwitchTab !== undefined) { onSwitchTab() }; this.setState({ iActive: this.state.iActive === i ? null : i }) })}
                        style={{
                            ...currentCss, padding: 20, cursor: "pointer",
                            borderBottom: `4px solid ${colorRGB}`
                        }} >

                        <a className="_38ce9a85 linkNpm">
                            <span>{text}</span>
                        </a>
                    </li>
                })}
            </ul>
            <div style={{ height: "max-content", width: "max-content" }}>
                {this.state.iActive === null || items === undefined || items[this.state.iActive] === undefined
                    ? <></>
                    : items[this.state.iActive].display}
            </div>
        </div>
    }
}