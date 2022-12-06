import { 
    Container,
    Header,
    Title,
    InprogressIcon,
    ClosedIcon,
    TotalIcon,
    Footer,
    Amount,
    LastDelivery
 } from "./styles";

interface propsHighLightCard{
    title: string,
    icon: any,
    status: 'inprogress' | 'closed' | 'total',
    amount: number,
}

export function HighLightCard(props: propsHighLightCard){
    return(
        <Container status={props.status}>
            <Header>
                <Title status={props.status}>
                    {props.title}
                </Title>
                {props.status === 'inprogress' && <InprogressIcon/>}
                {props.status === 'closed' && <ClosedIcon/>}
                {props.status === 'total' && <TotalIcon/>}
            </Header>
            <Footer>
                <Amount> {props.amount} </Amount>
                <LastDelivery>Última entrega dia 16 de novembro</LastDelivery>
            </Footer>
        </Container>
    )
}