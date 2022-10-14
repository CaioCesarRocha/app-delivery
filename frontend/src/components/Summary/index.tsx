import {ArrowCircleUp, ArrowCircleDown, CurrencyDollar} from 'phosphor-react';
import { SummaryCard, SummaryContainer } from "./styles";
import { priceFormatter } from '../../services/utils/formatter';
import { useSummary } from '../../hooks/useSummary';

export function Summary(){
    const summary = useSummary()

    return (
        <SummaryContainer>
            <SummaryCard>
                <header>
                    <span> Entregas em andamento </span>
                    <ArrowCircleUp size={32} color='#00b37e'/>
                </header>
                <strong> {summary.inprogress} </strong>
            </SummaryCard>
            <SummaryCard>
                <header>
                    <span> Finalizadas </span>
                    <ArrowCircleDown size={32} color='#f75a68'/>
                </header>
                <strong> {summary.closed} </strong>
            </SummaryCard>
            <SummaryCard variant="green">
                <header>
                    <span> Total </span>
                    <CurrencyDollar size={32} color='#fff'/>
                </header>
                <strong> {priceFormatter.format(summary.total)}</strong>
            </SummaryCard>
        </SummaryContainer>
    )
}