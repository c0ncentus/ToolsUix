import { Component } from "react";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface CardSeriesChapterBlogState { }

export interface CardSeriesChapterBlogProps {
    items: {
        id: string
        title: string,
        img: string,
        color: string,
        onClick?: any,
        CpntIfActive?: { left: JSX.Element, right: JSX.Element },
    }[]
}
export class PackCardSeriesChapterBlog extends Component<CardSeriesChapterBlogProps, CardSeriesChapterBlogState> {
    constructor(props: any) {
        super(props)
    }
    render() {
        const { items } = this.props;
        return <div className="cardSeriesChapterBlog">
            {items.map((el, i) => {
                const { color, img, title, onClick, id, CpntIfActive } = el;
                return <div key={`${i}`} style={{ display: "block" }}>
                    <div style={{ display: "flex" }}>
                        {CpntIfActive === undefined
                            ? <></>
                            : <div>{CpntIfActive.left}</div>}


                        <div className="card" id={id}>
                            <h2>{title}</h2>
                            <i className="fas fa-arrow-right"></i>
                            <div className="pic" style={{ background: `url(${img})` }}></div>
                            <ul>
                                <li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li />
                                <li /><li /><li /><li /><li /><li /><li /><li /><li /><li /><li />
                            </ul>
                            <div className="social">
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-instagram"></i>
                                <i className="fab fa-github"></i>
                            </div>
                            <button style={{ background: color }} onClick={(() => {
                                if (onClick === undefined) {
                                } else {
                                    onClick()
                                }
                            })

                            } />

                        </div>
                        {CpntIfActive === undefined ? <></>
                            : <div>{CpntIfActive.right}</div>}
                    </div>
                </div>
            })
            }
        </div >
    }
}