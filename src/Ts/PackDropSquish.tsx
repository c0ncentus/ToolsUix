import { Component } from "react"
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface DropDownSquishState2 { value: string, active: boolean, prvsInherent?: string }

interface DropDownSquishProps2 { lght: number, choices: string[], initValue?: string, onChange_?: (str: string) => any }
export class PackDropSquish extends Component<DropDownSquishProps2, DropDownSquishState2> {
    constructor(props: any) {
        super(props)
        this.state = { active: false, value: "", prvsInherent: undefined }
    }
    componentDidMount() { if (typeof this.props.initValue === "string") { this.setState({ prvsInherent: this.props.initValue, value: this.props.initValue! }) } else { this.setState({ prvsInherent: this.props.initValue }) } }
    affectValue(value: string) { this.setState({ value: value.length > this.props.lght ? (value.substring(0, this.props.lght) + "...") : value }) }
    componentDidUpdate() {
        if (this.props.initValue !== this.state.prvsInherent && typeof this.props.initValue === "string") {
            { this.setState({ prvsInherent: this.props.initValue, }); this.affectValue(this.props.initValue) }
        }
    }
    handleActive(active: boolean) { this.setState({ active }) }
    handleValue(value: string) { this.affectValue(value) }
    render() {
        const { choices, onChange_ } = this.props

        return Array.isArray(choices) && choices.every((x) => typeof x === "string")
            ? <form className="dropDownSquish">
                <input
                    className="chosen-value chosen-value1"
                    type="text" value={this.state.value}
                    onChange={((e) => { this.handleValue(e.target.value); })}
                    placeholder="écrire pour filtrer"
                    onClick={(() => { this.handleActive(!this.state.active) })} />
                <ul className={`value-list value-list1 ${this.state.active ? " open" : ""}`}>
                    {choices.map((li, i) => {
                        return <li
                            key={`${i}`}
                            onClick={((e) => {
                                this.handleValue(e.currentTarget.textContent!)
                                this.handleActive(!this.state.active);
                                if (onChange_ !== undefined) { onChange_(li) }
                            })} className={`valueFilter1${this.state.active ? "" : " closed"}`}>
                            {li}
                        </li>
                    })}
                </ul>
            </form>
            : <></>
    }
}