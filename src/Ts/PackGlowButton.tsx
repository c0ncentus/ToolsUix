import { Component } from "react";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
export class PackGlowButton extends Component<{ text: string, onClick: () => any }, { isAnimate: boolean }> {
    constructor(props: any) { super(props); this.state = { isAnimate: false } }
    render() {
        const { text, onClick } = this.props;
        return <button className={`bubbly-button ${this.state.isAnimate ? "animate" : ""}`} onClick={() => {
            this.setState({ isAnimate: true })
            if (onClick === undefined) { } else { onClick() }
            setTimeout(() => { this.setState({ isAnimate: false }) }, 2000);
        }
        }>
            {text}
        </button >
    }
}