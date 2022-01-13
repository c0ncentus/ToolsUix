import { Component } from "react";
import { rgbToAnotherRgb } from "../../../../Util";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
export class TagItem extends Component<{ isRemoovable: boolean, isButtonAdd: boolean, obj: { value: string, color: string }, onAdd?: any, onDelete: any }, { value?: string }>{
    constructor(props: any) { super(props); this.state = { value: "" } }
    render() {
        const { isButtonAdd, isRemoovable, obj, onAdd, onDelete } = this.props;
        return isButtonAdd
            ? <span className="badge badge-add">
                <input placeholder="Ajouter" value={this.state.value === undefined ? "" : this.state.value} onChange={(e) => { this.setState({ value: e.currentTarget.value }) }} />
            </span>
            : <span className="badge badge-primary badge-tagged" style={{ color: obj.color, backgroundColor: rgbToAnotherRgb(obj.color, true, 200), borderColor: obj.color }}>
                {obj.value}
                <span className="close" onClick={() => { if (isRemoovable === true) { onDelete() } }}><i className="fa fa-times" /></span>
            </span>
    }
}