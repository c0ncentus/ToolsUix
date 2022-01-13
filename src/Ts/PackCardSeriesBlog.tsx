import { Component } from "react"
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface CardSeriesBlogProps {
    title: string,
    type: string,
    desc: string,
    like: number,
    totalComm: number,
    date: { day: number, month: string, year: number }
    tags: string[]
    bg: string
    onClick_: Function
}

export class PackCardSeriesBlog extends Component<CardSeriesBlogProps, any> {
    constructor(props: any) {
        super(props)
    }
    render() {
        const { date, desc, like, title, totalComm, type, tags, bg, onClick_ } = this.props
        return <div style={{ position: "relative", height: 500 }}>
            <div className="cardSeriesBlog blog-card spring-fever" style={{ backgroundImage: `url(${bg})` }}>
                <div className="title-content">
                    <h3><a>{title}</a></h3>
                    <div className="intro"> <a>{type}</a> </div>
                </div>
                <div className="card-info">
                    {desc}
                    <a style={{ cursor: "pointer" }} onClick={() => { onClick_() }}>Read Article<span className="licon icon-arr icon-black"></span></a>
                </div>
                <div className="utility-info">
                    <ul className="utility-list">
                        <li><span className="licon icon-like" /><a href="#">{like}</a></li>
                        <li><span className="licon icon-com" /><a href="#">{totalComm}</a></li>
                        <li><span className="licon icon-dat" />{date.day} {date.month[0] + date.month[1] + date.month[2]} {date.year}</li>
                        <li style={{ display: "flex" }}>{tags.map((el, j) => { return <div key={`${j}`} style={{ display: "flex" }}><span className="licon icon-tag" /><a href="#">{el}</a></div> })}</li>
                    </ul>
                </div>
                <div className="gradient-overlay"></div>
                <div className="color-overlay"></div>
            </div>
        </div>

    }
}