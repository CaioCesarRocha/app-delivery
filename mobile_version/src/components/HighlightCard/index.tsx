import { priceFormatter,dateMonthExtense } from "../../services/utils/formatter";
import { useSummary } from "../../hooks/summary";
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
    status: 'inprogress' | 'closed' | 'total',
    amount: number,
}

export function HighLightCard(props: propsHighLightCard){
    const summary = useSummary();

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
                { props.status === 'inprogress' && 
                     <>
                        <Amount> {props.amount} </Amount>  
                        <LastDelivery>
                            Última entrega {''}
                            {new Date(summary.lastDelivery).getDate()} {''}
                            de {''}
                            {dateMonthExtense(summary.lastDelivery)}
                        </LastDelivery> 
                    </>   
                }
                { props.status === 'closed' &&
                    <>
                        <Amount> {props.amount} </Amount>  
                        <LastDelivery>
                            Última entrega {''}
                            {new Date(summary.lastDelivery).getDate()} {''}
                            de {''}
                            {dateMonthExtense(summary.lastDelivery)}
                        </LastDelivery> 
                    </>    
                }
                { props.status === 'total' &&
                    <>
                        <Amount> {priceFormatter.format(props.amount)} </Amount> 
                        <LastDelivery>
                            Do dia 1 a {''}
                            {new Date(summary.lastDelivery).getDate()}  {''} 
                            de {''}
                            {dateMonthExtense(summary.lastDelivery)}
                        </LastDelivery> 
                    </>
                }                                                                          
            </Footer>
        </Container>
    )
}