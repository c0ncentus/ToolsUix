import { Component } from "react";
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
export class CardMedia extends Component<{ user: { name: string, img: string, bg: string }, media_: { name: string, link: string, img: string }[] }, any>{
    render() {
        const { media_, user } = this.props;
        return <section className="CardMediaCpnt">
            <div className="header" style={{ backgroundImage: `url(${user.bg})`, backgroundSize: "cover" }}>
                <figure className="avatar">
                    <img src={user.img} />
                </figure>
            </div>
            <div className="info">
                <h2>{user}</h2>
                <p>Devellopeur</p>
            </div>

            <div className="social-icons">
                {media_.map((elMed) => {
                    return <div>
                        <p>{elMed.name}</p>
                        <a href={elMed.link}><img src={elMed.img} /></a></div>
                })}
            </div>
        </section>
    }
}