import { chunk, compact, orderBy, uniq } from "lodash";
import { Component } from "react";
import { ALL_COLORS_SUIT, displayPropsName, GLOBAL_APP_CONFIG, objectEquals } from "../../../../Util";
import { PackTabNpmColor } from "./PackTabNpmColor";
import { ListWowify } from "./ListWowify";
import { ModalObj } from "./ModalObj";
import { PackGlass } from "./PackGlass";
import { arrayByNum } from "./PanelViewTsx";
// END_TS_EXPLO_IMPORT
import randomColor from "randomcolor";

// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface ListPaginifyProps {
    data: any[],
    display: { name: string[], desc: string[], color: string[] },
    nbrCol: number,
    title: string,
    onSelect: any,
    onDelete?: (id: string) => void
}
interface ListPaginifyState {
    iMultiLine: number,
    page: number,
    isAlphabetical: boolean,
    letterPage?: string
    colorByEnum: { color: string, enum: string[] }[]
}

export class ListPaginify extends Component<ListPaginifyProps, ListPaginifyState>{
    constructor(props: any) { super(props); this.state = { colorByEnum: [], iMultiLine: 4, page: 1, letterPage: undefined, isAlphabetical: true } }
    componentDidMount() { this.setState({ iMultiLine: this.props.nbrCol * 2 }) }
    filterName() {
        const res = orderBy(this.props.data, (obj: any) => { return displayPropsName(obj, this.props.display.name); })
        return this.state.isAlphabetical && this.state.letterPage !== undefined
            ? res.filter((obj) => {
                const name: string = displayPropsName(obj, this.props.display.name);
                return name.length > 0 && name[0].toLowerCase() === this.state.letterPage!.toLowerCase()
            })
            : res;
    }

