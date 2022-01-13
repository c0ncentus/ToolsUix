import { Component } from "react";
import { Link } from "react-router-dom";
import { Menuing, MenuItem, pathAppToTo } from "../../../../Util";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface SuperMenuingProps { struct: Menuing[], startUrl: string[] }


export function gene_main(allMenu: Menuing[]) { return allMenu.map((menuing) => { return gene_menuItem(menuing); }) }

export function gene_menuItem(menuing: Menuing) {
    return <li className="menu-item">
        <Link to={pathAppToTo(menuing.specialLink)}><p className="menu_item_Name">{menuing.title}</p></Link>
        <ol className="sub-menu">{menuing.items.map((menuItem, index) => { return gene_subMenuItem(menuItem, index) })}</ol>
    </li>
}
export function gene_subMenuItem(sub: MenuItem, index: number) {
    return <li className="menu-item" key={`${sub.title}_${index}_${Math.trunc(Math.random() * 100)}`}>
        {(typeof sub.cpntBehavior === "undefined" && typeof sub.specialLink !== "undefined")
            ? <Link to={pathAppToTo(sub.specialLink)}><p className="menu-item_titleNoCmpnt">{sub.title}</p></Link>
            : <>
                {sub.cpntBehavior}
                <p className="menu-item_titleCmpnt"> {sub.title}</p>
            </>
        }
    </li>
}
export class PackSuperMenuing extends Component<SuperMenuingProps, any> { render() { return <div className="Wrapper_menu"><nav className="menuFireworks"><ol>{gene_main(this.props.struct)}</ol></nav></div> } }