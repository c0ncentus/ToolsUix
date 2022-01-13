import { Component } from "react"
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface CardBlogCategoryProps {
    bg: string
    date: { day: number, month: string }
    title: string,
    desc: string,
    author: string,
    nbrComment: number
}
export class PackCardBlogCategory extends Component<CardBlogCategoryProps, any> {
    render() {
        const { bg, date, desc, title, author, nbrComment } = this.props
        return <div style={{ marginTop: "3rem" }} className="cardBlogCategory container">
            <div className="row">
                <div className="col-12">
                    <article className="blog-card">
                        <div className="blog-card__background">
                            <div className="card__background--wrapper">
                                <div className="card__background--main" style={{ backgroundImage: `url(${bg})` }}>
                                    <div className="card__background--layer"></div>
                                </div>
                            </div>
                        </div>
                        <div className="blog-card__head">
                            <span className="date__box">
                                <span className="date__day">{date.day}</span>
                                <span className="date__month">{date.month}</span>
                            </span>
                        </div>
                        <div className="blog-card__info">
                            <h5>{title}</h5>
                            <p>
                                <a href="#" className="icon-link mr-3"><i className="fa fa-pencil-square-o"></i> {author}</a>
                                <a href="#" className="icon-link"><i className="fa fa-comments-o"></i> {nbrComment}</a>
                            </p>
                            <p>{desc}</p>
                            <a href="#" className="btn btn--with-icon"><i className="btn-icon fa fa-long-arrow-right"></i>READ MORE</a>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    }
}