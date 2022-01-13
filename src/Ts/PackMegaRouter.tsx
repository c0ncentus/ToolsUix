import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { WebsiteStructure__, websiteToRouter } from "../../../../Util";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
export class PackMegaRouter extends Component<{ struct: WebsiteStructure__ }, any>{
    render() {
        const dataRouter = websiteToRouter(this.props.struct);
        return <Routes>
            {dataRouter.map((oneRouter, index) => {
                const { component, name, path, customParam, function_ } = oneRouter;
                if (function_ !== undefined && typeof customParam !== "undefined") { }
                let newPath = `/${path.join("/")}`;
                return Array.isArray(customParam) && typeof function_ === "function"
                    ? <Route caseSensitive element={component}
                        // render={(props) => { return function_(...customParam.map((el) => { return props.match.params[el]! })) }}
                        key={`router_${name}_${index}`}
                        path={`${newPath}/:${customParam.join("/:")}`}
                    />
                    : <Route key={`router_${name}_${index}`} element={component} caseSensitive path={newPath} />
            })}
        </Routes>
    }
}