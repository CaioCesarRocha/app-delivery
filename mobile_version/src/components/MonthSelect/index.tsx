import {format} from "date-fns";
import {ptBR} from 'date-fns/locale'
import { useDelivery } from "../../hooks/delivery";
import { 
    Container,
    MonthSelectButton,
    Month,
    NextIcon,
    PreviusIcon,
} from "./styles";

interface MonthSelectProps{
    buttonNext: () => void;
    buttonPrevius: () => void;
}

export function MonthSelect({
    buttonNext,
    buttonPrevius
}:MonthSelectProps){
    const {dateFilter} = useDelivery();
    return(
        <Container>
            <MonthSelectButton onPress={buttonNext}>
                <NextIcon/>
            </MonthSelectButton>
            <Month>
                { format(dateFilter, 'MMM, yyyy', {locale: ptBR})}
            </Month>
            <MonthSelectButton onPress={buttonPrevius}>
                <PreviusIcon/>
            </MonthSelectButton>
        </Container>
    )
}