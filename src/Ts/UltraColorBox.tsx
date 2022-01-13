import { Component } from "react";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface UltraColorBoxProps {
    title: string,
    jsx?: JSX.Element
}

export const NUMBER_NAME = [
    { name: "ZERO", num: 0 },
    { name: "ONE", num: 1 },
    { name: "TWO", num: 2 },
    { name: "THREE", num: 3 },
    { name: "FOUR", num: 4 },
    { name: "FIVE", num: 5 },
    { name: "SIX", num: 6 },
    { name: "SEVEN", num: 7 },
    { name: "EIGHT", num: 8 },
    { name: "NINE", num: 9 },
    { name: "TEN", num: 10 }
]
class UCBContainerItem extends Component<{ containerName: string, item: { untilNumber: number, prefixClass: string, shape: string[] }, }, any>{
    render() {
        const { containerName, item } = this.props;
        return <span className={`${containerName} swarmSpanUltra`}>
            {Array.from(new Array(item.untilNumber).keys()).map((i, num) => { return <div key={`${num}`} className={`${item.prefixClass} ${item.shape[i]} ${NUMBER_NAME!.find((x => x.num === i + 1))!.name.toLowerCase()}`} /> })}
        </span >
    }
}
export class UltraColorBox extends Component<UltraColorBoxProps, any>{
    render() {
        const { title } = this.props;
        return <article className="UltraColorBox_Cpnt wwdc">
            <UCBContainerItem containerName="spin" item={
                {
                    prefixClass: "large", untilNumber: 8,
                    shape: ["circle", "circle", "circle", "circle", "circle", "circle", "circle", "circle"],
                }} />
            <UCBContainerItem containerName="pulse" item={
                {
                    prefixClass: "small", untilNumber: 8,
                    shape: ["circle", "squircle", "circle", "squircle", "circle", "squircle", "circle", "squircle"],
                }} />
            <UCBContainerItem containerName="pulse" item={
                { prefixClass: "large", shape: ["squircle"], untilNumber: 1, }} />
            <div className="large squircle two">
                <div className="content" style={{ margin: "auto" }}>
                    {this.props.jsx === undefined ? "" : this.props.jsx}
                    <h1>{title}</h1>
                </div>
            </div>
        </article>
    }
}