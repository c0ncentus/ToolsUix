import { Component, CSSProperties } from "react";
import { Menuing } from "../../../../Util";
import { PackSuperMenuing } from "./PackSuperMenuing";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface LetterAnimationProps { text: string, fontSize?: number, css?: CSSProperties }
export class PackLetterAnimation extends Component<LetterAnimationProps, any> {
    render() {
        const { text, fontSize } = this.props;
        const style = { fontSize: `${fontSize === undefined ? 20 : fontSize}vw` }
        return <div id="ui" className="LetterAnimationUI">{Array.from(Array(40).keys()).map((el, i) => { return <div key={`${i}`} className="text" style={style}>{text}</div> })}</div>
    }
}

interface HeaderPageProps {
    struct: Menuing[];
    img: string;
    startUrl?: string[];
    title: string;
    summerizeImg?: string;
    summerize: { text: string, hrefId: string }[]
}

export class PackHeaderPage extends Component<HeaderPageProps, any> {
    render() {
        const { img, startUrl, title } = this.props;
        const url = startUrl === undefined ? ["Menus"] : startUrl;
        return <div className="headerPage">
            <div style={{ height: "100vh", opacity: 0.9, backgroundSize: "cover", backgroundImage: `url(${img})`, position: "relative" }}>
                <div style={{ marginBottom: "30vh", opacity: 1, position: "absolute", top: 0, width: "100%", zIndex: 100 }}>
                    <PackSuperMenuing struct={this.props.struct} startUrl={url} />
                </div>
                <div style={{ height: "50vh" }}>
                    <PackLetterAnimation text={title} />
                    <p style={{
                        top: "40vh",
                        left: "50vw",
                        position: "absolute",
                        fontSize: "20vw",
                        lineHeight: "20vw",
                        opacity: 0.7,
                        color: "crimson",
                        fontFamily: "Cinzel",
                        transform: "translate(-50%, -50%)",
                        mixBlendMode: "screen"
                    }}></p>
                </div>
                <div style={{ backgroundColor: "white", height: "60vh", width: "100%", opacity: 0.2, position: "absolute", top: "50vh", left: "0vh" }} />
                <div style={{ position: "absolute", bottom: -78, zIndex: 1000, width: "100%" }}>
                </div>
            </div>
        </div >
    }
}