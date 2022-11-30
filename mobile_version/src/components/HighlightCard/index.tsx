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
    type: 'inprogress' | 'closed' | 'total'
}

export function HighLightCard(props: propsHighLightCard){
    return(
        <Container variant={props.type}>
            <Header>
                <Title variant={props.type}>
                    {props.title}
                </Title>
                {props.type === 'inprogress' && <InprogressIcon/>}
                {props.type === 'closed' && <ClosedIcon/>}
                {props.type === 'total' && <TotalIcon/>}
            </Header>
            <Footer>
                <Amount> 1.500,00</Amount>
                <LastDelivery>Última entrega dia 16 de novembro</LastDelivery>
            </Footer>
        </Container>
    )
}