import { cloneDeep, compact } from "lodash";
import { Component } from "react";
import { PackGlass, PackDropSquish } from ".";
import { CustomPicture, KeyValue } from "../../../../Util";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface PanelViewTsxProps {
    arrVal: KeyValue,
    dropDownsVal: KeyValue,
    initAsstImg: { isRandom: boolean }
    initChoices: any[],
    onAction: (obj: string) => any;
    imgRes?: string
}

interface PanelViewTsxState {
    isRandom: boolean;
    choiceSlc: (string)[],
    isBlockingAt: { block: boolean, at: number }
}


const IS_ONLY_ONE_Next = -5;
const CONST_PNLV = {
    next: "next__",
    choice: "choice__",
    custom: "______CUSTOM______"
}


function allSquishChange(choiceSlc: string[], el: string, i: number, isRandom: boolean = false) {
    let newSelec = cloneDeep(choiceSlc);
    if (isRandom === false) {
        const total = newSelec.length;
        if (total - 1 < i) { return [...newSelec, el] }
        else {
            if (i === newSelec.length - 1) { newSelec[i] = el; return newSelec }
            else {
                let buildArr: string[] = []
                if (i === 0) { return [el] }
                else {
                    let count = 0;
                    while (buildArr.length - 1 > i) { buildArr.push(newSelec[count]); count = count + 1 }
                    return buildArr;
                }
            }
        }
    }
    else {
        let buildArr: string[] = [];
        if (i === 0) { return [el] }
        else {
            let count = 0;
            while (buildArr.length < i) { buildArr.push(newSelec[count]); count = count + 1 }
            buildArr.push(el);
            return compact(buildArr);
        }
    }
}
export function arrayByNum(num: number) { return Array.from(new Array(num)).map((el, i) => { if (el) { }; return i.toString() }) }
export function arrayByKey(obj: any) { return arrayByNum(Object.keys(obj).length) }

const PAL_CNR = { assetImg: { format: ["Square", "Phone", "Bac"], type: ["Jpg", "Png", "Svg"] }, }

export const BUILD_PANEL_VIEW_IMG = (customImg: CustomPicture) => {
    const { Jpg, Png } = customImg;
    return {
        type: PAL_CNR.assetImg.type, choice__: [
            { format: PAL_CNR.assetImg.format, choice__: [arrayByKey(Jpg.Square), arrayByKey(Jpg.Phone), arrayByKey(Jpg.Bac)] },
            { format: PAL_CNR.assetImg.format, choice__: [arrayByKey(Png.Square), arrayByKey(Png.Phone), arrayByKey(Png.Bac)] },
            { format: PAL_CNR.assetImg.format, choice__: ["0", "0", "0"] }
        ]
    }
}

export class PanelViewTsx extends Component<PanelViewTsxProps, PanelViewTsxState>{
    constructor(props: any) { super(props); this.state = { choiceSlc: [], isRandom: false, isBlockingAt: { block: false, at: 100 } } }
    nextObject(obj: any, key: string, i?: number, index?: number, haveNext?: boolean) {
        if (key) { };
        if (this.state.isBlockingAt.at === index! && this.state.isBlockingAt.block === true) { return undefined }
        if (typeof obj === "object" && Array.isArray(obj) === false) {
            const keys = Object.keys(obj);
            if (keys.includes(CONST_PNLV.next)) { return obj[CONST_PNLV.next]; }
            if (keys.includes(CONST_PNLV.choice) && typeof i === "number") { return (obj[CONST_PNLV.choice] as any[])[i!] }
        } else {
            if (haveNext === false) { this.setState({ isBlockingAt: { at: index!, block: true } }); }
            if (Array.isArray(obj) && obj.every((x) => { return typeof x === "string" })) {
                if (this.state.isBlockingAt.block === false) { this.setState({ isBlockingAt: { at: index!, block: true } }); }
                return obj;
            }
        }
    }

