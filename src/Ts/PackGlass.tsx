import { Component } from "react";
import { Link } from "react-router-dom";
import { pathAppToTo } from "../../../../Util";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
export interface ButtonLinkPropsExpose { link?: string; href?: string; text: string; onClick?: Function; }


export class PackGlass extends Component<ButtonLinkPropsExpose, any> {
    render() {
        const { text, href, link, onClick } = this.props;
        return <div className="glassEffect" onClick={() => { if (onClick === undefined) { } else { onClick() } }}>
            <div className="container">
                {link !== undefined
                    ? <Link to={pathAppToTo(link!)}><div className="btn effect01"><span>{text}</span></div></Link>
                    : <a href={href} className="btn effect01"><span>{text}</span></a>}
            </div>
        </div>
    }
}