import { Component } from "react"
// END_TS_EXPLO_IMPORT
// END_TS_FULL_IMPORT
// END_REQUIRE_IMPORT
// END_ALL_IMPORT
interface MiniAcrdVintProps {
    subtitle: string;
    subdesc: string;
    tinyImg?: string;
}

class MiniAcrdVint extends Component<MiniAcrdVintProps, any>{
    render() {
        const { subdesc, subtitle, tinyImg } = this.props;
        const img: string = tinyImg === undefined ? "https://static.thenounproject.com/png/1213473-200.png" : tinyImg
        return <details open={false} className="MiniAcrdVint">
            <summary>{subtitle}<img alt="" src={img} /></summary>
            <div>
                <p className="BodyTextAcc">{subdesc}</p>
            </div>
        </details>
    }
}

interface SlideCardProps {
    title: string
    img: string;
    desc: MiniAcrdVintProps[];
}

class SlideCard extends Component<SlideCardProps, any>{
    render() {
        const { desc, img, title } = this.props;
        return <div className="card">
            <img alt="" className="backGround" src={img} />
            <div className="card__head">{title}</div>
            <div className="card__body">{desc.map((content, i) => {
                return <MiniAcrdVint {...content} key={i} />
            })}</div>
        </div>
    }
}

interface SlideBookProps { items: SlideCardProps[] }
export class SlideBook extends Component<SlideBookProps, any> {
    render() {
        const { } = this.props
        return <div className="slideBook">
            {this.props.items.map((card, i) => { return <SlideCard {...card} key={`${i}_${card.title}_sildeBook`} /> })}
        </div>
    }
}