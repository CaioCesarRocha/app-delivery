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

export interface DeliveryCardProps{   
    status: 'open'| 'closed'| 'inprogress'
    type: 'small' | 'medium' | 'large'
    title: string,
    amount: number,
    dateDelivery: string  
}

export interface Props{
    data: DeliveryCardProps
}

export function DeliveryCard({ data} : Props ){
    return(
        <Container>
            <Header>
                <HeaderPrimary>
                    <Title>
                        {data.title}
                    </Title>
                    <Amount> 
                        {data.amount}
                    </Amount>
                </HeaderPrimary>
                {data.type === 'small' && <SmallIcon/>}
                {data.type === 'medium' && <MediumIcon/>}
                {data.type === 'large' && <LargeIcon/>}
            </Header>
            <Footer>
                <Status variant={data.status}>
                    {data.status}
                </Status>
                <DateDelivery>
                    {data.dateDelivery}
                </DateDelivery>
            </Footer>        
        </Container>
    )
}