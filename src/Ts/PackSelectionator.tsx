import { flattenDeep } from "lodash";
import { Component } from "react";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT

export interface ChoiceSelec {
    label: string;
    choices: string[];
}

interface SelectionatorProps {
    items: ChoiceSelec[]
    onChangeValue?: (choice: string[]) => any
}
interface SelectionatorState {
    choiceSelected: string[]
}
export class PackSelectionator extends Component<SelectionatorProps, SelectionatorState> {
    constructor(props: any) {
        super(props);
        this.state = { choiceSelected: [] }
        this.fillState = this.fillState.bind(this);
    }
    fillState(value: string) {
        if (this.state.choiceSelected.includes(value)) {
            if (this.props.onChangeValue === undefined) { }
            else { this.props.onChangeValue(this.state.choiceSelected.filter((x) => x !== value)); }
            this.setState(({ choiceSelected: this.state.choiceSelected.filter((x) => x !== value) }));
        } else {
            let newValue = this.state.choiceSelected.map((el) => { return el })
            newValue.push(value);
            if (this.props.onChangeValue === undefined) { }
            else { this.props.onChangeValue(newValue); }
            this.setState(({ choiceSelected: newValue }))
        }
    }
    render() {
        const { items } = this.props;
        const choices: string[] = flattenDeep(items.map((elLabel) => { return flattenDeep(elLabel.choices.map((elChoice) => { return elChoice })) }))
        return <>
            <div className="selectionator">
                <span className="search">
                    <span className="shadow" />
                    <span className="overlay" />
                    Choisis: {this.state.choiceSelected.length} sur {choices.length}
                </span>

                <div className="menu">
                    <ul className="list">
                        {items.map((elItem, i) => {
                            const { choices, label } = elItem;
                            return <li key={i}>
                                <span className="header">{label}</span>
                                <ul className="optgroup">
                                    {choices.map((elChoice, i) => {
                                        const id = `${i}_${elChoice}`;
                                        return <li key={i}>
                                            <input type="checkbox" id={id} name={id} value={elChoice} onClick={(() => { this.fillState(elChoice) })} />
                                            <label htmlFor={id}>{elChoice}</label>
                                        </li>
                                    })}
                                </ul>
                            </li>
                        })}
                    </ul>
                </div>
                <br />

            </div>
            <input type="submit" value="Submit" />
        </>
    }
}