    render() {
        const { data, nbrCol, title, display, onSelect } = this.props;
        const { page, iMultiLine, isAlphabetical } = this.state;

        const NBR_ITMS = nbrCol * iMultiLine;
        const NBR_PAGES = this.filterName().length < NBR_ITMS ? 0 : Math.trunc(this.filterName().length / NBR_ITMS);

        const colorByEnum = compact(uniq(this.props.data.map((el) => { let resEnum: any[] = displayPropsName(el, this.props.display.color); if (typeof resEnum === "string") { resEnum = [resEnum] as string[] }; return resEnum; })
        )).map((el, i) => {
            const finalCOlor = ALL_COLORS_SUIT.length - 1 < i ? randomColor({ format: "rgb", luminosity: "bright" }) : ALL_COLORS_SUIT[i]
            return { enum: el, color: finalCOlor }
        });
        return Array.isArray(data) && data.length > 0
            ? <div>
                <div style={{ display: "flex" }}>
                    <p style={{ fontSize: 50, marginRight: 30 }}>{title}</p>
                </div>
                <PackTabNpmColor
                    iActiveDefault={0}
                    items={[
                        {
                            colorRGB: "rgb(230,200, 40)", text: "Data", display: <div> <ListWowify
                                col={nbrCol} colorLine="crimson"
                                items={chunk(this.filterName().map((obj, numI) => {
                                    const name: string = displayPropsName(obj, display.name);
                                    let enumColor = displayPropsName(obj, display.color);
                                    if (typeof enumColor === "string") { enumColor = [enumColor] }
                                    return {
                                        colorBox: colorByEnum.find(x => objectEquals(x.enum, enumColor))!.color,
                                        title: name,
                                        letter: typeof name === "string" && name.length > 0
                                            ? name[0]
                                            : undefined,
                                        line: [
                                            <div key={`${numI}`} className="SMALL" style={{ display: "flex" }}>
                                                <div className="MEDIUM" style={{ margin: 5 }}>
                                                    <ModalObj obj={obj} />
                                                </div>
                                                <div className="SMALL" style={{ margin: 5 }}>
                                                    <PackGlass text="👆" onClick={() => {
                                                        if (onSelect === undefined) { }
                                                        else { onSelect(obj) }
                                                    }} />
                                                </div>
                                                {this.props.onDelete === undefined
                                                    ? <></>
                                                    : <div className="SMALL">
                                                        <PackGlass text="❌" onClick={() => { this.props.onDelete!(obj[GLOBAL_APP_CONFIG.propertyId] as string) }} />
                                                    </div>
                                                }

                                            </div>
                                        ]

                                    }
                                }), NBR_ITMS)[page - 1]} />

                                <div className="SMALL" style={{ display: "flex" }}>
                                    {page > 1 ? <PackGlass text="⏪" onClick={() => { this.setState({ page: 1 }) }} /> : <></>}
                                    {page > 4 ? <PackGlass text={(page - 4).toString()} onClick={() => { this.setState({ page: page - 4 }) }} /> : <></>}
                                    {page > 3 ? <PackGlass text={(page - 3).toString()} onClick={() => { this.setState({ page: page - 3 }) }} /> : <></>}
                                    {page > 2 ? <PackGlass text={(page - 2).toString()} onClick={() => { this.setState({ page: page - 2 }) }} /> : <></>}
                                    {page > 1 ? <PackGlass text="◀️" onClick={() => { this.setState({ page: page - 1 }) }} /> : <></>}

                                    <div style={{ border: "2px red solid" }}><PackGlass text={this.state.page.toString()} onClick={() => { }} /> </div>

                                    {NBR_PAGES - page > 0 ? <PackGlass text="▶️" onClick={() => { this.setState({ page: page + 1 }) }} /> : <></>}
                                    {NBR_PAGES - page > 1 ? <PackGlass text={(page + 2).toString()} onClick={() => { this.setState({ page: page + 2 }) }} /> : <></>}
                                    {NBR_PAGES - page > 2 ? <PackGlass text={(page + 3).toString()} onClick={() => { this.setState({ page: page + 3 }) }} /> : <></>}
                                    {NBR_PAGES - page > 3 ? <PackGlass text={(page + 4).toString()} onClick={() => { this.setState({ page: page + 4 }) }} /> : <></>}
                                    {NBR_PAGES - page > 0 ? <PackGlass text="⏩" onClick={() => { this.setState({ page: NBR_PAGES }) }} /> : <></>}
                                </div>
                                <div id="LetterPagin" style={{ width: 800, height: 120, display: "grid", gridTemplateColumns: "auto auto auto auto auto auto auto auto auto auto auto auto auto auto" }}>
                                    {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].map((el, i) => {
                                        return <div style={{ width: "min-content", height: "min-content", borderColor: "red", borderWidth: this.state.letterPage === el ? 2 : 0, borderStyle: "solid" }} key={i}><PackGlass text={el} onClick={() => {
                                            if (this.state.letterPage === el) { this.setState({ letterPage: undefined }) }
                                            else { this.setState({ letterPage: el }) }
                                        }} /></div>
                                    })}
                                </div>
                            </div>
                        },
                        {
                            colorRGB: "rgb(230,200, 40)", text: "Paramètre", display: <div>
                                <div>
                                    <p> Lignes par page: </p>
                                    <div className="SMALL" style={{ display: "flex" }}>
                                        {arrayByNum(5).map((el, i) => {
                                            const indexToValue = (i + 1) * nbrCol;
                                            const isThat = iMultiLine === indexToValue;
                                            return <div key={i} style={{ border: isThat ? "2px red solid" : "", marginRight: isThat ? 5 : 0, marginLeft: isThat ? 5 : 0 }}>
                                                <PackGlass text={indexToValue.toString()} onClick={() => { this.setState({ iMultiLine: indexToValue }) }} />
                                            </div>
                                        })}
                                    </div>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <input type="checkbox" style={{ width: 40, height: 40 }} checked={isAlphabetical} onChange={(e) => { this.setState({ isAlphabetical: e.currentTarget.checked }) }} />
                                    <p>est par ordre Alphabétique</p>
                                </div>
                                <div>
                                    <ul> <p style={{ fontSize: 25 }}>Légende de couleur à propos des carrées de couleurs :</p>
                                        {colorByEnum.map((el) => {
                                            return <li style={{ display: "flex", width: 700, flexWrap: "wrap" }}>
                                                <p>{el.enum.join(", ")}:</p>
                                                <div style={{ border: "2px solid black", height: 20, width: 70, borderRadius: "15%", backgroundColor: el.color }} />  </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        }
                    ]} />
            </div>
            : <></>
    }
}
