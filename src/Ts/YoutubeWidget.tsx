import { Component } from "react"
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
export class YoutubeWidget extends Component<{ urlShow: string, abo: number, v: number, title: string }, any>{
    render() {
        const { abo, urlShow, title, v } = this.props
        return <div className="YoutubeWidgetCpnt">
            <div className="stub">
                <div className="top">
                    <span className="admit">Youtube</span>
                    <span className="line" />
                    <span className="num">
                        <span>{abo > 999 ? `${Math.trunc(abo / 1000)}K` : abo}</span>
                        <br />Abonnés
                    </span>
                </div>
                <div className="number">{title[0]}</div>
                <div className="invite">
                    {title.substring(1, title.length)}
                </div>
            </div>
            <div className="check">
                <div className="big">
                    <iframe className="vidYoutube"
                        src={urlShow} title="YouTube video player" frameBorder={0} allowFullScreen={false}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                </div>
                <div className="number">#{v}</div>
            </div>
        </div>
    }
}
