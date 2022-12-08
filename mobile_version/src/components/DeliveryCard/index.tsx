import { IDelivery } from "../../services/interfaces/deliveryInterfaces";
import { 
    dateFormatter, 
    statusFormatter, 
    priceFormatter 
} from "../../services/utils/formatter";

import { 
    Container,
    Header,
    HeaderPrimary,
    SmallIcon,
    MediumIcon,
    LargeIcon,
    Title,
    Amount,
    Footer,
    Status, 
    DateDelivery
 } from "./styles";


 
export interface Props{
    data: IDelivery
    onPress: () => void;
}

export function DeliveryCard({ data, onPress} : Props ){
    return(
        <Container onPress={onPress}>
            <Header>
                <HeaderPrimary>
                    <Title>
                        {data.name_item}
                    </Title>
                    <Amount> 
                        {priceFormatter.format(data.price)}
                    </Amount>
                </HeaderPrimary>
                {data.size_item === 'small' && <SmallIcon/>}
                {data.size_item === 'medium' && <MediumIcon/>}
                {data.size_item === 'large' && <LargeIcon/>}
            </Header>
            <Footer>
                <Status variant={data.status}>
                    {statusFormatter(data.status)}
                </Status>
                <DateDelivery>
                    {dateFormatter.format(new Date(data.created_at))}
                </DateDelivery>
            </Footer>        
        </Container>
    )
}