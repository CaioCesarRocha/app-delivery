import { ReactNode } from 'react';
import {
    Container,
    Status,
    StatusTitle
} from './styles';

interface ContentStatusProps{
    statusTitle: string,
    status?: 'open' | 'closed' | 'inprogress',
    statusContent: ReactNode
}

export function ContentStatus({
    statusTitle,
    status,
    statusContent
}: ContentStatusProps){
    return(
        <Container>
            <StatusTitle>
                {statusTitle}
            </StatusTitle>
            <Status status={status}>
                {statusContent}
            </Status>
        </Container>
    )
}