    returnSomthing(obj: any, key: string, i: number): string[] | undefined {
        if (key) { }
        let res = undefined;
        if (typeof obj === "object") {
            if (i === IS_ONLY_ONE_Next) { res = obj[this.ObjKeys(obj)[0]] }
            else {
                res = obj[this.ObjKeys(obj)[i]]
                if (typeof res === "object" && Object.keys(res).includes(CONST_PNLV.next)) { res = res[CONST_PNLV.next] }
            }
        }
        if (obj === CONST_PNLV.custom) { }
        if (Array.isArray(obj) && obj.every(x => typeof x === "string")) { res = obj; }
        return res
    }
    getCustom() {
        const { choiceSlc } = this.state; const { arrVal } = this.props;
        let objEl: any = cloneDeep(arrVal);
        for (let i = 0; i < choiceSlc.length; i++) {
            const choiceIsInTheLastArr = Array.isArray(objEl) && objEl.every(x => typeof x === "string") && objEl.filter(y => y === choiceSlc[i]).length === 1
            if (choiceIsInTheLastArr === false && (objEl === null || objEl === undefined || objEl[choiceSlc[i]] === undefined)) { return null }
            else {
                if (choiceIsInTheLastArr === true) { objEl = choiceSlc[i] }
                else { objEl = objEl[choiceSlc[i]] }

            }
        }
        return objEl as any
    }
    choicesAvailable(): string[][] {
        const { dropDownsVal, } = this.props;
        const { choiceSlc } = this.state;

        let res: string[][] = []
        res.push(dropDownsVal[this.ObjKeys(dropDownsVal)[0]])
        if (choiceSlc.length === 0) { return res }
        else {
            let i: number = 0;
            let elementObj: KeyValue | "______CUSTOM______" | any[] = {}
            for (let j = 0; j < choiceSlc.length; j++) {
                if (res.length - 1 < j) { return res }
                i = (res[j] as string[]).findIndex(x => x === choiceSlc[j])
                elementObj = this.nextObject(j === 0 ? dropDownsVal : elementObj, choiceSlc[j], i === -1 ? undefined : i, j, false);
                if (elementObj === undefined) { return res }
                else {
                    const resPush = this.returnSomthing(elementObj, choiceSlc[j], this.ObjKeys(elementObj).length === 2 ? IS_ONLY_ONE_Next : i)
                    if (resPush !== undefined) { res.push(resPush) }
                }
            }
        }
        if (this.state.isBlockingAt.block === true) {
            let newRes: string[][] = [];
            for (let p = 0; p < this.state.isBlockingAt.at; p++) { newRes.push(res[p]); if (res.length - 1 < p) { return newRes } }
        }
        return res
    }

    ObjKeys(obj: any) { return Object.keys(obj).filter(x => { return x !== CONST_PNLV.choice || x !== CONST_PNLV.next }) }
    render() {
        const { onAction, imgRes } = this.props;
        const allArray = this.choicesAvailable();
        const CUSTOM = allArray.length === this.state.choiceSlc.length ? this.getCustom() : null;
        return <div style={{ position: "relative" }}>
            <div style={{ display: "flex", position: "relative" }} className="PanelViewTsx_Cpnt">
                <div><PackGlass text="Randomize Tout" /></div>
                <div>
                    <div className="grid">
                        {allArray.map((arrEl, i) => {
                            return <div key={`${i}`}>
                                <PackDropSquish lght={7}
                                    initValue={this.state.choiceSlc.length - 1 < i ? undefined : this.state.choiceSlc[i]}
                                    choices={arrEl}
                                    onChange_={(el) => { this.setState({ choiceSlc: allSquishChange(this.state.choiceSlc, el, i) }) }} />
                                <div className="minify">
                                    <PackGlass text={`Random ${i + 1}`} onClick={() => { this.setState({ choiceSlc: allSquishChange(this.state.choiceSlc, arrEl[Math.round(Math.random() * (arrEl.length - 1))], i, true) }) }} />
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="Resultat">
                        {CUSTOM === null
                            ? <></>
                            : /\/static*/gm.test(CUSTOM)
                                ? <img alt="" src={CUSTOM} style={{ width: imgRes === undefined ? 500 : imgRes, height: imgRes === undefined ? 500 : imgRes }} />
                                : <p className="pRes">{CUSTOM}</p>
                        }
                        {CUSTOM === null ? <></>
                            : <div style={{ position: "absolute", top: 75, left: 0 }}>
                                <PackGlass text="Valider" onClick={() => { if (CUSTOM !== null) { onAction(CUSTOM) } }} />
                            </div>}
                    </div>
                </div>
            </div>

        </div>
    }
}