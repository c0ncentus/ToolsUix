import { Component } from "react";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
export class InputToogle extends Component<{ desc: string, labelOn: string, labelOff: string, initBool?: boolean, fireFalse: any, fireTrue: any }, { value: boolean }>{
    constructor(props: any) { super(props); this.state = { value: false } }
    componentDidMount() { this.setState({ value: this.props.initBool === undefined ? false : this.props.initBool }) }
    setValue(bool: boolean) {
        this.setState({ value: bool })
        if (bool === true) { this.props.fireTrue() } else { this.props.fireFalse() }
    }
    render() {
        const { desc, labelOff, labelOn } = this.props;
        return <div className="can-toggle can-toggle--size-large">
            <input id="c" type="checkbox" checked={this.state.value} />
            <label htmlFor="c">
                <div className="can-toggle__switch" data-checked={labelOn} data-unchecked={labelOff}></div>
                <div className="can-toggle__label-text">{desc}</div>
            </label>
        </div>
    }
}