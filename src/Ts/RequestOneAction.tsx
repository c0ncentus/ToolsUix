import { Component } from "react";
import { BBD_PROD } from "../../../../Util";
import { DestData } from "../../../../Util/Model";
import { PackGlass } from "./PackGlass";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface RequestOneActionProps { action: "New" | "Upd" | "Del", obj: any }
interface RequestOneActionState { cpntIDs: { titles: string, id: string }[], destDatabase: DestData }
export class RequestOneAction extends Component<RequestOneActionProps, RequestOneActionState>{
    constructor(props: any) { super(props); this.state = { cpntIDs: [], destDatabase: BBD_PROD } }
    render() { return <div><PackGlass text="Envoyer à" /></div>; }
}
