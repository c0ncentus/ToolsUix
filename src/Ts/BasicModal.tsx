import { Component } from "react";
import { CustomPicture, KeyValue } from "../../../../Util";
import { PackGlass } from "./PackGlass";
import { BUILD_PANEL_VIEW_IMG, PanelViewTsx } from "./PanelViewTsx";
// END_TS_EXPLO_IMPORT
import ReactModal from "react-modal";
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface BasicModalProps {
    onAction: (obj: string) => any,
    data: KeyValue, custom: CustomPicture
}
export class BasicModal extends Component<BasicModalProps, { showModal: boolean }>{
    constructor(props: any) {
        super(props);
        this.state = { showModal: false };
        this.open = this.open.bind(this); this.close = this.close.bind(this);
    }
    open() { this.setState({ showModal: true }); }
    close() { this.setState({ showModal: false }); }

    render() {
        const { onAction, data, custom } = this.props;
        return <div className="BasicModal">
            <PackGlass text="💥" onClick={() => { this.open() }} />
            <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
                <PackGlass onClick={() => { this.close() }} text="Fermer" />
                <PanelViewTsx  {...{
                    isKey: false, initAsstImg: { isRandom: true }, initChoices: [""], onAction,
                    dropDownsVal: BUILD_PANEL_VIEW_IMG(custom),
                    arrVal: data
                }} />
            </ReactModal>
        </div>
    }
}