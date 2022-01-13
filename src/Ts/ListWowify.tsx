import { Component, CSSProperties } from "react";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
export interface ItemListWowifyProps {
    title: string,
    line: JSX.Element[],
    colorBox: string,
    img?: string,
    letter?: string
}

interface ListWowifyProps {
    items: ItemListWowifyProps[],
    col: number,
    colorLine: string,
}

const sizeTitle = { little: 10, medium: 20, tall: 26 };

export class ListWowify extends Component<ListWowifyProps, any>{
    render() {
        const cssTwoCol: { resultInner: CSSProperties } = {
            resultInner: { minHeight: 120 }
        }
        return <div className="ListWowify_Cpnt" style={{ gridTemplateColumns: "auto ".repeat(this.props.col) }}>
            {this.props.items.map((el, i) => {
                const result: CSSProperties = {
                    borderBottom: 0,
                    borderRightWidth: i % this.props.col !== this.props.col - 1 ? 2 : 0,
                    borderRightColor: this.props.colorLine,
                    borderRightStyle: "solid",
                }
                const { title, line, colorBox, img, letter } = el;
                const cssTwoColIner: CSSProperties = i % 2 === 0 ? { ...cssTwoCol.resultInner, borderRightWidth: 0 } : { ...cssTwoCol.resultInner, borderRightWidth: 2 };
                const isMore1 = this.props.col > 1;
                return <div key={`${i}`} className="store-map__result" style={isMore1 ? result : { borderBottomColor: this.props.colorLine }}>
                    <div className="store-map__result-inner" style={isMore1
                        ? cssTwoColIner
                        : {}}>
                        <div className="store-map__result-number" style={{ backgroundColor: colorBox }}>
                            {letter === undefined ? i + 1 : letter}
                        </div>
                        <h1 className="store-map__result-heading" style={{ fontSize: title.length > 20 ? sizeTitle.little : title.length > 10 ? sizeTitle.medium : sizeTitle.tall }}>{title}</h1>

                        {img !== undefined ?
                            <div className="store-map__result-image" style={{
                                border: "2px black solid", width: 100, height: 100,
                                position: "absolute", bottom: 0, right: -10
                            }}>
                                <img alt="" style={{ backgroundSize: "cover", height: "100%", width: "100%" }} src={img}></img>
                            </div>
                            : <></>}

                        <div className="store-map__result-body"> {line.map((word, i) => { return <div key={`${i}`}>{word}</div> })}</div>
                    </div>
                </div>
            })}
        </div >
    }
}