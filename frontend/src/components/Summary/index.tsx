import { SummaryCard, SummaryContainer } from "./styles";
import {ArrowCircleUp, ArrowCircleDown, CurrencyDollar} from 'phosphor-react';

export function Summary(){
    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span> Entregas </span>
                    <ArrowCircleUp size={32} color='#00b37e'/>
                </header>
                <strong> 12 </strong>
            </SummaryCard>
            <SummaryCard>
                <header>
                    <span> Finalizadas </span>
                    <ArrowCircleDown size={32} color='#f75a68'/>
                </header>
                <strong> 10 </strong>
            </SummaryCard>
            <SummaryCard variant="green">
                <header>
                    <span> Total </span>
                    <CurrencyDollar size={32} color='#fff'/>
                </header>
                <strong> R$ 420,00 </strong>
            </SummaryCard>
        </SummaryContainer>
    )
}