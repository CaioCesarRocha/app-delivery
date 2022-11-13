import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import { SummaryCard, SummaryContainer } from './styles'
import { priceFormatter } from '../../services/utils/formatter'
import { useSummary } from '../../hooks/useSummary'

export function Summary() {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span> Em andamento </span>
          <i>
            {' '}
            <ArrowCircleUp size={32} color="#00b37e" />{' '}
          </i>
        </header>
        <strong> {summary.inprogress} </strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span> Finalizadas </span>
          <i>
            {' '}
            <ArrowCircleDown size={32} color="#f75a68" />{' '}
          </i>
        </header>
        <strong> {summary.closed} </strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span> Total </span>
          <i>
            {' '}
            <CurrencyDollar size={32} color="#fff" />{' '}
          </i>
        </header>
        <strong> {priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
