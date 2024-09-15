import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

interface carousalElem {
    id: string;
    backgroundUrl: string;
}

interface Props {
    items: carousalElem[]
}

const CarousalComp: React.FC<Props> = ({ items }) => {
    return (
        <Carousel
            className="package_carousal"
            IndicatorIcon
            // navButtonsAlwaysVisible
            stopAutoPlayOnHover={false}
            animation="fade"
            interval={5000}
            height="100%">
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    );
}

function Item(props: any) {
    // style={{ backgroundImage: `url(${props.item.background})` }}
    console.log(props.item.backgroundUrl);
    
    return (
        <Paper>
            <div style={{ backgroundImage: `url(${props.item.backgroundUrl})` }} className="package_carousal_items"></div>
        </Paper>
    )
}

export default CarousalComp;