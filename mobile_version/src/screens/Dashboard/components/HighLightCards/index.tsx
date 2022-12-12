import { useSummary } from '../../../../hooks/summary';
import { HighLightCard } from '../../../../components/HighlightCard';
import {Container} from './styles';

export function HighLightCards(){
    const summary = useSummary();
    return(
        <Container>
            <HighLightCard
                title="Em andamento"                           
                status="inprogress"
                amount={summary.inprogress}
            />
            <HighLightCard
                title="Finalizadas"                  
                status="closed"
                amount={summary.closed}
            />
            <HighLightCard
                title="Total"         
                status="total"
                amount={summary.total}
            />
        </Container>     
    )
}